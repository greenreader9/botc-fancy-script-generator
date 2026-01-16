import { ComponentChildren } from "preact";
import { useState } from "preact/hooks";

interface CollapsibleSectionProps {
  title: string;
  defaultOpen?: boolean;
  children: ComponentChildren;
}

export function CollapsibleSection({
  title,
  defaultOpen = true,
  children,
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={`collapsible-section ${isOpen ? "open" : ""}`}>
      <button
        type="button"
        className="collapsible-header"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="control-group-label" style={{ margin: 0 }}>
          {title}
        </span>
        <span className={`collapsible-chevron ${isOpen ? "open" : ""}`}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="currentColor"
          >
            <path d="M4.646 5.646a.5.5 0 0 1 .708 0L8 8.293l2.646-2.647a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 0-.708z" />
          </svg>
        </span>
      </button>
      <div className="collapsible-content-wrapper">
        <div className="collapsible-content">{children}</div>
      </div>
    </div>
  );
}
