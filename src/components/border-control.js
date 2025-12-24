import React from "react";
import { __ } from "@wordpress/i18n";
import { PanelRow, BorderBoxControl } from "@wordpress/components";

import SizeControl from "./size-control.js";

const BorderControl = (props) => {
  const { onChange, value = {}, border, labels = true } = props;
  const { borderWidth, borderStyle, borderColor, borderRadius } = value;

  return (
    <fieldset className="blocss-style-control">
      {border && border.style && BorderBoxControl && (
        <PanelRow>
          <BorderBoxControl
            label={labels && __("Border")}
            enableStyle={border.style}
            value={{
              style: (border.style && borderStyle) || null,
              width: (border.width && borderWidth) || null,
              color: (border.color && borderColor) || null,
            }}
            onChange={(newValue) => {
              onChange({
                ...value,
                borderStyle: (border.style && newValue.style) || null,
                borderWidth: (border.width && newValue.width) || null,
                borderColor: (border.color && newValue.color) || null,
              });
            }}
          />
        </PanelRow>
      )}
      {border && border.radius && SizeControl && (
        <PanelRow>
          <SizeControl
            label={labels && __("Border Radius")}
            value={borderRadius}
            onChange={(newValue) => {
              onChange({ ...value, borderRadius: newValue });
            }}
            multi={true}
          />
        </PanelRow>
      )}
    </fieldset>
  );
};

export default BorderControl;
