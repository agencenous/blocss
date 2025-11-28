<?php
namespace Blocss;

function generate_css($css_rules, $prefix_selector){
    $styles = '';
    foreach ($css_rules as $sub_selector => $rules) {
        $styles .= $prefix_selector . ' ' . $sub_selector . ' {';
        foreach ($rules as $property => $value) {
            if ($value === null) {
                continue;
            }
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