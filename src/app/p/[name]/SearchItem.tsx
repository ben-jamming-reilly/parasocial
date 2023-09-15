"use client";
import { useState } from "react";
import Image from "next/image";

import { SearchResult } from "~/lib/search";
import { timestamp, truncate } from "~/lib/utils";
import Player from "~/components/Youtube";

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
  result: { document: video, start_ms, end_ms, text },
}: SearchItemProps) {
  const [play, setPlay] = useState(false);
  const [playMobile, setPlayMobile] = useState(false);

  return (
    <>
      {/* Mobile */}
      <div
        onClick={() => setPlayMobile(!playMobile)}
        className="flex w-full flex-row gap-2 sm:hidden"
      >
        <img
          src={thumbnailUrl(video.url, start_ms, video.length * 1000)}
          className="border-4 border-black"
          width="120"
          alt={`A youtube thumbnail for ${video.title}`}
        />
        <div className="my-2 flex flex-grow flex-col justify-center gap-2 text-sm text-white">
          <h3 className="line-clamp-3 hyphens-auto bg-black px-3 text-xs tracking-widest sm:text-justify">
            {video.title}
          </h3>
          <p className="line-clamp-2 w-fit hyphens-auto bg-black px-3 text-xs italic">
            "{truncate(text, 120)}"
          </p>
          <p className="w-fit bg-black px-3">
            [{timestamp(start_ms)} - {timestamp(end_ms)}]
          </p>
        </div>
        {playMobile && (
          <Player
            close={() => setPlayMobile(false)}
            url={video.url}
            start_ms={start_ms}
            isMobile={true}
          />
        )}
      </div>

      {/* Desktop */}
      <div
        onClick={() => setPlay(!play)}
        className="mx-auto hidden max-w-[250px] flex-col items-center justify-center gap-2 text-xs tracking-wider hover:underline sm:flex"
      >
        <div className="relative mx-auto">
          <Image
            src={thumbnailUrl(video.url, start_ms, video.length * 1000)}
            className=" mx-auto border-4 border-black"
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
        <div className="w-250 bg-black">
          <h3 className="line-clamp-2 w-full bg-black px-2 text-xs tracking-wider">
            {video.title}
          </h3>
          <p className="px-2">-</p>
          <p className="line-clamp-2 w-full bg-black px-2 text-xs italic">
            "{truncate(text, 80)}"
          </p>
        </div>
        {play && (
          <Player
            close={() => setPlay(false)}
            url={video.url}
            start_ms={start_ms}
            isMobile={false}
          />
        )}
      </div>
    </>
  );
}
