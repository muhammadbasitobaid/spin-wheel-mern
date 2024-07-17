import { ChangeEventHandler } from "react";

type CheckboxProps = {
  label: string;
  name: string;
  checked: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  name,
  checked,
  onChange,
}) => {
  const splitLabel = label.split("(");
  return (
    <div className="w-full flex items-center mb-2">
      <label className="label cursor-pointer flex items-center">
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
          className={`min-h-[20px] min-w-[20px] mr-2 ${
            checked ? "bg-blue" : "bg-transparent"
          }`}
        />
        <span className="label-text text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">
          {splitLabel[0]}
          {splitLabel[1] && (
            <span className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">
              {" (" + splitLabel[1]}
            </span>
          )}
        </span>
      </label>
    </div>
  );
};

export default Checkbox;
