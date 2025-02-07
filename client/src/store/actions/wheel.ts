import { Wheel, WheelSnapshot } from "src/constants";
import { ModalNames } from "src/pages/HomePage";
import { WheelState } from "src/store/reducers/wheel"

export const SET_VOLUME = "SET_VOLUME";
export const SET_STATE = "SET_STATE";
export const SET_HISTORY = "SET_HISTORY";
export const SET_SELECTED_WHEEL = "SET_SELECTED_WHEEL";
export const SET_SELECTED_OPTION = "SET_SELECTED_OPTION"
export const SET_SHARE_LINK = "SET_SHARE_LINK"
export const WHEEL_RESET = "WHEEL_RESET";
export const SET_WHEEL_SNAPSHOT = "SET_WHEEL_SNAPSHOT";
export const SET_WHEEL_META_DATA_DEFAULT_ACTION = "SET_WHEEL_META_DATA_DEFAULT_ACTION";
export const SET_INPUT_NUMBERS = "SET_INPUT_NUMBERS";
export const SET_WHEEL_LIST = 'SET_WHEEL_LIST';
export const SET_ACTIVE_MODAL = "SET_ACTIVE_MODAL";
export const SET_RESULT = "SET_RESULT";
export const SET_THEME = "SET_THEME";
export const SET_SPINNING_SPEED_LEVEL = "SET_SPINNING_SPEED_LEVEL";
export const SET_SPINNING_DURATION = "SET_SPINNING_DURATION";
export const SET_MANUALLY_STOP_OPTION = "SET_MANUALLY_STOP_OPTION";
export const SET_RANDOM_INITIAL_ANGLE_OPTION =
  "SET_RANDOM_INITIAL_ANGLE_OPTION";
export const SET_MYSTERY_SPIN_OPTION = "SET_MYSTERY_SPIN_OPTION";
export const SET_SPIN_COUNT_OPTION = "SET_SPIN_COUNT_OPTION";
export const SET_CONFETTI = "SET_CONFETTI";
export const SET_SOUND = "SET_SOUND";
export const SET_CONFETTI_TYPE = "SET_CONFETTI_TYPE";
export const SET_SOUND_TYPE = "SET_SOUND_TYPE";
export const RESET_HISTORY = "RESET_HISTORY";
export const SET_WHEEL_DETAILS = "SET_WHEEL_DETAILS";
export const SET_FULL_SCREEN_MODE = "SET_FULL_SCREEN_MODE";
export const SET_WHEEL_FORM_VALUES = 'SET_WHEEL_FORM_VALUES';

export interface SetVolumeAction {
  type: typeof SET_VOLUME;
  payload: number;
}


export interface SetStateAction {
  type: typeof SET_STATE;
  payload: WheelState;
}

export interface SetHistoryAction {
  type: typeof SET_HISTORY;
  payload: string[];
}

export interface SetSelectedWheelAction {
  type: typeof SET_SELECTED_WHEEL;
  payload: Wheel;
}


export interface SetSelectedOptionAction {
  type: typeof SET_SELECTED_OPTION;
  payload: string;
}


export interface ResetWheelAction {
  type: typeof WHEEL_RESET;
}


export interface SetShareLinkAction {
  type: typeof SET_SHARE_LINK;
  payload: string;
}

export interface SetInputNumbersAction {
  type: typeof SET_INPUT_NUMBERS;
  payload: number;
}


export interface SetWheelListAction {
  type: typeof SET_WHEEL_LIST;
  payload: string[];
}

export const setWheelList = (wheelList: string[]) => ({
  type: SET_WHEEL_LIST,
  payload: wheelList,
});

export interface SetActiveModalAction {
  type: typeof SET_ACTIVE_MODAL;
  payload: ModalNames;
}

export interface SetResultAction {
  type: typeof SET_RESULT;
  payload: string | null;
}

interface SetThemeAction {
  type: typeof SET_THEME;
  payload: string[];
}

interface SetSpinningSpeedLevelAction {
  type: typeof SET_SPINNING_SPEED_LEVEL;
  payload: number;
}

interface SetSpinningDurationAction {
  type: typeof SET_SPINNING_DURATION;
  payload: number;
}

interface SetManuallyStopOptionAction {
  type: typeof SET_MANUALLY_STOP_OPTION;
  payload: boolean;
}

interface SetRandomInitialAngleOptionAction {
  type: typeof SET_RANDOM_INITIAL_ANGLE_OPTION;
  payload: boolean;
}

interface SetMysterySpinOptionAction {
  type: typeof SET_MYSTERY_SPIN_OPTION;
  payload: boolean;
}

interface SetSpinCountOptionAction {
  type: typeof SET_SPIN_COUNT_OPTION;
  payload: boolean;
}

interface SetConfettiAction {
  type: typeof SET_CONFETTI;
  payload: boolean;
}

interface SetSoundAction {
  type: typeof SET_SOUND;
  payload: boolean;
}

interface SetConfettiTypeAction {
  type: typeof SET_CONFETTI_TYPE;
  payload: "Confetti" | "Fireworks";
}

interface SetSoundTypeAction {
  type: typeof SET_SOUND_TYPE;
  payload: "Sound" | "No Sound";
}

export interface ResetHistoryAction {
  type: typeof RESET_HISTORY;
}

interface SetWheelDetailsAction {
  type: typeof SET_WHEEL_DETAILS;
  payload: {
    name: string;
    description: string;
    popUpMessage: string;
  };
}

interface SetFullScreenMode {
  type: typeof SET_FULL_SCREEN_MODE;
  payload: boolean;
}

