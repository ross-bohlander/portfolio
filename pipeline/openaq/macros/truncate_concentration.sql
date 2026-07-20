{% macro truncate_concentration(value, parameter) %}
    -- EPA truncation rule (Technical Assistance Document, "Calculating the AQI from
    -- pollutant concentration data"): truncate toward zero, never round.
    case
        when {{ value }} is null then null
        when {{ parameter }} = 'o3' then trunc({{ value }}, 3)
        when {{ parameter }} in ('pm25', 'co') then trunc({{ value }}, 1)
        else trunc({{ value }})
    end
{% endmacro %}
