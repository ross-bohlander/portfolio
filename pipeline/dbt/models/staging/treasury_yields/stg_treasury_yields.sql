{% set maturities = [
    ('bc_1month', '1M', 1),
    ('bc_2month', '2M', 2),
    ('bc_3month', '3M', 3),
    ('bc_4month', '4M', 4),
    ('bc_6month', '6M', 6),
    ('bc_1year', '1Y', 12),
    ('bc_2year', '2Y', 24),
    ('bc_3year', '3Y', 36),
    ('bc_5year', '5Y', 60),
    ('bc_7year', '7Y', 84),
    ('bc_10year', '10Y', 120),
    ('bc_20year', '20Y', 240),
    ('bc_30year', '30Y', 360),
] %}

with source as (

    select * from {{ source('treasury', 'raw_treasury_par_yields') }}

),

unpivoted as

(
    {% for column, label, months in maturities %}
    select
        curve_date,
        '{{ label }}' as maturity_label,
        {{ months }} as maturity_months,
        {{ column }} as yield_pct
    from source
    {% if not loop.last %}union all{% endif %}
    {% endfor %}
),

final as (

    select
        curve_date,
        maturity_label,
        maturity_months,
        yield_pct
    from unpivoted
    where yield_pct is not null

)

select * from final
