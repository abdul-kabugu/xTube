import {
  Verified,
  UploadOutline,
  BellOutline,
  ChannelOutline,
  ChevronLeftOutline,
  ChevronRightOutline,
  FeedOutline,
  HomeOutline,
  ExploreOutline,
  AddImageOutline,
  CollectOutline,
  CopyOutline,
  DisconnectOutline,
  LikeOutline,
  DislikeOutline,
  CommentOutline,
  EmojiOutline,
  ExternalOutline,
  FireOutline,
  GlobeOutline,
  HandWaveOutline,
  YppOutline,
  Discover,
} from "@/Icons";
import { YoutubeIcon } from "@crossbell/ui";
import { useTheme } from "next-themes";
import React from "react";

export default function IconsAll() {
  const { systemTheme, theme, themes, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  console.log("the theme", currentTheme);
  return (
    <div>
      <h1>Toggle color mode</h1>
      <button
        onClick={() =>
          theme === "dark" ? setTheme("light") : setTheme("dark")
        }
        className="cursor-pointer"
      >
        Drak mode toggler
      </button>
      <Verified />
      <UploadOutline />
      <BellOutline />
      <ChannelOutline />
      <ChevronLeftOutline />
      <ChevronRightOutline />
      <FeedOutline />
      <FireOutline />
      <HomeOutline />
      <ExploreOutline />
      <AddImageOutline />
      <CollectOutline />
      <CopyOutline />
      <DisconnectOutline />
      <LikeOutline />
      <DislikeOutline />
      <CommentOutline />
      <EmojiOutline />
      <ExternalOutline />
      <GlobeOutline />
      <HandWaveOutline />
      <YoutubeIcon />
      <YppOutline />
      <Discover />
    </div>
  );
}
