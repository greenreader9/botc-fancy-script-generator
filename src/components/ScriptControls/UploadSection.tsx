interface UploadSectionProps {
  hasScript: boolean;
  onFileUpload: (event: Event) => void;
  onLoadExample: () => void;
}

export function UploadSection({
  hasScript,
  onFileUpload,
  onLoadExample,
}: UploadSectionProps) {
  return (
    <>
      <div className="upload-section">
        <label htmlFor="file-upload" className="upload-label">
          Upload JSON
        </label>
        <input
          id="file-upload"
          type="file"
          accept=".json,.json5"
          onChange={onFileUpload}
          className="file-input"
        />
        <div className="or">or</div>
        <div className="paste-hint">Paste directly with ctrl+V / ⌘+V</div>
      </div>

      {!hasScript && (
        <div className="example-section">
          <button onClick={onLoadExample} className="example-button">
            Load Example Script
          </button>
        </div>
      )}
    </>
  );
}
