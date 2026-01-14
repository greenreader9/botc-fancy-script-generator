import { ScriptOptions } from "botc-character-sheet";
import { randomColor } from "../types/options";
import { useState } from "preact/hooks";

interface ScriptControlsProps {
  hasScript: boolean;
  options: ScriptOptions;
  isScriptSorted: boolean;
  onFileUpload: (event: Event) => void;
  onLoadExample: () => void;
  onColorChange: (color: string | string[]) => void;
  onColorArrayChange: (index: number, color: string) => void;
  onAddColor: () => void;
  onRemoveColor: (index: number) => void;
  onOptionChange: <K extends keyof ScriptOptions>(
    key: K,
    value: ScriptOptions[K]
  ) => void;
  onSort: () => void;
  onGeneratePDF: () => void;
  onPrint: () => void;
}

export function ScriptControls({
  hasScript,
  options,
  isScriptSorted,
  onFileUpload,
  onLoadExample,
  onColorChange,
  onColorArrayChange,
  onAddColor,
  onRemoveColor,
  onOptionChange,
  onSort,
  onGeneratePDF,
  onPrint,
}: ScriptControlsProps) {
  const isGradient = Array.isArray(options.color);
  const [overleafType, setOverleafType] = useState<
    "backingSheet" | "infoSheet"
  >("backingSheet");

  const handleOverleafTypeChange = (type: "backingSheet" | "infoSheet") => {
    setOverleafType(type);
    onOptionChange("overleaf", type);
  };

  const handleDoubleSidedChange = (enabled: boolean) => {
    if (enabled) {
      onOptionChange("overleaf", overleafType);
    } else {
      onOptionChange("overleaf", "none");
    }
  };

  return (
    <>
      <h1 className="app-title">
        Blood on the Clocktower Fancy Script Generator
      </h1>

      <div className="control-panel">
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

        {hasScript && (
          <>
            <p style={{ textAlign: "center", margin: 0 }}>
              If you have any feedback, please let me know{" "}
              <a href="https://forms.gle/z1yeAW7x91X4Uc4H8">here</a>.
            </p>
            <div className="controls-grid">
              <div className="control-group">
                <div className="control-group-content">
                  <div className="options-subsection">
                    <label className="control-group-label">Appearance</label>
                    <div className="color-picker-section">
                      <label className="color-label">
                        {isGradient ? "Gradient Colours:" : "Colour:"}
                      </label>
                      {!isGradient ? (
                        <>
                          <input
                            id="sidebar-color"
                            type="color"
                            value={options.color as string}
                            onInput={(e) =>
                              onColorChange(
                                (e.target as HTMLInputElement).value
                              )
                            }
                            onChange={(e) =>
                              onColorChange(
                                (e.target as HTMLInputElement).value
                              )
                            }
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
                          {(options.color as string[]).map((color, index) => (
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
                                value={color}
                                onInput={(e) =>
                                  onColorArrayChange(
                                    index,
                                    (e.target as HTMLInputElement).value
                                  )
                                }
                                onChange={(e) =>
                                  onColorArrayChange(
                                    index,
                                    (e.target as HTMLInputElement).value
                                  )
                                }
                                className="color-input"
                              />
                              <button
                                onClick={() =>
                                  onColorArrayChange(index, randomColor())
                                }
                                className="update-button"
                                style={{
                                  fontSize: "17px",
                                  padding: "8px 16px",
                                }}
                                title="Randomize this color"
                              >
                                🎲
                              </button>
                              {(options.color as string[]).length > 1 && (
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

                    <div className="toggle-section">
                      <label className="toggle-label">
                        <input
                          type="checkbox"
                          checked={options.includeMargins}
                          onChange={(e) =>
                            onOptionChange(
                              "includeMargins",
                              (e.target as HTMLInputElement).checked
                            )
                          }
                          className="toggle-input"
                        />
                        <span className="toggle-text">Include Margins</span>
                      </label>
                    </div>

                    <div className="toggle-section">
                      <label className="toggle-label">
                        <input
                          type="checkbox"
                          checked={options.overleaf !== "none"}
                          onChange={(e) =>
                            handleDoubleSidedChange(
                              (e.target as HTMLInputElement).checked
                            )
                          }
                          className="toggle-input"
                        />
                        <span className="toggle-text">Double Sided</span>
                      </label>
                    </div>

                    {options.overleaf !== "none" && (
                      <div className="toggle-section">
                        <label className="toggle-label">
                          <span className="toggle-text">Overleaf:</span>
                          <select
                            value={overleafType}
                            onChange={(e) =>
                              handleOverleafTypeChange(
                                (e.target as HTMLSelectElement).value as
                                  | "backingSheet"
                                  | "infoSheet"
                              )
                            }
                            className="toggle-input"
                          >
                            <option value="infoSheet">Info Sheet</option>
                            <option value="backingSheet">Backing Sheet</option>
                          </select>
                        </label>
                      </div>
                    )}

                    <div className="toggle-section">
                      <label className="toggle-label">
                        <input
                          type="checkbox"
                          checked={options.showNightSheet}
                          onChange={(e) =>
                            onOptionChange(
                              "showNightSheet",
                              (e.target as HTMLInputElement).checked
                            )
                          }
                          className="toggle-input"
                        />
                        <span className="toggle-text">Include Night Sheet</span>
                      </label>
                    </div>
                  </div>

                  <div className="options-subsection">
                    <label className="control-group-label">
                      Character Sheet
                    </label>

                    <div className="toggle-section">
                      <label className="toggle-label">
                        <span className="toggle-text">Number of Sheets:</span>
                        <input
                          type="number"
                          value={options.numberOfCharacterSheets}
                          onChange={(e) =>
                            onOptionChange(
                              "numberOfCharacterSheets",
                              parseInt((e.target as HTMLInputElement).value)
                            )
                          }
                          className="number-input"
                        ></input>
                      </label>
                    </div>

                    <div className="toggle-section">
                      <label className="toggle-label">
                        <span className="toggle-text">Sizing:</span>
                        <select
                          value={options.appearance}
                          onChange={(e) =>
                            onOptionChange(
                              "appearance",
                              (e.target as HTMLSelectElement).value as
                                | "normal"
                                | "compact"
                                | "super-compact"
                            )
                          }
                          className="toggle-input"
                        >
                          <option value="normal">Normal</option>
                          <option value="compact">Small</option>
                          <option value="super-compact">Smaller</option>
                          <option value="mega-compact">Smallest</option>
                        </select>
                      </label>
                    </div>

                    <div className="toggle-section">
                      <label className="toggle-label">
                        <input
                          type="checkbox"
                          checked={options.showAuthor}
                          onChange={(e) =>
                            onOptionChange(
                              "showAuthor",
                              (e.target as HTMLInputElement).checked
                            )
                          }
                          className="toggle-input"
                        />
                        <span className="toggle-text">Show Author</span>
                      </label>
                    </div>

                    <div className="toggle-section">
                      <label className="toggle-label">
                        <input
                          type="checkbox"
                          checked={options.showJinxes}
                          onChange={(e) =>
                            onOptionChange(
                              "showJinxes",
                              (e.target as HTMLInputElement).checked
                            )
                          }
                          className="toggle-input"
                        />
                        <span className="toggle-text">Show Jinxes</span>
                      </label>
                    </div>

                    <div className="toggle-section">
                      <label className="toggle-label">
                        <input
                          type="checkbox"
                          checked={options.inlineJinxIcons}
                          onChange={(e) =>
                            onOptionChange(
                              "inlineJinxIcons",
                              (e.target as HTMLInputElement).checked
                            )
                          }
                          className="toggle-input"
                        />
                        <span className="toggle-text">Inline Jinx Icons</span>
                      </label>
                    </div>

                    <div className="toggle-section">
                      <label className="toggle-label">
                        <input
                          type="checkbox"
                          checked={options.useOldJinxes}
                          onChange={(e) =>
                            onOptionChange(
                              "useOldJinxes",
                              (e.target as HTMLInputElement).checked
                            )
                          }
                          className="toggle-input"
                        />
                        <span className="toggle-text">Use Old Jinxes</span>
                      </label>
                    </div>

                    <div className="toggle-section">
                      <label className="toggle-label">
                        <input
                          type="checkbox"
                          checked={options.showSwirls}
                          onChange={(e) =>
                            onOptionChange(
                              "showSwirls",
                              (e.target as HTMLInputElement).checked
                            )
                          }
                          className="toggle-input"
                        />
                        <span className="toggle-text">Show Swirls</span>
                      </label>
                    </div>

                    <div className="toggle-section">
                      <label className="toggle-label">
                        <input
                          type="checkbox"
                          checked={options.solidTitle}
                          onChange={(e) =>
                            onOptionChange(
                              "solidTitle",
                              (e.target as HTMLInputElement).checked
                            )
                          }
                          className="toggle-input"
                        />
                        <span className="toggle-text">Solid Title</span>
                      </label>
                    </div>

                    <div className="slider-section">
                      <label htmlFor="icon-scale" className="slider-label">
                        Icon Scale: {options.iconScale.toFixed(1)}
                      </label>
                      <input
                        id="icon-scale"
                        type="range"
                        min="0.5"
                        max="3"
                        step="0.1"
                        value={options.iconScale}
                        onInput={(e) =>
                          onOptionChange(
                            "iconScale",
                            parseFloat((e.target as HTMLInputElement).value)
                          )
                        }
                        onChange={(e) =>
                          onOptionChange(
                            "iconScale",
                            parseFloat((e.target as HTMLInputElement).value)
                          )
                        }
                        className="slider-input"
                      />
                    </div>
                  </div>

                  {options.overleaf === "backingSheet" && (
                    <div className="options-subsection">
                      <label className="control-group-label">
                        Backing Sheet
                      </label>
                      <div className="toggle-section">
                        <label className="toggle-label">
                          <input
                            type="checkbox"
                            checked={options.displayNightOrder}
                            onChange={(e) =>
                              onOptionChange(
                                "displayNightOrder",
                                (e.target as HTMLInputElement).checked
                              )
                            }
                            className="toggle-input"
                          />
                          <span className="toggle-text">
                            Include Night Order
                          </span>
                        </label>
                      </div>
                      <div className="toggle-section">
                        <label className="toggle-label">
                          <input
                            type="checkbox"
                            checked={options.displayPlayerCounts}
                            onChange={(e) =>
                              onOptionChange(
                                "displayPlayerCounts",
                                (e.target as HTMLInputElement).checked
                              )
                            }
                            className="toggle-input"
                          />
                          <span className="toggle-text">
                            Include Player Counts
                          </span>
                        </label>
                      </div>
                      <div className="toggle-section">
                        <label className="toggle-label">
                          <input
                            type="checkbox"
                            checked={options.formatMinorWords}
                            onChange={(e) =>
                              onOptionChange(
                                "formatMinorWords",
                                (e.target as HTMLInputElement).checked
                              )
                            }
                            className="toggle-input"
                          />
                          <span className="toggle-text">
                            Shrink Minor Words
                          </span>
                        </label>
                      </div>
                    </div>
                  )}

                  {options.overleaf === "infoSheet" && (
                    <div className="options-subsection">
                      <label className="control-group-label">Info Sheet</label>
                      <div className="toggle-section">
                        <label className="toggle-label">
                          <input
                            type="checkbox"
                            checked={options.displayNightOrder}
                            onChange={(e) =>
                              onOptionChange(
                                "displayNightOrder",
                                (e.target as HTMLInputElement).checked
                              )
                            }
                            className="toggle-input"
                          />
                          <span className="toggle-text">
                            Include Night Order
                          </span>
                        </label>
                      </div>
                      <div className="toggle-section">
                        <label className="toggle-label">
                          <input
                            type="checkbox"
                            checked={options.displayPlayerCounts}
                            onChange={(e) =>
                              onOptionChange(
                                "displayPlayerCounts",
                                (e.target as HTMLInputElement).checked
                              )
                            }
                            className="toggle-input"
                          />
                          <span className="toggle-text">
                            Include Player Counts
                          </span>
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              </div>

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
                    "Generate PDF" creates a PDF on our server. Use "Browser
                    Print" as a fallback if the server is unavailable.
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {!isScriptSorted && hasScript && (
        <div className="warning-message">
          <strong>⚠️ Script Not Sorted:</strong> This script doesn't follow the
          official sorting order. Click "Sort Script" to fix this.
        </div>
      )}
    </>
  );
}
