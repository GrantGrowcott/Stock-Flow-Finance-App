import { useState } from "react";
import Image from "next/image";
import { useTheme } from "../context/ThemeContext";
import Logout from "./Logout";
import { toggleModal } from "../../../helpers/helpers";
import { icons } from "@/constants";

const SettingsButton = () => {
  const { darkMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

 
  return (
    <>
      <button onClick={() => toggleModal(setIsOpen)}>
        <Image
          src={darkMode ? "/settings-white.png" : "/settings-black.png"}
          width={icons.settings}
          height={icons.settings}
          alt="settings icon"
          className="ml-3"
        />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-opacity-50 z-50" onClick={() => toggleModal(setIsOpen)}>
          <div
            className="absolute top-20 right-0  bg-[var(--white)] dark:bg-[var(--darkGrey)] p-6 rounded-lg shadow-lg w-96"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col items-center content-center">
              <h2 className="text-lg font-bold">Settings</h2>
              <p className="text-sm text-[var(--lightGrey)]dark:text-[var(--lightGrey)]">Modify your preferences here.</p>
              <Logout />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SettingsButton;
