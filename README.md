# Blocss

Two in one CSS editor for elements in Wordpress blocks.

- The `@agencenous/blocss` NPM library to use in block editor
- The `agencenous/blocss` Composer library to use in the PHP callback function

## Frontend

You can add style attributes to your blocks. It will allow editors to apply style in the editor UI.

Add the depency:

```bash
npm install @agencenous/blocss
```

Just add attributes in the `block.json` file. If you need to manage many styles, no pronlem, you can add as many attributes as you need.

```json
{
    "attributes": {
        "boxStyle":  {
            "type": "object",
            "default": {
                "fontSize": "1em",
                "backgroudColor": "#ff0000"
            }
        },
        "itemStyle":  {
            "type": "object",
            "default": {
                "fontSize": "1em",
                "color": "#ffffff"
            }
        }
    }
}
```

In the editor, use the **npm** library

```jsx
const { InspectorControls, useBlockProps } = wp.blockEditor;
import { PanelBody } from '@wordpress/components';
import { StyleControl } from '@agencenous/blocss';

const blockProps = useBlockProps();
const { 
    boxStyle,
    itemStyle,
    } = attributes;

const edit = ({ setAttributes, attributes }) => {
    return (
        <div className={className} {...blockProps}>
            <InspectorControls>
                <PanelBody title={__("Box")} initialOpen={true}>
                    <StyleControl
                        value={boxStyle}
                        font={{
                            size: true,
                        }}
                        color={{
                            background: true
                        }}
                        onChange={(value) => setAttributes({ boxStyle: value })}
                    />
                </PanelBody>
                <PanelBody title={__("Items")} initialOpen={true}>
                    <StyleControl
                        value={itemStyle}
                        border={{
                            radius: true,
                            width: true,
                            color: true,
                            style: true,
                        }}
                        box={{
                            padding: true,
                            margin: true,
                        }}
                        onChange={(value) => setAttributes({ itemStyle: value })}
                    />
                </PanelBody>
            </InspectorControls>
        </div>
)};
```

## Backend

In the callback, use the **composer** library

```bash
composer install agencenous/blocss
```

```php
function myblock_render_callback($attributes) {
    $block_id = 'my-block-' . uniqid();
    $css_rules = [
        '.my-block' => $attributes['boxStyle'],
        '.my-block .block-item' => $attributes['itemStyle'],
    ];
    return '<div id="'.esc_attr($block_id).'" class="my-block">
        <h3>My block</h3>
        <div class="block-item">Item 1</div>
        <div class="block-item">Item 2</div>
    </div>'.Blocss\inline_styles($css_rules, '#' . $block_id);
}
```