import { Toggle, Select } from "../ui";

interface AppearanceOptionsProps {
  includeMargins: boolean;
  overleaf: "none" | "backingSheet" | "infoSheet";
  overleafType: "backingSheet" | "infoSheet";
  showNightSheet: boolean;
  onIncludeMarginsChange: (value: boolean) => void;
  onDoubleSidedChange: (enabled: boolean) => void;
  onOverleafTypeChange: (type: "backingSheet" | "infoSheet") => void;
  onShowNightSheetChange: (value: boolean) => void;
}

export function AppearanceOptions({
  includeMargins,
  overleaf,
  overleafType,
  showNightSheet,
  onIncludeMarginsChange,
  onDoubleSidedChange,
  onOverleafTypeChange,
  onShowNightSheetChange,
}: AppearanceOptionsProps) {
  return (
    <>
      <Toggle
        label="Include Margins"
        checked={includeMargins}
        onChange={onIncludeMarginsChange}
      />

      <Toggle
        label="Double Sided"
        checked={overleaf !== "none"}
        onChange={onDoubleSidedChange}
      />

      {overleaf !== "none" && (
        <Select
          label="Overleaf:"
          value={overleafType}
          options={[
            { value: "infoSheet", label: "Info Sheet" },
            { value: "backingSheet", label: "Backing Sheet" },
          ]}
          onChange={(value) =>
            onOverleafTypeChange(value as "backingSheet" | "infoSheet")
          }
        />
      )}

      <Toggle
        label="Include Night Sheet"
        checked={showNightSheet}
        onChange={onShowNightSheetChange}
      />
    </>
  );
}
