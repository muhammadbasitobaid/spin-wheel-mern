import React, { ReactNode } from "react";

export interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
}

interface TabProps {
  tabs: TabItem[];
  activeTab: string;
  setActiveTab: (tabId: string) => void;
  className?: string;
}

const Tab: React.FC<TabProps> = ({
  tabs,
  activeTab,
  setActiveTab,
  className,
}) => {
  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <div role="tablist" className={`tabs tabs-boxed p-0 mb-6 ${className}`}>
      {tabs.map((tab, index) => (
        <button
          key={tab.id}
          role="tab"
          className={`tab text-xl ${
            activeTab === tab.id ? "tab-active !bg-blue !text-white" : ""
          } ${
            index === 0 && activeTab === tab.id ? "!rounded-r-custom-none" : ""
          } ${
            index === tabs.length - 1 && activeTab === tab.id
              ? "!rounded-l-custom-none"
              : ""
          }`}
          onClick={() => handleTabClick(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export { Tab };
