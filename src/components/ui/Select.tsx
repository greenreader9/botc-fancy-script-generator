interface SelectProps {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}

export function Select({ label, value, options, onChange }: SelectProps) {
  return (
    <div className="toggle-section">
      <label className="toggle-label">
        <span className="toggle-text">{label}</span>
        <select
          value={value}
          onChange={(e) => onChange((e.target as HTMLSelectElement).value)}
          className="toggle-input"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
