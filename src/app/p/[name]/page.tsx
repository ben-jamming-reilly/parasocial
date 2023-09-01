import { SearchClient } from "~/lib/search";
import { prisma } from "~/server/db";
import { env } from "~/env.mjs";

import SearchPage from "./SearchPage";
import UploadList from "./UploadList";
import ProfileHeader from "./ProfileHeader";
import { trpcServer } from "~/lib/trpc-server";

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

async function getSearchResults(query: string | undefined, author: string) {
  if (!query) return [];

  return await trpcServer.search.fromAuthor({
    query,
    author,
  });
}

async function getLatestSearches(query: string | undefined, author: string) {
  if (query) return [];

  return await trpcServer.search.previousSearches({ author });
}

export default async function Page({ params, searchParams }: PageProps) {
  const author = decodeURI(params.name);
  const query = parseSearchQuery(searchParams.q);

  const [profile, documents, searchResults, latestSearches] = await Promise.all(
    [
      trpcServer.profile.getYoutubeProfile({ channel: author }),
      trpcServer.profile.getDocuments({ channel: author }),
      getSearchResults(query, author),
      getLatestSearches(query, author),
    ]
  );

  return (
    <main className="my-4 flex flex-col items-center sm:container">
      <div className="flex w-full flex-col justify-between sm:w-fit sm:flex-row">
        <div className="container flex max-w-lg flex-col gap-2  px-3 sm:mr-4 sm:w-max">
          <ProfileHeader
            backHref={query ? `/p/${author}` : "/"}
            profile={profile}
          />
          <UploadList
            documents={documents.sort(
              (lDoc, rDoc) =>
                msDate(rDoc.publish_date) - msDate(lDoc.publish_date)
            )}
          />
        </div>
        <div className="flex flex-grow flex-row justify-center">
          <SearchPage
            author={author}
            initQuery={query}
            searchResults={searchResults}
            prevSearches={latestSearches}
          />
        </div>
      </div>
    </main>
  );
}
