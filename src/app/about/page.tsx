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
          Parasocial lets you share your favorite moments of your content
          creators. The goal is to provide a place where fans can easily find
          and showcase those memorable clips and share them.
        </p>
        <p className="mb-2 ">Thank you for visiting :^)</p>

        <p>Sincerely,</p>
        <p>Ben</p>
      </div>
    </main>
  );
}
