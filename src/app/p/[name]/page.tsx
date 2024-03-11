import { Suspense } from "react";
import { api } from "~/trpc/server";

import { SearchPage, DummyPage } from "./SearchPage";
import RecommendPage from "./RecommendPage";
import { UploadList } from "./UploadList";
import { SearchBar } from "../../../components/SearchBar";
import { ProfilePanel } from "~/components/ProfilePanel";
import { Player } from "~/components/Player";
import { notFound } from "next/navigation";

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

  const [profile, videos] = await Promise.all([
    api.profile.getYoutubeProfile.query({ author }),
    api.video.getAll.query({ author }),
  ]);

  if (!profile) return notFound();

  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <section className="mb-2 space-y-2">
        <ProfilePanel
          imageUrl={profile.channel_logo!}
          backHref={query ? `/p/${author}` : "/"}
          author={author}
          name={author}
        />
        <UploadList documents={videos} />
      </section>

      <section className="flex flex-col gap-4 md:col-span-2 lg:col-span-3">
        <SearchBar
          className="mt-auto"
          author={author}
          initQuery={query}
          placeholder={`find a moment from ${author}`}
        ></SearchBar>
        {!query && (
          <h3 className="px-4 outline-text-3 underline underline-offset-8">
            trending
          </h3>
        )}
        <div className="flex min-h-[93vh] flex-row">
          {query ? (
            <Suspense fallback={<DummyPage />}>
              <SearchPage author={author} query={query} />
            </Suspense>
          ) : (
            <Suspense fallback={<DummyPage />}>
              <RecommendPage author={author} />
            </Suspense>
          )}

          <Player />
        </div>
      </section>
    </div>
  );
}
