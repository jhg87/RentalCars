import { useState } from "react";
import { RiSunLine } from "react-icons/ri";
import { RiMoonLine } from "react-icons/ri";
import { HiMenuAlt3, HiMenuAlt1 } from "react-icons/hi";
import ResponsiveMenu from "./ResponsiveMenu";
import { Link } from "react-router-dom";
import LogoCar from "../../assets/website/logo car.jpg";

export const Navlinks = [
  {
    id: 1,
    name: "HOME",
    link: "/#",
  },
  {
    id: 2,
    name: "ABOUT",
    link: "/#about",
  },
  {
    id: 3,
    name: "CARS",
    link: "/#carList",
  },

  {
    id: 4,
    name: "Application",
    link: "/#Application",
  },
  {
    id: 5,
    name: "Footer",
    link: "/#Footer",
  },
];

// eslint-disable-next-line react/prop-types
const Navbar = ({ theme, setTheme }) => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  return (
    <div
      className="relative header z-10 shadow-md w-full dark:bg-black dark:text-white duration-300
    "
    >
      <div className="container py-2 md:py-0">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-3xl font-bold font-serif">
              <img className="logoCar" src={LogoCar} alt="logo" />
            </span>
          </div>
          <nav className="hidden md:block">
            <ul className="flex items-center gap-8">
              {Navlinks.map(({ id, name, link }) => (
                <li key={id} className="py-4">
                  <a
                    className=" text-lg font-medium  hover:text-blue-600 py-2 hover:border-b-2 hover:border-blue-600 transition-colors duration-500 "
                    href={link}
                  >
                    {name}
                  </a>
                </li>
              ))}
              {/* DarkMode feature implement */}

              {theme === "light" ? (
                <RiSunLine
                  onClick={() => setTheme("dark")}
                  className="text-2xl"
                />
              ) : (
                <RiMoonLine
                  onClick={() => setTheme("light")}
                  className="text-2xl"
                />
              )}
            </ul>
            <Link to={"/login"}>Login</Link>
          </nav>
          {/* Mobile view  */}
          <div className="flex items-center gap-4 md:hidden ">
            {/* dark  mode */}
            {theme === "dark" ? (
              <RiSunLine
                onClick={() => setTheme("light")}
                className="text-2xl"
              />
            ) : (
              <RiMoonLine
                onClick={() => setTheme("dark")}
                className="text-2xl"
              />
            )}
            {/* Mobile Hamburger icon */}
            {showMenu ? (
              <HiMenuAlt1
                onClick={toggleMenu}
                className=" cursor-pointer transition-all"
                size={30}
              />
            ) : (
              <HiMenuAlt3
                onClick={toggleMenu}
                className="cursor-pointer transition-all"
                size={30}
              />
            )}
          </div>
        </div>
      </div>
      <ResponsiveMenu showMenu={showMenu} />
    </div>
  );
};

export default Navbar;
