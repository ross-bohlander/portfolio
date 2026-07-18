-- Fails if any observed yield falls outside a sane range for U.S. Treasury par yields.
select *
from {{ ref('stg_treasury_yields') }}
where yield_pct < -5 or yield_pct > 25
