import { MostLiked, Popular } from "@/components/discover";
import TrendingPage from "@/components/trending/TrendingPage";
import { useState } from "react";
import { AiOutlineVideoCamera } from "react-icons/ai";
import { TbBadge } from "react-icons/tb";
import Head from "next/head";
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
      <Head>
        <title>Discover</title>
        <meta
          name="description"
          content="xTube - Decentralized video-sharing platform "
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        {/* Twitter */}
        <meta
          name="twitter:card"
          content={`xTube - Decentralized video-sharing platform on subsocial`}
          key="twcard"
        />
        <meta name="twitter:creator" content={`xTube`} key="twhandle" />

        {/* Open Graph */}
        <meta property="og:url" content={`/`} key="ogurl" />
        <meta property="og:image" content={`/img/cover.png`} key="ogimage" />
        <meta
          property="og:site_name"
          content={`xTube -  Decentralized video shring platform`}
          key="ogsitename"
        />
        <meta
          property="og:title"
          content={`Decentralized video-shring platform `}
          key="ogtitle"
        />
        <meta
          property="og:description"
          content={`xTube - Decentralized video-shring platform on subsocial`}
          key="ogdesc"
        />
      </Head>
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
