import React from "react";
import { NavLink } from "react-router-dom";
import { PiUsersThreeBold } from "react-icons/pi"; // Penduduk
import { HiOutlineBanknotes, HiOutlineArchiveBox } from "react-icons/hi2"; // APBDes & Bansos
import { MdOutlineWheelchairPickup } from "react-icons/md"; // Disabilitas

const StatistikMenu = () => {
  const menuClass = "flex flex-col items-center";
  const iconClass = "text-2xl mb-1";

  return (
    <div className="flex gap-10 justify-center py-4 ">
      <NavLink
        to="penduduk"
        className={({ isActive }) =>
          `${menuClass} ${isActive ? "text-green-700 font-semibold" : "text-black hover:text-green-700"}`
        }
      >
        {({ isActive }) => (
          <>
            <PiUsersThreeBold className={`${iconClass} ${isActive ? "text-green-700" : ""}`} />
            <span className="text-sm">Penduduk</span>
            {isActive && (
              <span className="w-6 h-[2px] bg-green-700 mt-1 rounded-full"></span>
            )}
          </>
        )}
      </NavLink>

      <NavLink
        to="apbdes"
        className={({ isActive }) =>
          `${menuClass} ${isActive ? "text-green-700 font-semibold" : "text-black hover:text-green-700"}`
        }
      >
        {({ isActive }) => (
          <>
            <HiOutlineBanknotes className={`${iconClass} ${isActive ? "text-green-700" : ""}`} />
            <span className="text-sm">APBDes</span>
            {isActive && (
              <span className="w-6 h-[2px] bg-green-700 mt-1 rounded-full"></span>
            )}
          </>
        )}
      </NavLink>

      <NavLink
        to="disabilitas"
        className={({ isActive }) =>
          `${menuClass} ${isActive ? "text-green-700 font-semibold" : "text-black hover:text-green-700"}`
        }
      >
        {({ isActive }) => (
          <>
            <MdOutlineWheelchairPickup className={`${iconClass} ${isActive ? "text-green-700" : ""}`} />
            <span className="text-sm">Disabilitas</span>
            {isActive && (
              <span className="w-6 h-[2px] bg-green-700 mt-1 rounded-full"></span>
            )}
          </>
        )}
      </NavLink>

      <NavLink
        to="bansos"
        className={({ isActive }) =>
          `${menuClass} ${isActive ? "text-green-700 font-semibold" : "text-black hover:text-green-700"}`
        }
      >
        {({ isActive }) => (
          <>
            <HiOutlineArchiveBox className={`${iconClass} ${isActive ? "text-green-700" : ""}`} />
            <span className="text-sm">Bansos</span>
            {isActive && (
              <span className="w-6 h-[2px] bg-green-700 mt-1 rounded-full"></span>
            )}
          </>
        )}
      </NavLink>
    </div>
  );
};

export default StatistikMenu;
