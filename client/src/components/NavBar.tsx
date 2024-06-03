// import {
//   NavLink,
//   NavLinkProps,
// } from "react-router-dom";
// import { useAppSelector } from "src/store/hooks";

interface MenuItemProps {
  label?: string;
  width?: number;
  height?: number;
  svgSrc: string;
}

const MenuItem: React.FC<MenuItemProps> = ({
  label,
  svgSrc,
  width,
  height,
}) => (
  <li>
    <a href="#" className="flex py-3.5 gap-3.5">
      <img
        src={svgSrc}
        alt={label || "label wasn't provided"}
        width={width}
        height={height}
      />
      {label && <span>{label}</span>}
    </a>
  </li>
);

export default function NavBar() {
  // const { isAuth, user } = useAppSelector((state) => state.user);

  // const navLinkClass: NavLinkProps["className"] = ({ isActive }) =>
  //   isActive ? "active" : "inactive";
  const menuItems: MenuItemProps[] = [
    {
      label: "Login/Signup",
      svgSrc: "/assets/icons/login.svg",
    },
    {
      label: "Switch Wheel",
      svgSrc: "/assets/icons/wheel_page.svg",
    },
    {
      label: "Setting",
      svgSrc: "/assets/icons/setting_page.svg",
    },
    {
      label: "Tools",
      svgSrc: "/assets/icons/hammer_page.svg",
    },
  ];

  return (
    <nav className="navbar bg-base-100 px-6">
      <div className="navbar-start">
        <a href="/" className="btn btn-ghost text-xl flex p-0 gap-0">
          <img
            src="/assets/icons/logo.svg"
            alt="SVG"
            className="drop-shadow-2xl"
          />
          <span className="mx-2 font-semibold text-lg md:text-2xl">
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
            />
          ))}
          <MenuItem
            key={"/assets/icons/share_page.svg"}
            svgSrc={"/assets/icons/share_page.svg"}
            width={26}
            height={26}
          />
        </ul>
      </div>
    </nav>
  );
}
