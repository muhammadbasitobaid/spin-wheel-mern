import {useState, useEffect, useCallback} from 'react';
import Card from "./common/Card";
import SelectInput from './common/SelectInput';
import { ToggleButton } from "./Configurator/Settings/MenuRow";
import ChoiceCounter from "./common/ChoiceCounter";
import { 
  YesNoWheel,
  NumberWheel,
  LetterWheel,
  ALPHABETS_OPTION,
  CONSONANT_OPTION,
  VOWEL_OPTION ,
  CUSTOM_LETTERS_OPTION ,
YES_NO_OPTION,
NUMBER_WHEEL_LOWEST_PORTION,
NUMBER_WHEEL_HIGHEST_PORTION
} from "src/constants";
import { RootState } from "src/store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  resetHistory,
  setActiveModal,
  setInputNumbers,
  setWheelList
} from "src/store/actions/wheel";
import InputField from "./common/InputField";



export const YesNoWheelControls = () => {
  const dispatch = useDispatch();
  const { selectedWheel, inputNumbers, maxInputNumbers } = useSelector(
    (state: RootState) => state.wheel
  );

  const [selectedOption, setSelectedOption] = useState(YesNoWheel?.options[0]!)

  useEffect(() => {
    // Update the wheel list based on the selected wheel option
      if (selectedOption === YES_NO_OPTION) {
        dispatch(setWheelList(["Yes", "No"]));
      } else {
        dispatch(setWheelList(["Yes", "No", "Maybe"]));
      }
  }, [selectedWheel, dispatch, selectedOption]);




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
                setSelectedOption(option)
                // dispatch(setSelectedWheel({ ...YesNoWheel, options: [option] }));
                // dispatch(resetHistory());  // Reset history when wheel mode changes
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
          max={maxInputNumbers}
          value={inputNumbers}
          onChange={(newNumber: number) =>
            dispatch(setInputNumbers(newNumber))
          }
        />
      </div>
    </>
  );
};

