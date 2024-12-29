import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { menuItems, DEFAULT_INPUT_NUMBER_FOR_Y_N_WHEEL } from "src/constants";
import { ModalNames } from "src/pages/HomePage";
import { setActiveModal, setWheelSnapshot } from "src/store/actions/wheel";
import SharePopup from "./SharePopup";
import WheelsPopup from "./WheelsPopup";
import { useSelector } from "react-redux";
import { RootState } from "src/store/store";
import useOutsideClick from "src/hooks/useOutsideClick";
import { useNavigate } from "react-router-dom";

interface MenuItemProps {
  label?: string;
  width?: number;
  height?: number;
  svgSrc: string;
  value: ModalNames;
  setActiveModal: (modal: string) => void;
  disabled?: boolean;
  className?: string;
}

const MenuItem: React.FC<MenuItemProps> = ({
  label,
  svgSrc,
  width,
  height,
  value,
  setActiveModal,
  disabled = false,
  className = "child"
}) => (
  <li className={className}>
    <div onClick={() => !disabled && value && setActiveModal(value)} className={className}>
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
      <span className="block lg:hidden xl:block child">{label}</span>
    </div>
  </li>
);

export default function NavBar() {
  const dispatch = useDispatch();
  const [isSharePopupOpen, setIsSharePopupOpen] = useState(false);
  const [isWheelsPopupOpen, setIsWheelsPopupOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  useOutsideClick(dropdownRef, () => setIsDropdownOpen(false));
  const navigate = useNavigate();

  const { selectedWheel } = useSelector(
    (state: RootState) => state.wheel
  );

  const toggleSharePopup = () => {
    setIsSharePopupOpen(!isSharePopupOpen);
    if(isWheelsPopupOpen) setIsWheelsPopupOpen(false);
  };

  const closeSharePopup = () => {
    setIsSharePopupOpen(false);
  };


  const toggleWheelsPopup = () => {

    setIsDropdownOpen(false);
    setIsWheelsPopupOpen(!isWheelsPopupOpen);
    if(isSharePopupOpen) setIsSharePopupOpen(false);
  };

  const closeWheelsPopup = () => {
    setIsWheelsPopupOpen(false);
    selectedWheel && selectedWheel.name && dispatch(setWheelSnapshot({inputNumbers: selectedWheel.name === "yes-no-wheel" ? DEFAULT_INPUT_NUMBER_FOR_Y_N_WHEEL: 1} ))
  };


  return (
    <nav className="bg-white px-6 lg:px-10 sticky top-0 shadow-lg z-[999]">
    <div className="navbar max-w-[1360px] mx-auto">
      <div className="navbar-start w-auto">
        <div className="btn btn-ghost text-xl flex p-0 gap-0 !h-auto"
onClick={() => navigate("/")}
        >
          <img
            src="/assets/icons/logo.svg"
            alt="SVG"
            className="drop-shadow-2xl lg:w-[60px]"
          />
          <span className="mx-2 font-semibold text-lg lg:text-2xl">
            Spin Wheel
          </span>
        </div>
      </div>
      <div className="navbar-center"></div>
      <div className="navbar-end flex-1 md:hidden" >
        <div ref={dropdownRef} className="relative dropdown dropdown-left dropdown-bottom">
          <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="btn btn-ghost btn-circle">
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
          </button>
          {isDropdownOpen && (
            <ul className="menu menu-xs absolute mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 left-[-180px]">
            {menuItems?.map((item) => (
              <MenuItem
                key={item.label}
                label={item.label}
                svgSrc={item.svgSrc}
                width={18}
                height={18}
                value={item.value}
                setActiveModal={() => { setIsDropdownOpen(false); dispatch(setActiveModal(item.value)); }}
                disabled={item.disabled || false}
              />
            ))}

            <MenuItem
              key={"/assets/icons/hammer_page.svg"}
              svgSrc={"/assets/icons/hammer_page.svg"}
              width={18}
              height={18}
              value={"switch_wheels"}
              label={"Switch Wheels"}
              disabled={false}
              setActiveModal={toggleWheelsPopup}
            />
            </ul>
          )}

            {isWheelsPopupOpen && <WheelsPopup onClose={closeWheelsPopup} />}
        </div>
        <ul>
          <div className="relative">
            <MenuItem
              key={"/assets/icons/share_page.svg"}
              svgSrc={"/assets/icons/share_page.svg"}
              width={18}
              height={18}
              value={"share"}
              disabled={false}
              setActiveModal={toggleSharePopup}
            />
            {isSharePopupOpen && <SharePopup onClose={closeSharePopup} />}
          </div>
        </ul>
      </div>

      <div className="navbar-end hidden md:flex md:justify-end md:flex-1">
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
    </div>
    </nav>
  );
}
