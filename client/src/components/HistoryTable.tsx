import React from "react";
import Modal from "./common/Modal";
import Table from "./Table";
import { RootState } from "src/store/store";
import { useDispatch, useSelector } from "react-redux";
import { setActiveModal } from "src/store/actions/wheel";
const HistoryTable: React.FC = () => {
  const dispatch = useDispatch();

  const { wheelSnapshot } =
    useSelector((state: RootState) => state.wheel);
  const { history } = wheelSnapshot;

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
