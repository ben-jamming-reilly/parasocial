"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

import { SearchQuery } from "@prisma/client";
import useInput from "~/hooks/useInput";
import { SearchResult } from "~/search";
import PreviousSearch from "./PreviousSearch";
import SearchItem from "./SearchItem";

interface SearchPageProps {
  author: string;
  initQuery?: string;
  searchResults: SearchResult[];
  prevSearches: SearchQuery[];
}

export default function SearchPage({
  author,
  initQuery,
  searchResults,
  prevSearches,
}: SearchPageProps) {
  const [results, setResults] = useState(searchResults);
  const [query, onQueryChange, setQuery] = useInput(initQuery || "");
  const params = useSearchParams();

  return (
    <div className="mt-4 w-full sm:w-[38rem]">
      <form className="mx-2 mb-4 flex flex-row gap-1 sm:mx-0">
        <button>
          <Image
            src="/icons/search.svg"
            width="25"
            height="25"
            alt="Magnifying Glass"
          />
        </button>
        <div className="flex flex-1 flex-col">
          <input
            className="outline-text-3 flex w-full flex-row border-b-4 border-black bg-transparent px-1 text-xs tracking-widest caret-white focus:outline-none sm:text-sm"
            name="q"
            onChange={onQueryChange}
            value={query}
            placeholder={`search for moments from ${author}`}
          />
        </div>
      </form>
      <div className="mx-2 mt-2 flex flex-col gap-2 sm:mx-4 sm:mt-4">
        {(!initQuery || results.length === 0) && (
          <div className="flex h-[75vh] w-full flex-col gap-2">
            <p className="text-center font-semibold leading-6 tracking-normal text-black sm:tracking-widest">
              latest searches...
            </p>
            {prevSearches.map((prevQuery) => (
              <PreviousSearch search={prevQuery} />
            ))}
          </div>
        )}
        {params.has("q") &&
          results.map((result) => <SearchItem result={result} />)}
      </div>
    </div>
  );
}
