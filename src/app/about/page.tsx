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
      <div className="outline-text-3 mx-auto max-w-prose p-3  leading-7">
        <p className="mb-2 ">
          Parasocial, lets you share your favorite moments of your beloved live
          streamers and content creators. There's a certain joy of capturing and
          reliving those special moments that bring us closer to our online
          idols.
        </p>
        <br />
        <p className="mb-2 ">
          The goal is to provide a place where you can easily find and showcase
          those memorable clips that resonate with you. Whether it's a hilarious
          reaction, an epic gaming moment, or an insightful discussion,
          parasocial allows you to capture those gems and share them with fellow
          fans.
        </p>

        <br />
        <p className="mb-2 ">
          Thank you for joining us on this exciting journey.
        </p>

        <br />
        <p>Sincerely,</p>
        <p>Ben</p>
      </div>
    </main>
  );
}
