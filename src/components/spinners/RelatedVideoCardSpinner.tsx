/* eslint-disable prettier/prettier */
import { fakeArray_2 } from "@/constants";
import React from "react";

export default function RelatedVideoLosderSkelton() {
  return (
    <div className="xs:hidden xl:block">
      {fakeArray_2.map((item, i) => {
        return (
          <div
            className="flex   animate-pulse gap-2 mb-3 items-center "
            key={i}
          >
            <div className="w-[150px] h-[90px] rounded-md bg-gray-300 dark:bg-gray-700"></div>
            <div>
              <div className="w-[120px] h-[8px] bg-gray-300 dark:bg-gray-700 rounded-lg mb-3"></div>
              <div className="w-[100px] h-[6px] bg-gray-300 dark:bg-gray-700 rounded-lg"></div>

              <div className="flex mt-3 gap-2">
                <div className="w-[30px] h-[5px] bg-gray-300 dark:bg-gray-700 rounded-md"></div>
                <div className="w-[50px] h-[5px] bg-gray-300 dark:bg-gray-700 rounded-md"></div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
