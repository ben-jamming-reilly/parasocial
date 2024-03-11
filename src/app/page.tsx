import { api } from "~/trpc/server";
import { cache } from "react";

import Profile from "./Profile";

export const revalidate = 360; // revalidate the data at most every hour

export default async function Home() {
  // const profiles = await searchInstance.profile.getAllProfiles();
  const profiles = await api.profile.getAll.query({});

  return (
    <main className="container mt-4 flex min-h-screen flex-col items-center">
      <p className="col-span-1 text-justify font-semibold leading-6 tracking-normal text-black sm:col-span-2 sm:tracking-widest">
        find your favorite moments from...
      </p>
      <div className="mb-12 grid grid-cols-1 justify-around gap-4 sm:grid-cols-2 md:grid-cols-3">
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
