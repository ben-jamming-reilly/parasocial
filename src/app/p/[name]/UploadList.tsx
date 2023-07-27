import Link from "next/link";
import Image from "next/image";

import { YoutubeVideo } from "~/search";
import { ScrollArea } from "~/components/ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";

function displayDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString();
}

interface UploadItemProps {
  doc: YoutubeVideo;
}

function UploadItem({ doc }: UploadItemProps) {
  return (
    <Link
      href={doc.url}
      className="text flex flex-row gap-2 border-4 border-black bg-black px-4 hover:underline"
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
    </Link>
  );
}

interface UploadListProps {
  documents: YoutubeVideo[];
}

export default function UploadList({ documents }: UploadListProps) {
  return (
    <>
      <Accordion className="sm:hidden" type="single" collapsible>
        <AccordionItem className="border-none" value="item-1">
          <AccordionTrigger className="flex flex-1 flex-row bg-black px-3 py-1 font-bold tracking-widest text-white">
            uploads
          </AccordionTrigger>
          <AccordionContent className="mt-2">
            <ScrollArea className="gap-3 ">
              <div className="flex flex-col gap-3  text-white">
                {documents.map((doc) => (
                  <UploadItem doc={doc} />
                ))}
              </div>
            </ScrollArea>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="hidden sm:block">
        <div className="mb-3 px-3">
          <h3 className="max-w-fit bg-black px-3 font-bold tracking-widest text-white">
            uploads
          </h3>
        </div>
        <ScrollArea className="h-[50vh] w-[30rem] ">
          <div className="flex flex-col gap-3 px-3 text-white">
            {documents.map((doc) => (
              <UploadItem doc={doc} />
            ))}
          </div>
        </ScrollArea>
      </div>
    </>
  );
}
