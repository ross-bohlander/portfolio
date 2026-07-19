{% macro expand_magnitude_suffix(column_expr) %}
    case
        when upper(right(trim({{ column_expr }}), 1)) = 'K'
            then try_to_number(left(trim({{ column_expr }}), length(trim({{ column_expr }})) - 1)) * 1000
        when upper(right(trim({{ column_expr }}), 1)) = 'M'
            then try_to_number(left(trim({{ column_expr }}), length(trim({{ column_expr }})) - 1)) * 1000000
        when upper(right(trim({{ column_expr }}), 1)) = 'B'
            then try_to_number(left(trim({{ column_expr }}), length(trim({{ column_expr }})) - 1)) * 1000000000
        else try_to_number(trim({{ column_expr }}))
    end
{% endmacro %}
