import React, { useState } from "react";
import {
  Home,
  LayoutDashboard,
  User,
  PlusCircle,
  ChevronRight,
  ChevronLeft,
  Wheat
} from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [expanded, setExpanded] = useState(true);

  const menuItems = [
    { name: "Home", icon: <Home size={22} />, path: "/" },
    { name: "Dashboard", icon: <LayoutDashboard size={22} />, path: "/dashboard" },
    { name: "Profile", icon: <User size={22} />, path: "/profile" },
    { name: "Add Food", icon: <PlusCircle size={22} />, path: "/foodsearch" },

  ];

  return (
    <>
     {/* FOR MOBILE SCREEN  */}
      <div className="w-full flex justify-around py-4  bg-[#276F27] fixed bottom-0 md:hidden ">
        {menuItems.map((item, index) => (
          <Link key={index} to={item.path} className="">
            <div className="text-white text-2xl font-semibold">{item.icon}</div>
          </Link>
        ))}
      </div>

    {/* FOR OTHER SCREEN SIZES */}
      <div
        className={` hidden fixed h-screen bg-[#276F27] shadow-xl border-r md:flex flex-col transition-all duration-300 
        ${expanded ? "w-56" : "w-20"}`}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="p-3 hover:bg-green-700 transition"
        >
          {expanded ? <ChevronLeft size={22} /> : <ChevronRight size={22} />}
        </button>

        {/* Logo Section */}
        <div className="px-4 mb-8">
          {expanded ? (
            <h1 className="text-2xl font-bold text-white">NutriTrack</h1>
          ) : (
            <h1 className="text-2xl font-bold text-white">🍃</h1>
          )}
        </div>

        {/* Menu Items */}
        <nav className="flex flex-col gap-2 px-2">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="flex items-center gap-4 p-3 rounded-lg cursor-pointer
                     hover:bg-green-700 text-white font-medium transition"
            >
              <div className="text-white">{item.icon}</div>
              {expanded && <span>{item.name}</span>}
            </Link>
          ))}
        </nav>

        {/* Bottom Placeholder */}
        <div className="mt-auto p-4 text-xs text-gray-500">
          {expanded && "© 2025 NutriTrack"}
        </div>
      </div>

     </>
  );
};

export default Sidebar;
