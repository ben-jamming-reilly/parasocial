"use client";
import { DetailedHTMLProps, ButtonHTMLAttributes } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";

import { cn } from "~/lib/utils";

type AuthBtnProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export default function AuthBtn(props: AuthBtnProps) {
  return (
    <button
      onClick={() => signIn()}
      {...props}
      className={cn(
        "relative flex items-center border-4 border-black bg-black font-bold shadow-[8px_8px_0_0_#000] transition hover:shadow-none focus:outline-none focus:ring",
        props.className
      )}
    >
      <div className="flex flex-row bg-black px-3">
        <p className="tracking-widest text-white">sign in</p>
        {/* <Image src="/icons/eye.svg" height="20" width="20" alt="an eye" /> */}
      </div>
    </button>
  );
}
