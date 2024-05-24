import React, { useState } from "react";
import Modal from "../common/Modal";
import { getRandomYesOrNo } from "src/utils";

const Results: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="flex flex-col w-full m-8 mt-6 mb-0">
        <div className="flex w-full mb-16">
          <div className="flex items-center w-1/4">
            <span>
              <img src="/assets/icons/upload.svg" alt="upload" width={20} />
            </span>
          </div>
          <div className="flex flex-col items-center justify-center w-1/2">
            <span className="text-2xl font-semibold mb-4">All Results</span>
            <img src="/assets/icons/custom-border.svg" alt="custom-border" />
          </div>
          <div className="flex items-center justify-end w-1/4">
            <button onClick={handleClose}>
              <img src="/assets/icons/close.svg" alt="close" width={18} />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-auto flex-grow pb-1  mx-5" id="style-2">
          <table className="w-full ">
            {" "}
            {Array.from({ length: 3 }, (_, index) => (
              <tr className=" text-base leading-none">
                <td className="w-[10%]">{index + 1}</td>
                <td>{getRandomYesOrNo()}</td>
                <td className="w-[10%]">
                  <img
                    src="/assets/icons/select.svg"
                    alt="Select"
                    className="mx-auto"
                  />
                </td>
              </tr>
            ))}
          </table>
        </div>
        <div className="flex items-center justify-center w-full">
          <img src="/assets/icons/logo.svg" alt="logo" width={55} />
        </div>
      </div>
    </Modal>
  );
};

export default Results;
