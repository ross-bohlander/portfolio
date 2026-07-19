with yields as (

    select * from {{ ref('stg_treasury_yields') }}

),

final as (

    select
        curve_date,
        maturity_label,
        maturity_months,
        yield_pct
    from yields

)

select * from final
order by curve_date, maturity_months
