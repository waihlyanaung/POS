import Link from "next/link";
import { useState, useEffect } from "react";
import { GiStoneBlock } from "react-icons/gi";
import { LuLayoutTemplate, LuBarChartHorizontal } from "react-icons/lu";
import { TbBrandAirtable } from "react-icons/tb";
import { BsFillTicketPerforatedFill } from "react-icons/bs";
import { HiDocumentText } from "react-icons/hi";
import { usePathname } from "next/navigation"; // Import usePathname
import { BsShopWindow  } from "react-icons/bs";
import {GoDotFill } from "react-icons/go";
import {TbPhotoUp } from "react-icons/tb";
import {GrMoney} from "react-icons/gr";
const Body = () => {
  const [showInventory, setShowInventory] = useState(false);
  const pathname = usePathname(); // Define pathname here

  const toggleInventory = () => {
    setShowInventory(!showInventory);
  };

  const sideBarItems = [
    {
      label: "Sale",
      icon: <BsShopWindow />,
      additional: [
        {
          label: "Cashier",
          href: "/category", // Add the href for Cashier
          icon: <GoDotFill/>,
        },
        {
          label: "Recent",
          href: "/recent", // Add the href for Recent
          icon: <GoDotFill/>,
        },
      ],
    },
    {
      label: "Inventory",
      href: "/inventory",
      icon: <GiStoneBlock />,
      additional: [
        {
          label: "Products",
          href: "/inventory/products",
          icon: <GoDotFill />,
        },
        {
          label: "Brand",
          href: "/inventory/brand",
          icon: <GoDotFill />,
        },
        {
          label: "Stock",
          href: "/inventory/stock",
          icon: <GoDotFill />,
        },
      ],
    },
    {
      label: "Media",
      
      icon: <TbPhotoUp />,
      additional: [
      {
        label: "Photo",
        href: "/media", // Add the href for Cashier
        icon: <GoDotFill/>,
      },]
    },
    {
      label: "Finance",
      icon: <GrMoney/>,
      additional: [
        {
          label: "Daily",
          href: "/finance/daily", // Add the href for Cashier
          icon: <GoDotFill/>,
        },
        {
          label: "Monthly",
          href: "/finance/monthly", // Add the href for Recent
          icon: <GoDotFill/>,},
        ,
        {
          label: "Custom",
          href: "/finance/custom", // Add the href for Recent
          icon: <GoDotFill/>,},
      ],
    },
  ];

  useEffect(() => {
    // Check if the pathname matches Cashier or Recent, and show the submenu
    if (pathname === "/category" || pathname === "/recent") {
      setShowInventory(true);
    } else {
      setShowInventory(false);
    }
  }, [pathname]);

  return (
    <div className="flex flex-col h-full font-semibold text-zinc-500  border-b">
      {sideBarItems.map((item) => (
        <div key={item.label}>
          <button
            onClick={() => toggleInventory(item.label)}
            className={`${
              (showInventory || item.label === "Inventory") &&
              ""
            } hover:text-blue-600 transition duration-300 hover:bg-blue-200 hover:border-r-2  flex items-center py-3 rounded-sm gap-3 text-lg w-full px-10 justify-between`}
          >
            <div className="flex items-center gap-2">
              {item.icon}
              {item.label}
            </div>
            <span
              className={`${
                (showInventory || item.label === "Inventory") &&
                "rotate-90 text-purple-600"
              } transition duration-300 text-2xl`}
            >
              {item.label === "Inventory" && (
                <i className="fas fa-angle-down"></i>
              )}
            </span>
          </button>
          {item.additional && (
            <div
              className={`flex flex-col bg-white text-gray-600`}
            >
              {item.additional.map((subItem) => (
                <Link key={subItem.label} href={subItem.href}>
                  <div
                    className={`flex py-2 ml-4 hover:bg-purple-200 w-[100%] px-10 gap-2 items-center ${
                      pathname === subItem.href
                        ? "text-gray-600 bg-white border-r-2  border-blue-500"
                        : ""
                    }`}
                  >
                    {subItem.icon}
                    {subItem.label}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Body;
