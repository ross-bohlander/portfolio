with yields as (

    select * from {{ ref('stg_treasury_yields') }}

),

pivoted as (

    select
        curve_date,
        max(case when maturity_label = '3M' then yield_pct end) as yield_3m,
        max(case when maturity_label = '2Y' then yield_pct end) as yield_2y,
        max(case when maturity_label = '10Y' then yield_pct end) as yield_10y
    from yields
    group by curve_date

),

final as (

    select
        curve_date,
        yield_3m,
        yield_2y,
        yield_10y,
        yield_10y - yield_2y as spread_10y_2y,
        yield_10y - yield_3m as spread_10y_3m
    from pivoted
    where yield_2y is not null and yield_10y is not null

)

select * from final
order by curve_date
