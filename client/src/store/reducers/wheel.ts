import {
  SET_THEME,
  SET_VOLUME,
  SET_HISTORY,
  SET_SELECTED_WHEEL,
  SET_INPUT_NUMBERS,
  SET_ACTIVE_MODAL,
  SET_RESULT,
  SET_SPINNING_SPEED_LEVEL,
  SET_SPINNING_DURATION,
  SET_MANUALLY_STOP_OPTION,
  SET_RANDOM_INITIAL_ANGLE_OPTION,
  SET_MYSTERY_SPIN_OPTION,
  SET_SPIN_COUNT_OPTION,
  SET_CONFETTI,
  SET_SOUND,
  SET_CONFETTI_TYPE,
  SET_SOUND_TYPE,
  WheelActions,
} from "../actions/wheel";

import {
  THEMES,
  Wheel,
  WheelItem,
  wheels,
  defaultSpinConfig,
  SpinConfig,
} from "src/constants";
import { ModalNames } from "src/pages/HomePage";

export interface WheelState {
  volume: number;
  history: WheelItem[];
  selectedWheel: Wheel;
  inputNumbers: number;
  maxInputNumbers: number;
  activeModal: ModalNames | null;
  result: string | null;
  selectedTheme: string[];
  spinConfig: SpinConfig;
}

export const initialState: WheelState = {
  volume: 50,
  history: wheels[0].options,
  selectedWheel: wheels[0],
  inputNumbers: 1,
  maxInputNumbers: 5,
  activeModal: null,
  result: null,
  selectedTheme: THEMES[0],
  spinConfig: defaultSpinConfig,
};

type ActionTypes = WheelActions;

const wheelReducer = (
  state = initialState,
  action: ActionTypes
): WheelState => {
  switch (action.type) {
    case SET_VOLUME:
      return { ...state, volume: action.payload };
    case SET_HISTORY:
      return { ...state, history: action.payload };
    case SET_SELECTED_WHEEL:
      return {
        ...state,
        selectedWheel: action.payload,
        history: action.payload.options,
      };
    case SET_INPUT_NUMBERS:
      return { ...state, inputNumbers: action.payload };
    case SET_ACTIVE_MODAL:
      return { ...state, activeModal: action.payload };
    case SET_RESULT:
      return { ...state, result: action.payload };
    case SET_THEME:
      return { ...state, selectedTheme: action.payload };
    case SET_SPINNING_SPEED_LEVEL:
      return {
        ...state,
        spinConfig: { ...state.spinConfig, spinningSpeedLevel: action.payload },
      };
    case SET_SPINNING_DURATION:
      return {
        ...state,
        spinConfig: { ...state.spinConfig, spinningDuration: action.payload },
      };
    case SET_MANUALLY_STOP_OPTION:
      return {
        ...state,
        spinConfig: { ...state.spinConfig, manuallyStopOption: action.payload },
      };
    case SET_RANDOM_INITIAL_ANGLE_OPTION:
      return {
        ...state,
        spinConfig: {
          ...state.spinConfig,
          randomInitialAngleOption: action.payload,
        },
      };
    case SET_MYSTERY_SPIN_OPTION:
      return {
        ...state,
        spinConfig: { ...state.spinConfig, mysterySpinOption: action.payload },
      };
    case SET_SPIN_COUNT_OPTION:
      return {
        ...state,
        spinConfig: { ...state.spinConfig, spinCountOption: action.payload },
      };
    case SET_CONFETTI:
      return {
        ...state,
        spinConfig: { ...state.spinConfig, confetti: action.payload },
      };
    case SET_SOUND:
      return {
        ...state,
        spinConfig: { ...state.spinConfig, sound: action.payload },
      };
    case SET_CONFETTI_TYPE:
      return {
        ...state,
        spinConfig: { ...state.spinConfig, confettiType: action.payload },
      };
    case SET_SOUND_TYPE:
      return {
        ...state,
        spinConfig: { ...state.spinConfig, soundType: action.payload },
      };
    default:
      return state;
  }
};

export default wheelReducer;
