type RangeInputProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
};

const RangeInput: React.FC<RangeInputProps> = ({ label, value, onChange }) => {
  return (
    <div className="flex flex-col mb-4">
      <label className="mb-2">{label}</label>
      <input
        type="range"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full horizontal-range"
        aria-orientation="horizontal"
      />
    </div>
  );
};

export default RangeInput;
