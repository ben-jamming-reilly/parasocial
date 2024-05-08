import Link from "next/link";
import Image from "next/image";
import SignInBtn from "~/components/UserButton";
import { cn } from "~/lib/utils";
import { Banner } from "./Banner";

export function Navbar() {
  return (
    <div className="flex w-full flex-row justify-between items-center">
      <Link className="hover:scale-95 transition" href="/">
        <div className="flex flex-row gap-1 p-1  text-xs tracking-wider">
          <h1 className="outline-text-3 text-xl sm:text-2xl my-auto">
            parasocial
          </h1>
        </div>
      </Link>

      <Link
        className="hover:scale-95 transition"
        href="https://discord.gg/ykXpmAb7kU"
      >
        <div className="flex flex-row gap-1 p-1 tracking-wider">
          <Image src="/icons/discord.svg" height={30} width={30} alt="" />
          <h3 className="justify-center h-fit outline-text-3 text-sm sm:text-xl  my-auto">
            Feedback
          </h3>
        </div>
      </Link>
      <SignInBtn />
    </div>
  );
}
