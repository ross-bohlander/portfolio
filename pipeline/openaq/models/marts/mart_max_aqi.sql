with breakpoints as (
    select "AQI Category" as aqi_category,
        "Low AQI" as low_aqi,
        "High AQI" as high_aqi
    from {{ ref('mart_breakpoints') }}
    where custom_name = 'no2' -- the categories are the same across all pollutants, so just abritrarily select one
),

max_pollutants as (
    select max(aqi_value) as max_value from {{ ref('mart_aqi') }}
),

main_pollutant as (
    -- EPA requires reporting the "main pollutant": the one with the highest AQI value
    select a.parameter, a.aqi_value
    from {{ ref('mart_aqi') }} a
    join max_pollutants m on a.aqi_value = m.max_value
    limit 1
)

select b.aqi_category,
    m.max_value,
    p.parameter as main_pollutant
from breakpoints b
join max_pollutants m
on m.max_value between b.low_aqi and b.high_aqi
join main_pollutant p on true
