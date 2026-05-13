"use client";

import React, { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string) => void;
  signup: (name: string, email: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    try {
      const item = window.localStorage.getItem("scholarSyncUser");
      if (item) {
        setUser(JSON.parse(item));
      }
    } catch (error) {
      console.warn("Could not load user from localStorage", error);
    }
    setIsInitialLoad(false);
  }, []);

  useEffect(() => {
    if (!isInitialLoad) {
      try {
        if (user) {
          window.localStorage.setItem("scholarSyncUser", JSON.stringify(user));
        } else {
          window.localStorage.removeItem("scholarSyncUser");
        }
      } catch (error) {
        console.warn("Could not save user to localStorage", error);
      }
    }
  }, [user, isInitialLoad]);

  const login = (email: string) => {
    // In a real app, you'd validate against a backend.
    // Here, we'll just create a mock user.
    const name = email.split("@")[0].replace(/^\w/, c => c.toUpperCase());
    const loggedInUser = { name, email };
    setUser(loggedInUser);
    toast({
      title: "Logged In!",
      description: `Welcome back, ${name}!`,
    });
    router.push("/");
  };

  const signup = (name: string, email: string) => {
    // In a real app, you'd create a new user in the backend.
    const newUser = { name, email };
    setUser(newUser);
    toast({
      title: "Account Created!",
      description: `Welcome, ${name}!`,
    });
    router.push("/");
  };

  const logout = () => {
    setUser(null);
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
