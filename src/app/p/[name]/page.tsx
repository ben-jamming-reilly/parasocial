import Link from "next/link";
import Image from "next/image";

import { SearchClient, YoutubeDocument } from "~/search";
import { env } from "~/env.mjs";
import { ScrollArea } from "~/components/ui/scroll-area";

function msDate(date: string): number {
  const ms = new Date(date);
  return ms.getTime();
}

function displayDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString();
}

export default async function Page({ params }: { params: { name: string } }) {
  const author = decodeURI(params.name);
  const client = new SearchClient({
    BASE: env.PARASOCIAL_API_BASE_URL,
  });

  const profile = await client.profile.getYoutube(author);

  const documents = (await client.search.allDocuments(author))
    .filter((doc): doc is YoutubeDocument => doc.url.includes("youtube"))
    .sort(
      (lDoc, rDoc) => msDate(rDoc.publish_date) - msDate(lDoc.publish_date)
    );

  // Just for testing rn
  for (let i = 0; i < 5; i++) {
    documents.push(documents[0]!);
    documents.push(documents[1]!);
  }

  return (
    <main className="mx-24 mt-6 flex flex-col items-center ">
      <div className="flex flex-row justify-between">
        <div className="flex max-w-lg flex-col gap-2">
          <div className="relative ">
            <Image
              src={profile.channel_logo!}
              height={250}
              width={250}
              className="mx-auto border-4 border-black font-bold"
              alt={`Youtube profile pic for ${author}`}
            />
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
              Uploads
            </h3>
          </div>
          <ScrollArea className="h-[50vh] w-[30rem]">
            <div className="flex flex-col gap-3 px-3 text-white">
              {documents.map((doc) => (
                <Link
                  href={`#${doc.url}`}
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
        <div className="flex flex-1">a</div>
      </div>
    </main>
  );
}
