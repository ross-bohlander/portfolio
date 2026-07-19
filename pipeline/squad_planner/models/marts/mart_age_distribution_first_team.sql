with players as (

    select * from {{ ref('stg_squad_roster') }}

),

final as (

    select
        case 
            when age < 18 then 'Developmental Youth'
            when age between 18 and 22 then 'Developed Youth'
            when age between 23 and 26 then 'Approaching Prime'
            when age between 27 and 32 then 'Prime'
            when age > 32 then 'Mentor' 
        end as age_classification,
        count(*) as raw_count,
        round(count(*) * 100.0 / sum(count(*)) over (), 1) as pct_of_squad,
        avg(age) as average_age
    from players
    where
        agreed_playing_time in ('Star Player', 'Regular Starter', 'Important Player', 'Squad Player')
        and loaded_at = (select max(loaded_at) from players)
    group by 1
)

select * from final
