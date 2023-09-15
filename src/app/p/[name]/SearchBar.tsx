import Image from "next/image";
import { ReactNode } from "react";

type SearchBarProps = {
  placeholder: string;
  children: ReactNode;
};

export function SearchBar({ placeholder, children }: SearchBarProps) {
  return (
    <form className="mb-4 flex flex-row gap-1 sm:mx-0">
      <button className="mt-auto">
        <Image
          src="/icons/search.svg"
          width="40"
          height="40"
          alt="Magnifying Glass"
        />
      </button>
      <div className="flex flex-1 flex-col">
        <input
          className="outline-text-3 mt-auto flex w-full flex-row border-b-4 border-black bg-transparent px-1 text-base tracking-widest caret-white focus:outline-none "
          name="q"
          placeholder={placeholder}
        />
      </div>
      <div className="flex">{children}</div>
    </form>
  );
}
