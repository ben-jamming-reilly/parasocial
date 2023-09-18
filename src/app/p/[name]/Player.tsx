"use client";

import YouTube, { YouTubeProps } from "react-youtube";

import { useParentSizeObserver } from "~/hooks/useParentSize";
import { YoutubeVideo } from "~/lib/search";

type PlayerProps = {
  video: YoutubeVideo;
  start?: number;
  end?: number;
};

export function Player({ video, start, end }: PlayerProps) {
  const height = 480;
  const width = 853;
  const hwRatio = height / width;

  const documentUrl = new URL(video.url);
  const videoId = documentUrl.searchParams.get("v");

  const { parentRef, parentSize } = useParentSizeObserver();

  return (
    <div
      className="flex w-96 flex-col border-4 border-r-0 border-black bg-inherit"
      ref={parentRef}
    >
      <div className="justify-center bg-black">
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
      </div>
      <div className="flex flex-1"></div>
    </div>
  );
}

// width="853"
// height="480"
