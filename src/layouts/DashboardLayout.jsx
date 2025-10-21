import React, { useRef } from "react";
import { NavLink, Outlet, useLocation } from "react-router";
import {
  FiHome,
  FiClock,
  FiUser,
  FiUsers,
  FiCalendar,
  FiPlusCircle,
  FiDollarSign,
  FiBookOpen,
  FiBarChart2,
  FiMail,
  FiUserCheck,
  FiUserPlus,
  FiEdit3,
} from "react-icons/fi";
import Logo from "../shared/Logo";
import useUserRole from "../custom hooks/useUserRole";
import { HeadProvider, Meta, Title } from "react-head";
import Footer from "../shared/Footer/Footer";
import useTheme from "../custom hooks/useTheme";
import ThemeController from "../shared/Navbar/ThemeController";

const DashboardLayout = () => {
  const { role, roleLoading } = useUserRole();
  const inputRef = useRef();
  const { pathname } = useLocation();
  const { theme } = useTheme();

  // 🧭 Common user routes
  const navItems = [
    { to: "/", icon: FiHome, label: "Home" },
    { to: "/dashboard", icon: FiBarChart2, label: "Dashboard" },
    { to: "/dashboard/activityLog", icon: FiClock, label: "Activity Log" },
    { to: "/dashboard/profile", icon: FiEdit3, label: "Update Profile" },
    { to: "/dashboard/bookedTrainers", icon: FiUsers, label: "Booked Trainers" },
  ];

  // 🧑‍🏫 Trainer routes
  const trainerItems = [
    { to: "/dashboard/slots", icon: FiCalendar, label: "Slots" },
    { to: "/dashboard/addSlots", icon: FiPlusCircle, label: "Add Slot" },
    { to: "/dashboard/add-post", icon: FiBookOpen, label: "Add Post" },
  ];

  // 🧑‍💼 Admin routes
  const adminItems = [
    { to: "/dashboard/newsLetterSubscribers", icon: FiMail, label: "Newsletter Subscribers" },
    { to: "/dashboard/manageTrainers", icon: FiUserCheck, label: "Manage Trainers" },
    { to: "/dashboard/appliedTrainers", icon: FiUserPlus, label: "Applied Trainers" },
    { to: "/dashboard/stats", icon: FiBarChart2, label: "Stats" },
    { to: "/dashboard/addClass", icon: FiPlusCircle, label: "Add Class" },
    { to: "/dashboard/add-post", icon: FiBookOpen, label: "Add Post" },
  ];

  // 🎨 Reusable NavList Renderer
  const renderNavItems = (items) =>
    items.map((item, idx) => (
      <li key={idx} className="rounded-lg mb-1">
        <NavLink
          to={item.to}
          className={() =>
            `flex items-center gap-3 px-4 py-2 rounded-lg font-medium text-sm transition-colors 
             ${
               pathname === item.to
                 ? "bg-main/20 text-main"
                 : "hover:bg-main/10 hover:text-main"
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
    <div className="relative">
      <div className="drawer lg:drawer-open">
        <HeadProvider>
          <Title>Dashboard | CoreX-Gym</Title>
          <Meta name="description" content="Dashboard of coreX-gym" />
        </HeadProvider>

        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" ref={inputRef} />
        <div className="drawer-content flex flex-col min-h-screen">
          {/* 📱 Mobile Navbar */}
          <div className="navbar shadow-md lg:hidden">
            <div className="flex-none">
              <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-6 h-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </label>
            </div>
            <div className="flex-1 text-center font-bold text-xl text-main">Dashboard</div>
            <div className="p-2">
              <ThemeController />
            </div>
          </div>

          {/* 📄 Page Content */}
          <main className="p-8">
            <Outlet />
          </main>
        </div>

        {/* 🧭 Sidebar */}
        <div
          className={`drawer-side bg-root-bg shadow-lg ${
            theme === "dark" && "border-r border-gray-700"
          }`}
        >
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <div className="overflow-y-auto flex flex-col justify-between w-80 p-4">
            <div>
              <div className="flex justify-between items-center">
                <Logo />
                <div className="hidden lg:block">
                  <ThemeController />
                </div>
              </div>

              <ul className="menu mt-6 space-y-1">{renderNavItems(navItems)}</ul>

              {!roleLoading && role === "trainer" && (
                <>
                  <h3 className="text-sm uppercase mt-6 mb-2 px-4">Trainer Options</h3>
                  <ul className="menu space-y-1">{renderNavItems(trainerItems)}</ul>
                </>
              )}

              {!roleLoading && role === "admin" && (
                <>
                  <h3 className="text-sm uppercase mt-6 mb-2 px-4">Admin Options</h3>
                  <ul className="menu space-y-1">{renderNavItems(adminItems)}</ul>
                </>
              )}
            </div>

            {/* ⚙️ Footer */}
            <div className="mt-auto text-center text-xs opacity-70">
              &copy; {new Date().getFullYear()} CoreX-Gym. All rights reserved.
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
