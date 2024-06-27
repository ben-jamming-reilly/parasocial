"use client";

import { ReactNode } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Marquee } from "./Marquee";
import { useLocalStorage } from "~/hooks/useLocalStorage";

type BannerProps = {
  children?: ReactNode;
};

export function Banner({ children }: BannerProps) {
  const { data, status } = useSession();
  const [value, setValue] = useLocalStorage("show-banner", true);

  if (data || status === "loading") return null;

  return (
    <>
      {value && (
        <section className=" w-full bg-black inline-flex justify-between">
          <Marquee autoFill className="w-full">
            {children}
          </Marquee>
          <button
            className="px-2 hover:scale-95"
            onClick={() => setValue(false)}
          >
            <Image src="/icons/x.svg" height="12" width="12" alt="" />
          </button>
        </section>
      )}
    </>
  );
}
