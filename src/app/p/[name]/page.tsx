import { Suspense } from "react";

import { searchInstance } from "~/lib/search/instance";
import { SearchPage, DummyPage } from "./SearchPage";
import RecommendPage from "./RecommendPage";
import { UploadList } from "./UploadList";
import { ProfilePanel } from "./ProfilePanel";
import { SearchBar } from "./SearchBar";
import { getServerAuthSession } from "~/server/auth";

function msDate(date: string): number {
  const ms = new Date(date);
  return ms.getTime();
}

type SearchParamType = string | string[] | undefined;

interface PageProps {
  params: { name: string };
  searchParams: { [key: string]: SearchParamType };
}

function parseSearchQuery(param: SearchParamType): string | undefined {
  if (Array.isArray(param)) return param[0];
  else return param;
}

export default async function Page({ params, searchParams }: PageProps) {
  const author = decodeURI(params.name);
  const documents = await searchInstance.documents.allDocuments({ author });
  const session = await getServerAuthSession();
  const query = parseSearchQuery(searchParams.q);

  return (
    <main className="mx-8 flex min-h-screen flex-col gap-3 pt-2 sm:flex-row">
      <section className="flex w-full flex-col gap-2 sm:w-fit sm:flex-col">
        <ProfilePanel backHref={query ? `/p/${author}` : "/"} author={author} />
        <UploadList documents={documents} />
      </section>

      <div className="flex flex-grow flex-col">
        <SearchBar placeholder={`find a moment from ${author}`}>
          <div />
        </SearchBar>
        {query ? (
          <Suspense fallback={<DummyPage />}>
            <SearchPage author={author} query={query} />
          </Suspense>
        ) : (
          <RecommendPage />
        )}
      </div>
    </main>
  );
}
