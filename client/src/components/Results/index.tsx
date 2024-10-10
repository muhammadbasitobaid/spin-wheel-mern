import React from "react";
import Modal from "../common/Modal";
import { useDispatch, useSelector } from "react-redux";
import Table from "../Table";
import { setActiveModal } from "src/store/actions/wheel";

const Results: React.FC = () => {
  const { history } = useSelector((state: any) => state.wheel);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(setActiveModal(null));
  };

  return (
    <Modal isOpen onClose={handleClose}>
      <div className="flex flex-col w-full m-8 mt-6 mb-0">
        <div className="flex w-full">
          <div className="flex items-center w-1/4">
            <span>
              <img src="/assets/icons/upload.svg" alt="upload" width={20} />
            </span>
          </div>
          <div className="flex flex-col items-center justify-center w-1/2">
            <span className="text-lg font-semibold mb-4 md:text-2xl">All Results</span>
            <img src="/assets/icons/custom-border.svg" alt="custom-border" />
          </div>
          <div className="flex items-center justify-end w-1/4">
            <button onClick={handleClose}>
              <img src="/assets/icons/close.svg" alt="close" width={18} />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-auto flex-grow pb-1  mx-5" id="style-2">
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
