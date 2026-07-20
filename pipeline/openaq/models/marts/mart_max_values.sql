with source as (
    select * from {{ ref('stg_openaq_measurements') }}
),

daily as (
    select parameter,
        max(value) as max_value,
        cast(null as double) as alt_value
    from source
    where parameter in ('pm10', 'pm25') -- only include daily averages for PM10 and PM2.5
    and period_end_utc::date = (
        select min(period_end_utc::date) from source where parameter in ('pm10', 'pm25')
    )
    group by parameter
),

no2_values as (
    select parameter,
        max(value) as max_value, -- EPA uses the daily max 1-hour value for NO2, not an average
        cast(null as double) as alt_value
    from source
    where parameter = 'no2'
    group by parameter
),

so2_values as (
    select parameter,
        max(value) as max_value, -- daily max 1-hour, used unless the 305 ppb escalation applies
        avg(value) as alt_value  -- 24-hr average, used only when max_value >= 305 ppb (see mart_aqi)
    from source
    where parameter = 'so2'
    group by parameter
),

-- O3: EPA's daily max 8-hour value is the max of 17 overlapping rolling 8-hour averages,
-- starting each hour from 7am to 11pm local time (see the ozone data-handling FAQ in the
-- EPA technical assistance doc). period_start_utc - 4 hours converts to America/Indiana/
-- Indianapolis local time (fixed UTC-4/EDT offset).
o3_rolling as (
    select
        parameter,
        period_start_utc,
        avg(value) over (
            partition by parameter
            order by period_start_utc
            rows between current row and 7 following
        ) as rolling_avg,
        count(value) over (
            partition by parameter
            order by period_start_utc
            rows between current row and 7 following
        ) as rolling_count
    from source
    where parameter = 'o3'
),

o3 as (
    select parameter,
        max(rolling_avg) as max_value,
        cast(null as double) as alt_value
    from o3_rolling
    where rolling_count = 8 -- only fully-populated 8-hour windows
    and extract(hour from period_start_utc - interval '4 hours') between 7 and 23
    group by parameter
),

raw_values as (
    select * from daily
    union all
    select * from no2_values
    union all
    select * from so2_values
    union all
    select * from o3
)

-- Truncated (not rounded) here, once, so every downstream consumer -- the AQI calc in
-- mart_aqi and the raw concentration shown on the dashboard -- sees the same EPA-compliant
-- value instead of a raw floating-point average like "6.8999999999999995".
select
    parameter,
    {{ truncate_concentration('max_value', 'parameter') }} as max_value,
    {{ truncate_concentration('alt_value', 'parameter') }} as alt_value
from raw_values
