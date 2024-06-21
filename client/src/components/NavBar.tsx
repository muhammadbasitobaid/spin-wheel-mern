// import {
//   NavLink,
//   NavLinkProps,
// } from "react-router-dom";
// import { useAppSelector } from "src/store/hooks";

import { useDispatch } from "react-redux";
import { menuItems } from "src/constants";
import { ModalNames } from "src/pages/HomePage";
import { setActiveModal } from "src/store/actions/wheel";

interface MenuItemProps {
  label?: string;
  width?: number;
  height?: number;
  svgSrc: string;
  value: ModalNames;
  setActiveModal: (modal: string) => void;
}

const MenuItem: React.FC<MenuItemProps> = ({
  label,
  svgSrc,
  width,
  height,
  value,
  setActiveModal,
}) => (
  <li>
    <div
      onClick={() => value && setActiveModal(value)}
      className="flex py-3.5 gap-3.5"
    >
      <img
        src={svgSrc}
        alt={label || "label wasn't provided"}
        width={width}
        height={height}
      />
      {label && <span>{label}</span>}
    </div>
  </li>
);

export default function NavBar() {
  const dispatch = useDispatch();
  // const { isAuth, user } = useAppSelector((state) => state.user);

  // const navLinkClass: NavLinkProps["className"] = ({ isActive }) =>
  //   isActive ? "active" : "inactive";

  return (
    <nav className="navbar bg-base-100 px-6 lg:px-10">
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
      <div className="navbar-end  md:hidden">
        <button className="btn btn-ghost btn-circle">
          <img
            src="/assets/icons/share_page.svg"
            alt="SVG"
            width={18}
            height={18}
          />
        </button>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
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
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {menuItems?.map((item) => (
              <MenuItem
                key={item.label}
                label={item.label}
                svgSrc={item.svgSrc}
                width={18}
                height={18}
                value={item.value}
                setActiveModal={() => dispatch(setActiveModal(item.value))}
              />
            ))}
          </ul>
        </div>
      </div>

      <div className="navbar-end hidden md:flex md:justify-end">
        <ul className="menu menu-horizontal px-1">
          {menuItems?.map((item, index) => (
            <MenuItem
              key={item.svgSrc + index}
              svgSrc={item.svgSrc}
              width={26}
              height={26}
              value={item.value}
              setActiveModal={() => dispatch(setActiveModal(item.value))}
            />
          ))}
          <MenuItem
            key={"/assets/icons/share_page.svg"}
            svgSrc={"/assets/icons/share_page.svg"}
            width={26}
            height={26}
            value={"share"}
            setActiveModal={() => dispatch(setActiveModal("share"))}
          />
        </ul>
      </div>
    </nav>
  );
}
