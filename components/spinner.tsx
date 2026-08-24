"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface SpinnerProps {
  imgWidth?: number;
  textWidth?: number;
}

export function Spinner({ imgWidth = 55, textWidth = 128 }: SpinnerProps) {
  const [loadingText, setLoadingText] = useState("loading");

  useEffect(() => {
    const loadingSteps = ["loading", "loading.", "loading..", "loading...", "loading...."];
    let step = 0;

    const interval = setInterval(() => {
      setLoadingText(loadingSteps[step]);
      step = (step + 1) % loadingSteps.length;
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center">
      <Image
        src="/assets/icons/logo.svg"
        alt="logo"
        width={imgWidth}
        height={imgWidth}
        className="animate-spin"
      />
      <div className="mt-2 text-xl text-foreground">
        <div className="text-center" style={{ width: `${textWidth}px` }}>
          {loadingText}
        </div>
      </div>
    </div>
  );
}
