import React from 'react';
import {__} from '@wordpress/i18n';
import ColorControl from './color-control.js';
import SizeControl from './typography/size-control.js';

const StyleControl = ( props ) => {
    const {
        onChange,
        value = {},
        typography,
        color,
    } = props;

    const { fontSize, backgroundColor, color: textColor } = value;

    return (
        <fieldset className="blocss-style-control">
            { typography && SizeControl && (
                <div>
                    <h4>{__('Typography')}</h4>
                    <SizeControl
                        label={__("Font Size")}
                        value={ fontSize }
                        onChange={ ( newValue ) => onChange( { ...value, fontSize: newValue } ) }
                        multi={ false }
                    />
                </div>
            ) }
            { ( (color && color.text) || (color && color.background) ) && (
                <div>
                    <h4>{__('Colors')}</h4>
                    { ColorControl && color && color.background && (
                        <ColorControl
                            label={__("Background Color")}
                            value={ backgroundColor }
                            onChange={ ( newValue ) => onChange( { ...value, backgroundColor: newValue } ) }
                        />
                    ) }
                    { ColorControl && color && color.text && (
                        <ColorControl
                            label={__("Text Color")}
                            value={ textColor }
                            onChange={ ( newValue ) => onChange( { ...value, color: newValue } ) }
                        />
                    ) }
                </div>
            ) }
        </fieldset>
    );
};

export default StyleControl;