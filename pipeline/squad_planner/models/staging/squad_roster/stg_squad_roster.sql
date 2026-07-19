with source as (

    select * from {{ source('roster', 'squad_roster_raw') }}

),

renamed as (

    select
        raw_data:"UID"::number                  as uid,
        raw_data:"Name"::varchar                 as name,
        raw_data:"Position"::varchar             as position,
        raw_data:"Age"::number                   as age,
        raw_data:"Nat"::varchar                  as nationality,
        raw_data:"Agreed Playing Time"::varchar  as agreed_playing_time,

        raw_data:"Salary"::varchar               as salary_text,
        raw_data:"Begins"::date                  as contract_begin_date,
        raw_data:"Expires"::date                 as contract_end_date,
        raw_data:"Transfer Value"::varchar       as transfer_value_text,
        raw_data:"Apps"::varchar                 as apps_text,
        raw_data:"Gls"::varchar                  as goals_text,
        raw_data:"Ast"::varchar                  as assists_text,

        raw_data:"Ability"::number               as ability,
        raw_data:"Potential"::number             as potential,
        raw_data:"Pas"::number                   as passing,
        raw_data:"Vis"::number                   as vision,
        raw_data:"Dec"::number                   as decisions,
        raw_data:"OtB"::number                   as off_the_ball,
        raw_data:"Dri"::number                   as dribbling,
        raw_data:"Fin"::number                   as finishing,
        raw_data:"Cmp"::number                   as composure,
        raw_data:"Wor"::number                   as work_rate,
        raw_data:"Sta"::number                   as stamina,
        raw_data:"Pac"::number                   as pace,
        raw_data:"Acc"::number                   as acceleration,
        raw_data:"Str"::number                   as strength,
        raw_data:"Hea"::number                   as heading,
        raw_data:"Jum"::number                   as jumping,

        file_name,
        loaded_at
    from source

),

-- Transfer Value comes in as "€79M - €96M" or a single figure like "€50M";
-- strip the currency symbol and split into a lower/upper bound before
-- expanding the K/M/B suffix on each side.
transfer_value_split as (

    select
        *,
        trim(split_part(regexp_replace(transfer_value_text, '[^0-9A-Za-z.\\s-]', ''), '-', 1)) as transfer_value_part_1,
        nullif(trim(split_part(regexp_replace(transfer_value_text, '[^0-9A-Za-z.\\s-]', ''), '-', 2)), '')  as transfer_value_part_2
    from renamed

),

cleaned as (

    select
        uid,
        name,
        position,
        age,
        nationality,
        agreed_playing_time,

        regexp_replace(salary_text, '[^0-9]', '')::number as salary,
        contract_begin_date,
        contract_end_date,

        {{ expand_magnitude_suffix('transfer_value_part_1') }} as transfer_value_lower,
        coalesce(
            {{ expand_magnitude_suffix('transfer_value_part_2') }},
            {{ expand_magnitude_suffix('transfer_value_part_1') }}
        ) as transfer_value_upper,

        -- Apps comes in as "23" (starts only) or "19 (2)" (starts + sub appearances)
        coalesce(try_to_number(regexp_substr(apps_text, '^[0-9]+')), 0) as starts,
        coalesce(try_to_number(regexp_substr(apps_text, '\\(([0-9]+)\\)', 1, 1, 'e')), 0) as subs,

        coalesce(try_to_number(replace(goals_text, '-', '0')), 0) as goals,
        coalesce(try_to_number(replace(assists_text, '-', '0')), 0) as assists,

        ability,
        potential,
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

        file_name,
        loaded_at
    from transfer_value_split

)

select * from cleaned
