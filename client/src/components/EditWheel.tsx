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
DEFAULT_INPUT_NUMBER_FOR_Y_N_WHEEL,
// NUMBER_WHEEL_LOWEST_PORTION,
// NUMBER_WHEEL_HIGHEST_PORTION,
// MAX_INPUT_NUMBER
} from "src/constants";
import { RootState } from "src/store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  resetHistory,
  setActiveModal,
  // setinputNumbers,
  setWheelList,
  setWheelSnapshot,
  setFullScreenMode
} from "src/store/actions/wheel";
import InputField from "./common/InputField";
// import { getDefaultWheelName } from "src/utils";



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
                dispatch(setWheelSnapshot({ selectedOption: option }));
                // Reset history when wheel mode changes
                dispatch(setWheelSnapshot({ history: [] })); 
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
  const [customLetters, setCustomLetters] = useState<string>("");
  const dispatch = useDispatch();

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
          .filter(letter => letter.length > 0);
      default:
        return [];
    }
  };

  useEffect(() => {
    const selectedLetters = getLetterArray();
    dispatch(setWheelList(selectedLetters));
    dispatch(setWheelSnapshot({ selectedOption: letterOption,  casing: styleOption}));

    if(letterOption === CUSTOM_LETTERS_OPTION ) dispatch(setWheelSnapshot({ customLetterList: customLetters}));
  }, [styleOption, letterOption, customLetters, dispatch]);


  useEffect(() => {
    dispatch(setWheelSnapshot({inputNumbers: 1}));
    // dispatch(setWheelFormValues(getDefaultWheelName(), "", ""));
  }, []);

  return (
    <>
      <SelectInput
        label="Letter Options:"
        options={[ALPHABETS_OPTION, CONSONANT_OPTION, VOWEL_OPTION, CUSTOM_LETTERS_OPTION]}
        value={letterOption}
        onChange={(value: string) => setLetterOption(value)}
      />

      {letterOption === CUSTOM_LETTERS_OPTION && (
        <InputField
          label="Enter Custom Letters (comma-separated):"
          value={customLetters}
          onChange={(e) => setCustomLetters(e.target.value)}
          placeholder="e.g., A, B, C"
        />
      )}

      <div className="mb-6">
        <label className="block text-lg font-medium mb-2">Style Options:</label>
        <div className="flex space-x-2">
          <ToggleButton
            label="UPPERCASE"
            isActive={styleOption === "UPPERCASE"}
            onClick={() => setStyleOption("UPPERCASE")}
          />
          <ToggleButton
            label="lowercase"
            isActive={styleOption === "lowercase"}
            onClick={() => setStyleOption("lowercase")}
          />
        </div>
      </div>
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
        />
        <InputField
          label="Highest Number"
          type="number"
          value={"" + highestNumber}
          onChange={(e) =>
            dispatch(setWheelSnapshot({ highestNumber: parseInt(e.target.value, 10) }))
          }
          placeholder="10"
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
          className="w-1/2"
          placeholder="e.g. 1,2,3"
        />
        <InputField
          label="Interval/steps"
          type="number"
          value={"" + interval}
          onChange={(e) =>
            dispatch(setWheelSnapshot({ interval: parseInt(e.target.value, 10) }))
          }
          className="w-1/2"
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
    <Card>
      <div className="gap-3 flex flex-col items-center p-4 text-xl">
        <div className=" px-4 py-7 rounded-custom border border-light-gray w-full bg-gradient-to-b from-gray-alpha to-white">
          <div className="w-full flex justify-between">
            <div className="flex-1 text-xl font-semibold leading-normal mb-1.5 lg:text-3xl">
              Edit Wheel
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
