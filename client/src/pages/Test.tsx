import { useState } from "react";

const Test = () => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div className="h-screen">
      <button
        className="px-4 py-2 mb-4 bg-blue-500 rounded"
        onClick={() => setIsVisible(!isVisible)}
      >
        Toggle Animation
      </button>
      <div
        className={`w-64 h-64 bg-red-500 ${
          !isVisible && "animate-slideLeftAndCenter"
        }`}
        style={{
          position: "absolute",
          top: "50%",
          // transform: "translate( 500%,-50%)",
        }}
      ></div>
    </div>
  );
};

export default Test;
