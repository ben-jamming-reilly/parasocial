import { cache } from "react";
import { SearchItem } from "~/components/SearchItem";
import { api } from "~/trpc/server";

export function DummyPage() {
  const dummies = [...Array(20).keys()];
  return (
    <div className="mx-auto flex flex-1 flex-wrap justify-around gap-2 overflow-scroll pb-4  sm:min-w-[550px]">
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

type SearchPageProps = {
  author: string;
  query: string;
};

const search = cache((author: string, query: string) =>
  api.video.search.query({ author, query })
);

export async function SearchPage({ author, query }: SearchPageProps) {
  const results = await search(author, query);

  return (
    <div className="z-0 mx-auto flex h-min-full flex-1 flex-wrap justify-around overflow-x-hidden gap-2  pb-4 sm:min-w-[550px]">
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
