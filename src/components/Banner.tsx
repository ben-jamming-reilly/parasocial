"use client";
import { useSession } from "next-auth/react";
type BannerProps = {
  messages: string[];
};

export function Banner({ messages }: BannerProps) {
  const { data, status } = useSession();
  if (data || status === "loading") return null;

  return (
    <div className="overflow-hidden whitespace-nowrap  min-w-10 ">
      <div className="text-black tracking-wider items-center text-sm flex flex-row ">
        <div className="z-30 bg-inherit font-bold">[</div>
        <div className="  animate-banner-scroll  my-auto ">
          {messages.map((message) => (
            <div className="-z-10">{message}</div>
          ))}
        </div>
        <div className="z-30  bg-inherit overflow-hidden font-bold">]</div>
      </div>
    </div>
  );
}
