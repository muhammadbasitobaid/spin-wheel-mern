import { Dispatch, ReactNode, SetStateAction } from "react";

interface ButtonProps {
  onClick?: Dispatch<SetStateAction<any>>;
  children: ReactNode;
  className?: string;
  invertedVariant?: boolean;
  small?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
}

const Button = ({
  onClick,
  children,
  className = "",
  invertedVariant = false,
  small = false,
  type = "button",
  ...props
}: ButtonProps) => {
  return invertedVariant ? (
    <button
      onClick={onClick}
      className={`border border-black bg-white text-black rounded-custom-sm ${
        !small ? "py-2.5 px-10 text-xl leading-none" : "text-base"
      }  font-medium leading-normal ${className}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  ) : (
    <button
      onClick={onClick}
      className={`rounded-custom-sm text-white bg-blue text-xl font-medium leading-normal ${
        !small ? "py-2.5 px-10 text-xl" : "!px-2 !py-1 !text-base !leading-none"
      } ${className}`}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
