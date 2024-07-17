import React from "react";

type SpinnerProps = {
  imgWidth?: number;
};

const Spinner: React.FC<SpinnerProps> = ({ imgWidth = 55 }) => {
  return (
    <div className="flex flex-col items-center">
      <img
        src="/assets/icons/logo.svg"
        alt="logo"
        width={imgWidth}
        className="animate-spin"
      />
    </div>
  );
};

export default Spinner;
