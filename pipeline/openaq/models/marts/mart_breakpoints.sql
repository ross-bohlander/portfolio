with source as (
    select * 
    from {{ ref('aqi_breakpoints') }}
),

cleaned as (
    select 
        case when "Parameter Code"::text = '42602' then 'no2'
            when "Parameter Code"::text = '44201' and "Duration Code"::text = 'W' then 'o3'
            when "Parameter Code"::text = '42401' and "Duration Code"::text = '1' then 'so2'
            -- EPA escalates SO2 to the 24-hr average breakpoints when the daily max 1-hr is >= 305 ppb
            when "Parameter Code"::text = '42401' and "Duration Code"::text = 'X' then 'so2_24hr'
            when "Parameter Code"::text = '81102' and "Duration Code"::text = '7' then 'pm10'
            when "Parameter Code"::text = '88101' and "Duration Code"::text = '7' then 'pm25'
        else null end as custom_name,
        *
    from source
)

select * 
from cleaned
where 
    custom_name is not null