import React from "react";
import { __ } from "@wordpress/i18n";
import {
    BaseControl,
    Button,
    Flex,
    FlexItem,
    Icon,
    PanelRow,
    BorderBoxControl,
} from "@wordpress/components";
import {
    closeSmall,
    create,
} from "@wordpress/icons";
import SizeControl from "./size-control.js";
import ControlLabel from "./control-label.js";

const BorderControl = (props) => {
  const { onChange, value = {}, border, labels = true } = props;
  const { borderWidth, borderStyle, borderColor, borderRadius } = value;

  return (
    <fieldset className="blocss-style-control">
      {border && border.style && BorderBoxControl && (
        <BaseControl>
          <Flex justify="space-between">
            <BaseControl.VisualLabel>{__("Border")}</BaseControl.VisualLabel>
            {!border.width || !borderStyle ?(
            <FlexItem>
              <Button
                onClick={() => onChange({ ...value, borderWidth: "1px", borderStyle: "solid", borderColor: "#000", })}
                size="small"
              >
                <Icon icon={create} />
              </Button>
            </FlexItem>
          ) : (
            <FlexItem>
              <Button
                onClick={() => onChange({ ...value, borderWidth: null, borderStyle: null, borderColor: null })}
                size="small"
              >
                <Icon icon={closeSmall} />
              </Button>
            </FlexItem>
          )}    
          </Flex>
          {(border.width || borderStyle) && (
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
          )}
          
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
