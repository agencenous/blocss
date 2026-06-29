import React from "react";
import { __ } from "@wordpress/i18n";
import {
  Flex,
  FlexItem,
} from "@wordpress/components";
import SizeControl from "./size-control.js";
import ControlLabel from "./control-label.js";

const BoxControl = (props) => {
  const { onChange, value = {}, box, labels = true } = props;

  const { padding, margin } = value;

  return (
    <fieldset className="blocss-style-control">
      {box && box.padding && SizeControl && (
        <Flex style={{ alignItems: "flex-start", marginTop: "8px" }}>
          {labels && <ControlLabel label={__("Padding")} />}
          <SizeControl
            value={padding}
            onChange={(newValue) => {
                onChange({ ...value, padding: newValue });
            }}
            multi={true}
          />
        </Flex>
      )}
      {box && box.margin && SizeControl && (
        <Flex style={{ alignItems: "flex-start", marginTop: "8px" }}>
          {labels && <ControlLabel label={__("Margin")} />}
          <SizeControl
            value={margin}
            onChange={(newValue) => {
                onChange({ ...value, margin: newValue });
            }}
            multi={true}
          />
        </Flex>
      )}
    </fieldset>
  );
};

export default BoxControl;
