import React from "react";
import Modal from "./common/Modal";
import Table from "./Table";
import { useDispatch, useSelector } from "react-redux";
import { setActiveModal } from "src/store/actions/wheel";
const HistoryTable: React.FC = () => {
  const dispatch = useDispatch();
  const { history } = useSelector((state: any) => state.wheel);
  console.log("HistoryTable");

  return (
    <Modal
      isOpen
      onClose={() => dispatch(setActiveModal(null))}
      showOverlay
      useDefaultCloseIcon
    >
      <Table history={history || []} />
    </Modal>
  );
};

export default HistoryTable;
