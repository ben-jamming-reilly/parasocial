"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { SearchResult } from "~/server/video-query";
import { timestamp } from "~/lib/utils";

function thumbnailUrl(video_url: string, curr_ms: number, length_ms: number) {
  const pic_id = Math.ceil((curr_ms / length_ms) * 3);
  const url = new URL(video_url);
  const id = url.searchParams.get("v");
  return `https://i.ytimg.com/vi_webp/${id}/${pic_id}.webp`;
}

interface SearchItemProps {
  result: SearchResult;
}

function cleanText(text: string) {
  return text.replace(/^\s*-/, "");
}

export function SearchItem({
  result: { video: video, start_ms, end_ms, text, score },
}: SearchItemProps) {
  const [watchUrl, setWatchUrl] = useState("#");
  const [rank, setRank] = useState("");

  useEffect(() => {
    if (window) {
      const url = new URL(window.location.href);

      const start = Math.round(start_ms / 1000);
      const end = Math.round(end_ms / 1000);

      url.searchParams.set("v", video.id);
      url.searchParams.set("start", start.toString());
      url.searchParams.set("end", end.toString());
      setWatchUrl(url.toString());

      if (url.hostname.includes("localhost")) {
        setRank(score.toFixed(3) + " - ");
      }
    }
  }, []);

  return (
    <Link
      href={watchUrl}
      className="max-w-[300px] sm:max-w-[250px] h-fit flex-col space-y-2 border-4 border-black bg-black text-xs font-light tracking-wider hover:underline underline-offset-2 sm:flex "
    >
      <div className="relative mx-auto">
        <Image
          src={video.thumbnail_url}
          className=" mx-auto "
          height="275"
          width="300"
          alt={`A youtube thumbnail wor ${video.title}`}
        />
        <div className="absolute bottom-0 right-0 overflow-clip">
          <img
            src={thumbnailUrl(video.url, start_ms, video.length * 1000)}
            width={100}
            height={60}
            className="object-none border-t-4 border-l-4 border-black object-center"
          />
        </div>

        <div className="absolute bottom-0 right-0 mb-4 ml-4 flex flex-col justify-end tracking-widest"></div>
      </div>
      <p className="line-clamp-3 w-full px-2 text-xs italic font-extralight text-slate-200">
        <span className="not-italic pr-2 tracking-wider font-normal text-white">
          [{timestamp(start_ms)} - {timestamp(end_ms)}]
        </span>
        {cleanText(text)}
      </p>
    </Link>
  );
}

export function DummySearchItem() {
  return (
    <div className="min-w-[200px] max-w-[300px] animate-pulse flex-col gap-2 bg-black text-xs tracking-wider hover:underline sm:flex">
      <div className=" mx-auto h-[250px] w-[250px] border-4 border-black bg-black" />
      <div className="w-full bg-slate-900">
        <p className="line-clamp-3 w-full bg-black px-2 text-xs italic"></p>
      </div>
    </div>
  );
}

type DummySearchItemListProps = {
  size?: number;
};

export function DummySearchItemList({ size = 24 }: DummySearchItemListProps) {
  const dummies = [...Array(size).keys()];

  return (
    <>
      {dummies.map((dummy) => (
        <DummySearchItem key={dummy} />
      ))}
    </>
  );
}

export function DummyPage() {
  const dummies = [...Array(20).keys()];
  return (
    <div className="mx-auto flex flex-1 flex-wrap justify-around gap-2 overflow-scroll pb-4  sm:min-w-[550px]">
      {dummies.map((dummy) => (
        <DummySearchItem key={dummy} />
      ))}
    </div>
  );
}
