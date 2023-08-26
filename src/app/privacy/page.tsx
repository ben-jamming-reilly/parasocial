import Link from "next/link";

export default function Page() {
  return (
    <main className="mx-24 mt-6 flex min-h-screen flex-col items-center">
      <div className=" flex w-full flex-row justify-start">
        <Link href="/">
          <h1 className="outline-text-3 text-2xl tracking-widest">
            parasocial
          </h1>
        </Link>
      </div>
      <div className="outline-text-3 mx-auto mb-6 max-w-prose p-3 text-sm leading-7 tracking-wider">
        <p>Last updated: 7/17/23</p>
      </div>
    </main>
  );
}
