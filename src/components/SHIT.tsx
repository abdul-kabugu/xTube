import React from "react";

import { CharacterAvatar, useWeb2Url } from "@crossbell/ui";
import { useConnectedAccount, ConnectButton } from "@crossbell/connect-kit";
import { extractCharacterName } from "@crossbell/util-metadata";

export default function IndexPage() {
  return (
    <div>
      <Header />
      <Connection />
    </div>
  );
}

function Header() {
  const logoUrl = useWeb2Url(
    "ipfs://bafkreidtjso4rkvefy2yd63p2r2fze74yxadnpc5wbrgrz5yunkd6tnxo4"
  );

  return (
    <div className="flex items-center justify-center p-6">
      <img src={logoUrl} alt="Crossbell Logo" />
    </div>
  );
}

function Connection() {
  const account = useConnectedAccount();
  const characterName = extractCharacterName(account?.character);
  const address = account?.type === "email" ? account.email : account?.address;

  return (
    <div className="max-w-2xl ">
      <div className="h-60 flex gap-5 flex-col items-center justify-center bg-slate-500/10 rounded-2xl">
        {account?.character && (
          <div className="flex gap-2 items-center w-full max-w-[90%] md:max-w-[60%] bg-pink-500 text-black p-4 rounded-xl shadow">
            <CharacterAvatar size="30px" character={account.character} />
            <div className="flex-1 w-0 flex flex-col items-start">
              <p
                title={characterName}
                className="font-medium truncate max-w-full m-0"
              >
                {characterName}
              </p>
              <p
                title={address}
                className="text-sm opacity-80 truncate max-w-full m-0"
              >
                {address}
              </p>
            </div>
          </div>
        )}

        <ConnectButton>
          {(status, { connect, disconnect }) => (
            <button
              onClick={status.isConnected ? disconnect : connect}
              className="bg-purple-500 py-2 px-4 rounded-lg"
            >
              {status.isConnected ? "Disconnect" : "Connect"}
            </button>
          )}
        </ConnectButton>
      </div>
    </div>
  );
}
