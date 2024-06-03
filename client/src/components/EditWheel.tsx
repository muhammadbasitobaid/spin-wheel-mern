import Card from "./common/Card";
import { ToggleButton } from "./Configurator/Settings/MenuRow";
import ChoiceCounter from "./common/ChoiceCounter";

const EditWheel = () => {
  return (
    <Card>
      <div className="gap-3 flex flex-col items-center p-4 my-6 text-xl">
        <div className=" px-4 py-7 rounded-custom border border-light-gray w-full bg-gradient-to-b from-gray-alpha to-white">
          <div className="w-full flex justify-between">
            <div className="flex-1 text-xl font-semibold leading-normal mb-1.5">
              Edit Wheel
            </div>
            <div className="flex gap-2 items-center">
              <div className="">
                <img src="/assets/icons/show.svg" alt="Show" className="w-5" />
              </div>
              <div className="">
                <img
                  src="/assets/icons/refresh.svg"
                  alt="Show"
                  className="w-3.5"
                />
              </div>
              <div className="">
                <img
                  src="/assets/icons/text.svg"
                  alt="Show"
                  className="w-3.5"
                />
              </div>
            </div>
          </div>
          <div className="w-full">
            <label className="text-sm">Mode</label>
            <div className="flex my-1.5">
              <ToggleButton
                label="YES or NO"
                isActive={true}
                onClick={() => {}}
                className="!text-xs"
              />
              <ToggleButton
                label="YES NO or MAYBE"
                isActive={true}
                onClick={() => {}}
                className="!text-xs"
              />
            </div>
          </div>
          <div className="w-full">
            <label>Input Numbers</label>
            <ChoiceCounter max={5} />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default EditWheel;
