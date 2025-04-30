/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { ILogin, IRegister, IUser, IUserSession } from "@/types";
import { createContext, useEffect, useState, ReactNode, useContext } from "react";
import Cookies from "js-cookie";

const APIURL = process.env.NEXT_PUBLIC_API_URL;


export interface IUserContextProps {
  user: IUserSession | null;
  setUser: (user: IUserSession | null) => void;
  registerUser: (userData:IRegister ) => Promise<void>;
  loginUser: (loginData: ILogin) => Promise<void>;
  logoutUser: () => void;
  updateUserProfile: (newValues: Partial<IUser>) => void;
};

export const UsersContext = createContext<IUserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUserSession | null>(null) ;
  
  
  useEffect(() => {
    const storedUser = localStorage.getItem("userSession");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  
  const registerUser = async (userData: IRegister) => {
    try {
      const response = await fetch(`${APIURL}/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      })
      const data = await response.json();
      if (!response.ok) throw new Error (data.message || "Registration Failed. Please, try again" )
    } catch (err) {
      throw err
    }
  }

  const loginUser = async (loginData: ILogin) => {
    try {
      const response = await fetch(`${APIURL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error( data.message || "Login failed. Please try again");

      setUser({token: data.token, user:data.user});
      localStorage.setItem("userSession", JSON.stringify({token: data.token, user: data.user}));
      Cookies.set("userSession", JSON.stringify({token: data.token, user: data.user}))
    } catch (err) {
      throw err;
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("userSession");
    Cookies.remove("userSession");
    setUser(null);
  };

  const updateUserProfile = (newValues: Partial<IUser>) => {
    setUser((prev) => {
      if (!prev) return prev;

      const updatedUser = {
        ...prev,
        user: {
          ...prev.user,
          ...newValues,
        },
      };

      localStorage.setItem("userSession", JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  return (
    <UsersContext.Provider value={{ user, setUser, loginUser, logoutUser, registerUser, updateUserProfile}}>
      {children}
    </UsersContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error("useAuth must be used within a UserProvider");
  }
  return context;
};
