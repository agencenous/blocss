import React from "react";
import { __ } from "@wordpress/i18n";
import { BaseControl, PanelRow, BorderBoxControl } from "@wordpress/components";

import SizeControl from "./size-control.js";
import ControlLabel from "./control-label.js";

const BorderControl = (props) => {
  const { onChange, value = {}, border, labels = true } = props;
  const { borderWidth, borderStyle, borderColor, borderRadius } = value;

  return (
    <fieldset className="blocss-style-control">
      {border && border.style && BorderBoxControl && (
        <BaseControl>
          <BaseControl.VisualLabel>{__("Border")}</BaseControl.VisualLabel>
          <BorderBoxControl
            hideLabelFromVision
            enableStyle={border.style}
            value={{
              style: (border.style && borderStyle) || null,
              width: (border.width && borderWidth) || null,
              color: (border.color && borderColor) || null,
            }}
            onChange={(newValue) => {
              const newWidth = (border.width && newValue.width) || null;
              const newColor = (border.color && newValue.color) || null;
              const newStyle = (border.style && newValue.style) || null;
              onChange({
                ...value,
                borderStyle: newStyle || (newWidth || newColor ? "solid" : null),
                borderWidth: newWidth,
                borderColor: newColor,
              });
            }}
          />
        </BaseControl>
      )}
      {border && border.radius && SizeControl && (
        <BaseControl>
          <SizeControl
            label={labels && __("Border Radius")}
            value={borderRadius}
            onChange={(newValue) => {
              onChange({ ...value, borderRadius: newValue });
            }}
            multi={true}
          />
        </BaseControl>
      )}
    </fieldset>
  );
};

export default BorderControl;
