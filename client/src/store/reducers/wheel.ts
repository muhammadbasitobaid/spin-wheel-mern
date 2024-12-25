import {
  SET_THEME,
  SET_STATE,
  SET_VOLUME,
  SET_SELECTED_WHEEL,
  SET_WHEEL_SNAPSHOT,
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
  SET_WHEEL_DETAILS,
  SET_WHEEL_LIST,
  SET_WHEEL_FORM_VALUES,
  SET_FULL_SCREEN_MODE,
  SET_INPUT_NUMBERS,
  SET_WHEEL_META_DATA_DEFAULT_ACTION,
  WHEEL_RESET,
  SET_SHARE_LINK,
  WheelActions,
} from "../actions/wheel";

import { getDefaultWheelName } from "src/utils"


import { CustomOptionsWheel, DEFAULT_INPUT_NUMBER_FOR_Y_N_WHEEL, DEFAULT_WHEEL_METADATA, UPPERCASE } from '../../constants'

import {
  THEMES,
  Wheel,
  WheelSnapshot,
  defaultSpinConfig,
  SpinConfig,
} from "src/constants";
import { ModalNames } from "src/pages/HomePage";

export interface WheelState {
  _id?: string;
  __v?: string;
  name: string;
  description: string;
  popUpMessage: string;
  volume?: number;
  selectedWheel?: Wheel;
  wheelList?: string[];
  wheelSnapshot: WheelSnapshot;
  activeModal?: ModalNames | null;
  result?: string | null;
  selectedTheme: string[];
  spinConfig: SpinConfig;
  fullScreenMode?: boolean;
  shareLink?: string;
}

export const initialState: WheelState = {
  name: getDefaultWheelName(),
  volume: 50,
  selectedWheel: CustomOptionsWheel,
  wheelSnapshot: {
    selectedOption: CustomOptionsWheel?.options[0]!,
    inputNumbers: DEFAULT_INPUT_NUMBER_FOR_Y_N_WHEEL,
    options: CustomOptionsWheel?.options,
    history: [],
    casing: UPPERCASE
  },
  activeModal: null,
  result: null,
  selectedTheme: THEMES[0],
  spinConfig: defaultSpinConfig,
  description: DEFAULT_WHEEL_METADATA.description,
  popUpMessage: DEFAULT_WHEEL_METADATA.popUpMessage,
  fullScreenMode: false,
  shareLink: "",
};

type ActionTypes = WheelActions;

const wheelReducer = (
  state = initialState,
  action: ActionTypes
): WheelState => {
  switch (action.type) {

    case SET_STATE:
      return { ...action.payload };
    case SET_VOLUME:
      return { ...state, volume: action.payload };
    case SET_WHEEL_SNAPSHOT:
      return {
        ...state,
        wheelSnapshot: {
          ...state.wheelSnapshot,
          ...action.payload
        }
      };

    case SET_INPUT_NUMBERS:
      return {
        ...state,
        wheelSnapshot: { ...state.wheelSnapshot, inputNumbers: action.payload },
      };

    case SET_SHARE_LINK:
      return {
        ...state,
        shareLink: action.payload
      };

    case WHEEL_RESET:
      return {
        ...state,
        wheelSnapshot: { ...state.wheelSnapshot, 
          options: state.selectedWheel?.options || [], // Fallback to empty array if undefined
          selectedOption: state.selectedWheel?.defaultOption || state.selectedWheel?.options[0] || "", // Fallback to empty string
          history: []
        },
      }

    case SET_WHEEL_META_DATA_DEFAULT_ACTION:
      return {
          ...state,
            _id: DEFAULT_WHEEL_METADATA._id,
            description: DEFAULT_WHEEL_METADATA.description,
            popUpMessage: DEFAULT_WHEEL_METADATA.popUpMessage,
            name: getDefaultWheelName()
      }

    case SET_SELECTED_WHEEL:
      return {
        ...state,
        selectedWheel: action.payload,
      };

    case SET_WHEEL_LIST:
      return {
        ...state,
        wheelList: action.payload,
      };
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
    case SET_WHEEL_DETAILS:
      return {
        ...state,
        name: action.payload.name,
        description: action.payload.description,
        popUpMessage: action.payload.popUpMessage,
      };
    case SET_WHEEL_FORM_VALUES:
      return {
        ...state,
        name: action.payload.name,
        description: action.payload.description,
        popUpMessage: action.payload.popUpMessage,
      };
    case SET_FULL_SCREEN_MODE:
      return {
        ...state,
        fullScreenMode: action.payload,
      }
    default:
      return state;
  }
};

export default wheelReducer;
