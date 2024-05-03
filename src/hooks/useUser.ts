"use client";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import posthog from "posthog-js";

const USER_SESSION_KEY = "user-session-cache";

export type User = {
  id: string;
  name: string;
  email?: string;
  image: string;
};

function parseUser(json: any) {
  const user: User = {
    ...json,
    image: json.image ?? `https://avatar.vercel.sh/${json.id}`,
    name: json.name ?? "fren",
  };

  return user;
}

function loadSessionStorage(): User | undefined {
  if (typeof window === "undefined") return undefined;

  const userJSON = sessionStorage.getItem(USER_SESSION_KEY);

  if (!userJSON) return undefined;

  return parseUser(JSON.parse(userJSON));
}

function saveSessionStorage(user: User | undefined) {
  if (user) sessionStorage.setItem(USER_SESSION_KEY, JSON.stringify(user));
  else sessionStorage.removeItem(USER_SESSION_KEY);
}

export function useUser() {
  const [user, setUser] = useState<User | undefined>();
  const { data, status } = useSession();

  useEffect(() => {
    setUser(loadSessionStorage());
  }, []);

  useEffect(() => {
    switch (status) {
      case "authenticated":
        const user = parseUser(data.user);
        setUser(user);
        saveSessionStorage(user);
        break;
      case "unauthenticated":
        setUser(undefined);
        saveSessionStorage(undefined);
        break;
      case "loading":
        setUser(loadSessionStorage());
        break;
    }
  }, [data, status]);

  useEffect(() => {
    if (user) {
      posthog.identify(user.id, { email: user.email, name: user.name });
    }
  }, [user]);

  return { user, status };
}
