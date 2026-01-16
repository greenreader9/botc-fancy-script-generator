interface ActionButtonsProps {
  onSort: () => void;
  onGeneratePDF: () => void;
  onPrint: () => void;
}

export function ActionButtons({
  onSort,
  onGeneratePDF,
  onPrint,
}: ActionButtonsProps) {
  return (
    <div className="control-group">
      <label className="control-group-label">Actions</label>
      <div className="control-group-content">
        <button onClick={onSort} className="sort-button">
          Sort Script
        </button>
        <button onClick={onGeneratePDF} className="print-button">
          Generate PDF
        </button>
        <button
          onClick={onPrint}
          className="print-button"
          style={{ marginTop: "8px" }}
        >
          Browser Print (Fallback)
        </button>
        <p className="print-warning">
          "Generate PDF" creates a PDF on our server. Use "Browser Print" as a
          fallback if the server is unavailable.
        </p>
      </div>
    </div>
  );
}
