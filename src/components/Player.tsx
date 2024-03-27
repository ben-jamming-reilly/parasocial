"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import YouTube, { YouTubeProps } from "react-youtube";

import { useParentSizeObserver } from "~/hooks/useParentSize";
import { Drawer, DrawerContent } from "~/components/ui/drawer";
import { useIsMobile } from "~/hooks/useIsMobile";
import { api } from "~/trpc/react";

function getYoutubeId(url: string) {
  const ytURL = new URL(url);
  return ytURL.searchParams.get("v")!;
}

export function Player() {
  const router = useRouter();
  const params = useSearchParams();

  const width = 853;
  const height = 480;
  const hwRatio = height / width;

  const [isOpen, setIsOpen] = useState(false);
  const [start, setStart] = useState<number>();
  const [end, setEnd] = useState<number>();
  const [query, setQuery] = useState<string>();
  const [videoId, setVideoId] = useState<string>();

  const { parentRef } = useParentSizeObserver();
  const { mutate, data: view, status } = api.video.view.useMutation({});

  const { data: video } = api.video.get.useQuery(
    { id: videoId! },
    { enabled: !!videoId, queryHash: "v-" + videoId }
  );

  useEffect(() => {
    const videoParam = params.get("v") || undefined;
    const queryParam = params.get("q") || undefined;
    const startParam = params.get("start")
      ? parseInt(params.get("start")!)
      : undefined;
    const endParam = params.get("end")
      ? parseInt(params.get("end")!)
      : undefined;

    setVideoId(videoParam);
    setQuery(queryParam);
    setStart(startParam);
    setEnd(endParam);

    if (videoParam && startParam && endParam) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [params]);

  useEffect(() => {
    const hasViewVideo = video && start && end;
    const isNewVideo =
      !view ||
      video?.id !== view.video_id ||
      query !== view.query ||
      view.start_s !== start ||
      view.end_s !== end;

    if (hasViewVideo && isNewVideo) {
      mutate({
        video_id: video.id,
        start: start,
        end: end,
        query: query,
        author: video.author,
      });
    }
  }, [start, end, query, video]);

  const onClose = () => {
    setIsOpen(false);
    const url = new URL(window.location.href);
    url.searchParams.delete("v");
    url.searchParams.delete("start");
    url.searchParams.delete("end");
    router.push(url.toString());
  };

  const onStateChange: YouTubeProps["onStateChange"] = (event) => {
    if (Number(event.data) === -1) {
      // this is jank and should be replaced lmao
      setTimeout(() => {
        event.target.seekTo(start, true);
      }, 1750);
    }
  };

  const isMobile = useIsMobile();

  return (
    <>
      <Drawer onClose={onClose} open={isOpen}>
        <DrawerContent className="bg-black rounded-none min-h-[80vh]">
          <div
            ref={parentRef}
            className="flex flex-col justify-center items-center w-full mx-auto  pt-4"
          >
            {video && (
              <YouTube
                key={`${video.id}-${start}-${end}`}
                className=" flex mx-auto"
                videoId={getYoutubeId(video.url)}
                id={`${video.id}-${start}-${end}-sm`}
                loading="lazy"
                onStateChange={onStateChange}
                opts={{
                  width: isMobile ? 380 : width,
                  height: isMobile ? hwRatio * 380 : height,
                  playerVars: {
                    // https://developers.google.com/youtube/player_parameters#Parameters
                    color: "white",
                    rel: 0,
                    autoplay: 0,
                    start: Number(start),
                    controls: 1, // 0 - no controls
                  },
                }}
              />
            )}
            <div>asdf</div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
