import {} from "react";
import Link from "next/link";
import Image from "next/image";
import { api } from "~/trpc/server";

import { searchInstance } from "~/lib/search/instance";
import { YoutubeProfile } from "~/lib/search";

export function BackButton({ backHref }: { backHref: string }) {
  return (
    <Link
      href={backHref}
      className=" h-fit border-4 border-black bg-black font-bold shadow-[8px_8px_0_0_#000] transition hover:shadow-none focus:outline-none focus:ring "
    >
      <Image
        className="m-1"
        src="/icons/left-arrow.svg"
        height={32}
        width={32}
        alt="left arrow"
      />
    </Link>
  );
}

type ProfileImageProps = {
  profile: YoutubeProfile;
};

export async function ProfileImage({ profile }: ProfileImageProps) {
  return (
    <>
      <Image
        src={profile.channel_logo!}
        height="200"
        width="200"
        className="mx-auto hidden border-4 border-black font-bold sm:block"
        alt={`Youtube profile pic for ${profile.channel_name}`}
      />
      <Image
        src={profile.channel_logo!}
        height={155}
        width={155}
        className="mx-auto border-4 border-black font-bold sm:hidden"
        alt={`Youtube profile pic for ${profile.channel_name}`}
      />
    </>
  );
}

type ProfileHeaderProps = {
  author: string;
  backHref: string;
};

export async function ProfilePanel({ author, backHref }: ProfileHeaderProps) {
  const profile = await api.profile.getYoutubeProfile.query({ author });

  return (
    <div className="gap-4">
      <div className="absolute flex flex-row justify-between">
        <BackButton backHref={backHref} />
      </div>
      <div className="relative mx-auto w-fit">
        <ProfileImage profile={profile} />
        <div className="absolute bottom-4 left-4 z-20">
          <h1 className="bg-black px-1 font-bold tracking-widest text-white">
            {profile.channel_name}
          </h1>
        </div>
      </div>
    </div>
  );
}
