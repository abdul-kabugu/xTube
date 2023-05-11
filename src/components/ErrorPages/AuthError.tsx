import Image from "next/image";
import React from "react";
import { ConnectButton } from "@crossbell/connect-kit";
export default function AuthError() {
  return (
    <div className="h-[70vh] flex items-center justify-center flex-col gap-4">
      <Image
        src={`img/signin.svg`}
        width={300}
        height={300}
        alt="svg image"
        className="w-[150px]"
      />
      <h1 className="text-2xl font-bold">Sign-In Required</h1>
      <h2 className="text-lg">
        Connect Wallet & Sign with crossbell to continue,
      </h2>
      <ConnectButton>
        {(status, { connect, disconnect }) => (
          <button
            onClick={status.isConnected ? disconnect : connect}
            className="bg-blue-700  font-sans text-white py-1.5 px-4 xl:py-2 rounded-xl"
          >
            {status.isConnected ? "Disconnect" : "Connect Wallet"}
          </button>
        )}
      </ConnectButton>
    </div>
  );
}
