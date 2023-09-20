"use client";
import { useCallback } from "react";
import Image from "next/image";
import { DetailedHTMLProps, ButtonHTMLAttributes } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

import { cn } from "~/lib/utils";

type AuthBtnProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export default function AuthBtn(props: AuthBtnProps) {
  const { data: session, status } = useSession();

  session?.user.image;

  const onClick = useCallback(() => {
    if (status === "authenticated") {
      signOut();
    } else if (status === "unauthenticated") {
      signIn();
    }
  }, [status]);

  return (
    <button
      onClick={onClick}
      {...props}
      className={cn(
        "relative flex max-w-[10rem] items-center border-4 border-black bg-black font-bold shadow-[8px_8px_0_0_#000] transition hover:shadow-none focus:outline-none focus:ring",
        props.className
      )}
    >
      <div className="flex flex-row gap-1 bg-black px-2 text-xs tracking-wider">
        {status === "authenticated" ? (
          <>
            <Image src={session?.user.image!} width="30" height="30" alt="" />
            <p className="my-auto line-clamp-1 h-fit">{session?.user.name}</p>
          </>
        ) : status === "unauthenticated" ? (
          <>
            <p className="tracking-widest text-white">sign in</p>
          </>
        ) : (
          <div className="h-[30px] w-[6rem]" />
        )}
      </div>
    </button>
  );
}
