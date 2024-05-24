"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState, useEffect } from "react";
import Image from "next/image";
import { DetailedHTMLProps, ButtonHTMLAttributes } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

import { useUser } from "~/hooks/useUser";
import { cn } from "~/lib/utils";

type AuthBtnProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export default function AuthBtn(props: AuthBtnProps) {
  const { user, status } = useUser();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const onClick = () => {
    if (status === "authenticated") {
      // signOut();
    } else if (status === "unauthenticated") {
      signIn();
    }
  };

  if (status === "authenticated") {
    return (
      <Link href="/profile" className="hover:scale-95 transition">
        <div className="flex flex-row gap-1 text-xs tracking-wider">
          <>
            {user && user.image ? (
              <Image
                src={user.image!}
                className="border-2 border-black"
                width="30"
                height="30"
                alt=""
              />
            ) : user ? (
              <Image
                src={`https://avatar.vercel.sh/${user!.id
                  .split("")
                  .reverse()
                  .join("")}`}
                className="border-2 border-black"
                width="30"
                height="30"
                alt=""
              />
            ) : (
              <div className="border-2 border-black animate-pulse" />
            )}
            <p className="outline-text-3 my-auto text-sm  tracking-wide line-clamp-1 h-fit max-w-24 ">
              {user && user.name ? user.name : "profile"}
            </p>
          </>
        </div>
      </Link>
    );
  }

  return (
    <button onClick={onClick} {...props} className="hover:scale-95 transition">
      <div className="flex flex-row gap-1 p-1">
        <Image
          src="/icons/login.svg"
          className=""
          width="30"
          height="30"
          alt=""
        />
        <p className="my-auto h-fit outline-text-3 text-sm sm:text-base">
          sign in
        </p>
      </div>
    </button>
  );
}
