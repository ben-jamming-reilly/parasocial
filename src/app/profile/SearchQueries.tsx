"use client";
import Link from "next/link";
import { ScrollArea } from "~/components/ui/scroll-area";
import { SearchQuery } from "@prisma/client";

function searchQueryHref(search: SearchQuery) {
  let path = "";

  if (search.video_id) {
    path = `/v/${search.video_id}`;
  } else if (search.author) {
    path = `/p/${search.author}`;
  }

  const url = new URL(path, window.location.href);
  url.searchParams.set("q", search.query);
  return url.toString();
}

interface UploadItemProps {
  mobile: boolean;
  doc: SearchQuery;
}

function UploadItem({ doc, mobile }: UploadItemProps) {
  return (
    <Link
      href={searchQueryHref(doc)}
      className="text flex flex-row gap-2 border-4 border-black bg-black px-3 hover:underline"
    >
      <div className="flex-1 flex-col-reverse">
        <p className="line-clamp-2  text-justify tracking-wider text-white">
          {doc.query}
        </p>
        <p className="text-xs text-neutral-400">
          {doc.create_date.toLocaleString()}
        </p>
      </div>
    </Link>
  );
}

interface UploadListProps {
  queries: SearchQuery[];
}

export function SearchQueryList({ queries: queries }: UploadListProps) {
  return (
    <div className="">
      <div className="mb-3 px-3">
        <h3 className="max-w-fit bg-black px-3 font-bold tracking-widest text-white">
          previous queries
        </h3>
      </div>
      <ScrollArea className="h-[50vh] w-[16] md:w-[20rem] ">
        <div className="flex flex-col gap-3  text-white">
          {queries.map((search) => (
            <UploadItem key={search.id} mobile={false} doc={search} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
