/* eslint-disable prettier/prettier */
// @ts-nocheck

import Link from "next/link";
import React from "react";
import { ClipLoader } from "react-spinners";
export default function VideoResults({
  videos,
  isVideosLoading,
  isVideosError,
  isVideosRefetching,
}) {
  console.log("video search from it's page", videos);
  if (isVideosLoading || isVideosRefetching) {
    return (
      <div className="flex items-center justify-center">
        <ClipLoader />
      </div>
    );
  }
  return (
    <div className="px-3 my-2">
      {videos?.data?.list?.map((item, i) => {
        return (
          <Link key={i} href={`/watch/${item?.characterId}-${item.noteId}`}>
            <div className="py-1 hover:bg-gray-300 px-3 rounded-lg hover:dark:bg-gray-700">
              <h1>{item?.metadata?.content?.title}</h1>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
