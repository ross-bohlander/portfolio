with players as (

    select * from {{ ref('stg_squad_roster') }}

),

final as (

    select
        name,
        position,
        age,
        passing,
        vision,
        decisions,
        off_the_ball,
        dribbling,
        finishing,
        composure,
        work_rate,
        stamina,
        pace,
        acceleration,
        strength,
        heading,
        jumping,
        loaded_at
    from players
)

select * from final
