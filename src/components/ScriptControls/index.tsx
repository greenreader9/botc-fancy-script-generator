import { ScriptOptions } from "botc-character-sheet";
import { useState } from "preact/hooks";
import { CollapsibleSection } from "../ui";
import { UploadSection } from "./UploadSection";
import { ColorPicker } from "./ColorPicker";
import { AppearanceOptions } from "./AppearanceOptions";
import { CharacterSheetOptions } from "./CharacterSheetOptions";
import { BackingSheetOptions } from "./BackingSheetOptions";
import { InfoSheetOptions } from "./InfoSheetOptions";
import { PrintOptions } from "./PrintOptions";
import { ActionButtons } from "./ActionButtons";

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
  const [overleafType, setOverleafType] = useState<
    "backingSheet" | "infoSheet"
  >("backingSheet");
  const [paperType, setPaperType] = useState<"A4" | "Letter">("A4");

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

  const handlePaperChange = (paper: "A4" | "Letter") => {
    if (paper === "A4") {
      setPaperType("A4");
      onOptionChange("dimensions", {
        ...options.dimensions,
        width: 210,
        height: 297,
      });
    } else {
      setPaperType("Letter");
      onOptionChange("dimensions", {
        ...options.dimensions,
        width: 216,
        height: 279,
      });
    }
  };

  return (
    <>
      <h1 className="app-title">
        Blood on the Clocktower Fancy Script Generator
      </h1>

      <div className="control-panel">
        <UploadSection
          hasScript={hasScript}
          onFileUpload={onFileUpload}
          onLoadExample={onLoadExample}
        />

        {hasScript && (
          <>
            <p style={{ textAlign: "center", margin: 0 }}>
              If you have any feedback, please let me know{" "}
              <a href="https://forms.gle/z1yeAW7x91X4Uc4H8">here</a>.
            </p>
            <div className="controls-grid">
              <div className="control-group">
                <div className="control-group-content">
                  <CollapsibleSection title="Appearance">
                    <ColorPicker
                      color={options.color}
                      onColorChange={onColorChange}
                      onColorArrayChange={onColorArrayChange}
                      onAddColor={onAddColor}
                      onRemoveColor={onRemoveColor}
                    />
                    <AppearanceOptions
                      includeMargins={options.includeMargins}
                      overleaf={options.overleaf}
                      overleafType={overleafType}
                      showNightSheet={options.showNightSheet}
                      onIncludeMarginsChange={(value) =>
                        onOptionChange("includeMargins", value)
                      }
                      onDoubleSidedChange={handleDoubleSidedChange}
                      onOverleafTypeChange={handleOverleafTypeChange}
                      onShowNightSheetChange={(value) =>
                        onOptionChange("showNightSheet", value)
                      }
                    />
                  </CollapsibleSection>

                  <CollapsibleSection title="Character Sheet">
                    <CharacterSheetOptions
                      numberOfCharacterSheets={options.numberOfCharacterSheets}
                      appearance={options.appearance}
                      showAuthor={options.showAuthor}
                      showJinxes={options.showJinxes}
                      inlineJinxIcons={options.inlineJinxIcons}
                      useOldJinxes={options.useOldJinxes}
                      showSwirls={options.showSwirls}
                      solidTitle={options.solidTitle}
                      iconScale={options.iconScale}
                      onNumberOfSheetsChange={(value) =>
                        onOptionChange("numberOfCharacterSheets", value)
                      }
                      onAppearanceChange={(value) =>
                        onOptionChange("appearance", value)
                      }
                      onShowAuthorChange={(value) =>
                        onOptionChange("showAuthor", value)
                      }
                      onShowJinxesChange={(value) =>
                        onOptionChange("showJinxes", value)
                      }
                      onInlineJinxIconsChange={(value) =>
                        onOptionChange("inlineJinxIcons", value)
                      }
                      onUseOldJinxesChange={(value) =>
                        onOptionChange("useOldJinxes", value)
                      }
                      onShowSwirlsChange={(value) =>
                        onOptionChange("showSwirls", value)
                      }
                      onSolidTitleChange={(value) =>
                        onOptionChange("solidTitle", value)
                      }
                      onIconScaleChange={(value) =>
                        onOptionChange("iconScale", value)
                      }
                    />
                  </CollapsibleSection>

                  {options.overleaf === "backingSheet" && (
                    <CollapsibleSection title="Backing Sheet">
                      <BackingSheetOptions
                        displayNightOrder={options.displayNightOrder}
                        displayPlayerCounts={options.displayPlayerCounts}
                        formatMinorWords={options.formatMinorWords}
                        onDisplayNightOrderChange={(value) =>
                          onOptionChange("displayNightOrder", value)
                        }
                        onDisplayPlayerCountsChange={(value) =>
                          onOptionChange("displayPlayerCounts", value)
                        }
                        onFormatMinorWordsChange={(value) =>
                          onOptionChange("formatMinorWords", value)
                        }
                      />
                    </CollapsibleSection>
                  )}

                  {options.overleaf === "infoSheet" && (
                    <CollapsibleSection title="Info Sheet">
                      <InfoSheetOptions
                        displayNightOrder={options.displayNightOrder}
                        displayPlayerCounts={options.displayPlayerCounts}
                        onDisplayNightOrderChange={(value) =>
                          onOptionChange("displayNightOrder", value)
                        }
                        onDisplayPlayerCountsChange={(value) =>
                          onOptionChange("displayPlayerCounts", value)
                        }
                      />
                    </CollapsibleSection>
                  )}

                  <CollapsibleSection title="Print Options">
                    <PrintOptions
                      paperType={paperType}
                      dimensions={options.dimensions}
                      onPaperChange={handlePaperChange}
                      onMarginChange={(value) =>
                        onOptionChange("dimensions", {
                          ...options.dimensions,
                          margin: value,
                        })
                      }
                      onBleedChange={(value) =>
                        onOptionChange("dimensions", {
                          ...options.dimensions,
                          bleed: value,
                        })
                      }
                    />
                  </CollapsibleSection>
                </div>
              </div>

              <ActionButtons
                onSort={onSort}
                onGeneratePDF={onGeneratePDF}
                onPrint={onPrint}
              />
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
