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

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  
  const user = useSelector((state: RootState) => state.user.isLoggedIn);
  const authPage = useSelector((state: RootState) => state.user.authPage);

  const toggleNavbar = () => setCollapsed((prev) => !prev);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      console.log(authPage)
      if (data?.session) {
        dispatch(setLoginState(true)); // Update Redux state
        console.log(data?.session)
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
  }, [dispatch]);

  return user ? (
    <div className="flex">
      <Navbar collapsed={collapsed} toggleNavbar={toggleNavbar} />
      <SearchBar collapsed={collapsed} toggleNavbar={toggleNavbar} />
      {children}
    </div>
  ) : (
    <div>
      {authPage === "login" && <Login />}
      {authPage === "password-recovery" && <PasswordRecovery />}
      {authPage === "password-reset" && <PasswordReset />}
      {authPage === "register" && <EmailRegistration />}
    </div>
  );
}
