"use client";
import { DetailedHTMLProps, ButtonHTMLAttributes } from "react";
import { signIn } from "next-auth/react";
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="white"
        >
          <path
            fillRule="evenodd"
            d="M12.293 5.293a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414-1.414L14.586 11H4a1 1 0 0 1 0-2h10.586l-2.293-2.293a1 1 0 0 1 0-1.414z"
          />
        </svg>
      </div>
    </button>
  );
}
