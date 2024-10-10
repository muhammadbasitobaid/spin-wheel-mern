import React, { useRef } from "react";
import { wheels, Wheel } from "src/constants"; // Assuming you import wheels from a constants file
import {useDispatch} from 'react-redux';
import { setSelectedWheel, setWheelSnapshot } from "../store/actions/wheel";

const WheelsPopup: React.FC<{ onClose: () => void }> = ({ onClose }) => {

  const popupRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const handleWheelSelection = (wheel: Wheel) =>{
  dispatch(setSelectedWheel(wheel));
  dispatch(setWheelSnapshot({history: []}));  // Reset history when wheel mode changes
  onClose();
  } 

  return (
    <div
      ref={popupRef}
      className="absolute right-0 mt-2 p-6 w-72 bg-white rounded-custom-sm shadow-lg z-10"
    >
      <button className="absolute top-2 right-2 mt-2 mr-2" onClick={onClose}>
        <img src="/assets/icons/close.svg" alt="close" width={16} />
      </button>
      <h2 className="text-lg font-medium mb-4">Pick a Wheel</h2>

      {/* List of wheels */}
      <ul className="space-y-2">
        {wheels.map((wheel) => (
          <li key={wheel.name} onClick={() => handleWheelSelection(wheel)}className="p-2 bg-gray-100 rounded-lg">
            <span className="font-semibold">{wheel.label} Wheel</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WheelsPopup;
