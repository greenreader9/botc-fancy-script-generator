interface ToggleProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function Toggle({ label, checked, onChange }: ToggleProps) {
  return (
    <div className="toggle-section">
      <label className="toggle-label">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange((e.target as HTMLInputElement).checked)}
          className="toggle-input"
        />
        <span className="toggle-text">{label}</span>
      </label>
    </div>
  );
}
