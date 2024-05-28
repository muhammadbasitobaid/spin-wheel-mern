import { ReactNode } from "react";

interface ButtonProps {
  onClick?: () => void;
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
}: ButtonProps) => {
  return invertedVariant ? (
    <button
      onClick={onClick}
      className={`border border-black bg-white text-black rounded-custom-sm ${
        !small ? "py-3 px-10 text-xl" : "text-base"
      }  font-medium leading-normal ${className}`}
      type={type}
    >
      {children}
    </button>
  ) : (
    <button
      onClick={onClick}
      className={`rounded-custom-sm text-white py-3 px-10 bg-blue text-xl font-medium leading-normal ${
        !small ? "py-3 px-10 text-xl" : "!px-2 !py-1 !text-base !leading-none"
      } ${className}`}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
