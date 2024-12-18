import React, { useRef } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/store/store";
import InputField from "./common/InputField";
import Button from "./common/Button";
import { attemptSaveWheel } from "src/store/thunks/wheel";
import { setShareLink } from "src/store/actions/wheel";
import useOutsideClick from "src/hooks/useOutsideClick";

const SharePopup: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const dispatch = useDispatch();
  const { wheel, user} = useSelector((state: RootState) => state);
  const { selectedWheel, shareLink } = wheel;
  const popupRef = useRef<HTMLDivElement>(null);

  useOutsideClick(popupRef, onClose);

  const handleSaveWheelAndGenerateLink = () => {
    if(shareLink) return;
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
          console.log(selectedWheel)
 selectedWheel && selectedWheel.slug &&         generateShareLink(data.data.wheel._id || wheel._id!, selectedWheel.slug);
        });
        toast.success("Wheel saved successfully");
      } catch (error) {
        toast.error("Failed to save wheel");
        return;
      }
    } else {
      generateShareLink(wheel._id!, selectedWheel.slug);
    }
  };

  const generateShareLink = (id: string, slug: string) => {
    const link = `${process.env.REACT_APP_BASE_URL ?? "http://localhost:3000"}${slug === "/" ? "": slug}/?id=${id}`;
    dispatch(setShareLink(link)); // Update the Redux store with the new link
    return link;
  };

  const handleCopyToClipboard = () => {
    if (shareLink) {
      navigator.clipboard
        .writeText(shareLink)
        .then(() => {
          toast.success("Link copied to clipboard!");
        })
        .catch(() => {
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
          value={shareLink || ""}
          placeholder="Share link"
          className="w-full"
          disabled
        />
        <button
          className={`ml-2 child ${
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
            className="child"
          />
        </button>
      </div>
      {
        !shareLink && (
          <Button small onClick={handleSaveWheelAndGenerateLink} className="w-full child">
            Generate Link
          </Button>
        ) 
      }
    </div>
  );
};

export default SharePopup;
