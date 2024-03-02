"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SummaryNode } from "~/server/video-query";

import { timestamp } from "~/lib/utils";
import { YoutubeVideo } from "~/server/video-query";
import { ScrollArea } from "~/components/ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";

function thumbnailUrl(video_url: string, curr_ms: number, length_ms: number) {
  const pic_id = Math.ceil((curr_ms / length_ms) * 3);
  const url = new URL(video_url);
  const id = url.searchParams.get("v");
  return `https://i.ytimg.com/vi_webp/${id}/${pic_id}.webp`;
}

type SummaryPointProps = {
  node: SummaryNode;
  video: YoutubeVideo;
  depth: number;
};

export function SummaryTab({ node, video, depth }: SummaryPointProps) {
  const [watchUrl, setWatchUrl] = useState("#");

  useEffect(() => {
    if (window) {
      const url = new URL(window.location.href);

      const start = Math.round(node.start_ms / 1000);
      const end = Math.round(node.end_ms / 1000);

      url.searchParams.set("v", video.id);
      url.searchParams.set("start", start.toString());
      url.searchParams.set("end", end.toString());
      setWatchUrl(url.toString());
    }
  }, []);

  if (depth === 0) return null;

  if (depth === 1)
    return (
      <div className="col-span-1 mx-auto w-full h-full">
        <Link
          href={watchUrl}
          className="text-xs tracking-wider hover:underline "
        >
          <div className="bg-black m-auto w-fit h-fit p-1">
            <div className="relative ">
              <Image
                src={thumbnailUrl(
                  video.url,
                  node.start_ms,
                  video.length * 1000
                )}
                className=""
                height="250"
                width="250"
                alt={`A youtube thumbnail wor ${video.title}`}
              />
              <div className="absolute bottom-0 right-0 mb-4 ml-4 flex flex-col justify-end tracking-widest">
                <p className="w-fit min-w-min bg-black px-2 ">
                  [{timestamp(node.start_ms)} - {timestamp(node.end_ms)}]
                </p>
              </div>
            </div>
            <div className="w-[250px]  my-auto line-clamp-3 bg-black  px-2 text-xs italic">
              {node.summary}
            </div>
          </div>
        </Link>
      </div>
    );

  return (
    <div className="flex flex-col gap-2">
      <div className="">
        <Link
          href={watchUrl}
          className="gap-2 text-xs tracking-wider hover:underline flex"
        >
          <div className="bg-black m-auto w-fit h-fit p-1">
            <div className="relative mx-auto">
              <Image
                src={thumbnailUrl(
                  video.url,
                  node.start_ms,
                  video.length * 1000
                )}
                height="250"
                width="250"
                alt={`A youtube thumbnail wor ${video.title}`}
              />
              <div className="absolute bottom-0 right-0 mb-4 ml-4 flex flex-col justify-end tracking-widest">
                <p className="w-fit min-w-min  bg-black px-2 ">
                  [{timestamp(node.start_ms)} - {timestamp(node.end_ms)}]
                </p>
              </div>
            </div>
          </div>
          <div className=" my-auto line-clamp-5 bg-black w-full px-2 text-xs italic">
            {node.summary}
          </div>
        </Link>
      </div>
      <div className=" grid gap-1 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
        {node.children.map((child) => (
          <SummaryTab
            key={`${child.start_ms.toString()}-${child.end_ms.toString()}`}
            video={video}
            node={child}
            depth={depth - 1}
          />
        ))}
      </div>
    </div>
  );
}

export function SummaryResult({ node, video }: SummaryPointProps) {
  const [watchUrl, setWatchUrl] = useState("#");

  useEffect(() => {
    if (window) {
      const url = new URL(window.location.href);

      const start = Math.round(node.start_ms / 1000);
      const end = Math.round(node.end_ms / 1000);

      url.searchParams.set("v", video.id);
      url.searchParams.set("start", start.toString());
      url.searchParams.set("end", end.toString());
      setWatchUrl(url.toString());
    }
  }, []);

  return (
    <Link
      href={watchUrl}
      className="gap-2 border-4 border-black  text-xs tracking-wider hover:underline flex"
    >
      <div className="relative mx-auto">
        <Image
          src={thumbnailUrl(video.url, node.start_ms, video.length * 1000)}
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
            [{timestamp(node.start_ms)} - {timestamp(node.end_ms)}]
          </p>
        </div>
      </div>
      <div className=" my-auto line-clamp-3 bg-black w-full px-2 text-xs italic">
        {node.summary}
      </div>
    </Link>
  );
}
