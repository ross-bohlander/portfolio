with max_aqi as (
    select * from {{ ref('mart_max_aqi') }}
),

grouped as (
    select *,
        case when main_pollutant in ('pm10', 'pm25') then 'pm' else main_pollutant end as pollutant_group
    from max_aqi
),

guidance as (
    select * from {{ ref('aqi_cautionary_statements') }}
)

select
    g.aqi_category,
    g.max_value,
    g.main_pollutant,
    c.sensitive_groups,
    c.cautionary_statement
from grouped g
join guidance c
    on c.pollutant_group = g.pollutant_group
    and c.aqi_category = g.aqi_category
