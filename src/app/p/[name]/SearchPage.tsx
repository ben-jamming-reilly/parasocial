"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

import useInput from "~/hooks/useInput";
import { SearchResult } from "~/search";

interface SearchProps {
  initQuery?: string;
  initResults: SearchResult[];
}

export default function Search({ initQuery, initResults }: SearchProps) {
  const [results, setResults] = useState(initResults);
  const [query, onQueryChange, setQuery] = useInput(initQuery || "");

  //
  return (
    <div className="w-[35rem]">
      <form className="flex h-fit flex-row gap-1">
        <Image
          src="/icons/search.svg"
          width="30"
          height="30"
          alt="Magnifying Glass"
        />
        <input
          className="outline-text-3 flex w-full flex-row border-b-4 border-black bg-transparent  text-lg tracking-widest caret-white focus:outline-none "
          name="q"
          onChange={onQueryChange}
          value={query}
        />
      </form>
      <div className="flex flex-col">
        {results.map((result) => (
          <div>{result.text}</div>
        ))}
      </div>
    </div>
  );
}
