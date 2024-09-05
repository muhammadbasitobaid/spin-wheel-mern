import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Button from "src/components/common/Button";
import InputField from "src/components/common/InputField";
import Modal from "src/components/common/Modal";
import { setActiveModal, setWheelDetails } from "src/store/actions/wheel";
import { RootState } from "src/store/store";
import { attemptSaveWheel } from "src/store/thunks/wheel";

const ModifyModal: React.FC = () => {
  const dispatch = useDispatch();
  const { wheel, user } = useSelector((state: RootState) => state);
  // const {_id } = user.user;

  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    popupMsg: "",
  });

  const handleSave = () => {
    const payload = {
      ...wheel,
      name: formValues.title,
      description: formValues.description,
      popupMsg: formValues.popupMsg,
    };
    if (!user.user) {
      toast.error("Please login to save changes");
      return;
    }
    const { id } = user.user;
    // @ts-ignore
    dispatch(attemptSaveWheel(payload, id));
    dispatch(setActiveModal(null));
    dispatch(
      setWheelDetails(
        formValues.title,
        formValues.description,
        formValues.popupMsg
      )
    );
  };

  const handleClose = () => {
    dispatch(setActiveModal(null));
  };

  const handleReset = () => {
    setFormValues({ title: "", description: "", popupMsg: "" });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return (
    <Modal isOpen onClose={handleClose} showOverlay showDoneButton>
      <div className="bg-white rounded-lg p-4 w-full max-w-md mx-auto sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl">
        <div className="flex w-full">
          <div className="flex-1 flex flex-col items-center justify-center ">
            <span className="text-center text-2xl font-semibold mb-4">
              Modify Title & Description
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
              label="Title"
              name="title"
              value={formValues.title}
              placeholder="Enter title"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <InputField
              label="Description"
              name="description"
              value={formValues.description}
              placeholder="Enter description"
              onChange={handleChange}
            />
          </div>
          <div>
            <InputField
              label="Popup Msg"
              name="popupMsg"
              value={formValues.popupMsg}
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
