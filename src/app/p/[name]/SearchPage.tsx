"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { SearchResult } from "~/lib/search";
import { trpcClient } from "~/lib/trpc-client";
import SearchItem from "./SearchItem";

export function DummyPage() {
  const dummies = [...Array(16).keys()];
  return (
    <div className="mx-auto flex min-w-[550px] flex-1 flex-wrap justify-around gap-2 overflow-scroll pb-4">
      {dummies.map((dummy) => (
        <div
          key={dummy}
          className="min-w-[200px] max-w-[300px] animate-pulse flex-col gap-2 text-xs tracking-wider hover:underline sm:flex"
        >
          <div className=" mx-auto h-[250px] w-[250px] border-4 border-black bg-black" />
          <div className="w-full bg-slate-900">
            <h3 className="line-clamp-2 w-full bg-black px-2 text-xs tracking-wider">
              <div className="bg-black p-1">
                <br />
              </div>
              <br />
            </h3>
            <p className="px-2"></p>
            <p className="line-clamp-2 w-full bg-black px-2 text-xs italic">
              <br />
              <br />
            </p>
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

export async function SearchPage({ author, initResults }: SearchPageProps) {
  const [results, setResults] = useState(initResults);
  const [query, setQuery] = useState<string>();
  const params = useSearchParams();

  // const { data, isLoading } = trpcClient.search.queryAuthor.useQuery({
  //   author,
  //   query: query!,
  // });

  useEffect(() => {
    setQuery(params.get("q") ?? undefined);
  }, [params]);

  return (
    <div className="mx-auto flex h-full min-w-[550px] flex-1 flex-wrap justify-around gap-2 overflow-scroll pb-4">
      {results && results.map((result) => <SearchItem result={result} />)}
    </div>
  );
}
