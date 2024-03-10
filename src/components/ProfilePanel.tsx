import Link from "next/link";
import Image from "next/image";

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
  imageUrl: string;
  name: string;
};

export function ProfileImage({ imageUrl, name }: ProfileImageProps) {
  return (
    <Image
      src={imageUrl}
      height={180}
      width={270}
      className="mx-auto aspect-auto border-4 border-black font-bold"
      alt={`Youtube profile pic for ${name}`}
    />
  );
}

type ProfileHeaderProps = {
  imageUrl: string;
  name: string;
  author: string;
  backHref: string;
};

export function ProfilePanel({
  author,
  backHref,
  imageUrl,
  name,
}: ProfileHeaderProps) {
  return (
    <div className="flex flex-col justify-center gap-2">
      <div className="relative mx-auto w-fit">
        <ProfileImage imageUrl={imageUrl} name={name} />
        <div className="absolute bottom-4 left-4 z-20">
          <h1 className="bg-black px-1 text-sm font-bold tracking-widest line-clamp-2 text-white">
            {name}
          </h1>
        </div>
      </div>
      <Link
        href={backHref}
        className="mx-auto font-bold text-black hover:underline"
      >
        Back
      </Link>
    </div>
  );
}
