import Link from "next/link";
import Image from "next/image";

import { getServerAuthSession } from "~/server/auth";
import LogoutBtn from "~/components/LogoutBtn";
import SignInBtn from "~/components/SignInBtn";
import { YoutubeProfile } from "~/lib/search";

interface ProfileHeaderProps {
  profile: YoutubeProfile;
  backHref: string;
}
export default async function ProfileHeader({
  profile,
  backHref,
}: ProfileHeaderProps) {
  const session = await getServerAuthSession();

  return (
    <div className="relative">
      <div className="relative mx-auto w-fit">
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
        <div className="absolute bottom-0 z-20 mb-4 ml-4">
          <div className="bg-black px-3 font-bold">
            <h1 className="tracking-widest text-white">
              {profile.channel_name}
            </h1>
          </div>
        </div>
      </div>
      <Link
        href={backHref}
        className="absolute left-0 top-0 max-h-fit max-w-fit border-4 border-black bg-black font-bold shadow-[8px_8px_0_0_#000] transition hover:shadow-none focus:outline-none focus:ring sm:ml-3"
      >
        <Image
          className="m-1"
          src="/icons/left-arrow.svg"
          height={32}
          width={32}
          alt="left arrow"
        />
      </Link>

      {!session ? (
        <SignInBtn className="absolute right-0 top-0 max-h-fit max-w-fit" />
      ) : (
        <LogoutBtn
          user=""
          className="absolute right-0 top-0 max-h-fit max-w-fit "
        />
      )}
    </div>
  );
}
