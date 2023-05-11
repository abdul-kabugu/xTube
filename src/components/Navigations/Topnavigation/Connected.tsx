import { useState, Fragment, useEffect, useRef } from "react";
import { CharacterAvatar, useWeb2Url } from "@crossbell/ui";
import {
  useConnectedAccount,
  ConnectButton,
  useXSettingsModal,
} from "@crossbell/connect-kit";
import { extractCharacterName } from "@crossbell/util-metadata";
import { IoMdNotificationsOutline } from "react-icons/io";
import { TbVideoPlus } from "react-icons/tb";
import { Menu, Transition } from "@headlessui/react";
import { profileMenuLinks } from "@/constants";
import { AiOutlineSetting } from "react-icons/ai";
import { VscSignOut } from "react-icons/vsc";
import { useShowNotificationModal } from "@crossbell/notification";
import { BellOutline, MoonOutline, SunOutline, UploadOutline } from "@/Icons";
import { useTheme } from "next-themes";
import Link from "next/link";
export default function Connected() {
  const account = useConnectedAccount();

  const characterName = extractCharacterName(account?.character);
  const address = account?.type === "email" ? account.email : account?.address;
  const { show: showSettings, isActive, hide } = useXSettingsModal();
  const { theme, systemTheme, setTheme } = useTheme();
  const show = useShowNotificationModal();

  const handleToggleThemes = () => {
    theme === "dark" ? setTheme("light") : setTheme("dark");
  };
  const UserConnected = () => {
    return (
      <div className="flex items-center gap-2">
        <div className="hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer h-8 w-8 flex items-center justify-center rounded-full py-0.5 px-1.5">
          <BellOutline className="w-6 h-6  rounded-full " onClick={show} />
        </div>
        <Link href={`/upload`}>
          <div className="flex xs:gap-1 md:gap-2 items-center bg-blue-700 text-white xs:py-1.5 md:py-2 xs:px-2 md:px-3 font-sans rounded-lg cursor-pointer xs:hidden md:flex ">
            <TbVideoPlus />
            <button>New video</button>
          </div>
        </Link>
        <div>
          <Menu as="div" className="relative ">
            <Menu.Button>
              <div className="border border-gray-200 dark:border-gray-600 flex gap-2 py-1 px-3 items-center rounded-xl cursor-pointer ">
                <CharacterAvatar size={30} character={account?.character} />
                <p
                  title={characterName}
                  className="font-semibold text-lg xs:hidden md:block "
                >
                  {characterName}
                </p>
              </div>
            </Menu.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-300"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items
                as="div"
                className="absolute right-0 bg-white dark:bg-gray-900 shadow-lg  border border-indigo-200 dark:border-gray-700 rounded-lg w-[220px] px-4 py-3"
              >
                {profileMenuLinks.map((link, i) => {
                  return (
                    <Menu.Item key={i}>
                      <div className="flex items-center gap-2 cursor-pointer  py-2 hover:bg-indigo-100 dark:hover:bg-gray-700 px-2 rounded-lg my-3">
                        <link.icon className="w-4 h-4 " />
                        <p className=" text-sm  capitalize ">{link.title}</p>
                      </div>
                    </Menu.Item>
                  );
                })}

                <Menu.Item>
                  <div
                    className="flex items-center gap-2 cursor-pointer  py-2 hover:bg-indigo-100 dark:hover:bg-gray-700 px-2 rounded-lg my-3"
                    onClick={showSettings}
                  >
                    <AiOutlineSetting className="w-5 h-5" />
                    <button className=" text-sm capitalize ">
                      Channel Settings
                    </button>
                  </div>
                </Menu.Item>
                <Menu.Item>
                  {theme === "dark" ? (
                    <div
                      className="flex items-center gap-2 cursor-pointer  py-2 hover:bg-indigo-100 dark:hover:bg-gray-700 px-2 rounded-lg my-3"
                      onClick={handleToggleThemes}
                    >
                      <SunOutline className="w-4 h-4" />
                      <button className="text-sm">Swith to Light</button>
                    </div>
                  ) : (
                    <div
                      className="flex items-center gap-2 cursor-pointer  py-2 hover:bg-indigo-100 dark:hover:bg-gray-700 px-2 rounded-lg my-3"
                      onClick={handleToggleThemes}
                    >
                      <MoonOutline className="w-4 h-4 " />
                      <button className="text-sm">Switch to Dark</button>
                    </div>
                  )}
                </Menu.Item>
                <Menu.Item>
                  <ConnectButton>
                    {(status, { connect, disconnect }) => (
                      <div
                        className="flex items-center gap-2 cursor-pointer  py-2 hover:bg-indigo-100 dark:hover:bg-gray-700 px-2 rounded-lg my-3"
                        onClick={disconnect}
                      >
                        <VscSignOut className="w-5 h-5" />
                        <button className=" capitalize ">Signout</button>
                      </div>
                    )}
                  </ConnectButton>
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    );
  };

  const ConnectWallet = () => {
    return (
      <ConnectButton>
        {(status, { connect, disconnect }) => (
          <button
            onClick={status.isConnected ? disconnect : connect}
            className="bg-blue-700  font-sans text-white py-1.5 px-4 rounded-xl"
          >
            {status.isConnected ? "Disconnect" : "Connect Wallet"}
          </button>
        )}
      </ConnectButton>
    );
  };

  return (
    <div>{account?.character ? <UserConnected /> : <ConnectWallet />}</div>
  );
}
