{% macro get_aqi(pollutant_value, breakpoint_high_value, breakpoint_low_value, aqi_high_value, aqi_low_value) %}
    
    case 
        when {{ pollutant_value }} is null then null
        when {{ breakpoint_high_value }} = {{ breakpoint_low_value }} then null
        else round(({{ aqi_high_value }} - {{ aqi_low_value }}) / ({{ breakpoint_high_value }} - {{ breakpoint_low_value }}) * ({{ pollutant_value }} - {{ breakpoint_low_value }}) + {{ aqi_low_value }})
    end
    
{% endmacro %}
