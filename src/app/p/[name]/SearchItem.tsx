"use client";
import { useState } from "react";
import Image from "next/image";

import { SearchResult } from "~/search";
import { timestamp, truncate } from "~/utils/util";
import Player from "~/components/Youtube";

function progressThumbnailUrl(
  video_url: string,
  curr_ms: number,
  length_ms: number
) {
  const pic_id = Math.ceil((curr_ms / length_ms) * 3);

  const url = new URL(video_url);
  const id = url.searchParams.get("v");

  return `https://i.ytimg.com/vi_webp/${id}/${pic_id}.webp`;
}

interface ResultProps {
  result: SearchResult;
}

export default function SearchItem({
  result: { document: video, start_ms, end_ms, text },
}: ResultProps) {
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
          src={progressThumbnailUrl(video.url, start_ms, video.length * 1000)}
          className="border-4 border-black"
          width="120"
          alt={`A youtube thumbnail for ${video.title}`}
        />
        <div className="my-2 flex flex-grow flex-col justify-center gap-2 text-sm text-white">
          <h3 className="hyphens-auto bg-black px-3 text-justify text-xs tracking-widest">
            {video.title}
          </h3>
          <p className="line-clamp-3 w-fit hyphens-auto bg-black px-3 text-xs italic">
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
        className="hidden flex-row gap-2 hover:underline sm:flex"
      >
        <Image
          src={progressThumbnailUrl(video.url, start_ms, video.length * 1000)}
          className=" border-4 border-black"
          height="170"
          width="170"
          alt={`A youtube thumbnail wor ${video.title}`}
        />
        <div className="my-2 flex w-[30rem] flex-col justify-center gap-2 text-sm text-white">
          <h3 className="bg-black px-3 text-justify tracking-widest">
            {video.title}
          </h3>
          <p className="w-fit bg-black px-3 italic">"{truncate(text, 120)}"</p>
          <p className="w-fit bg-black px-3">
            [{timestamp(start_ms)} - {timestamp(end_ms)}]
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
