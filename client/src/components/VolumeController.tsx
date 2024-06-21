import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setVolume } from "src/store/actions/wheel";
import { RootState } from "src/store/store";

const VolumeController: FC = () => {
  const { volume } = useSelector((state: RootState) => state.wheel);
  const dispatch = useDispatch();
  const [isMuted, setIsMuted] = useState<boolean>(volume === 0);

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setVolume(parseInt(event.target.value)));
    setIsMuted(parseInt(event.target.value) === 0); // Set isMuted based on the slider value
  };

  const handleMuteToggle = () => {
    const newVolume = isMuted ? 100 : 0; // Determine the new volume based on the current mute state
    dispatch(setVolume(newVolume));
    setIsMuted(!isMuted); // Toggle mute state
  };

  useEffect(() => {
    setIsMuted(volume === 0); // Update mute state when the volume prop changes
  }, [volume]);

  return (
    <div className="relative lg:h-[78vh] lg:flex lg:items-end">
      <div className="w-[64px] absolute group inline-block rounded-full shadow-3xl bg-white p-5 leading-none">
        <button onClick={handleMuteToggle}>
          <img
            src={
              isMuted
                ? "/assets/icons/volume_mute.svg"
                : "/assets/icons/volume.svg"
            }
            alt={isMuted ? "Mute" : "Speaker"}
            className="w-6 h-6 cursor-pointer aspect-square"
          />
        </button>
        <div className="hidden flex justify-between items-center mt-2 group-hover:block absolute bottom-full pb-2  w-full">
          <input
            type="range"
            min="0"
            max="100"
            value={volume.toString()} // Use the volume prop value directly
            onChange={handleSliderChange}
            aria-orientation="vertical"
            className="appearance-none h-40 w-6 bg-gray-200 rounded-full focus:outline-none  ml-[1px]"
            id="range-vertical"
          />
        </div>
      </div>
    </div>
  );
};

export default VolumeController;
