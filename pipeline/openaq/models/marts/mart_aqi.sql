with breakpoints as (
    select * from
    {{ ref('mart_breakpoints') }}
),

max_values as (
    select * from
    {{ ref('mart_max_values') }}
),

-- mart_max_values already truncates max_value/alt_value per EPA's rule (see truncate_concentration),
-- so this only needs to handle EPA's SO2 escalation to the 24-hr average breakpoints when the
-- daily max 1-hr is >= 305 ppb.
so2_escalated as (
    select
        parameter,
        case when parameter = 'so2' and max_value >= 305 then 'so2_24hr' else parameter end as breakpoint_key,
        case when parameter = 'so2' and max_value >= 305 then alt_value else max_value end as lookup_concentration
    from max_values
),

aqi as (
    select
        s.parameter,
        case
            -- Rare edge case: 1-hr concentration >= 305 ppb but the 24-hr average isn't;
            -- EPA pins the AQI at exactly 200 here rather than interpolating.
            when s.breakpoint_key = 'so2_24hr' and s.lookup_concentration < 305 then 200
            else {{ get_aqi('s.lookup_concentration', 'b."High Breakpoint"', 'b."Low Breakpoint"', 'b."High AQI"', 'b."Low AQI"') }}
        end as aqi_value
    from breakpoints b
    join so2_escalated s
    on b.custom_name = s.breakpoint_key
    and s.lookup_concentration between b."Low Breakpoint" and b."High Breakpoint"
)

select parameter, aqi_value from aqi
