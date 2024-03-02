"use client";
import { useState, useEffect } from "react";
import { Button } from "~/components/ui/button";
import { useParentSizeObserver } from "~/hooks/useParentSize";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";

import YouTube, { YouTubeProps } from "react-youtube";
import { api } from "~/trpc/react";

import { useRouter, useSearchParams } from "next/navigation";

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

  const [start, setStart] = useState<number>();
  const [end, setEnd] = useState<number>();
  const [videoId, setVideoId] = useState<string>();

  const { parentRef, parentSize } = useParentSizeObserver();

  useEffect(() => {
    const videoParam = params.get("v") || undefined;
    const startParam = params.get("start");
    const endParam = params.get("end");

    setVideoId(videoParam);
    setStart(startParam ? parseInt(startParam) : undefined);
    setEnd(endParam ? parseInt(endParam) : undefined);
  }, [params]);

  const onClose = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete("v");
    url.searchParams.delete("start");
    url.searchParams.delete("end");
    router.push(url.toString());
  };

  const { data: video, status } = api.video.get.useQuery(
    {
      id: videoId!,
    },
    {
      enabled: !!videoId,
      queryHash: videoId,
    }
  );

  const onStateChange: YouTubeProps["onStateChange"] = (event) => {
    console.log(event.data);
    if (Number(event.data) === -1) {
      // this is jank and should be replaced lmao
      setTimeout(() => {
        event.target.seekTo(start, true);
      }, 1500);
    }
  };

  return (
    <>
      <Drawer onClose={onClose} open={!!videoId}>
        <DrawerContent className="bg-black rounded-none h-[80vh]">
          <div
            ref={parentRef}
            className="flex flex-col justify-center w-full mx-auto "
          >
            {video && (
              <>
                <YouTube
                  key={`${video.id}-${start}-${end}`}
                  className="sm:hidden flex mx-auto"
                  videoId={getYoutubeId(video.url)}
                  id={`${video.id}-${start}-${end}`}
                  loading="lazy"
                  onStateChange={onStateChange}
                  opts={{
                    width: 380,
                    height: hwRatio * 380,
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

                <YouTube
                  key={`${video.id}-${start}-${end}`}
                  className="hidden sm:block mx-auto"
                  videoId={getYoutubeId(video.url)}
                  id={`${video.id}-${start}-${end}`}
                  loading="lazy"
                  onStateChange={onStateChange}
                  opts={{
                    width: Math.min(width),
                    height: Math.min(height),
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
              </>
            )}
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
