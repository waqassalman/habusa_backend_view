import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { BellIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { logoutUser } from "./userSlice";

const Navbar = ({ setSidebarOpen }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const userNavigation = [
    { name: "Your Profile", to: "/profile" },
    { name: "Sign out", action: () => dispatch(logoutUser()) },
  ];

  const classNames = (...classes) => classes.filter(Boolean).join(" ");

  return (
    <header className="top-0 z-30 flex items-center justify-between bg-blue-950 px-4 py-3 shadow-sm  lg:mx-3 lg:my-3 lg:rounded-xl">
      {/* === Left: Menu Toggle + Title === */}
      <div className="flex items-center gap-3">
        {/* Hamburger (visible only on mobile) */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="text-gray-300 hover:text-white focus:outline-none lg:hidden"
        >
          <Bars3Icon className="h-6 w-6" />
        </button>

        {/* <h1 className="text-white font-semibold text-lg">Dashboard</h1> */}
      </div>

      {/* === Right: Notifications + Profile === */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button
          className="relative text-gray-300 hover:text-white focus:outline-none"
          aria-label="View notifications"
        >
          <BellIcon className="h-6 w-6" />
        </button>

        {/* Profile Dropdown */}
        <Menu as="div" className="relative">
          <MenuButton className="flex items-center focus:outline-none">
            <img
              src="https://ui-avatars.com/api/?name=User"
              alt="User Avatar"
              className="h-8 w-8 rounded-full border border-gray-600"
            />
          </MenuButton>

          <MenuItems className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-1 ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
              {user?.email || "No Email"}
            </div>

            {userNavigation.map((item) => (
              <MenuItem key={item.name}>
                {({ active }) => (
                  <Link
                    to={item.to}
                    onClick={item.action}
                    className={classNames(
                      active ? "bg-gray-100" : "",
                      "block px-4 py-2 text-sm text-gray-700"
                    )}
                  >
                    {item.name}
                  </Link>
                )}
              </MenuItem>
            ))}
          </MenuItems>
        </Menu>
      </div>
    </header>
  );
};

export default Navbar;
