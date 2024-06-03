import { NavBar } from "src/components";
import EditWheel from "src/components/EditWheel";
import ScoreCard from "src/components/ScoreCard";
import SpinWheel from "src/components/SpinWheel";
import VolumeController from "src/components/VolumeController";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="p-6 flex-1">
        <div className="mb-8">
          <h1 className="text-black text-4xl font-medium">
            Yes No Picker Wheel
          </h1>
          <span className="text-light-gray text-base font-normal">
            Decide yes or no by wheel
          </span>
        </div>
        <div>
          <SpinWheel />
        </div>
        <div className="flex justify-between h-[60px]">
          <VolumeController />
          <img
            src="/assets/icons/history.svg"
            alt="history"
            className="h-[43px]"
          />
        </div>
        <div>
          <ScoreCard />
        </div>
        <div>
          <EditWheel />
        </div>
      </div>
    </div>
  );
}
