"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import { YoutubeVideo } from "~/server/video-query";
import { ScrollArea } from "~/components/ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import Youtube from "~/components/Youtube";

function displayDate(dateString: string) {
  try {
    // Not just using date contructor because this is weird on IOS.
    const [dateOnly, timeOnly] = dateString.split(" ");
    const [year, month, day] = dateOnly!.split("-");
    const [hours, minutes, seconds] = timeOnly!.split(":");

    const date = new Date(
      parseInt(year!),
      parseInt(month!) - 1, // Month is zero-based
      parseInt(day!),
      parseInt(hours!),
      parseInt(minutes!),
      parseInt(seconds!)
    );

    return date.toLocaleDateString();
  } catch (e) {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }
}

interface UploadItemProps {
  mobile: boolean;
  doc: YoutubeVideo;
}

function UploadItem({ doc, mobile }: UploadItemProps) {
  return (
    <Link
      href={`/v/${doc.id}`}
      className="text flex flex-row gap-2 border-4 border-black bg-black px-3 hover:underline text-xs md:text-sm"
    >
      <Image
        src={doc.thumbnail_url}
        width={80}
        height={80}
        alt={`Thumbnail for ${doc.title}`}
      />
      <div className="flex-1 flex-col-reverse">
        <p className="line-clamp-2 flex-1 tracking-wider text-white">
          {doc.title}
        </p>
        <p className="text-xs text-neutral-400">
          {displayDate(doc.publish_date)}
        </p>
      </div>
    </Link>
  );
}

interface UploadListProps {
  documents: YoutubeVideo[];
}

export function UploadList({ documents }: UploadListProps) {
  return (
    <>
      {/* Mobile View */}
      <Accordion className="block sm:hidden" type="single" collapsible>
        <AccordionItem className="border-none space-y-2" value="item-1">
          <AccordionTrigger className=" bg-black px-3 py-1 font-bold tracking-widest text-white">
            uploads
          </AccordionTrigger>
          <AccordionContent>
            <ScrollArea className="">
              <div className="space-y-2 max-h-[40vh]">
                {documents.map((doc) => (
                  <UploadItem key={doc.url} mobile={true} doc={doc} />
                ))}
              </div>
            </ScrollArea>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Desktop View */}
      <div className="hidden sm:block">
        <div className="mb-3 px-3">
          <h3 className="max-w-fit bg-black px-3 font-bold tracking-widest text-white">
            uploads
          </h3>
        </div>
        <ScrollArea className="h-[50vh] ">
          <div className="flex flex-col gap-3 text-sm text-white  lg:text-base">
            {documents.map((doc) => (
              <UploadItem key={doc.url} mobile={false} doc={doc} />
            ))}
          </div>
        </ScrollArea>
      </div>
    </>
  );
}
