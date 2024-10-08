import React, { useState, useRef } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/store/store";
import InputField from "./common/InputField";
import Button from "./common/Button";
import { attemptSaveWheel } from "src/store/thunks/wheel";

const SharePopup: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const dispatch = useDispatch();
  const [shareLink, setShareLink] = useState("");
  const { wheel, user } = useSelector((state: RootState) => state);
  const { selectedWheel } = wheel;
  const popupRef = useRef<HTMLDivElement>(null);

  const handleSaveWheelAndGenerateLink = () => {
    if (!selectedWheel?._id) {
      if (!user.user) {
        toast.error("Please login to save changes");
        return;
      }
      const payload = {
        ...wheel,
        description: "Default Description", // You can modify this as needed
      };
      try {
        // @ts-ignore
        dispatch(attemptSaveWheel(payload, user.user.id)).then((data) => {
          generateShareLink(data.data.wheel._id);
        });
        toast.success("Wheel saved successfully");
      } catch (error) {
        toast.error("Failed to save wheel");
        return;
      }
    } else {
      generateShareLink(selectedWheel._id);
    }
  };

  const generateShareLink = (id: string) => {
    setShareLink(
      `${
        process.env.REACT_APP_BASE_URL ?? "http://localhost:3000"
      }/home?id=${id}`
    );
  };

  const handleCopyToClipboard = () => {
    if (shareLink) {
      navigator.clipboard
        .writeText(shareLink)
        .then(() => {
          toast.success("Link copied to clipboard!");
        })
        .catch((err) => {
          toast.error("Failed to copy link");
        });
    }
  };

  return (
    <div
      ref={popupRef}
      className="absolute right-0 mt-2 p-6 w-72 bg-white rounded-custom-sm shadow-lg z-10"
    >
      <button className="absolute top-2 right-2 mt-2 mr-2" onClick={onClose}>
        <img src="/assets/icons/close.svg" alt="close" width={16} />
      </button>
      <h2 className="text-lg font-medium mb-4">Generate Share Link</h2>
      <div className="flex items-center mb-4">
        <InputField
          value={shareLink}
          placeholder="Share link"
          className="w-full"
          disabled
          onChange={() => setShareLink("")}
        />
        <button
          className={`ml-2 ${
            shareLink ? "text-dark-gray" : "text-light-gray cursor-not-allowed"
          }`}
          onClick={handleCopyToClipboard}
          disabled={!shareLink}
          title={shareLink ? "Copy to clipboard" : "Please generate link first"}
        >
          <img
            src={
              shareLink
                ? "/assets/icons/clipboard.svg"
                : "/assets/icons/clipboard_disabled.svg"
            }
            alt="clipboard"
            width={32}
          />
        </button>
      </div>
      <Button small onClick={handleSaveWheelAndGenerateLink} className="w-full">
        Generate Link
      </Button>
    </div>
  );
};

export default SharePopup;
