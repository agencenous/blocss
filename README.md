# Blocss

CSS editor for elements in Wordpress blocks

```jsx
const { InspectorControls, useBlockProps } = wp.blockEditor;
import { PanelBody } from '@wordpress/components';
import { StyleControl } from '@agencenous/blocss';

const blockProps = useBlockProps();
const { 
    item_style,
    } = attributes;

const edit = ({ setAttributes, attributes }) => {
    return (
        <div className={className} {...blockProps}>
            <InspectorControls>
                <PanelBody title={__("Items")} initialOpen={true}>
                    <StyleControl
                        value={item_style}
                        typography={{
                            fontSize: true,
                        }}
                        color={{
                            background: true,
                            text: true
                        }}
                        onChange={(value) => setAttributes({ item_style: value })}
                    />
                </PanelBody>
            </InspectorControls>
        </div>
)};
```