"use client";
import Link from "next/link";
import type { VideoUpload } from "@prisma/client";
import { ScrollArea } from "~/components/ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";

interface UploadItemProps {
  doc: VideoUpload;
}

function UploadItem({ doc }: UploadItemProps) {
  const siteUrl = new URL(`v/${doc.id}`, location.href);
  return (
    <Link
      href={siteUrl.toString()}
      className="text flex flex-row gap-2 border-4 border-black bg-black px-3 hover:underline"
    >
      <div className="flex-1 flex-col-reverse">
        <p className="line-clamp-2 flex-1  tracking-wider text-white">
          {siteUrl.toString()}
        </p>
        <p className="text-xs text-neutral-400">
          {doc.create_date.toDateString()}
        </p>
      </div>
    </Link>
  );
}

interface UploadListProps {
  documents: VideoUpload[];
}

export function UploadList({ documents }: UploadListProps) {
  return (
    <>
      {/* Mobile View */}
      <Accordion className="block sm:hidden w-full" type="single" collapsible>
        <AccordionItem className="border-none" value="item-1">
          <AccordionTrigger className="flex flex-1 flex-row bg-black px-3 py-1 font-bold tracking-widest text-white">
            uploads
          </AccordionTrigger>
          <AccordionContent className="mt-2">
            <ScrollArea className="max-h-[40vh] gap-3 ">
              <div className="flex flex-col gap-3 text-white">
                {documents.map((doc) => (
                  <UploadItem key={doc.url} doc={doc} />
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
              <UploadItem key={doc.url} doc={doc} />
            ))}
          </div>
        </ScrollArea>
      </div>
    </>
  );
}
