import { Toggle } from "../ui";

interface BackingSheetOptionsProps {
  displayNightOrder: boolean;
  displayPlayerCounts: boolean;
  formatMinorWords: boolean;
  onDisplayNightOrderChange: (value: boolean) => void;
  onDisplayPlayerCountsChange: (value: boolean) => void;
  onFormatMinorWordsChange: (value: boolean) => void;
}

export function BackingSheetOptions({
  displayNightOrder,
  displayPlayerCounts,
  formatMinorWords,
  onDisplayNightOrderChange,
  onDisplayPlayerCountsChange,
  onFormatMinorWordsChange,
}: BackingSheetOptionsProps) {
  return (
    <>
      <Toggle
        label="Include Night Order"
        checked={displayNightOrder}
        onChange={onDisplayNightOrderChange}
      />
      <Toggle
        label="Include Player Counts"
        checked={displayPlayerCounts}
        onChange={onDisplayPlayerCountsChange}
      />
      <Toggle
        label="Shrink Minor Words"
        checked={formatMinorWords}
        onChange={onFormatMinorWordsChange}
      />
    </>
  );
}
