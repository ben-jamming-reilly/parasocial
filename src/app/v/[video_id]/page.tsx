import { Suspense } from "react";
import SignInBtn from "~/components/UserButton";
import { api } from "~/trpc/server";

import { ProfilePanel } from "~/components/ProfilePanel";
import SearchItem from "~/app/p/[name]/SearchItem";
import { Separator } from "~/components/ui/separator";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import { SearchBar } from "~/components/SearchBar";

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
  videoId: string;
};

async function SummaryResults({ videoId }: SummaryProps) {
  const summary = await api.video.summary.query({ id: videoId });

  return (
    <>
      {summary.map((sum) => (
        <div id={sum.query} key={sum.query} className="space-y-2 ">
          <span className="w-fit bg-black text-sm sm:text-base">
            {sum.query}
          </span>
          <Carousel className="mx-16 max-w-full flex-1">
            <CarouselContent className="mx-auto">
              {sum.results.map((result, index) => (
                <CarouselItem
                  className=" pl-1 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                  key={index}
                >
                  <div className="p-1">
                    <SearchItem
                      key={result.video.id + result.start_ms + result.end_ms}
                      result={result}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      ))}
    </>
  );
}

type SearchResultsProps = {
  videoId: string;
  query: string;
};

async function SearchResults({ videoId, query }: SearchResultsProps) {
  const results = await api.video.search.query({ query, videoId });

  return (
    <div className="z-0 mx-auto flex h-full flex-1 flex-wrap justify-around gap-2 overflow-scroll pb-4 sm:min-w-[550px]">
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

export function DummyPage() {
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

  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <section className="mb-2">
        <ProfilePanel
          name={video.title}
          imageUrl={video.thumbnail_url}
          backHref={query ? `/p/${video.author}` : "/"}
          author={video.author}
        />
      </section>
      <section className="flex h-full flex-grow flex-col gap-4 md:col-span-2 lg:col-span-3">
        <SearchBar
          className="mt-auto pr-4"
          author={video.author}
          initQuery={query}
          placeholder={`find a moment from ${video.title}`}
        ></SearchBar>
        {query ? (
          <Suspense fallback={<DummyPage />}>
            <SearchResults query={query} videoId={video.id} />
          </Suspense>
        ) : (
          <SummaryResults videoId={video.id} />
        )}
      </section>
    </div>
  );
}
