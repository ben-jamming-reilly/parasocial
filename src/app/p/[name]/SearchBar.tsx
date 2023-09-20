"use client";
import { FormEvent, ReactNode } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { cn } from "~/lib/utils";
import useInput from "~/hooks/useInput";

type SearchBarProps = {
  placeholder: string;
  initQuery?: string;
  children?: ReactNode;
  className?: string;
};

export function SearchBar({
  placeholder,
  children,
  initQuery,
  className,
}: SearchBarProps) {
  const [query, onQueryChange, setQuery] = useInput(initQuery);
  const router = useRouter();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    router.push(`?q=${encodeURIComponent(query)}`);
  };

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
      <div className="flex flex-1 flex-col">
        <input
          className="outline-text-3 mt-auto flex w-full flex-row border-b-4 border-black bg-transparent px-1 text-base tracking-widest caret-white focus:outline-none "
          name="q"
          value={query}
          onChange={onQueryChange}
          placeholder={placeholder}
        />
      </div>
      <div className="flex">{children}</div>
    </form>
  );
}
