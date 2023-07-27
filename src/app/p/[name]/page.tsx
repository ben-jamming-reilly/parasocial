import Link from "next/link";
import Image from "next/image";

import { SearchClient, YoutubeProfile } from "~/search";
import { env } from "~/env.mjs";

import SearchPage from "./SearchPage";
import UploadList from "./UploadList";

function msDate(date: string): number {
  const ms = new Date(date);
  return ms.getTime();
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

interface ProfileHeaderProps {
  profile: YoutubeProfile;
}

function ProfileHeader({ profile }: ProfileHeaderProps) {
  return (
    <div className="relative">
      <div className="relative mx-auto w-fit">
        <Image
          src={profile.channel_logo!}
          height={250}
          width={250}
          className="mx-auto border-4 border-black font-bold"
          alt={`Youtube profile pic for ${profile.channel_name}`}
        />
        <div className="absolute bottom-0 z-20 mb-4 ml-4">
          <div className="bg-black px-3 font-bold">
            <h1 className="tracking-widest text-white">
              {profile.channel_name}
            </h1>
          </div>
        </div>
      </div>
      <Link
        href="/"
        className="absolute left-0 top-0 max-h-fit max-w-fit border-4 border-black bg-black font-bold shadow-[8px_8px_0_0_#000] transition hover:shadow-none focus:outline-none focus:ring sm:ml-3"
      >
        <Image
          className="m-1"
          src="/icons/left-arrow.svg"
          height={32}
          width={32}
          alt="left arrow"
        />
      </Link>
    </div>
  );
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
    <main className="container my-4 flex flex-col items-center">
      <div className="flex w-full flex-col justify-between sm:w-fit sm:flex-row">
        <div className="flex max-w-lg flex-col gap-2">
          <ProfileHeader profile={profile} />
          <UploadList documents={documents} />
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
