import { __ } from "@wordpress/i18n";
import {
  Button,
  Flex,
  FlexItem,
  FontSizePicker,
  Icon,
  PanelRow,
} from "@wordpress/components";
import {
  formatBold,
  formatCapitalize,
  formatItalic,
  formatUnderline,
} from "@wordpress/icons";


const FontControl = ( props ) => {
    const { value, onChange, font } = props;
    const { fontSize, fontWeight, fontStyle, textDecoration, textTransform } =
      value;

    return (
      <>
        {font && font.size && (
          <PanelRow>
            <div style={{ width: "100%" }}>
              <FontSizePicker
                value={fontSize || "1em"}
                onChange={(value) => onChange({ fontSize: value })}
                fontSizes={[
                  {
                    name: __("Small"),
                    slug: "small",
                    size: "0.8em",
                  },
                  {
                    name: __("Medium"),
                    slug: "medium",
                    size: "1em",
                  },
                  {
                    name: __("Large"),
                    slug: "large",
                    size: "1.2em",
                  },
                  {
                    name: __("Extra Large"),
                    slug: "extra-large",
                    size: "1.5em",
                  },
                ]}
              />
            </div>
          </PanelRow>
        )}
        {font &&
          (font.weight || font.style || font.decoration || font.transform) && (
            <PanelRow>
              <Flex gap={0} align="left">
                {font.weight && (
                  <FlexItem>
                    <Button
                      variant={fontWeight === "bold" ? "primary" : "secondary"}
                      onClick={() =>
                        onChange({
                          ...value,
                          fontWeight: fontWeight === "bold" ? "normal" : "bold",
                        })
                      }
                      aria-pressed={fontWeight === "bold"}
                      size="small"
                    >
                      <Icon icon={formatBold} />
                    </Button>
                  </FlexItem>
                )}
                {font.style && (
                  <FlexItem>
                    <Button
                      variant={fontStyle === "italic" ? "primary" : "secondary"}
                      onClick={() =>
                        onChange({
                          fontStyle:
                            fontStyle === "italic" ? "normal" : "italic",
                        })
                      }
                      aria-pressed={fontStyle === "italic"}
                      size="small"
                    >
                      <Icon icon={formatItalic} />
                    </Button>
                  </FlexItem>
                )}
                {font.decoration && (
                  <FlexItem>
                    <Button
                      variant={
                        textDecoration === "underline" ? "primary" : "secondary"
                      }
                      onClick={() =>
                        onChange({
                          textDecoration:
                            textDecoration === "underline"
                              ? "none"
                              : "underline",
                        })
                      }
                      aria-pressed={textDecoration === "underline"}
                      size="small"
                    >
                      <Icon icon={formatUnderline} />
                    </Button>
                  </FlexItem>
                )}
                {font.transform && (
                  <FlexItem>
                    <Button
                      variant={
                        textTransform === "uppercase" ? "primary" : "secondary"
                      }
                      onClick={() =>
                        onChange({
                          textTransform:
                            textTransform === "uppercase"
                              ? "none"
                              : "uppercase",
                        })
                      }
                      aria-pressed={textTransform === "uppercase"}
                      size="small"
                    >
                      <Icon icon={formatCapitalize} />
                    </Button>
                  </FlexItem>
                )}
              </Flex>
            </PanelRow>
          )}
      </>
    );
};
export default FontControl;
