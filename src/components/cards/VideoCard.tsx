// @ts-nocheck
import { IPFS_GATEWAY } from "@/constants";
import { useState } from "react";
import Image from "next/image";
import { CharacterAvatar, useWeb2Url } from "@crossbell/ui";
import Link from "next/link";
import moment from "moment";

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
  const duration = moment.duration(diffInHours, "hours");
  return (
    <div className="border border-red-600 rounded-md shadow-md  xs:w-full md:w-[340px]  lg:w-[316px] xl:w-[290px] flex-grow flex-shrink lg:max-w-[450px]">
      <Link href={`watch/${post.character?.characterId}-${post?.noteId}`}>
        <div className="ring-2 ring-green-700 rounded-lg ">
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
            <CharacterAvatar
              character={post.character}
              size={40}
              className="xl:w-[200px]"
            />
          </Link>
          {post.metadata.content.title ? (
            <h1 className="text-xl font-semibold leading-5 ">
              {post.metadata.content.title}
            </h1>
          ) : (
            <h1 className="text-xl font-semibold leading-5 ">
              Post By {post.character?.handle}
            </h1>
          )}
        </div>
        <div className="flex gap-2 ml-10  ">
          <Link href={`channel/${post.character?.characterId}`}>
            {" "}
            <p className="font-light">{post.character?.handle}</p>
          </Link>
          <p className="font-light">
            {duration.humanize().replace("a ", "")} ago
          </p>
        </div>
      </div>
    </div>
  );
}
