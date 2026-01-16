import { randomColor } from "../../types/options";

interface ColorPickerProps {
  color: string | string[];
  onColorChange: (color: string | string[]) => void;
  onColorArrayChange: (index: number, color: string) => void;
  onAddColor: () => void;
  onRemoveColor: (index: number) => void;
}

export function ColorPicker({
  color,
  onColorChange,
  onColorArrayChange,
  onAddColor,
  onRemoveColor,
}: ColorPickerProps) {
  const isGradient = Array.isArray(color);

  return (
    <div className="color-picker-section">
      <label className="color-label">
        {isGradient ? "Gradient Colours:" : "Colour:"}
      </label>
      {!isGradient ? (
        <>
          <input
            id="sidebar-color"
            type="color"
            value={color as string}
            onInput={(e) => onColorChange((e.target as HTMLInputElement).value)}
            onChange={(e) => onColorChange((e.target as HTMLInputElement).value)}
            className="color-input"
          />
          <button
            onClick={() => onColorChange(randomColor())}
            className="update-button"
            style={{ fontSize: "17px", padding: "8px 16px" }}
          >
            🎲
          </button>
        </>
      ) : (
        <div style={{ width: "100%" }}>
          {(color as string[]).map((c, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "8px",
              }}
            >
              <input
                type="color"
                value={c}
                onInput={(e) =>
                  onColorArrayChange(index, (e.target as HTMLInputElement).value)
                }
                onChange={(e) =>
                  onColorArrayChange(index, (e.target as HTMLInputElement).value)
                }
                className="color-input"
              />
              <button
                onClick={() => onColorArrayChange(index, randomColor())}
                className="update-button"
                style={{
                  fontSize: "17px",
                  padding: "8px 16px",
                }}
                title="Randomize this color"
              >
                🎲
              </button>
              {(color as string[]).length > 1 && (
                <button
                  onClick={() => onRemoveColor(index)}
                  className="update-button"
                  style={{
                    fontSize: "14px",
                    padding: "8px 16px",
                  }}
                  title="Remove this color"
                >
                  ×
                </button>
              )}
            </div>
          ))}
          <button
            onClick={onAddColor}
            className="update-button"
            style={{
              fontSize: "14px",
              padding: "8px 16px",
              marginTop: "4px",
            }}
            title="Add another color"
          >
            + Add Color
          </button>
        </div>
      )}
    </div>
  );
}
