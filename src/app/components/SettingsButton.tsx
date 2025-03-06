import { useState } from "react";
import Image from "next/image";
import { useTheme } from "../context/ThemeContext";
import Logout from "./Logout";

const SettingsButton = () => {
  const { darkMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <button onClick={toggleModal}>
        <Image
          src={darkMode ? "/settings-white.png" : "/settings-black.png"}
          width={35}
          height={35}
          alt="settings icon"
          className="ml-3"
        />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={toggleModal}>
          <div
            className="absolute top-20 right-0  bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col items-center content-center">
              <h2 className="text-lg font-bold">Settings</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">Modify your preferences here.</p>
              <Logout />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SettingsButton;
