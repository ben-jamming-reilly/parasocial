import { SearchClient, YoutubeVideo } from "~/search";
import { env } from "~/env.mjs";

import Profile from "./Profile";
import Link from "next/link";

export default async function Home() {
  const client = new SearchClient({
    BASE: env.PARASOCIAL_API_BASE_URL,
  });

  const profiles = await client.profile.getAllProfiles();

  return (
    <main className="container mt-4 flex min-h-screen flex-col items-center">
      <div className="mb-6 flex w-full flex-row justify-start">
        <Link href="/">
          <h1 className="outline-text-3 text-2xl tracking-widest">
            parasocial
          </h1>
        </Link>
      </div>
      <div className="mb-12 grid grid-cols-1 justify-around gap-4 sm:grid-cols-2">
        <p className="col-span-1 text-justify font-semibold leading-6 tracking-normal text-black sm:col-span-2 sm:tracking-widest">
          find your favorite moments from...
        </p>
        {profiles.map((profile) => (
          <Profile
            key={profile.channel_id}
            author={profile.channel_name}
            url={profile.channel_logo!}
          />
        ))}
      </div>
    </main>
  );
}
