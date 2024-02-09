import Link from "next/link";
import SignInBtn from "~/components/UserButton";

export function Navbar() {
  return (
    <div className="flex w-full flex-row justify-between">
      <Link href="/">
        <h1 className="outline-text-3 text-2xl tracking-widest">parasocial</h1>
      </Link>
      <SignInBtn />
    </div>
  );
}
