"use client";
import { DetailedHTMLProps, ButtonHTMLAttributes } from "react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { cn } from "~/lib/utils";

export type AuthBtnProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  user: string;
};

export default function LogoutBtn({ user, ...props }: AuthBtnProps) {
  return (
    <button
      onClick={() => signOut()}
      {...props}
      className={cn(
        "relative flex items-center border-4 border-black bg-black font-bold shadow-[8px_8px_0_0_#000] transition hover:shadow-none focus:outline-none focus:ring",
        props.className
      )}
    >
      <div className="flex flex-row gap-1 bg-black px-3">
        <p className="tracking-widest text-white">sign out</p>
        {/* <Image src="icons/eye.svg" height="20" width="20" alt="an eye" /> */}
      </div>
    </button>
  );
}
