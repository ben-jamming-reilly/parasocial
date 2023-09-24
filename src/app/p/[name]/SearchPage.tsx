"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { SearchResult } from "~/lib/search";
import { trpcClient } from "~/lib/trpc-client";
import SearchItem from "./SearchItem";

export function DummyPage() {
  const dummies = [...Array(16).keys()];
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

type SearchPageProps = {
  author: string;
  initResults?: SearchResult[];
};

export function SearchPage({ author, initResults }: SearchPageProps) {
  const [results, setResults] = useState(initResults);
  const [query, setQuery] = useState<string>();
  const params = useSearchParams();

  const { data, isLoading } = trpcClient.search.queryAuthor.useQuery(
    {
      author,
      query: query!,
    },
    {
      enabled: !!query,
      queryHash: [query, author].join("|"),
    }
  );

  useEffect(() => {
    setQuery(params.get("q") ?? undefined);
  }, [params]);

  useEffect(() => {
    if (data) setResults(data);
  }, [data]);

  return (
    <>
      {isLoading ? (
        <DummyPage />
      ) : (
        <div className="z-0 mx-auto flex h-full min-w-[550px] flex-1 flex-wrap justify-around gap-2 overflow-scroll pb-4">
          {results &&
            results.map((result) => (
              <SearchItem
                key={result.document.id + result.start_ms}
                result={result}
              />
            ))}
        </div>
      )}
    </>
  );
}
