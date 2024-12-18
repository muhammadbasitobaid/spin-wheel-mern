import React from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Button from "src/components/common/Button";
import InputField from "src/components/common/InputField";
import Modal from "src/components/common/Modal";
import { setActiveModal, 
  setWheelDetails, 
  setWheelFormValues } from "src/store/actions/wheel";
import { RootState } from "src/store/store";
import { attemptSaveWheel } from "src/store/thunks/wheel";

const ModifyModal: React.FC = () => {
  const dispatch = useDispatch();
  const { wheel, user } = useSelector((state: RootState) => state);

  // name: string;
  // description: string;
  // popUpMessage: string;
  const formValues = {
    name: wheel.name,
    description: wheel.description,
    popUpMessage: wheel.popUpMessage,
  };

  const handleSave = () => {
// Create the payload that matches the backend schema
  const payload = {
    customWheelName: formValues.name,  // Map "name" to "customWheelName"
    wheelType: wheel?.selectedWheel?.name || "",  // Assuming wheelType is "custom", modify as per your needs
    description: formValues.description,
    popUpMessage: formValues.popUpMessage,
    spinConfig: {
      spinningSpeedLevel: wheel.spinConfig.spinningSpeedLevel,  // Get from wheel.spinConfig
      spinningDuration: wheel.spinConfig.spinningDuration,  // Get from wheel.spinConfig
      manuallyStopOption: wheel.spinConfig.manuallyStopOption,  // Get from wheel.spinConfig
      randomInitialAngleOption: wheel.spinConfig.randomInitialAngleOption,  // Get from wheel.spinConfig
      mysterySpinOption: wheel.spinConfig.mysterySpinOption,  // Get from wheel.spinConfig
      spinCountOption: wheel.spinConfig.spinCountOption,  // Get from wheel.spinConfig
      confetti: wheel.spinConfig.confetti,  // Get from wheel.spinConfig
      sound: wheel.spinConfig.sound,  // Get from wheel.spinConfig
      confettiType: wheel.spinConfig.confettiType,  // Get from wheel.spinConfig
      selectedTheme: wheel.selectedTheme,  // Get from wheel.spinConfig
    },
    selectedOption: wheel.wheelSnapshot.selectedOption,  // Get selectedOption from wheel.wheelSnapshot
    inputNumbers: wheel.wheelSnapshot.inputNumbers,  // Get inputNumbers from wheel.wheelSnapshot
    history: wheel.wheelSnapshot.history || [],  // Default to empty array if history is undefined
    lowerNumber: wheel.wheelSnapshot.lowerNumber,  // Get lowerNumber from wheel.wheelSnapshot
    highestNumber: wheel.wheelSnapshot.highestNumber,  // Get highestNumber from wheel.wheelSnapshot
    interval: wheel.wheelSnapshot.interval,  // Get interval from wheel.wheelSnapshot
    customLetterList: wheel.wheelSnapshot.customLetterList,  // Get customLetterList from wheel.wheelSnapshot
    casing: wheel.wheelSnapshot.casing,  // Get casing from wheel.wheelSnapshot
    wheelList: wheel.wheelList || [],  // Default to an empty array if wheelList is undefined
    _id: "",  // Assuming this is for a new wheel, so it's empty
  };
    console.log('payload ', JSON.stringify(payload));
    if (!user.user) {
      toast.error("Please login to save changes");
      return;
    }
    const { id } = user.user;
    // @ts-ignore
    dispatch(attemptSaveWheel(payload, id));
    dispatch(setActiveModal(null));
    dispatch(setWheelDetails(formValues.name, formValues.description, formValues.popUpMessage));
  };

  const handleClose = () => {
    dispatch(setActiveModal(null));
  };

  const handleReset = () => {
    dispatch(setWheelFormValues("", "", ""));
  };

const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = event.target;

  // Update form values in Redux store based on the name of the input field
  if (name === "name") {
    dispatch(setWheelFormValues(value, formValues.description, formValues.popUpMessage));
  } else if (name === "description") {
    dispatch(setWheelFormValues(formValues.name, value, formValues.popUpMessage));
  } else if (name === "popUpMessage") {
    dispatch(setWheelFormValues(formValues.name, formValues.description, value));
  }
};

  return (
    <Modal isOpen onClose={handleClose} showOverlay showDoneButton>
      <div className="bg-white rounded-lg p-4 w-full max-w-md mx-auto sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl">
        <div className="flex w-full">
          <div className="flex-1 flex flex-col items-center justify-center ">
            <span className="text-center text-2xl font-semibold mb-4">
              Modify name & Description
            </span>
            <img src="/assets/icons/custom-border.svg" alt="custom-border" />
          </div>
          <div className="flex items-center">
            <button onClick={handleClose}>
              <img src="/assets/icons/close.svg" alt="close" width={18} />
            </button>
          </div>
        </div>
        <div className="py-8 flex flex-col">
          <div className="mb-4">
            <InputField
              label="name"
              name="name"
              value={formValues.name}
              placeholder="Enter name"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <InputField
              label="Description"
              name="description"
              value={formValues.description}
              placeholder="Enter description"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <InputField
              label="Popup Msg"
              name="popUpMessage"
              value={formValues.popUpMessage}
              placeholder="Enter popup message"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="mt-8 flex justify-end gap-2">
          <Button onClick={handleReset} type="reset" invertedVariant>
            Reset
          </Button>
          <Button onClick={handleSave} type="submit">
            Save
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModifyModal;
