import { Toggle } from "../ui";

interface AppearanceOptionsProps {
  showNightSheet: boolean;
  onShowNightSheetChange: (value: boolean) => void;
}

export function AppearanceOptions({
  showNightSheet,
  onShowNightSheetChange,
}: AppearanceOptionsProps) {
  return (
    <Toggle
      label="Include Night Sheet"
      checked={showNightSheet}
      onChange={onShowNightSheetChange}
    />
  );
}
