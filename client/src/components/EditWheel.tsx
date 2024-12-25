import {useState, useEffect, useCallback} from 'react';
import Card from "./common/Card";
import SelectInput from './common/SelectInput';
import { ToggleButton } from "./Configurator/Settings/MenuRow";
import ChoiceCounter from "./common/ChoiceCounter";
import { 
  YesNoWheel,
  NumberWheel,
  LetterWheel,
  CustomOptionsWheel,
  ALPHABETS_OPTION,
  CONSONANT_OPTION,
  VOWEL_OPTION ,
  CUSTOM_LETTERS_OPTION ,
  YES_NO_OPTION,
  DEFAULT_INPUT_NUMBER_FOR_Y_N_WHEEL,
  UPPERCASE
} from "src/constants";

import { generateAlphabetArray } from "../utils"
import { RootState } from "src/store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveModal,
  setWheelList,
  setWheelSnapshot,
  setFullScreenMode,
  resetWheel
} from "src/store/actions/wheel";
import InputField from "./common/InputField";

export const CustomOptionsWheelControls = () => {
  const dispatch = useDispatch();
  const { wheelSnapshot } = useSelector((state: RootState) => state.wheel);

  const options = wheelSnapshot?.options || [];
  const [newOption, setNewOption] = useState<string>("");

  // Add new option to the list
  const addOption = () => {
    if (newOption.trim()) {
      dispatch(setWheelSnapshot({ options: [...options, newOption.trim()] }));
      setNewOption(""); // Clear input after adding
    }
  };

  const moveOptionUp = (index: number) => {
    if (index > 0 && options.length > 1) {
      const updatedOptions = [...options];
      [updatedOptions[index - 1], updatedOptions[index]] = [updatedOptions[index], updatedOptions[index - 1]];
      dispatch(setWheelSnapshot({ options: updatedOptions }));
    }
  };

  // Move option down
  const moveOptionDown = (index: number) => {
    if (index < options.length - 1) {
      const updatedOptions = [...options];
      [updatedOptions[index], updatedOptions[index + 1]] = [updatedOptions[index + 1], updatedOptions[index]];
      dispatch(setWheelSnapshot({ options: updatedOptions }));
    }
  };

  // Duplicate option
  const duplicateOption = (index: number) => {
    const updatedOptions = [...options];
    updatedOptions.splice(index, 0, options[index]);
    dispatch(setWheelSnapshot({ options: updatedOptions }));
  };

  // Delete option
  const deleteOption = (index: number) => {
    const updatedOptions = options.filter((_, i) => i !== index);
    dispatch(setWheelSnapshot({ options: updatedOptions }));
  };

  useEffect(() => {
    dispatch(setWheelList([]));
    dispatch(setWheelSnapshot({ inputNumbers: 1 }));
  }, []);

  return (
    <div className="custom-options-wheel-controls">
      {/* Input to add new options */}
      <div className="flex items-center mb-4">
        <InputField
          value={newOption}
          onChange={(e) => setNewOption(e.target.value)}
          onKeyDown={(e) => {
              if (e.key === "Enter" && newOption.trim()) {
                addOption();
              }
            }}
          placeholder="Add new option"
        />
        <button onClick={addOption} className="ml-2 flex items-center bg-green-500 text-white p-2 rounded-full hover:bg-green-600 aspect-square">
          <img src="/assets/icons/tick.svg" alt="Tick" className="w-4 h-4 mr-1 md:w-8 md:h-8 md:mr-2" />
        </button>
      </div>

      {/* List of current options with actions */}
      <div className="option-list space-y-2 max-h-64 overflow-y-auto">
        {options.map((option, index) => (
          <div key={index} className="flex items-center space-x-2">
            <span className="flex-1">{option}</span>

            {/* Move up button */}
            <button onClick={() => moveOptionUp(index)} className="text-blue-500 hover:text-blue-700">
              ↑
            </button>

            {/* Move down button */}
            <button onClick={() => moveOptionDown(index)} className="text-blue-500 hover:text-blue-700">
              ↓
            </button>

            {/* Duplicate button */}
            <button onClick={() => duplicateOption(index)} className="text-green-500 hover:text-green-700">
              ⧉
            </button>

            {/* Delete button */}
            <button onClick={() => deleteOption(index)} className="text-red-500 hover:text-red-700">
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};



export const YesNoWheelControls = () => {
  const dispatch = useDispatch();
  const { wheelSnapshot, selectedWheel } = useSelector(
    (state: RootState) => state.wheel
  );

  const {  selectedOption, inputNumbers } = wheelSnapshot;

  useEffect(() => {
    // Update the wheel list based on the selected wheel option
    if (selectedOption === YES_NO_OPTION) {
      dispatch(setWheelList(["Yes", "No"]));
    } else {
      dispatch(setWheelList(["Yes", "No", "Maybe"]));
    }
  }, [selectedOption, selectedWheel, dispatch]);

  useEffect(() => {
    dispatch(setWheelSnapshot({inputNumbers: DEFAULT_INPUT_NUMBER_FOR_Y_N_WHEEL}))
    // dispatch(setWheelFormValues(getDefaultWheelName(), "", ""));


  }, []);

  return (
    <>
      {/* Wheel Mode Selection */}
      <div className="w-full">
        <div className="text-sm lg:text-xl">Mode</div>
        <div className="flex my-1.5">
          {YesNoWheel.options.map((option) => (
            <ToggleButton
              key={option}
              label={option}
              isActive={selectedOption === option}
              onClick={() => {
                dispatch(setWheelSnapshot({ selectedOption: option, history: []  }));
              }}
              className="!text-xs lg:!text-xl flex-1"
            />
          ))}
        </div>
      </div>

      {/* Input Numbers */}
      <div className="w-full">
        <div className="!text-xs lg:!text-xl">Input Numbers</div>
        <ChoiceCounter
          max={5}
          value={inputNumbers ?? 1}
          onChange={(newNumber: number) =>
            dispatch(setWheelSnapshot({ inputNumbers: newNumber }))
          }
        />
      </div>
    </>
  );
};


const generateVowelArray = (isUpperCase: boolean) => {
  const vowels = ['A', 'E', 'I', 'O', 'U'];
  return isUpperCase ? vowels : vowels.map(vowel => vowel.toLowerCase());
};

const generateConsonantArray = (isUpperCase: boolean) => {
  const consonants = ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z'];
  return isUpperCase ? consonants : consonants.map(consonant => consonant.toLowerCase());
};


export const LetterWheelControls = () => {
  const { wheelSnapshot } = useSelector((state: RootState) => state.wheel);
  const dispatch = useDispatch();

  const getLetterArray = () => {
    const isUpperCase = wheelSnapshot.casing === UPPERCASE;

    switch (wheelSnapshot.selectedOption) {
      case ALPHABETS_OPTION:
        return generateAlphabetArray(isUpperCase);
      case VOWEL_OPTION:
        return generateVowelArray(isUpperCase);
      case CONSONANT_OPTION:
        return generateConsonantArray(isUpperCase);
      case CUSTOM_LETTERS_OPTION:
        return (wheelSnapshot.customLetterList || "")
          .split(",")
          .map(letter => letter.trim()) // Trim spaces before filtering
          .filter(letter => letter.length > 0) // Filter out empty strings
          .map(letter => letter[0]); // Take the first character
      default:
        return [];
    }
  };

  useEffect(() => {
    const selectedLetters = getLetterArray();
    dispatch(setWheelList(selectedLetters));
    dispatch(
      setWheelSnapshot({
        selectedOption: wheelSnapshot.selectedOption,
        casing: wheelSnapshot.casing,
      })
    );
    if (wheelSnapshot.selectedOption === CUSTOM_LETTERS_OPTION) {
      dispatch(setWheelSnapshot({ customLetterList: wheelSnapshot.customLetterList }));
    }
  }, [wheelSnapshot.selectedOption, wheelSnapshot.casing, wheelSnapshot.customLetterList, dispatch]);

  useEffect(() => {
    dispatch(setWheelSnapshot({ inputNumbers: 1 }));
  }, [dispatch]);

  return (
    <>
      <SelectInput
        label="Letter Options:"
        options={[ALPHABETS_OPTION, CONSONANT_OPTION, VOWEL_OPTION, CUSTOM_LETTERS_OPTION]}
        value={wheelSnapshot.selectedOption}
        onChange={(value: string) =>
          dispatch(setWheelSnapshot({ selectedOption: value }))
        }
      />

      {wheelSnapshot.selectedOption === CUSTOM_LETTERS_OPTION ? (
        <InputField
          label="Enter Custom Letters (comma-separated):"
          value={wheelSnapshot.customLetterList || ""}
          onChange={(e) =>
            dispatch(
              setWheelSnapshot({ customLetterList: e.target.value })
            )
          }
          placeholder="e.g., A, B, C"
        />
      ) : (
        <div className="mb-6">
          <label className="block text-lg font-medium mb-2">Style Options:</label>
          <div className="flex space-x-2">
            <ToggleButton
              label="UPPERCASE"
              isActive={wheelSnapshot.casing === UPPERCASE}
              onClick={() =>
                dispatch(setWheelSnapshot({ casing: UPPERCASE }))
              }
            />
            <ToggleButton
              label="lowercase"
              isActive={wheelSnapshot.casing === "lowercase"}
              onClick={() =>
                dispatch(setWheelSnapshot({ casing: "lowercase" }))
              }
            />
          </div>
        </div>
      )}
    </>
  );
};






export const NumberWheelControls = () => {
  const dispatch = useDispatch();

  const { wheelSnapshot } = useSelector((state: RootState) => state.wheel);

  const {
      interval = 1,
      lowerNumber = 1,
      highestNumber = 10,
      customLetterList: excludeNumbers = ""
    } = wheelSnapshot;

  const generateNumberList = useCallback(() => {
    let lower = parseInt(lowerNumber?.toString() || "1", 10);
    let highest = parseInt(highestNumber?.toString() || "10", 10);
    const step = parseInt(interval?.toString() || "1", 10);

    const exclude = excludeNumbers
      ?.split(",")
      .map(num => parseInt(num.trim(), 10))
      .filter(num => !isNaN(num)) || [];

    const numberList = [];
    for (let i = lower; i <= highest; i += step) {
      if (!exclude.includes(i)) {
        numberList.push(i);
      }
    }
    return numberList;
  }, [lowerNumber, highestNumber, interval, excludeNumbers]);

  useEffect(() => {
    const numberList = generateNumberList();

    dispatch(setWheelList(numberList.map(String)));
    // Update the lower and highest numbers in the snapshot
    dispatch(setWheelSnapshot({ lowerNumber: lowerNumber, highestNumber: highestNumber }));
  }, [lowerNumber, highestNumber, interval, excludeNumbers, dispatch, generateNumberList]);

  useEffect(() => {
    dispatch(setWheelSnapshot({inputNumbers: 1}));
    // dispatch(setWheelFormValues(getDefaultWheelName(), "", ""));
  }, []);

  return (
    <>
      <div className="flex space-x-4 mb-6">
        <InputField
          label="Lower Number"
          type="number"
          value={"" + lowerNumber}
          onChange={(e) =>
            dispatch(setWheelSnapshot({ lowerNumber: parseInt(e.target.value, 10) }))
          }
          placeholder="1"
          className="max-w-[200px]"
        />
        <InputField
          label="Highest Number"
          type="number"
          value={"" + highestNumber}
          onChange={(e) =>
            dispatch(setWheelSnapshot({ highestNumber: parseInt(e.target.value, 10) }))
          }
          placeholder="10"
          className="max-w-[200px]"
        />
      </div>

      <h2 className="font-semibold text-lg mb-4">Advance Wheel</h2>
      <div className="flex space-x-4">
        <InputField
          label="Exclude Number"
          type="text"
          value={excludeNumbers}
          onChange={(e) =>
            dispatch(setWheelSnapshot({ customLetterList: e.target.value }))
          }
          className="max-w-[200px]"
          placeholder="e.g. 1,2,3"
        />
        <InputField
          label="Interval/steps"
          type="number"
          value={"" + interval}
          onChange={(e) =>
            dispatch(setWheelSnapshot({ interval: parseInt(e.target.value, 10) }))
          }
          className="max-w-[200px]"
          placeholder="1"
        />
      </div>
    </>
  );
};

export const EditWheel = () => {
  const { selectedWheel } = useSelector((state: RootState) => state.wheel);
  const dispatch = useDispatch();

  return (
    <Card className="my-8 mx-6 lg:my-0 lg:mx-0">
      <div className="gap-3 flex flex-col items-center p-4 text-xl">
        <div className=" px-4 py-7 rounded-custom border border-light-gray w-full bg-gradient-to-b from-gray-alpha to-white">
          <div className="w-full flex justify-between">
            <div className="flex-1 text-xl font-semibold leading-normal mb-1.5 lg:text-3xl">
              Customize Wheel
            </div>
            <div className="flex gap-2 items-center">
              <button className="hidden lg:block" onClick={()=> dispatch(setFullScreenMode(true))}>
                <img
                  src="/assets/icons/show.svg"
                  alt="Show"
                  className="w-5 lg:w-[28px]"
                  title={`Fullscreen (feature currently unavailable!)`}
                />
              </button>
              <button className="" onClick={() => dispatch(resetWheel())}>
                <img
                  src="/assets/icons/refresh.svg"
                  alt="Show"
                  className="w-3.5  lg:w-[22px]"
                />
              </button>
              <button
                className=""
                onClick={() => dispatch(setActiveModal('modify'))}
              >
                <img
                  src="/assets/icons/text.svg"
                  alt="Show"
                  className="w-3.5 lg:w-[24px]"
                />
              </button>
            </div>
          </div>
{
 selectedWheel &&  selectedWheel.name && (
    <>
      {selectedWheel.name === YesNoWheel.name && <YesNoWheelControls />}
      {selectedWheel.name === CustomOptionsWheel.name && <CustomOptionsWheelControls />}
      {selectedWheel.name === LetterWheel.name && <LetterWheelControls />}
      {selectedWheel.name === NumberWheel.name && <NumberWheelControls />}
    </>
  )
}
        </div>
      </div>
    </Card>
  );
};

export default EditWheel;
