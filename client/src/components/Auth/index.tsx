import { useState } from "react";
import Modal from "../common/Modal";
import { Tab } from "../common/Tab";
import Login from "./Login";
import Signup from "./Signup";

const Auth = () => {
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
      onClose={() => {}}
      className="w-[35%] flex justify-center"
    >
      <div className="flex flex-col">
        <div className="w-[417px] my-14 mb-8">
          <Tab
            tabs={tabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            className="tabs-lg"
          />
          <div className="w-full">
            {tabs.find((tab) => tab.id === activeTab)!.content}
          </div>
        </div>

        <div className="flex items-center justify-center w-full">
          <img src="/assets/icons/logo.svg" alt="logo" width={55} />
        </div>
      </div>
    </Modal>
  );
};

export default Auth;
