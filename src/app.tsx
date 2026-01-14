import { useState, useEffect } from "preact/hooks";
import "botc-character-sheet/style.css";
import { logUsage } from "./utils/logger";
import type { Script } from "botc-script-checker";
import exampleScript from "./data/example-script.json";
import { useScriptLoader } from "./hooks/useScriptLoader";
import { usePdfGeneration } from "./hooks/usePdfGeneration";
import { useOverflowDetection } from "./hooks/useOverflowDetection";
import { ScriptControls } from "./components/ScriptControls";
import { ScriptEditor } from "./components/ScriptEditor";
import { PdfModal } from "./components/PdfModal";
import { Changelog } from "./components/Changelog";
import { DEFAULT_OPTIONS, randomColor } from "./types/options";
import "./app.css";
import { ScriptOptions, FancyDoc } from "botc-character-sheet";

export function App() {
  const {
    script,
    rawScript,
    error,
    scriptText,
    isScriptSorted,
    nightOrders,
    loadScript,
    handleScriptTextChange,
    handleFileUpload,
    handleSort,
    handleSaveScript,
    updateScriptMetadata,
  } = useScriptLoader();

  const {
    showPdfModal,
    pdfLoading,
    pdfUrl,
    pdfError,
    generatePDF,
    downloadPDF,
    closePdfModal,
  } = usePdfGeneration();

  const [options, setOptions] = useState<ScriptOptions>(DEFAULT_OPTIONS);

  // Auto-detect overflow and adjust compactness
  useOverflowDetection({
    options,
    setOptions,
    script,
  });

  // Load color from script metadata when script changes
  useEffect(() => {
    if (script?.metadata?.colour) {
      const colour = script.metadata.colour;
      if (typeof colour === "string" || Array.isArray(colour)) {
        updateOption("color", colour);
      }
    }
  }, [script]);

  // Auto-adjust icon scale when appearance changes
  useEffect(() => {
    if (options.appearance === "compact") {
      setOptions((prev) => ({ ...prev, iconScale: 1.5 }));
    } else if (options.appearance === "super-compact") {
      setOptions((prev) => ({ ...prev, iconScale: 1.4 }));
    } else {
      setOptions((prev) => ({ ...prev, iconScale: 1.6 }));
    }
  }, [options.appearance]);

  const updateOption = <K extends keyof ScriptOptions>(
    key: K,
    value: ScriptOptions[K]
  ) => {
    setOptions((prev) => ({ ...prev, [key]: value }));
  };

  const handleLoadExample = () => {
    loadScript(exampleScript as Script);
  };

  const handleColorChange = (newColor: string | string[]) => {
    updateOption("color", newColor);

    // Update the colour in the script metadata
    if (!rawScript) return;

    const updatedScript = rawScript.map((element) => {
      if (typeof element === "object" && element !== null && "id" in element) {
        if (element.id === "_meta") {
          return { ...element, colour: newColor };
        }
      }
      return element;
    });

    updateScriptMetadata(updatedScript);
  };

  const handleColorArrayChange = (index: number, newColor: string) => {
    if (Array.isArray(options.color)) {
      const newColorArray = [...options.color];
      newColorArray[index] = newColor;
      handleColorChange(newColorArray);
    }
  };

  const handleAddColor = () => {
    if (typeof options.color === "string") {
      // Convert single color to array with new color
      handleColorChange([options.color, randomColor()]);
    } else if (Array.isArray(options.color)) {
      // Add new color to existing array
      handleColorChange([...options.color, randomColor()]);
    }
  };

  const handleRemoveColor = (index: number) => {
    if (Array.isArray(options.color) && options.color.length > 1) {
      const newColorArray = options.color.filter((_, i) => i !== index);
      // If only one color left, convert back to string
      handleColorChange(
        newColorArray.length === 1 ? newColorArray[0] : newColorArray
      );
    }
  };

  const handleScriptChange = (newText: string) => {
    handleScriptTextChange(newText);
  };

  const handlePrint = () => {
    if (script) {
      logUsage(script, { method: "print", options });
    }
    window.print();
  };

  const handleGeneratePDF = () => {
    if (!rawScript || !script) return;
    if (script) {
      logUsage(script, { method: "generate", options });
    }
    generatePDF(script, options, nightOrders);
  };

  const handleDownloadPDF = () => {
    downloadPDF(script?.metadata?.name);
  };

  return (
    <>
      <div className="app">
        <div className="controls">
          <ScriptControls
            hasScript={!!script}
            options={options}
            isScriptSorted={isScriptSorted}
            onFileUpload={handleFileUpload}
            onLoadExample={handleLoadExample}
            onColorChange={handleColorChange}
            onColorArrayChange={handleColorArrayChange}
            onAddColor={handleAddColor}
            onRemoveColor={handleRemoveColor}
            onOptionChange={updateOption}
            onSort={handleSort}
            onGeneratePDF={handleGeneratePDF}
            onPrint={handlePrint}
          />

          {script && (
            <ScriptEditor
              scriptText={scriptText}
              error={error}
              onScriptChange={handleScriptChange}
              onSave={handleSaveScript}
            />
          )}
        </div>

        {script && (
          <div className="preview-section">
            <FancyDoc
              script={script}
              options={options}
              nightOrders={nightOrders}
            />
          </div>
        )}

        {!script && !error && (
          <div className="placeholder">
            <svg
              className="placeholder-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <p className="placeholder-text">
              Upload a JSON script file or paste JSON anywhere on the page
            </p>
          </div>
        )}
      </div>

      {!script && (
        <div className="changelog-container">
          <Changelog />
        </div>
      )}

      <PdfModal
        isOpen={showPdfModal}
        isLoading={pdfLoading}
        pdfUrl={pdfUrl}
        error={pdfError}
        onClose={closePdfModal}
        onDownload={handleDownloadPDF}
      />
    </>
  );
}
