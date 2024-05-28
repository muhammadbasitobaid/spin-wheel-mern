import { ChangeEventHandler } from "react";

type RadioButtonProps = {
  label: string;
  name: string;
  value: string;
  checked: boolean;
  onChange: ChangeEventHandler;
};

const RadioButton: React.FC<RadioButtonProps> = ({
  label,
  name,
  value,
  checked,
  onChange,
}) => {
  const splitedLabel = label.split("(");
  return (
    <div className="w-full flex items-center mb-2">
      <label className="label cursor-pointer">
        <input
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
          className="radio checked:bg-blue mr-2"
        />
        <span className="label-text text-xl">
          {splitedLabel[0]}{" "}
          {splitedLabel[1] && (
            <span className="text-sm">{" (" + splitedLabel[1]}</span>
          )}
        </span>
      </label>
    </div>
  );
};

export default RadioButton;
