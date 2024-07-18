import React, { useEffect, useState } from "react";

type SpinnerProps = {
  imgWidth?: number;
  textWidth?: number;
};

const Spinner: React.FC<SpinnerProps> = ({
  imgWidth = 55,
  textWidth = 128,
}) => {
  const [loadingText, setLoadingText] = useState("loading");

  useEffect(() => {
    const loadingSteps = [
      "loading",
      "loading.",
      "loading..",
      "loading...",
      "loading....",
    ];
    let step = 0;

    const interval = setInterval(() => {
      setLoadingText(loadingSteps[step]);
      step = (step + 1) % loadingSteps.length;
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center">
      <img
        src="/assets/icons/logo.svg"
        alt="logo"
        width={imgWidth}
        className="animate-spin"
      />
      <div className="mt-2 text-xl text-black">
        <div className="text-center" style={{ width: `${textWidth}px` }}>
          {loadingText}
        </div>
      </div>
    </div>
  );
};

export default Spinner;
