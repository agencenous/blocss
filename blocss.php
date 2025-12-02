<?php
namespace Blocss;

function transform_wp_vars($value){
    if (is_array($value)) {
        foreach ($value as $key => $val) {
            $value[$key] = transform_wp_vars($val);
        }
    } elseif (is_string($value) && preg_match('/var\:/', $value)) {
        $value = str_replace('|', '--', $value);
        $value = str_replace('var:', 'var(--wp--', $value) . ')';
    }
    return $value;
}

function generate_css($css_rules, $prefix_selector){
    $styles = '';
    foreach ($css_rules as $sub_selector => $rules) {
        $styles .= $prefix_selector . ' ' . $sub_selector . ' {';
        foreach ($rules as $property => $value) {
            if ($value === null) {
                continue;
            }
            $value = transform_wp_vars($value);
            $value = is_array($value) ? implode(' ', $value) : $value;
            $dash = str_replace( '_', '-', preg_replace( '/([a-z])([A-Z])/', '$1-$2', $property ) );
            $styles .= sprintf('%s: %s;', $dash, $value);
        }
        $styles .= '}';
    }
    return $styles;
}

function inline_styles($css_rules, $prefix_selector) {
    return sprintf('<style>%s</style>', generate_css($css_rules, $prefix_selector));
}