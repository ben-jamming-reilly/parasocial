import { trpcServer } from "~/lib/trpc-server";
import SearchItem from "./SearchItem";

export function DummyPage() {
  const dummies = [...Array(16).keys()];
  return (
    <div className="grid gap-3 px-2 py-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {dummies.map((dummy) => (
        <div
          key={dummy}
          className="min-w-[200px] max-w-[300px] animate-pulse flex-col gap-2 text-xs tracking-wider hover:underline sm:flex"
        >
          <div className=" mx-auto h-[250px] w-[250px] border-4 border-black bg-black" />
          <div className="w-full bg-slate-900">
            <h3 className="line-clamp-2 w-full bg-black px-2 text-xs tracking-wider">
              <div className="bg-black p-1">
                <br />
              </div>
              <br />
            </h3>
            <p className="px-2"></p>
            <p className="line-clamp-2 w-full bg-black px-2 text-xs italic">
              <br />
              <br />
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

type SearchPageProps = {
  author: string;
  query: string;
};

export async function SearchPage({ author, query }: SearchPageProps) {
  const results = await trpcServer.search.queryAuthor({
    author,
    query,
  });

  return (
    <div className="grid items-center justify-center gap-x-2 gap-y-6 px-4 py-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {results.map((result) => (
        <SearchItem result={result} />
      ))}
    </div>
  );
}
