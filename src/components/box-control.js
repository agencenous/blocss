import React from "react";
import { __ } from "@wordpress/i18n";
import {
  PanelRow,
} from "@wordpress/components";
import SizeControl from "./size-control.js";
import ControlLabel from "./control-label.js";

const BoxControl = (props) => {
  const { onChange, value = {}, box, labels = true } = props;

  const { padding, margin, borderRadius } = value;

  return (
    <fieldset className="blocss-style-control">
      {box && box.padding && SizeControl && (
        <PanelRow>
          {labels && <ControlLabel label={__("Padding")} />}
          <SizeControl
            value={padding}
            onChange={(newValue) => {
                onChange({ ...value, padding: newValue });
            }}
            multi={true}
          />
        </PanelRow>
      )}
    </fieldset>
  );
};

export default BoxControl;
