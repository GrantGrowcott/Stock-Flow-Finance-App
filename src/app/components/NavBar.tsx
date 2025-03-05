"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const [profileImage, setProfileImage] = useState("/placeholder-black.png"); 
  const [user,setUser] = useState("Investor")
  const { darkMode } = useTheme();

  useEffect(() => {
    const seeUserData = async () => {
      const { data } = await supabase.auth.getUser();
      const image_url = data.user?.user_metadata?.avatar_url;
      const user_email = data.user?.user_metadata?.email
      
      if (image_url || user_email) {
        setProfileImage(image_url);
        setUser(user_email); 
      } 
      else if (darkMode) {
        setProfileImage("/placeholder-white.png"); 
      } else {
        setProfileImage("/placeholder-black.png"); 
      }
    };
    seeUserData(); 
  }, [darkMode]); 

  return (
    <div className="h-screen w-80 bg-[var(--white)] text-[var(--black)] dark:bg-[var(--darkGrey)] dark:text-[var(--white)] p-6 flex flex-col">
      <ul className="flex flex-col">
       <Image src= "/stock-flow-blue.png" width={200} height={100} alt="Stock Flow Logo"/>
      </ul>
      <ul className="flex flex-col mt-10 space-y-10 flex-grow">
        <li>
          <Link href= "/"><h3>Home</h3></Link>
        </li>
        <li>
          <a href="#">Retirement Calculator</a>
        </li>
        <li>
        <Link href= "/rate-of-return"><h3>Rate of Return Calculator</h3></Link>
        </li>
        <li>
          <a href="#">Stock Screener</a>
        </li>
        <li>
          <a href="#">Portfolio Tracker</a>
        </li>
      </ul>
      <ul>
        <button>
          <div className="flex gap-4">
            {profileImage && <Image src={profileImage} alt="Profile Pic" width={50} height={50} className="rounded-2xl"/>}
            <div className="flex items-center justify-center">
              <a href="#">
                <h3>{user}</h3>
              </a>
            </div>
          </div>
        </button>
      </ul>
    </div>
  );
};

export default Navbar;
