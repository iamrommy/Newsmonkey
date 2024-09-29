import React, { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import logo from "../assets/monkeyLogo.png";
import { RxCross1 } from "react-icons/rx";
import useOnClickOutside from "../hooks/useOnClickOutside";

const navLinks = [
    { path: "/", label: "Home" },
    { path: "/business", label: "Business" },
    { path: "/entertainment", label: "Entertainment" },
    { path: "/health", label: "Health" },
    { path: "/science", label: "Science" },
    { path: "/sports", label: "Sports" },
    { path: "/technology", label: "Technology" },
  ];

const MenuSlider = () => {
  const ref = useRef(null);
  const [open, setOpen] = useState(false);
  // console.log(categories)

  useOnClickOutside(ref, () => setOpen(false));

  return (
    <div className="mx-4 lg:hidden text-white bg-black">
      <AiOutlineMenu
        fontSize={24}
        onClick={() => setOpen(!open)}
      />
      <div
        id="slider"
        className={`absolute inset-0 bg-black w-80 h-full transition-all ease-in-out lg:hidden z-[1000] ${
          open ? "translate-x-0" : "-translate-x-80"
        }`}
        ref={ref}
      >
        <div className="flex h-[3.8rem] items-center justify-between">
          <div className="flex text-base text-white items-center pl-4 gap-x-2">
            <img src={logo} className="invert" width="30" alt="Logo" /> <span className="text-xl font-bold text-white">NewsMonkey</span>
          </div>
          <div className="p-4">
            <RxCross1 onClick={() => setOpen(false)} />
          </div>
        </div>

        {navLinks.map((link) => (
          <NavLink key={link.path} to={link.path} onClick={() => setOpen(false)}>
            <div className="p-4 flex items-center active:bg-gray-700 bg-black">
              {link.label}
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default MenuSlider;
