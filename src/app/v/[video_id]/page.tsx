import { Suspense } from "react";

import { api } from "~/trpc/server";
import { ProfilePanel } from "~/components/ProfilePanel";
import { SearchItem } from "~/components/SearchItem";
import { SearchBar } from "~/components/SearchBar";
import { Player } from "~/components/Player";
import { SummaryTab } from "./Summary";
import { YoutubeVideo } from "~/server/video-query";
import { notFound } from "next/navigation";

type SearchParamType = string | string[] | undefined;

type PageProps = {
  params: { video_id: string };
  searchParams: { [key: string]: SearchParamType };
};

function parseSearchQuery(param: SearchParamType): string | undefined {
  if (Array.isArray(param)) return param[0];
  else return param;
}

type SummaryProps = {
  video: YoutubeVideo;
};

async function SummaryPage({ video }: SummaryProps) {
  const summary = await api.video.summary.query({ id: video.id });

  return (
    <div className="flex flex-col space-y-2">
      {summary.map((node) => (
        <SummaryTab
          video={video}
          key={`${node.start_ms.toString()}-${node.end_ms.toString()}`}
          node={node}
          depth={2}
        />
      ))}
    </div>
  );
}

type SearchResultsProps = {
  videoId: string;
  query: string;
};

async function SearchPage({ videoId, query }: SearchResultsProps) {
  const results = await api.video.search.query({ query, videoId });

  return (
    <div className="z-0 mx-auto flex h-full flex-1 flex-wrap justify-around gap-2  pb-4 sm:min-w-[550px]">
      {results &&
        results.map((result) => (
          <SearchItem
            key={result.video.id + result.start_ms + result.end_ms}
            result={result}
          />
        ))}
    </div>
  );
}

function DummyPage() {
  const dummies = [...Array(20).keys()];
  return (
    <div className="mx-auto flex min-w-[550px] flex-1 flex-wrap justify-around gap-2 overflow-scroll  pb-4">
      {dummies.map((dummy) => (
        <div
          key={dummy}
          className="min-w-[200px] max-w-[300px] animate-pulse flex-col gap-2 bg-black text-xs tracking-wider hover:underline sm:flex"
        >
          <div className=" mx-auto h-[250px] w-[250px] border-4 border-black bg-black" />
          <div className="w-full bg-slate-900">
            <p className="line-clamp-3 w-full bg-black px-2 text-xs italic"></p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default async function Page({ params, searchParams }: PageProps) {
  const video_id = decodeURI(params.video_id);
  const query = parseSearchQuery(searchParams.q);
  const video = await api.video.get.query({ id: video_id });

  if (!video) return notFound();

  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <section className="mb-2">
        <ProfilePanel
          name={video.title}
          imageUrl={video.thumbnail_url}
          backHref={query ? `/v/${video.id}` : `/p/${video.author}`}
          author={video.author}
        />
        {/* <SectionList videoId={video.id} sections={["asdf"]} /> */}
      </section>
      <section className="flex h-full flex-grow flex-col gap-4 md:col-span-2 lg:col-span-3">
        <SearchBar
          className=""
          author={video.author}
          initQuery={query}
          placeholder={`find a moment from ${video.title}`}
        ></SearchBar>
        {query ? (
          <Suspense fallback={<DummyPage />}>
            <SearchPage query={query} videoId={video.id} />
          </Suspense>
        ) : (
          <SummaryPage video={video} />
        )}
      </section>
      <Player />
    </div>
  );
}
