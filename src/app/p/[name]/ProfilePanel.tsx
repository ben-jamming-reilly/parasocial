import {} from "react";
import Link from "next/link";
import Image from "next/image";
import { api } from "~/trpc/server";
import { ProfileImage } from "~/components/ProfileImage";

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
        <ProfileImage
          height={170}
          width={170}
          src={profile.channel_logo!}
          label={profile.channel_name}
        />
        <div className="absolute bottom-4 left-4 z-20">
          <h1 className="bg-black px-1 font-bold tracking-widest text-white">
            {profile.channel_name}
          </h1>
        </div>
      </div>
    </div>
  );
}
