import Card from "./common/Card";
import { ToggleButton } from "./Configurator/Settings/MenuRow";
import ChoiceCounter from "./common/ChoiceCounter";
import { wheels } from "src/constants";
import { RootState } from "src/store/store";
import { useDispatch, useSelector } from "react-redux";
import { setInputNumbers, setSelectedWheel } from "src/store/actions/wheel";

const EditWheel = () => {
  const { selectedWheel, inputNumbers, maxInputNumbers } = useSelector(
    (state: RootState) => state.wheel
  );

  const dispatch = useDispatch();
  return (
    <Card>
      <div className="gap-3 flex flex-col items-center p-4 my-6 text-xl">
        <div className=" px-4 py-7 rounded-custom border border-light-gray w-full bg-gradient-to-b from-gray-alpha to-white">
          <div className="w-full flex justify-between">
            <div className="flex-1 text-xl font-semibold leading-normal mb-1.5 lg:text-3xl">
              Edit Wheel
            </div>
            <div className="flex gap-2 items-center">
              <div className="">
                <img
                  src="/assets/icons/show.svg"
                  alt="Show"
                  className="w-5 lg:w-[28px]"
                />
              </div>
              <div className="">
                <img
                  src="/assets/icons/refresh.svg"
                  alt="Show"
                  className="w-3.5  lg:w-[22px]"
                />
              </div>
              <div className="">
                <img
                  src="/assets/icons/text.svg"
                  alt="Show"
                  className="w-3.5 lg:w-[24px]"
                />
              </div>
            </div>
          </div>
          <div className="w-full">
            <div className="text-sm lg:text-xl">Mode</div>
            <div className="flex my-1.5">
              {wheels.map((wheel) => (
                <ToggleButton
                  key={wheel.name}
                  label={wheel.label}
                  isActive={wheel.name === selectedWheel.name}
                  onClick={() => dispatch(setSelectedWheel({ ...wheel }))}
                  className="!text-xs lg:!text-xl"
                />
              ))}
            </div>
          </div>
          <div className="w-full">
            <div className="!text-xs lg:!text-xl">Input Numbers</div>
            <ChoiceCounter
              max={maxInputNumbers}
              value={inputNumbers}
              onChange={(newNumber: number) =>
                dispatch(setInputNumbers(newNumber))
              }
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default EditWheel;
