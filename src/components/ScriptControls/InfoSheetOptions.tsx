import { Toggle } from "../ui";

interface InfoSheetOptionsProps {
  displayNightOrder: boolean;
  displayPlayerCounts: boolean;
  onDisplayNightOrderChange: (value: boolean) => void;
  onDisplayPlayerCountsChange: (value: boolean) => void;
}

export function InfoSheetOptions({
  displayNightOrder,
  displayPlayerCounts,
  onDisplayNightOrderChange,
  onDisplayPlayerCountsChange,
}: InfoSheetOptionsProps) {
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
    </>
  );
}
