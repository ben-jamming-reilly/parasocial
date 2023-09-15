import Link from "next/link";
import Image from "next/image";

import { searchInstance } from "~/lib/search/instance";
import { YoutubeProfile } from "~/lib/search";
import { getServerAuthSession } from "~/server/auth";
import { trpcServer } from "~/lib/trpc-server";
import LogoutBtn from "~/components/LogoutBtn";
import SignInBtn from "~/components/SignInBtn";
import { UploadList } from "./UploadList";

type ProfileImageProps = {
  profile: YoutubeProfile;
};

export async function ProfileImage({ profile }: ProfileImageProps) {
  return (
    <>
      <Image
        src={profile.channel_logo!}
        height={250}
        width={250}
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
  const session = await getServerAuthSession();
  const [profile, documents] = await Promise.all([
    searchInstance.profile.getProfile({ author }),
    searchInstance.documents.allDocuments({ author }),
  ]);

  return (
    <>
      <div className="mb-2 flex flex-row justify-around gap-4">
        <div className="flex flex-col justify-between">
          {session?.user && (
            <div className="flex-grow-1 focus:rin flex flex-row gap-2 bg-black p-2 shadow-[8px_8px_0_0_#000] transition hover:shadow-none focus:outline-none">
              <Image
                src={session?.user.image!}
                width="30"
                height="30"
                alt={`Profile picture for ${session.user.name}`}
              />
              <Link href="#" className="tracking-wider hover:underline">
                {session.user.name}
              </Link>
            </div>
          )}
          <Link
            href={backHref}
            className="mt-auto h-fit max-w-fit border-4 border-black bg-black font-bold shadow-[8px_8px_0_0_#000] transition hover:shadow-none focus:outline-none focus:ring "
          >
            <Image
              className="m-1"
              src="/icons/left-arrow.svg"
              height={32}
              width={32}
              alt="left arrow"
            />
          </Link>
        </div>
        <div className="relative w-fit">
          <ProfileImage profile={profile} />
          <div className="absolute bottom-0 z-20 mb-4 ml-4">
            <div className="bg-black px-1 font-bold">
              <h1 className="tracking-widest text-white">
                {profile.channel_name}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
