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
      <div className="outline-text-3 mx-auto max-w-prose p-3 text-justify leading-7">
        <p className="mb-2 ">
          parasocial lets you find and share moments from your favorite content
          creators. there's a certain kind of magic that happens when we get to
          share moments with each other.
        </p>
        <p className="mb-2 ">thank you for visiting :^)</p>

        <p>sincerely,</p>
        <p>ben</p>
      </div>
    </main>
  );
}
