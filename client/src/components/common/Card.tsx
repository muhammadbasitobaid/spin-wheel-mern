import React, { FC } from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: FC<CardProps> = ({ children, className }) => {
  return (
    <div className={`shadow-3xl rounded-custom ${className}`}>{children}</div>
  );
};

export default Card;
