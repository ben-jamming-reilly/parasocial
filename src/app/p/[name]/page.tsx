import Link from "next/link";
import Image from "next/image";

import { SearchClient, YoutubeVideo } from "~/search";
import { env } from "~/env.mjs";
import { ScrollArea } from "~/components/ui/scroll-area";

import SearchPage from "./SearchPage";

function msDate(date: string): number {
  const ms = new Date(date);
  return ms.getTime();
}

function displayDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString();
}

type SearchParamType = string | string[] | undefined;

function parseQueryParam(param: SearchParamType): string | undefined {
  if (Array.isArray(param)) return param[0];
  else return param;
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
  const profile = await client.profile.getYoutube(author);

  const documents = (await client.search.allDocuments(author)).sort(
    (lDoc, rDoc) => msDate(rDoc.publish_date) - msDate(lDoc.publish_date)
  );

  const query = parseQueryParam(searchParams.q);
  const searchResults = query
    ? await client.search.documentSegmentsByQuery(query, author, 0, 20)
    : [];

  return (
    <main className="mx-24 my-6  flex flex-col items-center">
      <div className="flex flex-row justify-between">
        <div className="flex max-w-lg flex-col gap-2">
          <div className="relative">
            <div className="relative mx-auto w-fit">
              <Image
                src={profile.channel_logo!}
                height={250}
                width={250}
                className="mx-auto border-4 border-black font-bold"
                alt={`Youtube profile pic for ${author}`}
              />
              <div className="absolute bottom-0 z-20 mb-4 ml-4 ">
                <div className="bg-black px-3 font-bold">
                  <h1 className="tracking-widest text-white">{author}</h1>
                </div>
              </div>
            </div>
            <Link
              href="/"
              className="absolute left-0 top-0 ml-3 max-h-fit max-w-fit border-4 border-black bg-black font-bold shadow-[8px_8px_0_0_#000] transition hover:shadow-none focus:outline-none focus:ring"
            >
              <Image
                className="m-1"
                src="/icons/left-arrow.svg"
                height={32}
                width={32}
                alt=""
              />
            </Link>
          </div>
          <div className="px-3">
            <h3 className="max-w-fit bg-black px-3 font-bold tracking-widest text-white">
              uploads
            </h3>
          </div>
          <ScrollArea className="h-[50vh] w-[30rem]">
            <div className="flex flex-col gap-3 px-3 text-white">
              {documents.map((doc) => (
                <Link
                  href={doc.url}
                  className="text flex flex-row gap-2 border-4 border-black bg-black px-4 hover:underline"
                >
                  <Image
                    src={doc.thumbnail_url}
                    width={80}
                    height={80}
                    alt={`Thumbnail for ${doc.title}`}
                  />
                  <div className="flex-1 flex-col-reverse">
                    <p className="flex-1 text-justify tracking-widest text-white">
                      {doc.title}
                    </p>
                    <p className="text-xs text-neutral-400">
                      {displayDate(doc.publish_date)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </ScrollArea>
        </div>
        <div className="flex flex-1">
          <SearchPage
            author={author}
            initQuery={query}
            initResults={searchResults}
          />
        </div>
      </div>
    </main>
  );
}
