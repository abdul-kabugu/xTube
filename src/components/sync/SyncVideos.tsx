/* eslint-disable prettier/prettier */
import React from "react";

export default function SyncVideos() {
    function openURLInNewTab(url : any) {
        let newTab = window.open(url, '_blank');
        newTab?.focus();
      }
  return (
<div className="flex items-center justify-center flex-col h-[70vh] gap-3">
  <h1 className="text-5xl font-bold text-center">Connect and Sync Your Videos <br /> from Anywhere</h1>
   <p className="text-xl font-semibold text-center font-sans">Seamlessly import your content from YouTube, TikTok, <br /> and Instagram to crossbell</p>
    <button className="font-semibold text-white bg-blue-700 py-3 px-5 rounded-lg" onClick={() => openURLInNewTab("https://xsync.crossbell.io/")}>Sync Now </button>
</div>
  )
}
