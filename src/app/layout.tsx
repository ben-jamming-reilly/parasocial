import "./global.css";
import { Analytics } from "@vercel/analytics/react";
import { cookies } from "next/headers";
import Link from "next/link";

import Footer from "./Footer";
import AuthProvider from "./AuthProvider";
import { TRPCReactProvider } from "~/trpc/react";
import { Toaster } from "~/components/ui/toaster";
import { Navbar } from "~/components/Navbar";
import { CSPostHogProvider } from "./providers";
import { Banner } from "~/components/Banner";
// import { Marquee } from "~/components/Marquee";

const description =
  "Discover and relive memorable moments from your favorite content creators";

export const metadata = {
  title: "parasocial",
  description: description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <title>parasocial</title>
        <meta name="twitter:card" content={description} />
        <meta property="og:image" content="/favicon.svg" />
      </head>

      <CSPostHogProvider>
        <body className="relative flex min-h-screen h-fit flex-1 flex-col bg-rose-900 text-zinc-100">
          <AuthProvider>
            <TRPCReactProvider cookies={cookies().toString()}>
              {/* <Banner>
                <div className="flex flex-row gap-12 px-6">
                  <Link
                    className="underline"
                    target="_window"
                    href="https://bravyhq.com"
                  >
                    checkout bravy. it's like your own private version of this
                  </Link>
                  <div className="min-w-fit">
                    btw, you can upload youtube videos too when you sign in
                  </div>
                </div>
              </Banner> */}
              <main className="flex flex-1 flex-col space-y-4 p-3">
                <Navbar />
                {children}
                <Toaster />
              </main>
            </TRPCReactProvider>
          </AuthProvider>
          <Footer />
          <Analytics />
        </body>
      </CSPostHogProvider>
    </html>
  );
}
