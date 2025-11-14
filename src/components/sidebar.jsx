import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { BellIcon, XMarkIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { logoutUser } from "./userSlice";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();

  const navigation = [
    {
      name: "Dashboard",
      to: "/dashboard",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
</svg>

      ),
    },
    {
      name: "Products",
      to: "/products",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 10.5V6a3.75 3.75 0
            1 0-7.5 0v4.5m11.356-1.993 1.263
            12c.07.665-.45 1.243-1.119
            1.243H4.25a1.125 1.125 0 0
            1-1.12-1.243l1.264-12A1.125
            1.125 0 0 1 5.513 7.5h12.974c.576 0
            1.059.435 1.119 1.007ZM8.625
            10.5a.375.375 0 1 1-.75 0
            .375.375 0 0 1 .75 0Zm7.5
            0a.375.375 0 1 1-.75 0
            .375.375 0 0 1 .75 0Z"
          />
        </svg>
      ),
    },
    { name: "Customers", to: "/customers", icon:( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
  </svg>
   ) },
    { name: "Orders", to: "/orders", icon:( <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
  </svg>
  
  ) },
    { name: "Payments", to: "/payments", icon:(<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
  </svg>
  ) },
  ];

  const classNames = (...classes) => classes.filter(Boolean).join(" ");

  return (
    <>
      {/* === SIDEBAR === */}
      <aside
        className={` fixed z-40 w-64 h-full bg-white transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:mx-3 lg:my-3 lg:rounded-xl shadow-sm`}
      >
        <div className="flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-center p-5">
            <Link to="/dashboard">
              <img src="/assets/urbantechs.svg" alt="Logo" width={150} />
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-600 hover:text-gray-900"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Nav */}
          <nav className="flex-1 overflow-y-auto p-5 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                className={classNames(
                  location.pathname.startsWith(item.to)
                    ? "bg-blue-950 text-white"
                    : "text-blue-950 hover:bg-blue-950 hover:text-white",
                  "flex items-center gap-3 rounded-md px-2 py-2 text-sm font-medium"
                )}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
