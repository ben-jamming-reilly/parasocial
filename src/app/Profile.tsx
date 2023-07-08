import Image from "next/image";
import Link from "next/link";

export interface ProfileProps {
  author: string;
  url: string;
}

export default function Profile({ author, url }: ProfileProps) {
  return (
    <Link
      href={`p/${author}`}
      className="relative border-4 border-black font-bold shadow-[8px_8px_0_0_#000] transition hover:shadow-none focus:outline-none focus:ring "
    >
      <Image
        src={url}
        className="z-10"
        height={250}
        width={250}
        alt={`Youtube profile pic for ${author}`}
      />
      <div className="absolute bottom-0 z-20 mb-4 ml-4">
        <div className="bg-black px-3">
          <p className="tracking-widest text-white">{author}</p>
        </div>
      </div>
    </Link>
  );
}
