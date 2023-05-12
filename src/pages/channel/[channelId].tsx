/* eslint-disable prettier/prettier */
// @ts-nocheck

import { ChannelPage } from "@/components/channel";
import React from "react";
import axios from "axios";
import Head from "next/head";
export default function channelId({profile}) {
  console.log("the profile check", profile)
  return (
    <div>
      <Head>
      <title>
      {profile?.metadata?.content.name || "xtube" }
     </title>
            <meta name='description' content={profile?.metadata?.content.bio || profile?.metadata?.content.name } />

              {/* Twitter */}
<meta name="twitter:card" content={`xTube`} key="twcard" />
<meta name="twitter:creator" content={profile?.metadata?.content.name || "xTube" } key="twhandle" />

{/* Open Graph */}
<meta property="og:url" content={`/channels/${profile?.handle}`} key="ogurl" />
<meta property="og:image" content={`/img/banner.png`} key="ogimage" />
<meta property="og:site_name" content={`xTube -  Decentralized video shring platform`} key="ogsitename" />
<meta property="og:title" content= {profile?.metadata?.content.name || "FrenTube" } key="ogtitle" />
<meta property="og:description" content={"xTube -  Decentralized video  sharing platform"} key="ogdesc" />
     </Head>
      <ChannelPage />
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const { channelId } = params;

  // Fetch the post data using React Query
  const BASE_URL = `https://indexer.crossbell.io/v1/characters/${channelId}`;
  try {
    const response = await axios.get(BASE_URL);
    const profile = response.data;
    return { props: { profile } };
  } catch (error) {
    console.error(error);
    return { props: { post: null } };
  }
}
