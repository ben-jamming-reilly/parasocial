import { redirect } from "next/navigation";
import { BaseDocument, SearchClient, YoutubeDocument } from "~/search";
import { env } from "~/env.mjs";

import Profile from "./Profile";

function Masthead() {
  return (
    <div className="m-6 flex w-full flex-row justify-start">
      <h1 className="outline-text-3 text-2xl tracking-widest">parasocial</h1>
    </div>
  );
}

function Footer() {
  return <div></div>;
}

export default async function Home() {
  const client = new SearchClient({
    BASE: env.PARASOCIAL_API_BASE_URL,
  });

  const docs = await client.search.allDocuments();

  // Get all unique channels from all documents
  const channels = Array.from(
    new Set(
      docs
        .filter((doc): doc is YoutubeDocument => doc.url.includes("youtube"))
        .map((doc) => doc.channel_id)
    )
  );

  const profiles = await Promise.all(
    channels.map((channelId) => client.profile.getYoutube(channelId))
  );

  return (
    <main className="mx-24 mt-6 flex flex-col items-center ">
      <Masthead />
      <div className="grid grid-cols-2 justify-around gap-4">
        {profiles.map((profile) => (
          <Profile author={profile.channel_name} url={profile.channel_logo!} />
        ))}
      </div>
    </main>
  );
}
