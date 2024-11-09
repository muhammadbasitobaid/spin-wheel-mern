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
      className={`border border-black bg-white text-black rounded-custom-sm whitespace-nowrap ${
        !small
          ? "py-2 px-4 text-sm leading-none sm:text-base "
          : "py-1 px-2 text-xs leading-none sm:text-sm"
      } font-medium ${className}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  ) : (
    <button
      onClick={onClick}
      className={`rounded-custom-sm text-white bg-blue whitespace-nowrap ${
        !small
          ? "py-2 px-4 text-sm leading-none sm:text-base "
          : "py-1 px-2 text-xs leading-none sm:text-sm "
      } font-medium ${className}`}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
