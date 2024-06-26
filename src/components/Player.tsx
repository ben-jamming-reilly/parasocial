"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import YouTube, { YouTubeProps } from "react-youtube";
import Image from "next/image";

import { useClickOutside } from "~/hooks/useClickOutside";
import { useKeyDown } from "~/hooks/useKeyDown";
import { useParentSizeObserver } from "~/hooks/useParentSize";
import { Drawer, DrawerContent } from "~/components/ui/drawer";
import { ScrollArea } from "~/components/ui/scroll-area";
import { useScreenDimensions } from "~/hooks/useIsMobile";
import { api } from "~/trpc/react";
import { cn } from "~/lib/utils";
import { SearchItem, DummySearchItemList } from "~/components/SearchItem";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

function getYoutubeId(url: string) {
  const ytURL = new URL(url);
  return ytURL.searchParams.get("v")!;
}

type SimilarVideosProps = {
  videoId: string;
  author: string;
  start: number;
  end: number;
  className?: string;
};

function SimilarVideos({
  videoId,
  author,
  start,
  end,
  className,
}: SimilarVideosProps) {
  const similarFromAuthor = api.video.similar.useQuery({
    id: videoId,
    start: start,
    end: end,
    author,
    explore: false,
  });

  const similarFromOthers = api.video.similar.useQuery({
    id: videoId,
    start: start,
    end: end,
    explore: true,
    author,
  });

  return (
    <Tabs defaultValue="from-author">
      <TabsList className="">
        <TabsTrigger value="from-author">more from {author}</TabsTrigger>
        <TabsTrigger value="from-others">more from others</TabsTrigger>
      </TabsList>
      <TabsContent value="from-author">
        <ScrollArea className={className}>
          <div className="z-0 flex flex-wrap justify-evenly overflow-x-hidden gap-2">
            {similarFromAuthor.data ? (
              similarFromAuthor.data.map((s) => (
                <SearchItem
                  result={s}
                  key={`${s.video.id}-${s.start_ms}-${s.end_ms}`}
                />
              ))
            ) : (
              <DummySearchItemList />
            )}
          </div>
        </ScrollArea>
      </TabsContent>
      <TabsContent value="from-others">
        <ScrollArea className={className}>
          <div className="z-0 flex flex-wrap justify-evenly overflow-x-hidden gap-2">
            {similarFromOthers.data ? (
              similarFromOthers.data.map((s) => (
                <SearchItem
                  result={s}
                  key={`${s.video.id}-${s.start_ms}-${s.end_ms}`}
                />
              ))
            ) : (
              <DummySearchItemList />
            )}
          </div>
        </ScrollArea>
      </TabsContent>
    </Tabs>
  );
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

  const { parentRef, parentSize } = useParentSizeObserver();
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

    if (videoParam && startParam !== undefined && endParam !== undefined) {
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
    router.replace(url.toString(), { scroll: false });
  };

  const onStateChange: YouTubeProps["onStateChange"] = (event) => {
    if (Number(event.data) === -1) {
      // this is jank and should be replaced lmao
      // it fixes an error when youtube tries to adjust your
      // postion in the video to where you previously were
      setTimeout(() => {
        event.target.seekTo(start, true);
      }, 1750);
    }
  };

  useClickOutside(parentRef, onClose);
  useKeyDown("Escape", onClose);

  const dimensions = useScreenDimensions();
  const isMobile = dimensions.isMobile;
  const player = {
    width: isMobile ? dimensions.width - 12 : width,
    height: isMobile ? hwRatio * (dimensions.width - 12) : height,
  };

  return (
    <Drawer onClose={onClose} open={isOpen}>
      <DrawerContent
        ref={parentRef}
        className={cn(
          "bg-rose-900 border-black rounded-none",
          isMobile ? `h-[96dvh]` : "h-[96vh]"
        )}
      >
        {/* <Image src="/icons/x-outline.svg" width={30} height={30} alt="" /> */}
        <ScrollArea className="h-full overflow-auto">
          <div className="justify-center mx-auto w-fit">
            {video && (
              <div>
                <YouTube
                  key={`${video.id}-${start}-${end}`}
                  className="border-2 border-black bg-black"
                  videoId={getYoutubeId(video.url)}
                  id={`${video.id}-${start}-${end}-sm`}
                  loading="lazy"
                  onStateChange={onStateChange}
                  opts={{
                    width: player.width,
                    height: player.height,
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
              </div>
            )}
            {start && end && video && (
              <div
                style={{ width: isMobile ? dimensions.width - 10 : width }}
                className=" flex-1 flex my-4 "
              >
                <SimilarVideos
                  author={video.author}
                  start={start}
                  end={end}
                  videoId={video.id}
                />
              </div>
            )}
          </div>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
}
