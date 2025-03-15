import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setVolume } from "src/store/actions/wheel";
import { RootState } from "src/store/store";
import { DEFAULT_VOLUME } from "src/constants";
import { Howler } from "howler";
import CircularSlider from "@fseehawer/react-circular-slider";

const VolumeController: FC = () => {
  const { volume = DEFAULT_VOLUME, spinConfig } = useSelector(
    (state: RootState) => state.wheel
  );
  const MAX_VOLUME = 100;
  const { sound } = spinConfig;
  const dispatch = useDispatch();
  const [isMuted, setIsMuted] = useState<boolean>(volume === 0);
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    // Update Howler global volume when volume or sound state changes
    Howler.volume(sound ? volume / 100 : 0);
    setIsMuted(volume === 0);
  }, [volume, sound]);

  useEffect(() => {
    // Add click outside listener
    const handleClickOutside = (event: MouseEvent) => {
      const volumeController = document.getElementById("volume-controller");
      if (
        volumeController &&
        !volumeController.contains(event.target as Node)
      ) {
        setIsActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(event.target.value);
    dispatch(setVolume(newVolume));
    setIsMuted(newVolume === 0); // Set isMuted based on the slider value
  };

  const handleCircularSliderChange = (value: number) => {
    if (value > MAX_VOLUME) {
      return;
    }
    dispatch(setVolume(value));
    setIsActive(true); // Set active state when slider is being used
  };

  const handleMuteToggle = () => {
    const newVolume = isMuted ? 100 : 0; // Determine the new volume based on the current mute state
    dispatch(setVolume(newVolume));
    setIsMuted(!isMuted); // Toggle mute state
    setIsActive(true); // Set active state when mute is toggled
  };

  return (
    <div className="relative lg:flex lg:items-end">
      <div className="w-[64px] absolute group inline-block rounded-full lg:bg-white lg:shadow-3xl lg:p-5 leading-none">
        {sound && (
          <>
            {/* Circular Slider for Small Screens */}
            <div
              id="volume-controller"
              className="block lg:hidden"
              onMouseDown={() => setIsActive(true)}
              onFocus={() => setIsActive(true)}
            >
              <div
                className={`relative transition-transform duration-200 ${
                  isActive ? "scale-110" : "scale-100 shadow-3xl"
                }`}
              >
                <CircularSlider
                  width={60}
                  min={0}
                  max={100}
                  dataIndex={volume}
                  renderLabelValue={
                    <button
                      onClick={handleMuteToggle}
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
                    >
                      <img
                        src={
                          isMuted
                            ? "/assets/icons/volume_mute.svg"
                            : "/assets/icons/volume.svg"
                        }
                        alt={isMuted ? "Mute" : "Speaker"}
                        className="w-6 h-6 aspect-square cursor-pointer"
                      />
                    </button>
                  }
                  valueFontSize="12px"
                  labelFontSize="12px"
                  knobSize={18}
                  knobColor="#212121"
                  progressColorFrom="#0089D6"
                  progressColorTo="#0089D6"
                  progressSize={8}
                  trackColor="#eeeeee"
                  trackSize={4}
                  onChange={handleCircularSliderChange}
                />
              </div>
            </div>

            {/* Vertical Slider for Larger Screens */}
            <div className="hidden lg:block">
              <div className="hidden group-hover:block absolute bottom-full pb-2 w-full">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume.toString()}
                  onChange={handleSliderChange}
                  aria-orientation="vertical"
                  className="appearance-none h-40 w-6 bg-gray-200 rounded-full focus:outline-none ml-[1px]"
                  id="range-vertical"
                />
              </div>
            </div>
          </>
        )}

        <button
          onClick={handleMuteToggle}
          disabled={!sound}
          className="lg:block hidden"
        >
          <img
            src={
              isMuted
                ? "/assets/icons/volume_mute.svg"
                : "/assets/icons/volume.svg"
            }
            alt={isMuted ? "Mute" : "Speaker"}
            className={`w-6 h-6 aspect-square ${
              sound ? "cursor-pointer" : "cursor-not-allowed"
            }`}
            style={{ filter: sound ? "none" : "grayscale(100%)" }}
            title={!sound ? "Sound disabled" : ""}
          />
        </button>
      </div>
    </div>
  );
};

export default VolumeController;
