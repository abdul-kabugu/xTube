// @ts-nocheck
import { CommentOutline } from "@/Icons";
import { useState } from "react";
import {
  useConnectedAccount,
  ConnectButton,
  useXSettingsModal,
  useAccountCharacter,
  useIsConnected,
} from "@crossbell/connect-kit";
import { useContract } from "@crossbell/contract";
import { CharacterAvatar } from "@crossbell/ui";
import { toast } from "react-toastify";
import { CommentCard } from "../cards";
export default function Comments({ profileId, videoId, comments }) {
  const [commentTxt, setcommentTxt] = useState("");
  const account = useConnectedAccount();
  const contract = useContract();
  const character = useAccountCharacter();
  const isConnected = useIsConnected();
  /*   
 =============================
 handle comment
 ===========================
*/

  const handleComment = async () => {
    try {
      const result = await contract.postNoteForNote(
        character?.characterId, // character ID
        { content: commentTxt }, // note metadata
        profileId, // target character ID
        videoId // target note ID
      );
      toast.success(`created comment`);
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  return (
    <div className="mt-4">
      <div className="flex gap-2 items-center my-3">
        <CommentOutline className="w-4 h-4" />
        <h1 className="text-lg font-light">Comments</h1>
      </div>
      {isConnected && (
        <div className="flex gap-4 px-3 items-center">
          <CharacterAvatar size={40} character={account?.character} />
          <input
            className="py-2 px-3 rounded-md w-[80%] focus:outline-none bg-inherit border border-gray-300 dark:border-gray-700"
            placeholder="comment txt"
            value={commentTxt}
            onChange={(e) => setcommentTxt(e.target.value)}
          />
          <button
            className="bg-blue-600 py-1 px-3 rounded-lg text-white"
            onClick={handleComment}
          >
            Comment
          </button>
        </div>
      )}
      <div>
        {comments?.list?.map((item, i) => {
          return <CommentCard comment={item} key={i} />;
        })}
      </div>
    </div>
  );
}
