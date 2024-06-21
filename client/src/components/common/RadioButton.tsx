import { ChangeEventHandler } from "react";

type RadioButtonProps = {
  label: string;
  name: string;
  checked: boolean;
  onChange: ChangeEventHandler;
};

const RadioButton: React.FC<RadioButtonProps> = ({
  label,
  name,
  checked,
  onChange,
}) => {
  const splitLabel = label.split("(");
  return (
    <div className="w-full flex items-center mb-2">
      <label className="label cursor-pointer">
        <input
          type="radio"
          name={name}
          checked={checked}
          onChange={onChange}
          className="radio checked:bg-blue mr-2"
        />
        <span className="label-text text-xl">
          {splitLabel[0]}{" "}
          {splitLabel[1] && (
            <span className="text-sm">{" (" + splitLabel[1]}</span>
          )}
        </span>
      </label>
    </div>
  );
};

export default RadioButton;
