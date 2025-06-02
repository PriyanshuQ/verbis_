"use client";
import React from "react";
import SideNavbar from "../../../../components/SideNavbar";
import Card from "../../../../components/DashboardCard";
import { HiOutlineUserGroup, HiOutlineClock, HiOutlineShoppingBag, HiOutlineExclamation } from "react-icons/hi";

const statsCards = [
  {
    id: 1,
    title: "Total Booking",
    value: "2,345",
    description: "Total number of bookings registered on the platform.",
    icon: HiOutlineUserGroup,
    color: "bg-blue-500",
    hoverColor: "hover:bg-blue-600",
  },
  {
    id: 2,
    title: "Active Sessions",
    value: "567",
    description: "Current number of upcoming bookings.",
    icon: HiOutlineClock,
    color: "bg-green-500",
    hoverColor: "hover:bg-green-600",
  },
  {
    id: 3,
    title: "Pending Bookings",
    value: "45",
    description: "Total sales calculated for the current month.",
    icon: HiOutlineShoppingBag,
    color: "bg-yellow-500",
    hoverColor: "hover:bg-yellow-600",
  },
  {
    id: 4,
    title: "Cancellation Requests",
    value: "89",
    description: "Total number of cancellation requests to be processed.",
    icon: HiOutlineExclamation,
    color: "bg-red-500",
    hoverColor: "hover:bg-red-600",
  },
];

const Page = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <SideNavbar />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statsCards.map((card) => (
              <Card key={card.id} {...card} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
