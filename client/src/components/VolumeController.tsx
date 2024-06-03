import { FC, useState, ChangeEvent } from "react";

const VolumeController: FC = () => {
  const [sliderValue, setSliderValue] = useState<number>(40); // Initial value of the slider
  const [isMuted, setIsMuted] = useState<boolean>(false); // Initial value for mute state

  const handleSliderChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSliderValue(parseInt(event.target.value)); // Update slider value
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted); // Toggle mute state
  };

  return (
    <div className="relative">
      <div className="w-[64px] absolute group inline-block rounded-full shadow-3xl bg-white p-5 leading-none">
        <button
          onClick={handleMuteToggle} // Toggle mute state on click
        >
          <img
            src={
              isMuted
                ? "/assets/icons/volume_mute.svg"
                : "/assets/icons/volume.svg"
            } // Use mute or speaker icon based on mute state
            alt={isMuted ? "Mute" : "Speaker"} // Alternate text for accessibility
            className="w-6 h-6 cursor-pointer aspect-square"
          />
        </button>
        <div className="hidden flex justify-between items-center mt-2 group-hover:block">
          <input
            type="range"
            min="0"
            max="100"
            value={sliderValue.toString()}
            onChange={handleSliderChange} // Handle slider value change
            aria-orientation="vertical"
            className="appearance-none h-full w-6 bg-gray-200 rounded-full focus:outline-none"
            id="range-vertical"
          />
        </div>
      </div>
    </div>
  );
};

export default VolumeController;
