/* eslint-disable prettier/prettier */
// @ts-nocheck
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/router";
import { Indexer } from "crossbell.js";
const indexer = new Indexer();
import React from "react";
import { VideoPage } from "@/components/video";
import Head from "next/head";
import { IPFS_GATEWAY } from "@/constants";
export default function VideoId({ post }) {
  const router = useRouter();
  const { videoId } = router.query;
  console.log("the full video", post);
  // Add error checking for router.query
  if (!router || !videoId) {
    return <div>Loading...</div>;
  }
  /*===================================
   Splitting  Profile Id and post id
   =======================================
   */
  const [profileId, postId] = videoId?.split("-");

  return (
    <div>
      <Head>
            <title>{post?.metadata?.content.title}</title>
            <meta name='description' content={post?.metadata?.content.content} />

              {/* Twitter */}
<meta name="twitter:card" content={post?.metadata?.content.title} key="twcard" />
<meta name="twitter:creator" content={`xTube app`} key="twhandle" />

{/* Open Graph */}
<meta property="og:url" content={`/watch/${postId}`} key="ogurl" />
<meta property="og:image" content={`${IPFS_GATEWAY}${post?.metadata?.content?.attachments[0].name}`} key="ogimage" />
<meta property="og:site_name" content={`xTube -  Decentralized video shring platform`} key="ogsitename" />
<meta property="og:title" content={post?.metadata?.content.title} key="ogtitle" />
<meta property="og:description" content={post?.metadata?.content.content} key="ogdesc" />
        </Head>
      <VideoPage post={post} profileId={profileId} videoId={postId} />
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const { videoId } = params;
  const [profileId, postId] = videoId?.split("-");
  // Fetch the post data using React Query
  const BASE_URL = `https://indexer.crossbell.io/v1/notes/${profileId}/${postId}`;
  try {
    const response = await axios.get(BASE_URL);
    const post = response.data;
    return { props: { post } };
  } catch (error) {
    console.error(error);
    return { props: { post: null } };
  }
}
