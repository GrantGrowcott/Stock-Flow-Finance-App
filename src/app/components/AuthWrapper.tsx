"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setLoginState } from "../store/userSlice";
import { supabase } from "../../../lib/supabaseClient";
import Navbar from "./NavBar";
import SearchBar from "./SearchBar";
import LoginWidget from "./LoginWidget";
import PasswordRecoveryWidget from "./PasswordRecoveryWidget";
import PasswordResetWidget from "./PasswordResetWidget";
import RegistrationWidget from "./RegistrationWidget";
import { usePathname } from "next/navigation";

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);

  const user = useSelector((state: RootState) => state.user.isLoggedIn);
  const pathname = usePathname();

  const toggleNavbar = () => setCollapsed((prev) => !prev);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data?.session) {
        dispatch(setLoginState(true));
      }
    };

    checkSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      dispatch(setLoginState(!!session));
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [dispatch]);

  const authPages = ["/register", "/password-recovery", "/password-reset", "/login"];

  if (!user) {
    if (pathname === "/register") return <RegistrationWidget />;
    if (pathname === "/password-recovery") return <PasswordRecoveryWidget />;
    if (pathname === "/password-reset") return <PasswordResetWidget />;
    return <LoginWidget />;
  }

  return (
    <div className="flex">
      {!authPages.includes(pathname) && <Navbar collapsed={collapsed} toggleNavbar={toggleNavbar} />}
      <div className="w-full">
        {!authPages.includes(pathname) && <SearchBar collapsed={collapsed} toggleNavbar={toggleNavbar} />}
        {children}
      </div>
    </div>
  );
}
