/* eslint-disable prettier/prettier */
// @ts-nocheck
import { IPFS_GATEWAY } from "@/constants";
import { useState } from "react";
import Image from "next/image";
import { CharacterAvatar, useWeb2Url } from "@crossbell/ui";
import Link from "next/link";
import moment from "moment";
import useTruncateText from "@/hooks/useTruncateText";

type postTypes = {
  post: any;
};

export default function VideoCard({ post }: postTypes) {
  const web2Url = useWeb2Url(`post?.metadata?.content?.attachments[0].name`);
  console.log("the post is here", post);
  const [currentTime, setCurrentTime] = useState(new Date());
  const currentDate = new Date();
  const videoCreatedAt = new Date(post?.createdAt);
  const diffInMilliseconds = currentDate - videoCreatedAt;
  const diffInHours = diffInMilliseconds / (60 * 60 * 1000);
  const {shortenTxt} = useTruncateText()
  const duration = moment.duration(diffInHours, "hours");
  return (
    <div className=" rounded-md shadow-sm mb-4 xs:w-full md:w-[340px]  lg:w-[316px] xl:w-[290px] flex-grow flex-shrink md:max-w-[320px]">
      <Link href={`watch/${post.character?.characterId}-${post?.noteId}`}>
        <div className="  rounded-lg ">
          <Image
            src={`${IPFS_GATEWAY}/${post?.metadata?.content?.attachments[0].name}`}
            width={1200}
            height={600}
            alt="cover"
            className="object-cover rounded-lg"
          />
        </div>
      </Link>

      <div className="mt-3 px-3">
        <div className="flex gap-2">
          <Link href={`channel/${post.character?.characterId}`}>
            <div className="min-w-[40px]">
            <CharacterAvatar
              character={post.character}
                size={40}
               
            />
            </div>
          </Link>
          <div>
          {post.metadata.content.title ? (
            <h1 className="text-lg font-semibold leading-5 ">
              { shortenTxt(post.metadata.content.title, 35) }
            </h1>
          ) : (
            <h1 className="text-lg font-semibold leading-5 ">
              Post By {shortenTxt(post.character?.handle, 35) }
            </h1>
          )}
        
        <div className="flex gap-2 mt-1  ">
          <Link href={`channel/${post.character?.characterId}`}>
            {" "}
            <p className="font-light text-sm">{post.character?.metadata?.content?.name}</p>
          </Link>
          <p className="font-light text-sm">
            {duration.humanize().replace("a ", "")} ago
          </p>
        </div>
      </div>
      </div>
      </div>
    </div>
  );
}
