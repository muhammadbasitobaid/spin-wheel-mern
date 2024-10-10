import { useState } from "react";
import Modal from "../common/Modal";
import { Tab } from "../common/Tab";
import Login from "./Login";
import Signup from "./Signup";
import { useDispatch, useSelector } from "react-redux";
import { setActiveModal } from "src/store/actions/wheel";
import { RootState } from "src/store/store";

const Auth = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);

  const tabs = [
    {
      id: "login",
      label: "Login",
      content: <Login />,
    },
    {
      id: "signup",
      label: "Signup",
      content: <Signup />,
    },
  ];

  const [activeTab, setActiveTab] = useState<string>(tabs[0].id);

  return (
    <Modal
      isOpen={true}
      useDefaultCloseIcon
      showOverlay
      onClose={() => dispatch(setActiveModal(null))}
      className="w-[90%] md:w-full max-w-lg p-6 flex justify-center bg-white rounded-lg shadow-lg sm:max-w-md md:max-w-lg"
    >
      {user ? (
        <div className="p-4 space-y-4 flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-gray-800">Account Info</h2>
          <div className="text-left">
            <p className="text-lg text-gray-600">
              <span className="font-medium">Username:</span> {user.username}
            </p>
            <p className="text-lg text-gray-600">
              <span className="font-medium">Email:</span> {user.email}
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-6">
          <div className="w-full max-w-xs sm:max-w-sm md:max-w-md">
            <Tab
              tabs={tabs}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              className="tabs-lg"
            />
            <div className="w-full mt-4">
              {tabs.find((tab) => tab.id === activeTab)?.content}
            </div>
          </div>
          <div className="flex items-center justify-center w-full mt-4 md:mt-6">
            <img src="/assets/icons/logo.svg" alt="logo" className="w-12 sm:w-14 md:w-16" />
          </div>
        </div>
      )}
    </Modal>
  );
};

export default Auth;
