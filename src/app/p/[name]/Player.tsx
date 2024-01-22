"use client";
import { useState } from "react";
import Image from "next/image";
import YouTube, { YouTubeProps } from "react-youtube";
import { useRouter } from "next/navigation";

import { useParentSizeObserver } from "~/hooks/useParentSize";
import { YoutubeVideo } from "~/lib/search";

type PlayerProps = {
  video: YoutubeVideo;
  start?: number;
  end?: number;
};

export function MobilePlayer({ video, start, end }: PlayerProps) {
  const height = 480;
  const width = 853;
  const hwRatio = height / width;

  const documentUrl = new URL(video.url);
  const videoId = documentUrl.searchParams.get("v");

  const { parentRef, parentSize } = useParentSizeObserver();
  const router = useRouter();

  return;
  <div
    className="flex flex-1 flex-col border-4 border-b-0 border-r-0 border-black bg-inherit"
    ref={parentRef}
  >
    <YouTube
      className="mx-auto"
      videoId={videoId!}
      opts={{
        width: parentSize.width - 2,
        height: hwRatio * (parentSize.width - 2),
        playerVars: {
          // https://developers.google.com/youtube/player_parameters#Parameters
          color: "white",
          autoplay: 1,
          rel: 0,
          start: start,
          controls: 1, // 0 - no controls
        },
      }}
    />
  </div>;
}

export function Player({ video, start, end }: PlayerProps) {
  const height = 480;
  const width = 853;
  const hwRatio = height / width;

  const documentUrl = new URL(video.url);
  const videoId = documentUrl.searchParams.get("v");

  const { parentRef, parentSize } = useParentSizeObserver();
  const [unloaded, setUnloaded] = useState(false);
  const router = useRouter();

  const back = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete("v");
    url.searchParams.delete("start");
    url.searchParams.delete("end");
    router.push(url.toString());
  };

  const onStateChange: YouTubeProps["onStateChange"] = (event) => {
    console.log(event.data);
    if (Number(event.data) === -1) {
      // this is jank and should be replaced lmao
      setTimeout(() => {
        event.target.seekTo(start, true);
      }, 1000);
    }
  };

  return (
    <div
      className="flex flex-1 flex-col border-4 border-b-0 border-r-0 border-black bg-inherit"
      ref={parentRef}
    >
      <div className="justify-center border-b-4 border-black bg-black">
        <div className="flex flex-row justify-between gap-2">
          <button onClick={back}>
            <Image
              className="m-2 hover:underline"
              src="/icons/x.svg"
              width="20"
              height="20"
              alt="x"
            />
          </button>
          <p className="my-auto line-clamp-1 flex-1 ">{video.title}</p>
        </div>
        <YouTube
          key={`${video.id}-${start}-${end}`}
          className="mx-auto"
          videoId={videoId!}
          id={`${video.id}-${start}-${end}`}
          loading="lazy"
          onStateChange={onStateChange}
          opts={{
            width: parentSize.width - 2,
            height: hwRatio * (parentSize.width - 2),
            playerVars: {
              // https://developers.google.com/youtube/player_parameters#Parameters
              color: "white",
              rel: 0,
              autoplay: 0,
              start: Number(start),
              end: Number(end),
              controls: 1, // 0 - no controls
            },
          }}
        />
      </div>
      <div className="flex flex-1"></div>
    </div>
  );
}
