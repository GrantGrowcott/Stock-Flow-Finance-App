"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setLoginState } from "../store/userSlice";
import { supabase } from "../../../lib/supabaseClient";
import Navbar from "./NavBar";
import SearchBar from "./SearchBar";
import Login from "../login/page";
import PasswordRecovery from "../password-recovery/page";
import PasswordReset from "../password-reset/page";
import EmailRegistration from "../register/page";
import { usePathname, useRouter } from "next/navigation";

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);

  const user = useSelector((state: RootState) => state.user.isLoggedIn);
  const router = useRouter();
  const pathname = usePathname();

  const toggleNavbar = () => setCollapsed((prev) => !prev);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data?.session) {
        dispatch(setLoginState(true)); // Update Redux state
        console.log(data?.session);
      }
    };

    checkSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        dispatch(setLoginState(true));
      } else {
        dispatch(setLoginState(false));
      }
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [dispatch, router]);

  const authPages = ["/register", "/password-recovery", "/password-reset", "/login"];

  if (!user) {
    if (pathname === "/register") return <EmailRegistration />;
    if (pathname === "/password-recovery") return <PasswordRecovery />;
    if (pathname === "/password-reset") return <PasswordReset />;
    return <Login />; 
  }

  return (
    <div className="flex">
      {/* Hide Navbar and SearchBar if on an auth-related page */}
      {!authPages.includes(pathname) && <Navbar collapsed={collapsed} toggleNavbar={toggleNavbar} />}
      <div className="w-full">
        {!authPages.includes(pathname) && <SearchBar collapsed={collapsed} toggleNavbar={toggleNavbar} />}
        {children}
      </div>
    </div>
  );
}
