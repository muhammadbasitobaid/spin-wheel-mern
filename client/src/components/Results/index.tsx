import React from "react";
import Modal from "../common/Modal";
import { RootState } from "src/store/store";
import { useDispatch, useSelector } from "react-redux";
import Table from "../Table";
import { setActiveModal } from "src/store/actions/wheel";
import toast from "react-hot-toast";

const Results: React.FC = () => {
  const { wheelSnapshot, name, description } = useSelector((state: RootState) => state.wheel);
  const { history } = wheelSnapshot;
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setActiveModal(null));
  };

  const handleExportHistory = () => {
    if (history && history.length > 0) {
      const textContent = [
        `Name: ${name || "N/A"}`,
        `Description: ${description || "N/A"}`,
        "",
        "Results:",
        ...history.map((result, index) => `${index + 1} -> ${result}`),
      ].join("\n");

      const blob = new Blob([textContent], { type: "text/plain" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${name || "wheel_results"}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      toast.error("No History to export. Please spin the wheel first.");
    }
  };

  return (
    <Modal isOpen onClose={handleClose}>
      <div className="flex flex-col w-full">
        <div className="flex w-full">
          <div className="flex items-center w-1/4">
            <span>
              <img
                src="/assets/icons/upload.svg"
                alt="upload"
                width={20}
                className="cursor-pointer"
                onClick={handleExportHistory}
              />
            </span>
          </div>
          <div className="flex flex-col items-center justify-center w-1/2">
            <span className="text-lg font-semibold mb-4 md:text-2xl">
              All Results
            </span>
            <img src="/assets/icons/custom-border.svg" alt="custom-border" />
          </div>
          <div className="flex items-center justify-end w-1/4">
            <button onClick={handleClose}>
              <img src="/assets/icons/close.svg" alt="close" width={18} />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-auto flex-grow pb-1" id="style-2">
          <Table history={history || []} />
        </div>
        <div className="flex items-center justify-center w-full">
          <img src="/assets/icons/logo.svg" alt="logo" width={55} />
        </div>
      </div>
    </Modal>
  );
};

export default Results;
