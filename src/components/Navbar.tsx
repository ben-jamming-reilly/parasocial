import Link from "next/link";
import SignInBtn from "~/components/UserButton";
import { Banner } from "./Banner";

export function Navbar() {
  return (
    <div className="flex w-full flex-row justify-between items-center">
      <Link href="/">
        <h1 className="outline-text-3 text-2xl tracking-widest">parasocial</h1>
      </Link>
      <Banner
        messages={["btw, you can upload up to 3 videos a day when you sign in"]}
      />
      <SignInBtn />
    </div>
  );
}
