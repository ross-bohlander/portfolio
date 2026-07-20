with source as (

    select * from {{ source('openaq', 'openaq_extract') }}

),

renamed as (

    select
        sensor as parameter,
        datetime_from::timestamp as period_start_utc,
        datetime_to::timestamp   as period_end_utc,
        -- OpenAQ reports no2/so2 in ppm; the AQI breakpoints for these two are in ppb (EPA Table 6).
        case when sensor in ('no2', 'so2') then value * 1000 else value end as value
    from source

)

select * from renamed
