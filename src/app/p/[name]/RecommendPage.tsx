import { cache } from "react";
import { api } from "~/trpc/server";
import { SearchItem } from "~/components/SearchItem";

type RecommendPageProps = {
  author: string;
};

const getTrending = cache((author: string) =>
  api.profile.trending.query({ author })
);

export default async function RecommendPage({ author }: RecommendPageProps) {
  const trending = await getTrending(author);

  return (
    <div className="z-0 mx-auto flex justify-evenly flex-wrap overflow-x-hidden gap-2 h-fit pb-4 sm:min-w-[550px] w-full">
      {trending &&
        trending.map((result) => (
          <SearchItem
            key={result.video.id + result.start_ms + result.end_ms}
            result={result}
          />
        ))}
    </div>
  );
}
