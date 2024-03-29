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

export default function SearchItem({
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
    <>
      {/* Mobile */}
      <Link href={watchUrl} className="relative w-full  sm:hidden">
        <img
          src={thumbnailUrl(video.url, start_ms, video.length * 1000)}
          className="w-full border-4 border-black"
          height="150"
          alt={`A youtube thumbnail for ${video.title}`}
        />
        <div className="absolute bottom-0 my-2 flex flex-grow flex-col justify-center gap-2 text-sm text-white">
          {/* <h3 className="line-clamp-3 hyphens-auto bg-black px-3 text-xs tracking-widest sm:text-justify">
            {video.title}
          </h3> */}
          <p className="ml-auto w-fit bg-black px-3">
            [{timestamp(start_ms)} - {timestamp(end_ms)}]
          </p>
          <p className="line-clamp-2 w-fit hyphens-auto bg-black px-3 text-xs italic">
            {text}
          </p>
        </div>
      </Link>

      {/* Desktop */}
      <Link
        href={watchUrl}
        className="hidden min-w-[190px] max-w-[250px] h-fit flex-col gap-2 border-4 border-black bg-black text-xs tracking-wider hover:underline sm:flex"
      >
        <div className="relative mx-auto">
          <Image
            src={thumbnailUrl(video.url, start_ms, video.length * 1000)}
            className=" mx-auto "
            height="250"
            width="250"
            alt={`A youtube thumbnail wor ${video.title}`}
          />
          <div className="absolute bottom-0 right-0 mb-4 ml-4 flex flex-col justify-end tracking-widest">
            <p className="ml-auto bg-black px-2">
              {new Date(video.publish_date).toLocaleDateString()}
            </p>
            <p className="w-fit min-w-min bg-black px-2 ">
              [{timestamp(start_ms)} - {timestamp(end_ms)}]
            </p>
          </div>
        </div>
        <p className="line-clamp-3 w-full px-2 text-xs italic">
          <span>{rank}</span>
          {text}
        </p>
      </Link>
    </>
  );
}
