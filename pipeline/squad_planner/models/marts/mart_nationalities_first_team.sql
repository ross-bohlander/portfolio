with players as (

    select * from {{ ref('stg_squad_roster') }}

),

final as (

    select
        nationality,
        count(nationality) as count,
        round(count(*) * 100.0 / sum(count(*)) over (), 1) as pct_of_squad
    from players
    where
        agreed_playing_time in ('Star Player', 'Regular Starter', 'Important Player', 'Squad Player')
        and loaded_at = (select max(loaded_at) from players)
    group by 1

)

select * from final
