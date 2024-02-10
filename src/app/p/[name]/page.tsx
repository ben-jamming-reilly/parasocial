import { Suspense } from "react";
import SignInBtn from "~/components/UserButton";
import { api } from "~/trpc/server";

import { SearchPage, DummyPage } from "./SearchPage";
import RecommendPage from "./RecommendPage";
import { UploadList } from "./UploadList";
// import { ProfilePanel } from "./ProfilePanel";
import { SearchBar } from "../../../components/SearchBar";
import { ProfilePanel } from "~/components/ProfilePanel";
import { Player } from "~/components/Player";

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

  const [profile, documents] = await Promise.all([
    api.profile.getYoutubeProfile.query({ author }),
    api.video.getAll.query({ author }),
  ]);

  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <section className="mb-2 space-y-2">
        <ProfilePanel
          imageUrl={profile.channel_logo!}
          backHref={query ? `/p/${author}` : "/"}
          author={author}
          name={author}
        />
        <UploadList documents={documents} />
      </section>

      <section className="flex flex-col gap-4 md:col-span-2 lg:col-span-3">
        <SearchBar
          className="mt-auto"
          author={author}
          initQuery={query}
          placeholder={`find a moment from ${author}`}
        ></SearchBar>
        <div className="flex h-[93vh] flex-row">
          {query ? (
            <Suspense fallback={<DummyPage />}>
              <SearchPage author={author} query={query} />
            </Suspense>
          ) : (
            <RecommendPage />
          )}

          <Player />
        </div>
      </section>
    </div>
  );
}
