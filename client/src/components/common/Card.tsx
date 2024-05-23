import React, { FC } from "react";

interface CardProps {
  children: React.ReactNode;
}

const Card: FC<CardProps> = ({ children }) => {
  return <div className="shadow-3xl rounded-custom">{children}</div>;
};

export default Card;
