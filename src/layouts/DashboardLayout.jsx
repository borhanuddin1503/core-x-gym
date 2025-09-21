import React from "react";
import { NavLink, Outlet } from "react-router";
import {
  FaHome,
  FaBoxOpen,
  FaMoneyCheckAlt,
  FaUserEdit,
  FaSearchLocation,
  FaUserCheck,
  FaUserClock,
  FaUserShield,
  FaMotorcycle,
  FaTasks,
  FaCheckCircle,
  FaWallet,
} from "react-icons/fa";
import Logo from "../shared/Logo";
import useUserRole from "../custom hooks/useUserRole";

const DashboardLayout = () => {
  const { role, roleLoading } = useUserRole();
console.log(role)
  const navItems = [
    { to: "/dashboard", icon: FaHome, label: "Home" },
    { to: "/dashboard/myParcels", icon: FaBoxOpen, label: "My Parcels" },
    { to: "/dashboard/paymentHistory", icon: FaMoneyCheckAlt, label: "Payment History" },
    { to: "/dashboard/track", icon: FaSearchLocation, label: "Track a Package" },
    { to: "/dashboard/profile", icon: FaUserEdit, label: "Update Profile" },
  ];

  const riderItems = [
    { to: "/dashboard/pending-deliveries", icon: FaTasks, label: "Pending Deliveries" },
    { to: "/dashboard/completed-deliveries", icon: FaCheckCircle, label: "Completed Deliveries" },
    { to: "/dashboard/my-earnings", icon: FaWallet, label: "My Earnings" },
  ];

  const adminItems = [
    { to: "/dashboard/newsLetterSubscribers", icon: FaMotorcycle, label: "News Letter Subscribers" },
    { to: "/dashboard/active-riders", icon: FaUserCheck, label: "Active Riders" },
    { to: "/dashboard/pending-riders", icon: FaUserClock, label: "Pending Riders" },
    { to: "/dashboard/makeAdmin", icon: FaUserShield, label: "Make Admin" },
  ];

  const renderNavItems = (items) =>
    items.map((item, idx) => (
      <li key={idx} className="rounded-lg mb-1">
        <NavLink
          to={item.to}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 transition rounded-lg font-medium hover:bg-main/20 hover:text-main ${
              isActive ? "bg-main/30 text-main" : "text-gray-700"
            }`
          }
        >
          <item.icon className="w-5 h-5" />
          {item.label}
        </NavLink>
      </li>
    ));

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col min-h-screen bg-gray-50">
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
        <main className="p-6">
          <Outlet />
        </main>
      </div>

      {/* Sidebar */}
      <div className="drawer-side bg-white shadow-lg border-r border-gray-200">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <div className="overflow-y-auto flex flex-col justify-between h-full w-80 p-4">
          <div>
            <Logo></Logo>
            <ul className="menu mt-6 space-y-1">{renderNavItems(navItems)}</ul>

            {!roleLoading && role === "rider" && (
              <>
                <h3 className="text-gray-400 text-sm uppercase mt-6 mb-2 px-4">Rider Options</h3>
                <ul className="menu space-y-1">{renderNavItems(riderItems)}</ul>
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
  );
};

export default DashboardLayout;
