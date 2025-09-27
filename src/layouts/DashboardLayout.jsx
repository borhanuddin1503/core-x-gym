import React, { useRef } from "react";
import { NavLink, Outlet } from "react-router";
import { 
  FaHome, FaHistory, FaUserEdit, FaUsers, FaCalendarAlt, FaPlusCircle, 
  FaWallet, FaNewspaper, FaTasks, FaChartLine 
} from "react-icons/fa";
import Logo from "../shared/Logo";
import useUserRole from "../custom hooks/useUserRole";
import { HeadProvider, Meta, Title } from "react-head";
import Navbar from "../shared/Navbar/Navbar";
import Footer from "../shared/Footer/Footer";

const DashboardLayout = () => {
  const { role, roleLoading } = useUserRole();
  const inputRef = useRef();

  const navItems = [
    { to: "/dashboard", icon: FaHome, label: "Home" },
    { to: "/dashboard/activityLog", icon: FaHistory, label: "Activity Log" },
    { to: "/dashboard/profile", icon: FaUserEdit, label: "Update Profile" },
    { to: "/dashboard/bookedTrainers", icon: FaUsers, label: "Booked Trainers" },
  ];

  const trainerItems = [
    { to: "/dashboard/slots", icon: FaCalendarAlt, label: "Slots" },
    { to: "/dashboard/addSlots", icon: FaPlusCircle, label: "Add Slot" },
    { to: "/dashboard/my-earnings", icon: FaWallet, label: "My Earnings" },
    { to: "/dashboard/add-post", icon: FaPlusCircle, label: "Add Post" },
  ];

  const adminItems = [
    { to: "/dashboard/newsLetterSubscribers", icon: FaNewspaper, label: "News Letter Subscribers" },
    { to: "/dashboard/manageTrainers", icon: FaUsers, label: "Manage Trainers" },
    { to: "/dashboard/appliedTrainers", icon: FaUserEdit, label: "Applied Trainers" },
    { to: "/dashboard/stats", icon: FaChartLine, label: "Stats" },
    { to: "/dashboard/addClass", icon: FaPlusCircle, label: "Add Class" },
    { to: "/dashboard/add-post", icon: FaPlusCircle, label: "Add Post" },
  ];

  const renderNavItems = (items) =>
    items.map((item, idx) => (
      <li key={idx} className="rounded-lg mb-1">
        <NavLink
          to={item.to}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 transition rounded-lg font-medium hover:bg-main/20 hover:text-main ${isActive ? "bg-main/30 text-main" : "text-gray-700"
            }`
          }
          onClick={() => {
            inputRef.current.checked = false;
          }}
        >
          <item.icon className="w-5 h-5" />
          {item.label}
        </NavLink>
      </li>
    ));

  return (
    <div className="">
      <Navbar></Navbar>
      <div className="drawer lg:drawer-open">
        <HeadProvider>
          <Title>Dashboard | CoreX-Gym</Title>
          <Meta name="description" content="Dashboard of coreX-gym" />
        </HeadProvider>

        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" ref={inputRef} />
        <div className="drawer-content flex flex-col min-h-screen max-h-full bg-white">
          {/* Navbar for mobile */}
          <div className="navbar bg-white shadow-md lg:hidden">
            <div className="flex-none">
              <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-6 h-6 stroke-current"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </label>
            </div>
            <div className="flex-1 text-center font-bold text-xl text-main">Dashboard</div>
          </div>

          {/* Page content */}
          <main className="p-8 bg-white">
            <Outlet />
          </main>
        </div>

        {/* Sidebar */}
        <div className="drawer-side bg-white shadow-lg ">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <div className="overflow-y-auto flex flex-col justify-between  w-80 p-4">
            <div>
              <Logo></Logo>
              <ul className="menu mt-6 space-y-1">{renderNavItems(navItems)}</ul>

              {!roleLoading && role === "trainer" && (
                <>
                  <h3 className="text-gray-400 text-sm uppercase mt-6 mb-2 px-4">Rider Options</h3>
                  <ul className="menu space-y-1">{renderNavItems(trainerItems)}</ul>
                </>
              )}

              {!roleLoading && role === "admin" && (
                <>
                  <h3 className="text-gray-400 text-sm uppercase mt-6 mb-2 px-4">Admin Options</h3>
                  <ul className="menu space-y-1">{renderNavItems(adminItems)}</ul>
                </>
              )}
            </div>

            {/* Optional Footer */}
            <div className="mt-auto text-center text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} ProFast. All rights reserved.
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default DashboardLayout;
