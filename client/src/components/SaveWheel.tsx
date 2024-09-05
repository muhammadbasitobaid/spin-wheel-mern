import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/store/store";
import Button from "./common/Button";
import InputField from "./common/InputField";
import Modal from "./common/Modal";
import toast from "react-hot-toast";
import { attemptSaveWheel } from "src/store/thunks/wheel";

const SaveWheel: React.FC = () => {
  const dispatch = useDispatch();
  const { wheel, user } = useSelector((state: RootState) => state);

  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSave = () => {
    const payload = {
      ...wheel,
      name: formValues.title,
      description: formValues.description,
    };

    if (!user.user) {
      toast.error("Please login to save changes");
      return;
    }

    const { id } = user.user;
    // @ts-ignore
    dispatch(attemptSaveWheel(payload, id));
  };

  const handleReset = () => {
    setFormValues({ title: "", description: "" });
  };

  const handleClose = () => {
    // Handle closing the modal (e.g., dispatch an action to set active modal to null)
  };

  return (
    <Modal
      isOpen={true}
      useDefaultCloseIcon
      showOverlay
      onClose={handleClose}
      className="w-[25%]"
    >
      <div className="mx-6 my-14 mb-8 w-full">
        <div className="text-2xl font-medium leading-normal text-left">
          Modify Title & Description
        </div>
        <InputField
          name="title"
          placeholder="Enter Wheel Title"
          label="Title"
          value={formValues.title}
          onChange={handleChange}
        />
        <InputField
          name="description"
          placeholder="Enter Wheel Description"
          label="Description"
          value={formValues.description}
          onChange={handleChange}
        />
        <div className="mt-8 w-[50%] flex justify-center gap-2 mx-auto">
          <Button type="button" className="flex-1" onClick={handleSave}>
            Save
          </Button>
          <Button
            invertedVariant
            type="button"
            className="flex-1"
            onClick={handleReset}
          >
            Reset
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default SaveWheel;
