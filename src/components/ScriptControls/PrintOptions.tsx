import { Select, NumberInput } from "../ui";

interface Dimensions {
  width: number;
  height: number;
  margin: number;
  bleed: number;
}

interface PrintOptionsProps {
  numberOfCharacterSheets: number;
  paperType: "A4" | "Letter";
  dimensions: Dimensions;
  onNumberOfCharacterSheetsChange: (value: number) => void;
  onPaperChange: (paper: "A4" | "Letter") => void;
  onMarginChange: (margin: number) => void;
  onBleedChange: (bleed: number) => void;
}

export function PrintOptions({
  numberOfCharacterSheets,
  paperType,
  dimensions,
  onNumberOfCharacterSheetsChange,
  onPaperChange,
  onMarginChange,
  onBleedChange,
}: PrintOptionsProps) {
  return (
    <>
      <NumberInput
        label="Number of Character Sheets:"
        value={numberOfCharacterSheets}
        min={1}
        onChange={onNumberOfCharacterSheetsChange}
      />

      <Select
        label="Paper Type:"
        value={paperType}
        options={[
          { value: "A4", label: "A4" },
          { value: "Letter", label: "Letter" },
        ]}
        onChange={(value) => onPaperChange(value as "A4" | "Letter")}
      />

      <NumberInput
        label="Print Margin (mm):"
        value={dimensions.margin}
        min={0}
        onChange={onMarginChange}
      />

      <NumberInput
        label="Bleed (mm):"
        value={dimensions.bleed}
        min={0}
        onChange={onBleedChange}
      />

      <p className="print-options-hint">
        For professional printing, try 2mm margin and 3mm bleed.
      </p>
    </>
  );
}
