"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setLoginState } from "../store/userSlice";
import { supabase } from "../../../lib/supabaseClient";
import Navbar from "./NavBar";
import SearchBar from "./SearchBar";
import Login from "../login/page";

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const user = useSelector((state: RootState) => state.user.isLoggedIn);
  
  const toggleNavbar = () => setCollapsed((prev) => !prev);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data?.session) {
        dispatch(setLoginState(true)); // Update Redux state
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
    <Login />
  );
}
