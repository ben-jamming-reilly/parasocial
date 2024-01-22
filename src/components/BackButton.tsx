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
