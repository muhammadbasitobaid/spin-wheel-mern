import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { menuItems } from "src/constants";
import { ModalNames } from "src/pages/HomePage";
import { setActiveModal } from "src/store/actions/wheel";
import SharePopup from "./SharePopup";
import WheelsPopup from "./WheelsPopup";

interface MenuItemProps {
  label?: string;
  width?: number;
  height?: number;
  svgSrc: string;
  value: ModalNames;
  setActiveModal: (modal: string) => void;
  disabled?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({
  label,
  svgSrc,
  width,
  height,
  value,
  setActiveModal,
  disabled = false,
}) => (
  <li>
    <div onClick={() => !disabled && value && setActiveModal(value)}>
      <img
        src={svgSrc}
        alt={label || "label wasn't provided"}
        width={width}
        height={height}
        className={`${
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        }`}
        title={disabled ? `${label} (feature currently unavailable!)` : label}
      />
    </div>
  </li>
);

export default function NavBar() {
  const dispatch = useDispatch();
  const [isSharePopupOpen, setIsSharePopupOpen] = useState(false);
  const [isWheelsPopupOpen, setIsWheelsPopupOpen] = useState(false);

  const toggleSharePopup = () => {
    setIsSharePopupOpen(!isSharePopupOpen);
    if(isWheelsPopupOpen) setIsWheelsPopupOpen(false);
  };

  const closeSharePopup = () => {
    setIsSharePopupOpen(false);
  };


  const toggleWheelsPopup = () => {
    setIsWheelsPopupOpen(!isWheelsPopupOpen);
    if(isSharePopupOpen) setIsSharePopupOpen(false);
  };

  const closeWheelsPopup = () => {
    setIsWheelsPopupOpen(false);
  };



  return (
    <nav className="navbar bg-base-100 px-6 lg:px-10 relative">
      <div className="navbar-start">
        <a href="/" className="btn btn-ghost text-xl flex p-0 gap-0">
          <img
            src="/assets/icons/logo.svg"
            alt="SVG"
            className="drop-shadow-2xl lg:w-[60px]"
          />
          <span className="mx-2 font-semibold text-lg lg:text-2xl">
            Spin Wheel
          </span>
        </a>
      </div>
      <div className="navbar-center"></div>
      <div className="navbar-end md:hidden">
        <details className="dropdown">
          <summary className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </summary>
          <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            {menuItems?.map((item) => (
              <MenuItem
                key={item.label}
                label={item.label}
                svgSrc={item.svgSrc}
                width={18}
                height={18}
                value={item.value}
                setActiveModal={() => dispatch(setActiveModal(item.value))}
                disabled={item.disabled || false}
              />
            ))}

            <MenuItem
              key={"/assets/icons/hammer_page.svg"}
              svgSrc={"/assets/icons/hammer_page.svg"}
              width={26}
              height={26}
              value={"switch_wheels"}
              label={"Switch Wheels"}
              disabled={false}
              setActiveModal={toggleWheelsPopup}
            />
            {isWheelsPopupOpen && <WheelsPopup onClose={closeWheelsPopup} />}
          </ul>
        </details>
        <ul>
          <div className="relative">
            <MenuItem
              key={"/assets/icons/share_page.svg"}
              svgSrc={"/assets/icons/share_page.svg"}
              width={26}
              height={26}
              value={"share"}
              label={"Share"}
              disabled={false}
              setActiveModal={toggleSharePopup}
            />
            {isSharePopupOpen && <SharePopup onClose={closeSharePopup} />}
          </div>
        </ul>
      </div>

      <div className="navbar-end hidden md:flex md:justify-end">
        <ul className="menu menu-horizontal px-1">
          {menuItems?.map((item, index) => (
            <MenuItem
              key={item.svgSrc + index}
              svgSrc={item.svgSrc}
              label={item.label}
              width={26}
              height={26}
              value={item.value}
              setActiveModal={() => dispatch(setActiveModal(item.value))}
              disabled={item.disabled || false}
            />
          ))}

            <MenuItem
              key={"/assets/icons/hammer_page.svg"}
              svgSrc={"/assets/icons/hammer_page.svg"}
              width={26}
              height={26}
              value={"switch_wheels"}
              label={"Switch Wheels"}
              disabled={false}
              setActiveModal={toggleWheelsPopup}
            />
          <div className="relative">
            <MenuItem
              key={"/assets/icons/share_page.svg"}
              svgSrc={"/assets/icons/share_page.svg"}
              width={26}
              height={26}
              value={"share"}
              label={"Share"}
              disabled={false}
              setActiveModal={toggleSharePopup}
            />
            {isSharePopupOpen && <SharePopup onClose={closeSharePopup} />}
            {isWheelsPopupOpen && <WheelsPopup onClose={closeWheelsPopup} />}
          </div>
        </ul>
      </div>
    </nav>
  );
}
