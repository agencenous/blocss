import React from 'react';
import {__} from '@wordpress/i18n';
import ColorControl from './color-control.js';
import BoxControl from "./box-control.js";
import FontControl from "./font-control.js";
import ControlLabel from "./control-label.js";

const StyleControl = ( props ) => {
    const { onChange, value = {}, label, font, color, box, labels=true } = props;

    const { backgroundColor, color: textColor } = value;

    return (
      <fieldset className="blocss-style-control">
        {label && (
          <h2
            data-wp-component="Heading"
            class="components-truncate components-text components-heading"
          >
            {label}
          </h2>
        )}
        {font && FontControl && (
          <div>
            {labels && <ControlLabel label={__("Typography")} />}
            <FontControl
              value={value}
              onChange={(newValue) => onChange({ ...value, ...newValue })}
              font={font}
            />
          </div>
        )}
        {((color && color.text) || (color && color.background)) && (
          <div>
            {labels && <ControlLabel label={__("Colors")} />}
            {ColorControl && color && color.background && (
              <ColorControl
                label={__("Background Color")}
                value={backgroundColor}
                onChange={(newValue) =>
                  onChange({ ...value, backgroundColor: newValue })
                }
              />
            )}
            {ColorControl && color && color.text && (
              <ColorControl
                label={__("Text Color")}
                value={textColor}
                onChange={(newValue) => onChange({ ...value, color: newValue })}
              />
            )}
          </div>
        )}
        {box && BoxControl && (
          <div>
            {labels && <ControlLabel label={__("Box")} />}
            <BoxControl
              value={value}
              onChange={(newValue) => onChange({ ...value, ...newValue })}
              box={box}
            />
          </div>
        )}
      </fieldset>
    );
};

export default StyleControl;