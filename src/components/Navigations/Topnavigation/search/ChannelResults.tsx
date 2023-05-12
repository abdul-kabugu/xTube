/* eslint-disable prettier/prettier */
// @ts-nocheck

import { CharacterAvatar } from "@crossbell/ui";
import Link from "next/link";
import React from "react";
import { ClipLoader } from "react-spinners";

export default function ChannelResults({
  channels,
  isChannelsLoading,
  isChannelsError,
  isChannelsRefeteching,
}) {
  console.log("channels results", channels);
  if (isChannelsLoading || isChannelsRefeteching) {
    return (
      <div className="flex items-center justify-center">
        <ClipLoader className="dark:bg-gray-200" />
      </div>
    );
  }
  return (
    <div className="px-3 my-2">
      {channels?.data?.list.map((item, i) => {
        return (
          <Link key={i} href={`/channel/${item?.characterId}`}>
            <div className="py-1 px-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700">
              <div className="flex gap-2 items-center">
                <CharacterAvatar size={25} character={item} />
                <h2>{item?.metadata?.content?.name}</h2>
              </div>
              <p className="text-sm font-light">
                {item?.metadata?.content?.bio || item?.handle}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
