import React from 'react';
import {__} from '@wordpress/i18n';
import ColorControl from './color-control.js';
import SizeControl from './size-control.js';
import FontControl from "./font-control.js";
import ControlLabel from "./control-label.js";

const StyleControl = ( props ) => {
    const { onChange, value = {}, font, color, labels=true } = props;

    const { backgroundColor, color: textColor } = value;

    return (
      <fieldset className="blocss-style-control">
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
      </fieldset>
    );
};

export default StyleControl;