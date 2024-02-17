import Link from "next/link";
import Image from "next/image";

type ProfileImageProps = {
  width: number;
  height: number;
  src: string;
  label: string;
};

export function ProfileImage({ src, height, width, label }: ProfileImageProps) {
  return (
    <div className="relative h-fit w-fit">
      <Image
        src={src}
        height={height}
        width={width}
        className="mx-auto border-4 border-black font-bold "
        alt={`Profile picture for ${label}`}
      />
      <div className="absolute bottom-4 left-4 z-20">
        <h1 className="line-clamp-2 bg-black px-1 text-sm font-bold tracking-widest text-white">
          {label}
        </h1>
      </div>
    </div>
  );
}
