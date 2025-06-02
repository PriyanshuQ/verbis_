"use client";
import React, { useState } from "react";
import { FiHome, FiSettings, FiUsers, FiMenu, FiX, FiFileText } from "react-icons/fi";
import { AiOutlineDashboard, AiOutlineHistory, AiOutlineUser, AiOutlineBook, AiOutlinePlusCircle, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const navigationItems: NavigationItem[] = [
  { id: "dashboard", label: "Dashboard", icon: AiOutlineDashboard },
  { id: "newoffer", label: "Add New Offer", icon: AiOutlinePlusCircle },
  { id: "pendingbookings", label: "Pending Booking", icon: AiOutlineBook },
  { id: "previousbookings", label: "Previous Bookings", icon: AiOutlineHistory },
  { id: "users", label: "Users", icon: AiOutlineUser },
];

const SideNavbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeItem, setActiveItem] = useState("home");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div
      className={`${
        isSidebarOpen ? "w-64" : "w-20"
      } bg-white shadow-lg transition-all duration-300 ease-in-out`}
    >
      <div className="flex items-center justify-between p-4">
        <h2
          className={`${
            !isSidebarOpen && "hidden"
          } font-bold text-xl text-gray-800`}
        >
          Dashboard
        </h2>
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
        >
          {isSidebarOpen ? (
            <FiX className="w-6 h-6 text-gray-600" />
          ) : (
            <FiMenu className="w-6 h-6 text-gray-600" />
          )}
        </button>
      </div>

      <nav className="mt-8">
        {navigationItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveItem(item.id)}
            className={`flex items-center w-full p-6 ${
              activeItem === item.id
                ? "bg-red-50 text-red-600"
                : "text-gray-600"
            } hover:bg-red-50 hover:text-red-600 transition-all duration-200`}
          >
            <item.icon className="w-6 h-6" />
            <span className={`${!isSidebarOpen && "hidden"} ml-4`}>
              {item.label}
            </span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default SideNavbar;
