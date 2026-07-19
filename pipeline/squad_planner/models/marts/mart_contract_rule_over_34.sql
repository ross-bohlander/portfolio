with players as (

    select * from {{ ref('stg_squad_roster') }}

),

final as (
    select 
        name,
        age,
        agreed_playing_time,
        starts,
        salary,
        contract_begin_date,
        contract_end_date
    from players
    where 
        loaded_at = (select max(loaded_at) from players)
        and age > 34 
        and datediff(year, contract_begin_date, contract_end_date) > 1
)

select * from final