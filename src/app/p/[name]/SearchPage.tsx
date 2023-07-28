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
  result: { document: video, start_ms, end_ms, text },
}: ResultProps) {
  const [play, setPlay] = useState(false);
  const [mobileHeight, setWindowHeight] = useState("");
  const [mobileWidth, setWindowWidth] = useState("");

  useEffect(() => {
    if (!window) return;
    setWindowWidth(`${window.innerWidth}px`);
    setWindowHeight(`${Math.round((window.innerWidth / 853) * 480)}px`);
    console.log(window.innerWidth);
  }, [play]);

  return (
    <>
      {/* Mobile */}
      <div
        onClick={() => setPlay(!play)}
        className="flex w-full flex-row gap-2 sm:hidden"
      >
        <img
          src={progressThumbnail(video.url, start_ms, video.length * 1000)}
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
        {play && (
          <Modal close={() => setPlay(false)}>
            <div className="flex h-full flex-col justify-center">
              <Player
                url={video.url}
                start_ms={start_ms}
                height={mobileHeight}
                width={mobileWidth}
              />
            </div>
          </Modal>
        )}
      </div>
      {/* Desktop */}
      <div
        onClick={() => setPlay(!play)}
        className="hidden flex-row gap-2 hover:underline sm:flex"
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
    </>
  );
}

interface SearchProps {
  author: string;
  initQuery?: string;
  initResults: SearchResult[];
}

export default function Search({
  author,
  initQuery,
  initResults,
}: SearchProps) {
  const [results, setResults] = useState(initResults);
  const [query, onQueryChange, setQuery] = useInput(initQuery || "");

  return (
    <div className="mt-4 w-full sm:w-[38rem]">
      <form className="mx-2 flex flex-row gap-1 sm:mx-0">
        <button>
          <Image
            src="/icons/search.svg"
            width="25"
            height="25"
            alt="Magnifying Glass"
          />
        </button>
        <div className="flex flex-1 flex-col">
          <input
            className="outline-text-3 flex w-full flex-row border-b-4 border-black bg-transparent px-1 text-xs tracking-widest caret-white focus:outline-none sm:text-sm"
            name="q"
            onChange={onQueryChange}
            value={query}
          />
          {/* {(!initQuery || results.length === 0) && (
            <p className="outline-text-3 m-auto w-fit italic tracking-widest">
              search all of {author}'s content with a query
            </p>
          )} */}
        </div>
      </form>
      <div className="mx-2 mt-2 flex flex-col gap-2 sm:mx-4 sm:mt-4">
        {(!initQuery || results.length === 0) && (
          <div className="h-[75vh] w-full">
            <p className="outline-text-3 m-auto w-fit text-xs italic tracking-widest sm:text-base">
              search all of {author}'s content with a query
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
