import { __ } from "@wordpress/i18n";
import {
  Button,
  ComboboxControl,
  Flex,
  FlexItem,
  FontSizePicker,
  Icon,
  PanelRow,
} from "@wordpress/components";
import { useSelect } from "@wordpress/data";
import {
  formatBold,
  formatCapitalize,
  formatItalic,
  formatUnderline,
} from "@wordpress/icons";

const DEFAULT_FONT_FAMILIES = [
  { value: "", label: __("Default") },
  { value: "Arial, sans-serif", label: "Arial" },
  { value: "Georgia, serif", label: "Georgia" },
  { value: "'Helvetica Neue', Helvetica, sans-serif", label: "Helvetica" },
  { value: "'Times New Roman', Times, serif", label: "Times New Roman" },
  { value: "Verdana, sans-serif", label: "Verdana" },
  { value: "'Trebuchet MS', sans-serif", label: "Trebuchet MS" },
  { value: "'Courier New', monospace", label: "Courier New" },
  { value: "system-ui, sans-serif", label: "System UI" },
  { value: "'Segoe UI', sans-serif", label: "Segoe UI" },
  { value: "Roboto, sans-serif", label: "Roboto" },
  { value: "'Open Sans', sans-serif", label: "Open Sans" },
  { value: "Lato, sans-serif", label: "Lato" },
  { value: "Montserrat, sans-serif", label: "Montserrat" },
  { value: "Poppins, sans-serif", label: "Poppins" },
  { value: "'Playfair Display', serif", label: "Playfair Display" },
  { value: "Raleway, sans-serif", label: "Raleway" },
  { value: "'Source Sans Pro', sans-serif", label: "Source Sans Pro" },
  { value: "Inter, sans-serif", label: "Inter" },
];

const useThemeFontFamilies = () => {
  return useSelect((select) => {
    try {
      const settings = select("core/block-editor").getSettings();
      const fontFamilies =
        settings?.typography?.fontFamilies ||
        settings?.__experimentalFeatures?.typography?.fontFamilies;
      if (!fontFamilies) return [];
      const allFonts = [
        ...(fontFamilies.theme || []),
        ...(fontFamilies.custom || []),
      ];
      return allFonts.map((f) => ({
        value: f.fontFamily,
        label: f.name || f.slug,
      }));
    } catch (e) {
      return [];
    }
  }, []);
};

const useFontFamilies = () => {
  const themeFonts = useThemeFontFamilies();
  if (themeFonts.length === 0) return DEFAULT_FONT_FAMILIES;
  const defaultValues = new Set(DEFAULT_FONT_FAMILIES.map((f) => f.value));
  const uniqueThemeFonts = themeFonts.filter(
    (f) => f.value && !defaultValues.has(f.value)
  );
  return [
    { value: "", label: __("Default") },
    ...uniqueThemeFonts,
    ...DEFAULT_FONT_FAMILIES.slice(1),
  ];
};

const FontControl = ( props ) => {
    const { value, onChange, font } = props;
    const { fontFamily, fontSize, fontWeight, fontStyle, textDecoration, textTransform } =
      value;
    const fontFamilies = useFontFamilies();

    return (
      <>
        {font && font.family && (
          <PanelRow>
            <div style={{ width: "100%" }}>
              <ComboboxControl
                label={__("Font Family")}
                value={fontFamily || ""}
                options={fontFamilies}
                onChange={(newValue) =>
                  onChange({ ...value, fontFamily: newValue || undefined })
                }
                allowReset
              />
            </div>
          </PanelRow>
        )}
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
                      <Icon icon={formatBold} size={12} />
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
                      <Icon icon={formatItalic} size={12} />
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
                      <Icon icon={formatUnderline} size={12} />
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
                      <Icon icon={formatCapitalize} size={12} />
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
