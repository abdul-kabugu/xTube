import {
  DisconnectOutline,
  Discover,
  FeedOutline,
  FireOutline,
  HomeOutline,
} from "@/Icons";
import Link from "next/link";
import React from "react";
import { AiOutlinePlus } from "react-icons/ai";

export default function MobileNav() {
  return (
    <div className=" border-t-gray-200 rounded-t-md bg-white dark:bg-gray-800 px-3 py-1 z-10 h-[60px] md:hidden bottom-0 top-auto fixed w-full flex ">
      <div className="flex justify-between w-full">
        <Link href={`/`}>
          <div className="flex items-center justify-center flex-col">
            <HomeOutline className="  xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
            <p className="text-xs">Home</p>
          </div>
        </Link>
        <Link href={"/subscribtions"}>
          <div className="flex items-center justify-center flex-col">
            <FeedOutline className="xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
            <p className="text-xs">Timeline</p>
          </div>
        </Link>
        <Link href={`/upload`}>
          <div className="flex items-center justify-center flex-col">
            <AiOutlinePlus className="xs:w-6 xs:h-6 sm:w-9 sm:h-9" />
            <p className="text-xs">New Video</p>
          </div>
        </Link>
        <Link href={`/trendng`}>
          <div className="flex items-center justify-center flex-col">
            <FireOutline className="xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
            <p className="text-xs">Popular</p>
          </div>
        </Link>
        <Link href={`explore`}>
          <div className="flex items-center justify-center flex-col">
            <Discover className="xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
            <p className="text-xs">Discover</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
