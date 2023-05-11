import React from "react";
import Connected from "./Connected";
import Search from "./Search";
import { Tsidebar } from "@/types";
export default function TopNav({ isExpanded }: Tsidebar) {
  return (
    <div
      className={`flex ${
        isExpanded ? " md:ml-[120px]" : "md:ml-[70px]"
      } justify-between ml-0  px-3 py-2 sticky top-0 items-center bg-white dark:bg-gray-800 z-10 md:mb-1 `}
    >
      <div>
        <h1 className="font-semibold text-xl">xTube</h1>
      </div>

      <Search />
      <Connected />
    </div>
  );
}
