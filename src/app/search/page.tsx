import { Suspense, cache } from "react";
import { api } from "~/trpc/server";

import { SearchBar } from "~/components/SearchBar";
import { SearchPage, DummyPage } from "./SearchPage";
import { Player } from "~/components/Player";
import { notFound } from "next/navigation";

export const revalidate = 600; // revalidate the data every 10 min
export const maxDuration = 60;

type SearchParamType = string | string[] | undefined;

interface PageProps {
  params: { name: string };
  searchParams: { [key: string]: SearchParamType };
}

function parseSearchQuery(param: SearchParamType): string | undefined {
  if (Array.isArray(param)) return param[0];
  else return param;
}

export default async function Page({ searchParams }: PageProps) {
  const query = parseSearchQuery(searchParams.q);

  return (
    <div className="flex flex-col">
      <section className="flex flex-col gap-4 md:col-span-2 lg:col-span-3">
        <SearchBar
          className="mt-auto"
          author={""}
          initQuery={query}
          placeholder={`find a moment`}
        />
        <div className="flex min-h-[93vh] flex-row">
          {query && (
            <Suspense fallback={<DummyPage />}>
              <SearchPage query={query} />
            </Suspense>
          )}
          <Player />
        </div>
      </section>
    </div>
  );
}
