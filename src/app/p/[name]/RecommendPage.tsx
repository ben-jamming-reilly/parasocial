import Image from "next/image";

export default function RecommendPage() {
  return (
    <div className="mx-auto flex h-full flex-col justify-center">
      <Image
        className="mx-auto "
        src="/icons/rainbow-star.svg"
        height="100"
        width="100"
        alt="rainbow star"
      />
    </div>
  );
}
