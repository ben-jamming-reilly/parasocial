"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

import useInput from "~/hooks/useInput";
import { SearchResult, YoutubeVideo } from "~/search";
import { timestamp, truncate } from "~/utils/util";
import Player from "~/components/Player";
import Modal from "~/components/Modal";

function progressThumbnail(
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

function SearchItem({
  result: { document: doc, start_ms, end_ms, text },
}: ResultProps) {
  if (!doc.url.includes("youtube")) return <div />;
  const video = doc as YoutubeVideo;

  const [play, setPlay] = useState(false);

  return (
    <div
      onClick={() => setPlay(!play)}
      className="flex flex-row gap-2 hover:underline"
    >
      <Image
        src={progressThumbnail(video.url, start_ms, video.length * 1000)}
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
        <Modal close={() => setPlay(false)}>
          <div className="flex h-full flex-col justify-center">
            <Player url={video.url} start_ms={start_ms} />
          </div>
        </Modal>
      )}
    </div>
  );
}

interface SearchProps {
  initQuery?: string;
  initResults: SearchResult[];
}

export default function Search({ initQuery, initResults }: SearchProps) {
  const [results, setResults] = useState(initResults);
  const [query, onQueryChange, setQuery] = useInput(initQuery || "");

  return (
    <div className="w-[38rem]">
      <form className="flex h-fit flex-row gap-1">
        <button>
          <Image
            src="/icons/search.svg"
            width="30"
            height="30"
            alt="Magnifying Glass"
          />
        </button>
        <input
          className="outline-text-3 flex w-full flex-row border-b-4 border-black bg-transparent  text-sm tracking-widest caret-white focus:outline-none"
          name="q"
          onChange={onQueryChange}
          value={query}
        />
      </form>
      <div className="ml-2 mt-4 flex flex-col gap-2">
        {(!initQuery || results.length === 0) && (
          <div className="h-[75vh] w-full">
            <p className="outline-text-3 m-auto w-fit italic">
              Search all th {}
            </p>
          </div>
        )}
        {results.map((result) => (
          <SearchItem result={result} />
        ))}
      </div>
    </div>
  );
}
