import { useEffect, useState } from "react";
import type { User } from "firebase/auth";
import { subscribeToAuth } from "../services/auth";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToAuth(setUser);
    return () => unsubscribe();
  }, []);

  return user;
};
