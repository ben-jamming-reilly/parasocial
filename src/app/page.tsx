import Link from "next/link";
import SignInBtn from "~/components/UserButton";

import { searchInstance } from "~/lib/search/instance";

import Profile from "./Profile";

export default async function Home() {
  const profiles = await searchInstance.profile.getAllProfiles();

  return (
    <main className="container mt-4 flex min-h-screen flex-col items-center">
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
