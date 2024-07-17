// src/ModifyModal.tsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "src/components/common/Button";
import InputField from "src/components/common/InputField";
import Modal from "src/components/common/Modal";
import { setActiveModal } from "src/store/actions/wheel";

const ModifyModal: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [popupMsg, setPopupMsg] = useState("");
  const dispatch = useDispatch();

  const handleSave = () => {
    console.log("Saved data:", { title, description, popupMsg });
    dispatch(setActiveModal(null));
  };

  const handleClose = () => {
    dispatch(setActiveModal(null));
  };

  const handleReset = () => {
    setTitle("");
    setDescription("");
    setPopupMsg("");
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
              value={title}
              placeholder="Enter title"
              onChange={setTitle}
            />
          </div>
          <div className="mb-4">
            <InputField
              label="Description"
              value={description}
              placeholder="Enter description"
              onChange={setDescription}
            />
          </div>
          <div className="">
            <InputField
              label="Popup Msg"
              value={popupMsg}
              placeholder="Enter popup message"
              onChange={setPopupMsg}
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
