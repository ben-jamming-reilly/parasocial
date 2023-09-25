"use client";
import { FormEvent, ReactNode, useRef, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

import { cn } from "~/lib/utils";
import useInput from "~/hooks/useInput";
import { useClickOutside } from "~/hooks/useClickOutside";

import { useDebounce } from "~/hooks/useDebounce";
import { trpcClient } from "~/lib/trpc-client";
import { getBaseUrl } from "~/lib/utils";

type QuerySuggestionProps = {
  author: string;
  query: string;
};

function QuerySuggestion({ author, query }: QuerySuggestionProps) {
  const [queryUrl, setQueryUrl] = useState("");

  useEffect(() => {
    if (window) {
      const url = new URL(window.location.href);
      url.searchParams.delete("v");
      url.searchParams.delete("start");
      url.searchParams.delete("end");
      url.searchParams.set("q", query);
      setQueryUrl(url.toString());
    }
  }, []);

  return (
    <Link href={queryUrl} className="underline-white hover:underline ">
      {query}
    </Link>
  );
}

type SearchBarProps = {
  placeholder: string;
  author: string;
  initQuery?: string;
  children?: ReactNode;
  className?: string;
};

export function SearchBar({
  placeholder,
  children,
  author,
  initQuery,
  className,
}: SearchBarProps) {
  const [query, onQueryChange, setQuery] = useInput(initQuery);
  const [suggestions, setSuggestions] = useState(false);
  const debouncedQuery = useDebounce(query, 250);
  const params = useSearchParams();
  const ref = useRef<HTMLDivElement>(null);

  const router = useRouter();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    const url = new URL(window.location.href);
    url.searchParams.delete("v");
    url.searchParams.delete("start");
    url.searchParams.delete("end");
    url.searchParams.set("q", query);

    router.push(url.toString());
  };

  const { data } = trpcClient.search.previousQueries.useQuery(
    {
      author: author,
      query: debouncedQuery,
    },
    {
      enabled: query.length > 3,
      queryHash: [author, debouncedQuery].join("|"),
    }
  );

  useEffect(() => {
    const newQuery = params.get("q")!;
    if (newQuery) {
      setQuery(newQuery);
      setSuggestions(false);
    }
  }, [params]);

  const debounceSuggestions = useDebounce(data, 100);

  useClickOutside(ref, () => {
    setSuggestions(false);
  });

  return (
    <form
      onSubmit={onSubmit}
      className={cn(
        "mb-4 flex w-full flex-row justify-between gap-3 sm:mx-0",
        className
      )}
    >
      <button className="mt-auto">
        <Image
          src="/icons/search.svg"
          width="35"
          height="35"
          alt="Magnifying Glass"
        />
      </button>
      <div
        className="flex flex-1 flex-col"
        onFocus={() => setSuggestions(true)}
        ref={ref}
        onBlur={(e) => {
          if (ref.current && !ref.current.contains(e.target)) {
            setSuggestions(false);
          }
        }}
      >
        <input
          className="outline-text-3 mt-auto flex w-full flex-grow flex-row border-b-4 border-black bg-transparent px-1 text-base tracking-widest caret-white focus:outline-none "
          name="q"
          value={query}
          onChange={onQueryChange}
          autoComplete="off"
          placeholder={placeholder}
        />

        {debounceSuggestions &&
          debounceSuggestions.length > 0 &&
          suggestions && (
            <div className="relative h-0 w-full">
              <div className="absolute top-0 z-30 flex flex-col gap-1 bg-black bg-opacity-100 px-2 tracking-wider">
                {debounceSuggestions.map(({ id, query, author }) => (
                  <QuerySuggestion key={id} query={query} author={author!} />
                ))}
              </div>
            </div>
          )}
      </div>
      <div className="flex">{children}</div>
    </form>
  );
}
