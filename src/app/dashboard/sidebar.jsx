"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Home, User, Settings, Bell, BarChart2, LogOut, Edit, BookOpen } from "lucide-react";

const Sidebar = () => {
  const [openDropdown, setOpenDropdown] = useState(null); // Track which dropdown is open

  const handleDropdown = (label) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  return (
    <div
      className="fixed left-0 top-0 h-screen w-64 bg-white dark:bg-zinc-900 shadow-xl border-r border-zinc-200 dark:border-zinc-700 flex flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-700"
    >
      {/* Logo */}
      <div className="px-6 py-6">
        <h1 className="text-2xl font-bold text-blue-600">
          First<span className="text-black dark:text-white">Startup</span>
        </h1>
      </div>

      {/* Nav Items */}
      <nav className="flex flex-col gap-1 px-4 py-2">
        {menuItems.map((item, index) => (
          <div key={index}>
            {item.children ? (
              <>
                <button
                  onClick={() => handleDropdown(item.label)}
                  className="flex items-center justify-between gap-3 px-4 py-3 rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-blue-600 hover:text-white transition-all group w-full"
                >
                  <div className="flex items-center gap-3">
                    <item.icon size={20} className="group-hover:stroke-white transition-all" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                  <span className="text-sm">{openDropdown === item.label ? "-" : "+"}</span>
                </button>

                {/* Dropdown children */}
                {openDropdown === item.label && (
                  <div className="flex flex-col ml-8 mt-1">
                    {item.children.map((child, idx) => (
                      <Link
                        key={idx}
                        href={child.path}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-blue-500 hover:text-white transition-all text-sm"
                      >
                        <child.icon size={16} />
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <Link
                href={item.path}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-blue-600 hover:text-white transition-all group"
              >
                <item.icon size={20} className="group-hover:stroke-white transition-all" />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            )}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="mt-auto px-4 py-4 border-t border-zinc-200 dark:border-zinc-700">
        <button className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-blue-600 hover:text-white transition-all group">
          <LogOut size={20} className="group-hover:stroke-white" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

// Menu Items Array with paths
const menuItems = [
  { label: "Dashboard", icon: Home, path: "/dashboard" },
  { 
    label: "Blogs", 
    icon: User, 
    children: [
      { label: "Post Blog", icon: Edit, path: "/dashboard/postblog" },
      { label: "Read Blogs", icon: BookOpen, path: "/dashboard/readblog" },
    ]
  },
  { label: "Notifications", icon: Bell, path: "/notifications" },
  { label: "Analytics", icon: BarChart2, path: "/analytics" },
  { label: "Settings", icon: Settings, path: "/settings" },
];
