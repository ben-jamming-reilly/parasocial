"use client";
import Image from "next/image";
import { useState } from "react";

import { YoutubeVideo } from "~/lib/search";
import { ScrollArea } from "~/components/ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import Youtube from "~/components/Youtube";

function displayDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString();
}

interface UploadItemProps {
  mobile: boolean;
  doc: YoutubeVideo;
}

function UploadItem({ doc, mobile }: UploadItemProps) {
  const [play, setPlay] = useState(false);

  return (
    <>
      <div
        className="text flex flex-row gap-2 border-4 border-black bg-black px-3 hover:underline"
        onClick={() => setPlay(!play)}
      >
        <Image
          src={doc.thumbnail_url}
          width={80}
          height={80}
          alt={`Thumbnail for ${doc.title}`}
        />
        <div className="flex-1 flex-col-reverse">
          <p className="line-clamp-2 flex-1 text-justify tracking-wider text-white">
            {doc.title}
          </p>
          <p className="text-xs text-neutral-400">
            {displayDate(doc.publish_date)}
          </p>
        </div>
        {play && (
          <Youtube
            close={() => setPlay(false)}
            url={doc.url}
            start_ms={0}
            isMobile={mobile}
          />
        )}
      </div>
    </>
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
        <AccordionItem className="border-none" value="item-1">
          <AccordionTrigger className="flex flex-1 flex-row bg-black px-3 py-1 font-bold tracking-widest text-white">
            uploads
          </AccordionTrigger>
          <AccordionContent className="mt-2">
            <ScrollArea className="h-[40vh] gap-3 ">
              <div className="flex flex-col gap-3  text-white">
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
            recent uploads
          </h3>
        </div>
        <ScrollArea className="h-[50vh] w-[24rem] ">
          <div className="flex flex-col gap-3  text-white">
            {documents.map((doc) => (
              <UploadItem key={doc.url} mobile={false} doc={doc} />
            ))}
          </div>
        </ScrollArea>
      </div>
    </>
  );
}
