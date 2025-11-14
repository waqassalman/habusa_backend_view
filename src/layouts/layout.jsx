import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useLocation, Link } from "react-router-dom";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // ✅ Format breadcrumb names
  const formatBreadcrumbName = (segment) => {
    if (!segment) return "";
    const map = {
      "add-product": "Add Product",
      "update-product": "Update Product",
      product: "Product",
      products: "Products",
      customers: "Customers",
      orders: "Orders",
      payments: "Payments",
      profile: "Profile",
    };
    return (
      map[segment] ||
      segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    );
  };

  // ✅ Generate breadcrumbs dynamically
  const generateBreadcrumbs = () => {
    const pathnames = location.pathname.split("/").filter((x) => x);
    // if (pathnames[0] === "dashboard") pathnames.shift();

    return (
      <ol className="inline-flex items-center space-x-1 md:space-x-2">
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 0).join("/")}`;
          const isLast = index === pathnames.length - 1;
          const formattedValue = formatBreadcrumbName(value);

          return (
            <li key={to} className="inline-flex items-center">
              {index > 0 && (
                <ChevronRightIcon className="w-4 h-4 text-gray-400 mx-1" />
              )}
              {isLast ? (
                <span className="text-gray-500 font-medium">
                  {formattedValue}
                </span>
              ) : (
                <Link
                  to={to}
                  className="text-gray-700 hover:text-indigo-600 font-medium"
                >
                  {formattedValue}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* ✅ Sidebar on the left */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* ✅ Main content area */}
      <div className="flex flex-col flex-1 lg:ml-70 transition-all duration-300">
        {/* Navbar (top) */}
        <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Header with breadcrumbs */}
        <header className="bg-white shadow-sm lg:mx-3 lg:rounded-xl">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-5 flex items-center justify-between">
            <h1 className="text-md font-bold text-gray-900">
              {generateBreadcrumbs()}
            </h1>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6 bg-white shadow-sm lg:rounded-xl lg:my-3 lg:mx-3">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
