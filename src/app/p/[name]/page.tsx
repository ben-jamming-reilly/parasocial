import { SearchClient } from "~/search";
import { prisma } from "~/server/db";
import { env } from "~/env.mjs";

import SearchPage from "./SearchPage";
import UploadList from "./UploadList";
import ProfileHeader from "./ProfileHeader";
import { SearchQuery } from "@prisma/client";

function msDate(date: string): number {
  const ms = new Date(date);
  return ms.getTime();
}

type SearchParamType = string | string[] | undefined;

function parseSearchQuery(param: SearchParamType): string | undefined {
  if (Array.isArray(param)) return param[0];
  else return param;
}

async function getLatestSearches(query: string | undefined, author: string) {
  if (query) return [];

  const searches = await prisma.searchQuery.findMany({
    where: {
      author: author,
    },
    orderBy: {
      create_date: "desc",
    },
    take: 100,
  });

  const queries = new Set(searches.map((search) => search.query.toLowerCase()));
  let uniqueSearches: SearchQuery[] = [];

  searches.forEach((search) => {
    if (queries.has(search.query.toLowerCase())) {
      uniqueSearches.push(search);
      queries.delete(search.query.toLowerCase());
    }
  });

  return uniqueSearches;
}

async function getSearchResults(
  client: SearchClient,
  query: string | undefined,
  author: string
) {
  if (!query) return [];
  return client.search.documentSegmentsByQuery(query, author, 0, 20);
}

interface PageProps {
  params: { name: string };
  searchParams: { [key: string]: SearchParamType };
}

export default async function Page({ params, searchParams }: PageProps) {
  const client = new SearchClient({
    BASE: env.PARASOCIAL_API_BASE_URL,
  });
  const author = decodeURI(params.name);
  const query = parseSearchQuery(searchParams.q);

  const [profile, documents, searchResults, latestSearches] = await Promise.all(
    [
      client.profile.getYoutube(author),
      client.search.allDocuments(author),
      getSearchResults(client, query, author),
      getLatestSearches(query, author),
    ]
  );

  if (query) {
    // log the search query
    await prisma.searchQuery.create({
      data: {
        query: query,
        author: author,
      },
    });
  }

  console.log(query);

  return (
    <main className="my-4 flex flex-col items-center sm:container">
      <div className="flex w-full flex-col justify-between sm:w-fit sm:flex-row">
        <div className="container flex max-w-lg flex-col gap-2 sm:w-max">
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
