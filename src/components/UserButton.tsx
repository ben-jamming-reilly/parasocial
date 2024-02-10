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
      <Link
        href="/profile"
        className={cn(
          "relative flex max-w-[10rem] items-center border-4 border-black bg-black font-bold shadow-[8px_8px_0_0_#000] transition hover:shadow-none focus:outline-none focus:ring",
          props.className
        )}
      >
        <div className="flex flex-row gap-1 bg-black text-xs tracking-wider">
          <>
            {user && user.image ? (
              <Image src={user.image!} width="30" height="30" alt="" />
            ) : user ? (
              <Image
                src={`https://avatar.vercel.sh/${user!.id}`}
                width="30"
                height="30"
                alt=""
              />
            ) : null}

            {user && user.name && (
              <p className="my-auto line-clamp-1 h-fit">{user.name}</p>
            )}
          </>
        </div>
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      {...props}
      className={cn(
        "relative flex max-w-[10rem] items-center border-4 border-black bg-black font-bold shadow-[8px_8px_0_0_#000] transition hover:shadow-none focus:outline-none focus:ring",
        props.className
      )}
    >
      <div className="flex h-[30px] w-[6rem] flex-row gap-1 bg-black px-1 text-xs tracking-wider">
        {user && isClient ? (
          <>
            {user.image ? (
              <Image src={user.image!} width="30" height="30" alt="" />
            ) : (
              <div className="h-[30px] w-[30px] bg-neutral-400" />
            )}

            <p className="my-auto line-clamp-1 h-fit">{user.name}</p>
          </>
        ) : status === "unauthenticated" ? (
          <p className="my-auto line-clamp-1 h-fit w-full">sign in</p>
        ) : (
          <div className="" />
        )}
      </div>
    </button>
  );
}
