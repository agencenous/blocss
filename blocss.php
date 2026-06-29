<?php
namespace Blocss;

/**
 * Transform WP CSS variable notation to standard CSS variable notation.
 *
 * @param mixed $value The value to transform.
 * @return mixed The transformed value.
 */
function transform_wp_vars(mixed $value): mixed {
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

/**
 * Generate CSS styles from an array of CSS rules.
 *
 * @param array $css_rules The CSS rules.
 * @param string $prefix_selector The prefix selector.
 * @return string The generated CSS styles.
 */
function generate_css(array $css_rules, string $prefix_selector): string {
    $styles = '';
    foreach ($css_rules as $sub_selector => $rules) {
        $styles .= $prefix_selector . ' ' . $sub_selector . ' {';
        if ((!empty($rules['borderWidth']) || !empty($rules['borderColor'])) && empty($rules['borderStyle'])) {
            $rules['borderStyle'] = 'solid';
        }
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

/**
 * Generate inline CSS styles wrapped in a <style> tag.
 *
 * @param array $css_rules The CSS rules.
 * @param string $prefix_selector The prefix selector.
 * @return string The inline CSS styles.
 */
function inline_styles(array $css_rules, string $prefix_selector): string {
    return sprintf('<style>%s</style>', generate_css($css_rules, $prefix_selector));
}