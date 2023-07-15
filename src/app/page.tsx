import { SearchClient, YoutubeVideo } from "~/search";
import { env } from "~/env.mjs";

import Profile from "./Profile";
import Link from "next/link";

export default async function Home() {
  const client = new SearchClient({
    BASE: env.PARASOCIAL_API_BASE_URL,
  });

  const docs = await client.search.allDocuments();

  // Get all unique channels from all documents
  const channels = Array.from(
    new Set(
      docs
        .filter((doc): doc is YoutubeVideo => doc.url.includes("youtube"))
        .map((doc) => doc.channel_id)
    )
  );

  const profiles = await Promise.all(
    channels.map((channelId) => client.profile.getYoutube(channelId))
  );

  return (
    <main className="mx-24 mt-6 flex min-h-screen flex-col items-center">
      <div className="mb-6 flex w-full flex-row justify-start">
        <Link href="/">
          <h1 className="outline-text-3 text-2xl tracking-widest">
            parasocial
          </h1>
        </Link>
      </div>
      <div className="mb-12 grid grid-cols-2 justify-around gap-4">
        <p className="col-span-2 text-justify font-semibold  leading-6 tracking-widest text-black">
          find your favorite moments from...
        </p>
        {profiles.map((profile) => (
          <Profile author={profile.channel_name} url={profile.channel_logo!} />
        ))}
      </div>
    </main>
  );
}