const generateAlphabetArray = (isUpperCase: boolean) => {
  const alphabet = Array.from(Array(26)).map((_, i) => String.fromCharCode(i + 65)); // A to Z
  return isUpperCase ? alphabet : alphabet.map(letter => letter.toLowerCase());
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
  const [styleOption, setStyleOption] = useState<string>("UPPERCASE");
  const [letterOption, setLetterOption] = useState<string>(ALPHABETS_OPTION);
  const [customLetters, setCustomLetters] = useState<string>(""); // State to store custom letters input
  const dispatch = useDispatch();

  // Options for the select dropdown
  const letterOptions = [ALPHABETS_OPTION, CONSONANT_OPTION, VOWEL_OPTION, CUSTOM_LETTERS_OPTION];

  // Function to return array based on letter option and style
  const getLetterArray = () => {
    const isUpperCase = styleOption === "UPPERCASE";

    switch (letterOption) {
      case ALPHABETS_OPTION:
        return generateAlphabetArray(isUpperCase);
      case VOWEL_OPTION:
        return generateVowelArray(isUpperCase);
      case CONSONANT_OPTION:
        return generateConsonantArray(isUpperCase);
      case CUSTOM_LETTERS_OPTION:
        return customLetters
          .split(",")
          .map(letter => letter.trim())
          .filter(letter => letter.length > 0); // Ensure non-empty letters
      default:
        return [];
    }
  };

  useEffect(() => {

    dispatch(setInputNumbers(1));
  }, [])

  useEffect(() => {
    const selectedLetters = getLetterArray();
    dispatch(setWheelList(selectedLetters));
  }, [styleOption, letterOption, customLetters, dispatch]);

  return (
    <>
      {/* Letter Options */}
      <div className="mb-6">
        <SelectInput
          label="Letter Options:"
          options={letterOptions}
          value={letterOption}
          onChange={(value: string) => setLetterOption(value)}
        />
      </div>

      {/* Custom Letters Input (shown only when CUSTOM_LETTERS_OPTION is selected) */}
      {letterOption === CUSTOM_LETTERS_OPTION && (
        <div className="mb-6">
          <InputField
            label="Enter Custom Letters (comma-separated):"
            value={customLetters}
            onChange={(e) => setCustomLetters(e.target.value)}
            placeholder="e.g., A, B, C"
          />
        </div>
      )}

      {/* Style Options */}
      {letterOption !== CUSTOM_LETTERS_OPTION && (
        <>
          <div className="mb-6">
            <label className="block text-lg font-medium mb-2">Style Options:</label>
            <div className="flex space-x-2">
              <ToggleButton
                label="UPPERCASE"
                isActive={styleOption === "UPPERCASE"}
                onClick={() => setStyleOption("UPPERCASE")}
                className="w-1/2"
              />
              <ToggleButton
                label="lowercase"
                isActive={styleOption === "lowercase"}
                onClick={() => setStyleOption("lowercase")}
                className="w-1/2"
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};





export const NumberWheelControls = () => {
  const [lowerNumber, setLowerNumber] = useState<string>("1");
  const [highestNumber, setHighestNumber] = useState<string>("10");
  const [excludeNumbers, setExcludeNumbers] = useState<string>("");
  const [interval, setInterval] = useState<string>("1");
  const dispatch = useDispatch();

  // Helper function to generate the number list
  const generateNumberList = useCallback(() => {
    let lower = parseInt(lowerNumber, 10);
    let highest = parseInt(highestNumber, 10);
    const step = parseInt(interval, 10);

    // Apply limits to the lower and highest numbers
    if (isNaN(lower) || lower < NUMBER_WHEEL_LOWEST_PORTION) lower = NUMBER_WHEEL_LOWEST_PORTION;
    if (isNaN(highest) || highest > NUMBER_WHEEL_HIGHEST_PORTION) highest = NUMBER_WHEEL_HIGHEST_PORTION;

    if (isNaN(step) || step <= 0) {
      return [];
    }

    const exclude = excludeNumbers
      .split(",")
      .map(num => parseInt(num.trim(), 10))
      .filter(num => !isNaN(num));

    const numberList = [];
    for (let i = lower; i <= highest; i += step) {
      if (!exclude.includes(i)) {
        numberList.push(i);
      }
    }

    return numberList;
  }, [lowerNumber, highestNumber, interval, excludeNumbers]);

  useEffect(() => {
    dispatch(setInputNumbers(1));
  }, [dispatch]);

  useEffect(() => {
    const numberList = generateNumberList();
    dispatch(setWheelList(numberList.map(number => number + "")));
    dispatch(setInputNumbers(1));
  }, [lowerNumber, highestNumber, excludeNumbers, interval, dispatch, generateNumberList]);

  const handleHighestNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);

    // Update the state but ensure it doesn't exceed the max
    if (!isNaN(value)) {
      setHighestNumber(value > NUMBER_WHEEL_HIGHEST_PORTION ? NUMBER_WHEEL_HIGHEST_PORTION.toString() : e.target.value);
    }
  };

  const handleHighestNumberBlur = () => {
    const value = parseInt(highestNumber, 10);
    // Ensure the value is not greater than the max limit
    if (value > NUMBER_WHEEL_HIGHEST_PORTION) {
      setHighestNumber(NUMBER_WHEEL_HIGHEST_PORTION.toString());
    }
  };

  return (
    <>
      {/* Section for Lower and Highest Number in one row */}
      <div className="flex space-x-4 mb-6">
        <InputField
          label="Lower Number"
          type="number"
          value={lowerNumber}
          onChange={(e) => {
            const value = parseInt(e.target.value, 10);
            setLowerNumber(isNaN(value) || value < NUMBER_WHEEL_LOWEST_PORTION ? NUMBER_WHEEL_LOWEST_PORTION.toString() : e.target.value);
          }}
          className="w-1/2"
          placeholder="1"
          min={NUMBER_WHEEL_LOWEST_PORTION.toString()}
          max={NUMBER_WHEEL_HIGHEST_PORTION.toString()}
        />
        <InputField
          label="Highest Number"
          type="number"
          value={highestNumber}
          onChange={handleHighestNumberChange}
          onBlur={handleHighestNumberBlur} 
          className="w-1/2"
          placeholder="10"
          min={NUMBER_WHEEL_LOWEST_PORTION.toString()}
          max={NUMBER_WHEEL_HIGHEST_PORTION.toString()}
          note={"Max number can be 1000 at max"}
        />
      </div>

      {/* Section for Advance Wheel */}
      <div className="mt-6">
        <h2 className="font-semibold text-lg mb-4">Advance Wheel</h2>

        <div className="flex space-x-4">
          <InputField
            label="Exclude Number"
            type="text"
            value={excludeNumbers}
            onChange={(e) => setExcludeNumbers(e.target.value)}
            className="w-1/2"
            placeholder="e.g. 1,2,3"
          />
          <InputField
            label="Interval/steps"
            type="number"
            value={interval}
            onChange={(e) => setInterval(e.target.value)}
            className="w-1/2"
            placeholder="1"
          />
        </div>
      </div>
    </>
  );
};

export const EditWheel = () => {
  const { selectedWheel } = useSelector((state: RootState) => state.wheel);
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
              <button className="opacity-50 cursor-not-allowed" disabled>
                <img
                  src="/assets/icons/show.svg"
                  alt="Show"
                  className="w-5 lg:w-[28px]"
                  title={`Fullscreen (feature currently unavailable!)`}
                />
              </button>
              <button className="" onClick={() => dispatch(resetHistory())}>
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
            selectedWheel.name === YesNoWheel.name && (
              <YesNoWheelControls/>
            )
          }

          {
            selectedWheel.name === LetterWheel.name && (
              <LetterWheelControls/>
            )
          }

          {
            selectedWheel.name === NumberWheel.name && (
              <NumberWheelControls/>
            )
          }
        </div>
      </div>
    </Card>
  );
};

export default EditWheel;
