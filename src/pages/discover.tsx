import { MostLiked, Popular } from "@/components/discover";
import TrendingPage from "@/components/trending/TrendingPage";
import { useState } from "react";
import { AiOutlineVideoCamera } from "react-icons/ai";
import { TbBadge } from "react-icons/tb";
import {
  CollectOutline,
  CommentOutline,
  FireOutline,
  LikeOutline,
} from "@/Icons";
export default function Discover() {
  const [tab, setTab] = useState(0);
  const getCurrentTab = () => {
    if (tab === 0) {
      return <TrendingPage />;
    } else if (tab === 1) {
      return (
        <>
          {/*<Popular />*/}
          <TrendingPage />
        </>
      );
    } else if (tab === 2) {
      return (
        <>
          {/*<MostLiked />*/}
          <TrendingPage />
        </>
      );
    }
  };
  return (
    <div>
      <div className=" my-4 flex gap-4">
        <div
          className={`${
            tab === 0 && "bg-gray-300 dark:bg-gray-700"
          }  flex gap-2 w-[110px] px-2 py-1 rounded-xl items-center justify-center cursor-pointer `}
          onClick={() => setTab(0)}
        >
          <FireOutline className="w-4 h-4" />
          <button className={``}>Trending</button>
        </div>
        <div
          className={`${
            tab === 1 && "bg-gray-300 dark:bg-gray-700"
          }  flex gap-2 w-[110px] px-2 py-1 rounded-xl items-center justify-center cursor-pointer`}
          onClick={() => setTab(1)}
        >
          <CommentOutline className="w-4 h-4" />
          <button className={``}>Popular</button>
        </div>
        <div
          className={`${
            tab === 2 && "bg-gray-300 dark:bg-gray-700"
          }  flex gap-2 w-[130px] px-2 py-1 rounded-xl items-center justify-center cursor-pointer`}
          onClick={() => setTab(2)}
        >
          <LikeOutline className="w-4 h-4" />
          <button className={``}>Most Liked</button>
        </div>
      </div>

      <div>{getCurrentTab()}</div>
    </div>
  );
}
