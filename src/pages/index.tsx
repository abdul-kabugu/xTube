/* eslint-disable prettier/prettier */
import React from "react";

import { CharacterAvatar, useWeb2Url } from "@crossbell/ui";
import { useConnectedAccount, ConnectButton } from "@crossbell/connect-kit";
import { extractCharacterName } from "@crossbell/util-metadata";
import { Verified } from "@/Icons";
import IconsAll from "@/components/IconsAll";
import { Home } from "@/components/home";
import Head from "next/head";
export default function IndexPage() {
  return (
    <div className="">
      <Head>
        <title>Home</title>
        <meta name="description" content="xTube - Decentralized video-sharing platform " />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

          {/* Twitter */}
<meta name="twitter:card" content={`xTube - Decentralized video-sharing platform on subsocial`} key="twcard" />
<meta name="twitter:creator" content={`xTube`} key="twhandle" />

{/* Open Graph */}
<meta property="og:url" content={`/`} key="ogurl" />
<meta property="og:image" content={`/img/cover.png`} key="ogimage" />
<meta property="og:site_name" content={`xTube -  Decentralized video shring platform`} key="ogsitename" />
<meta property="og:title" content={`Decentralized video-shring platform `} key="ogtitle" />
<meta property="og:description" content={`xTube - Decentralized video-shring platform on subsocial`} key="ogdesc" />
      </Head>
      <Home />
    </div>
  );
}
