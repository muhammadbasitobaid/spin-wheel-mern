import { ReactNode } from "react";

interface ButtonProps {
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  invertedVariant?: boolean;
}

const Button = ({
  onClick,
  children,
  className = "",
  invertedVariant = false,
}: ButtonProps) => {
  return invertedVariant ? (
    <button
      onClick={onClick}
      className={`border border-black bg-white text-black rounded-custom-sm py-3 px-10 text-xl font-medium leading-normal ${className}`}
    >
      {children}
    </button>
  ) : (
    <button
      onClick={onClick}
      className={`rounded-custom-sm text-white py-3 px-10 bg-blue text-xl font-medium leading-normal ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
