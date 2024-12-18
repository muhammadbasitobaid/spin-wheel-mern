import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/store/store";
import { setActiveModal } from "src/store/actions/wheel";
import Modal from "src/components/common/Modal";
import { fetchUserWheels } from "src/store/thunks/user";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

import { wheels } from "src/constants"; 

const WheelsListModal: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuth } = useSelector((state: RootState) => state.user);


  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuth && user) {
      console.log(user)
      setLoading(true);
      //   @ts-ignore
      dispatch(fetchUserWheels(user._id ?? user.id)).finally(() => setLoading(false));
    }
  }, []);

  const handleClose = () => {
    dispatch(setActiveModal(null));
  };

  useEffect(() => {
    user?.wheels && console.log('wheels: ', user?.wheels)

  }, [user?.wheels])
  

  return (
    <Modal
      isOpen
      useDefaultCloseIcon
      onClose={handleClose}
      showOverlay
      showDoneButton
    >
      <div className="maxbg-white rounded-lg p-4 w-full max-w-md mx-auto">
        <div className="flex justify-center items-center mb-4">
          <h2 className="text-2xl font-semibold text-center">Your Wheels</h2>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="">
            {user?.wheels && user?.wheels.length > 0 ? (
              <ul className="flex flex-col space-y-2 max-w-[95%]">
                {user?.wheels.map((wheel) => (
                  <li
                    key={wheel?._id || uuidv4()}
                    className="border rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200"
                  >
<button
      onClick={() => {
        handleClose();
        const slug = wheels.find(wheelConfig => wheelConfig.name === wheel.wheelType)?.slug;
        const link = `${slug === "/" ? "" : slug}?id=${wheel?._id}`;
        
        // Navigate to the constructed URL
        navigate(link);
        
      }}
      className="w-full text-left"
    >
      <div className="flex justify-between items-center">
        <span className="font-medium text-lg">
          {wheel.customWheelName}
        </span>
        <span className="text-gray-500 text-sm">
          {/* @ts-ignore */}
          {wheel?.wheelType}
        </span>
      </div>
    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No wheels found.</p>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
};

export default WheelsListModal;
