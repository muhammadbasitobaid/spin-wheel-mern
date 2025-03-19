import {
  YesNoWheel,
  NumberWheel,
  LetterWheel,
  CustomOptionsWheel,
  DEFAULT_LETTER_WHEEL_CASING,
  UPPERCASE,
  letterWheelDefaultOption,
  initCustomWheelOptions,
} from "../constants";
import { generateAlphabetArray } from "./index";

export const initializeWheelState = (path: string) => {
  switch (path) {
    case "/yes-or-no-wheel":
      return {
        selectedWheel: YesNoWheel,
        wheelSnapshot: {
          options: ["Yes", "No", "Maybe"],
          selectedOption: undefined,
        },
      };
    case "/random-number-generator":
      return {
        selectedWheel: NumberWheel,
        wheelSnapshot: {
          options: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
          selectedOption: undefined,
        },
      };
    case "/random-letter-generator":
      return {
        selectedWheel: LetterWheel,
        wheelSnapshot: {
          options: generateAlphabetArray(DEFAULT_LETTER_WHEEL_CASING === UPPERCASE),
          selectedOption: letterWheelDefaultOption,
        },
      };
    case "/":
    default:
      return {
        selectedWheel: CustomOptionsWheel,
        wheelSnapshot: {
          options: initCustomWheelOptions,
          selectedOption: initCustomWheelOptions[0],
        },
      };
  }
}; 