interface SetWheelFormValuesAction {
  type: typeof SET_WHEEL_FORM_VALUES;
  payload: {
    name: string;
    description: string;
    popUpMessage: string;
  };
}


interface SetWheelSnapshotAction {
  type: typeof SET_WHEEL_SNAPSHOT;
  payload:  Partial<WheelSnapshot>;
}

interface SetWheelMetaDataDefaultAction {
  type: typeof SET_WHEEL_META_DATA_DEFAULT_ACTION;
}

export type WheelActions =
  | SetVolumeAction
  | SetStateAction 
  | SetHistoryAction
  | SetSelectedWheelAction
  | SetInputNumbersAction
  | SetWheelListAction
  | SetActiveModalAction
  | SetResultAction
  | SetThemeAction
  | SetSpinningSpeedLevelAction
  | SetSpinningDurationAction
  | SetManuallyStopOptionAction
  | SetRandomInitialAngleOptionAction
  | SetMysterySpinOptionAction
  | SetSpinCountOptionAction
  | SetConfettiAction
  | SetSoundAction
  | SetConfettiTypeAction
  | SetSoundTypeAction
  | ResetHistoryAction
  | SetWheelSnapshotAction 
  | SetWheelDetailsAction
  | SetFullScreenMode
  | SetWheelFormValuesAction
  | SetWheelMetaDataDefaultAction
  | SetShareLinkAction
  | ResetWheelAction;

export const resetHistory = (): ResetHistoryAction => ({
  type: RESET_HISTORY,
});


export const resetWheel = (): ResetWheelAction => ({
  type: WHEEL_RESET,
});


export const setShareLink = (shareLink: string): SetShareLinkAction=> ({
  type: SET_SHARE_LINK,
  payload: shareLink
});

export const setVolume = (volume: number): SetVolumeAction => ({
  type: SET_VOLUME,
  payload: volume,
});


export const setWheelState = (state: WheelState): SetStateAction => ({
  type: SET_STATE,
  payload: state,
});

export const setHistory = (history: string[]): SetHistoryAction => ({
  type: SET_HISTORY,
  payload: history,
});

export const setSelectedWheel = (wheel: Wheel): SetSelectedWheelAction => ({
  type: SET_SELECTED_WHEEL,
  payload: wheel,
});

export const setInputNumbers = (
  inputNumbers: number
): SetInputNumbersAction => ({
  type: SET_INPUT_NUMBERS,
  payload: inputNumbers,
});

export const setActiveModal = (modal: ModalNames): SetActiveModalAction => ({
  type: SET_ACTIVE_MODAL,
  payload: modal,
});

export const setResult = (result: string | null): SetResultAction => ({
  type: SET_RESULT,
  payload: result,
});

export const setSelectedTheme = (theme: string[]) => ({
  type: SET_THEME,
  payload: theme,
});

export const setSpinningSpeedLevel = (
  spinSpeed: number
): SetSpinningSpeedLevelAction => ({
  type: SET_SPINNING_SPEED_LEVEL,
  payload: spinSpeed,
});

export const setSpinningDuration = (
  spinDuration: number
): SetSpinningDurationAction => ({
  type: SET_SPINNING_DURATION,
  payload: spinDuration,
});

export const setManuallyStopOption = (
  value: boolean
): SetManuallyStopOptionAction => ({
  type: SET_MANUALLY_STOP_OPTION,
  payload: value,
});

export const setRandomInitialAngleOption = (
  value: boolean
): SetRandomInitialAngleOptionAction => ({
  type: SET_RANDOM_INITIAL_ANGLE_OPTION,
  payload: value,
});

export const setMysterySpinOption = (
  value: boolean
): SetMysterySpinOptionAction => ({
  type: SET_MYSTERY_SPIN_OPTION,
  payload: value,
});

export const setSpinCountOption = (
  value: boolean
): SetSpinCountOptionAction => ({
  type: SET_SPIN_COUNT_OPTION,
  payload: value,
});

export const setConfetti = (value: boolean): SetConfettiAction => ({
  type: SET_CONFETTI,
  payload: value,
});

export const setSound = (value: boolean): SetSoundAction => ({
  type: SET_SOUND,
  payload: value,
});

export type ConfettiTypes = "Confetti" | "Fireworks";
export type SoundTypes = "Sound" | "No Sound";

export const setConfettiType = (
  value: ConfettiTypes
): SetConfettiTypeAction => ({
  type: SET_CONFETTI_TYPE,
  payload: value,
});

export const setSoundType = (value: SoundTypes): SetSoundTypeAction => ({
  type: SET_SOUND_TYPE,
  payload: value,
});

export const setWheelDetails = (
  name: string,
  description: string,
  popUpMessage: string
): SetWheelDetailsAction => ({
  type: SET_WHEEL_DETAILS,
  payload: { name, description, popUpMessage },
});

export const setFullScreenMode = (
  updatedFullScreenModeState: boolean 
): SetFullScreenMode => ({
  type: SET_FULL_SCREEN_MODE,
  payload: updatedFullScreenModeState,
});

export const setWheelSnapshot = (payload: Partial<WheelSnapshot>) => ({
  type: SET_WHEEL_SNAPSHOT,
  payload,
});

export const setWheelFormValues = (name: string, description: string, popUpMessage: string) => ({
  type: SET_WHEEL_FORM_VALUES,
  payload: { name, description, popUpMessage },
});


export const setWheelMetaDataDefaultAction = () => ({
  type: SET_WHEEL_META_DATA_DEFAULT_ACTION
})
