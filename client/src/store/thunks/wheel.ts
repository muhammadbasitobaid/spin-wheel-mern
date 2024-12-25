import { Dispatch } from "redux";
import http from "src/services/httpService";
import { setWheelState } from "../actions/wheel";
import { WheelState } from "../reducers/wheel";
import { postWheel } from "../../api";
import toast from "react-hot-toast";

import { wheels } from "src/constants"; // Assuming you import wheels from a constants file

export const fetchWheelById =
  (wheelId: string, onSuccess: () => void = () => {}) => async (dispatch: Dispatch) => {
    try {
      const response = await http.get(
        `${process.env.REACT_APP_API_URL}/wheels/${wheelId}`
      );
    const { data } = response;
    const matchingWheel = wheels.find(wheelConfig => wheelConfig.name === data.wheelType);
    
    
    if (matchingWheel) {
          // Construct the WheelState object
 const wheelState: WheelState = {
        selectedWheel: matchingWheel,
        _id: data._id,
        name: data.customWheelName,
        description: data.description,
        popUpMessage: data.popUpMessage,
        selectedTheme: data.spinConfig.selectedTheme,
        spinConfig: {
          spinningSpeedLevel: data.spinConfig.spinningSpeedLevel,
          spinningDuration: data.spinConfig.spinningDuration,
          manuallyStopOption: data.spinConfig.manuallyStopOption,
          randomInitialAngleOption: data.spinConfig.randomInitialAngleOption,
          mysterySpinOption: data.spinConfig.mysterySpinOption,
          spinCountOption: data.spinConfig.spinCountOption,
          confetti: data.spinConfig.confetti,
          sound: data.spinConfig.sound,
          confettiType: data.spinConfig.confettiType,
        },
        wheelSnapshot: {
          selectedOption: data.selectedOption,
          inputNumbers: data.inputNumbers,
          options: matchingWheel.options,
          history: data.history,
          lowerNumber: data.lowerNumber,
          highestNumber: data.highestNumber,
          casing: data.casing
        },
        wheelList: [], // You can populate this if needed, perhaps from other data sources
      };

          dispatch(setWheelState(wheelState));
          onSuccess();
        } else {
          console.error("No matching wheel found");
        }
    } catch (error) {
      console.error("Failed to fetch wheel details", error);
      toast.error("Failed to fetch wheel details");
    }
  };

export const attemptSaveWheel = (wheel: WheelState, id: string) => () =>
  postWheel(wheel, id)
    .then((data) => {
      toast.success(data?.data?.message || "Wheel created successfully");
      return data;
    })
    .catch(() => toast.error("Wheel creation failed"));

