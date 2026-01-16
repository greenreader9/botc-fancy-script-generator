import { Toggle, Select, NumberInput, Slider } from "../ui";

interface CharacterSheetOptionsProps {
  numberOfCharacterSheets: number;
  appearance: "normal" | "compact" | "super-compact" | "mega-compact";
  showAuthor: boolean;
  showJinxes: boolean;
  inlineJinxIcons: boolean;
  useOldJinxes: boolean;
  showSwirls: boolean;
  solidTitle: boolean;
  iconScale: number;
  onNumberOfSheetsChange: (value: number) => void;
  onAppearanceChange: (
    value: "normal" | "compact" | "super-compact" | "mega-compact"
  ) => void;
  onShowAuthorChange: (value: boolean) => void;
  onShowJinxesChange: (value: boolean) => void;
  onInlineJinxIconsChange: (value: boolean) => void;
  onUseOldJinxesChange: (value: boolean) => void;
  onShowSwirlsChange: (value: boolean) => void;
  onSolidTitleChange: (value: boolean) => void;
  onIconScaleChange: (value: number) => void;
}

export function CharacterSheetOptions({
  numberOfCharacterSheets,
  appearance,
  showAuthor,
  showJinxes,
  inlineJinxIcons,
  useOldJinxes,
  showSwirls,
  solidTitle,
  iconScale,
  onNumberOfSheetsChange,
  onAppearanceChange,
  onShowAuthorChange,
  onShowJinxesChange,
  onInlineJinxIconsChange,
  onUseOldJinxesChange,
  onShowSwirlsChange,
  onSolidTitleChange,
  onIconScaleChange,
}: CharacterSheetOptionsProps) {
  return (
    <>
      <NumberInput
        label="Number of Sheets:"
        value={numberOfCharacterSheets}
        min={1}
        onChange={onNumberOfSheetsChange}
      />

      <Select
        label="Sizing:"
        value={appearance}
        options={[
          { value: "normal", label: "Normal" },
          { value: "compact", label: "Small" },
          { value: "super-compact", label: "Smaller" },
          { value: "mega-compact", label: "Smallest" },
        ]}
        onChange={(value) =>
          onAppearanceChange(
            value as "normal" | "compact" | "super-compact" | "mega-compact"
          )
        }
      />

      <Toggle
        label="Show Author"
        checked={showAuthor}
        onChange={onShowAuthorChange}
      />

      <Toggle
        label="Show Jinxes"
        checked={showJinxes}
        onChange={onShowJinxesChange}
      />

      <Toggle
        label="Inline Jinx Icons"
        checked={inlineJinxIcons}
        onChange={onInlineJinxIconsChange}
      />

      <Toggle
        label="Use Old Jinxes"
        checked={useOldJinxes}
        onChange={onUseOldJinxesChange}
      />

      <Toggle
        label="Show Swirls"
        checked={showSwirls}
        onChange={onShowSwirlsChange}
      />

      <Toggle
        label="Solid Title"
        checked={solidTitle}
        onChange={onSolidTitleChange}
      />

      <Slider
        label="Icon Scale"
        value={iconScale}
        min={0.5}
        max={3}
        step={0.1}
        displayValue={iconScale.toFixed(1)}
        onChange={onIconScaleChange}
      />
    </>
  );
}
