import { Suspense } from "react";

import { searchInstance } from "~/lib/search/instance";
import SignInBtn from "~/components/SignInBtn";
import { SearchPage, DummyPage } from "./SearchPage";
import RecommendPage from "./RecommendPage";
import { UploadList } from "./UploadList";
import { ProfilePanel } from "./ProfilePanel";
import { SearchBar } from "./SearchBar";
import { Player } from "./Player";

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

  const query = parseSearchQuery(searchParams.q);
  const documentId = parseSearchQuery(searchParams.v);
  const start = parseSearchQuery(searchParams.start);
  const end = parseSearchQuery(searchParams.end);

  const [documents, results, currDocument] = await Promise.all([
    searchInstance.documents.allDocuments({ author }),
    query
      ? searchInstance.search.querySegmentsFromProfile({
          author: author,
          query: query!,
        })
      : undefined,
    documentId
      ? searchInstance.documents.getDocument({ id: documentId })
      : undefined,
  ]);

  return (
    <main className="flex min-h-screen w-screen flex-row gap-3 pl-4 pt-2">
      <section className="flex w-full flex-col gap-2 sm:w-fit sm:flex-col">
        <ProfilePanel backHref={query ? `/p/${author}` : "/"} author={author} />
        <UploadList documents={documents} />
      </section>

      <section className="flex h-screen flex-1 flex-col">
        <SearchBar
          className="mt-auto pr-4"
          initQuery={query}
          placeholder={`find a moment from ${author}`}
        >
          <SignInBtn />
        </SearchBar>
        <div className="flex h-[93vh] flex-row">
          {query ? (
            <Suspense fallback={<DummyPage />}>
              <SearchPage author={author} initResults={results} />
            </Suspense>
          ) : (
            <RecommendPage />
          )}
          {currDocument && (
            <Player
              video={currDocument}
              start={start ? parseInt(start) : undefined}
              end={end ? parseInt(end) : undefined}
            />
          )}
        </div>
      </section>
    </main>
  );
}
