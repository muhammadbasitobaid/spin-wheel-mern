import { useState } from "react";
import ThemeGrid from "./Theme/ThemeGrid";
import Modal from "../common/Modal";
import { Tab } from "../common/Tab";
import Settings from "./Settings";

const Configurator = () => {
  const tabs = [
    {
      id: "settings",
      label: "Settings",
      content: <Settings />,
    },
    {
      id: "themes",
      label: "Themes",
      content: <ThemeGrid />,
    },
  ];

  const [activeTab, setActiveTab] = useState<string>(tabs[0].id);
  return (
    <Modal isOpen={true} useDefaultCloseIcon showOverlay onClose={() => {}}>
      <div className="mx-6 my-14 mb-8 w-full">
        <Tab tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="w-full">
          {tabs.find((tab) => tab.id === activeTab)!.content}
        </div>
      </div>
    </Modal>
  );
};

export default Configurator;
