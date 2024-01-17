import "./global.css";
import Footer from "./Footer";
import { Analytics } from "@vercel/analytics/react";
import { cookies } from "next/headers";
import AuthProvider from "./AuthProvider";
import { TRPCReactProvider } from "~/trpc/react";

const description =
  "Discover and relive memorable moments from your favorite content creators";

export const metadata = {
  title: "parasocial",
  description: description,
};

// Regenerate Every 10 minutes
export const revalidate = 10 * 60;

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
      </head>
      <body className="relative h-full min-h-screen bg-rose-900 text-zinc-100">
        <AuthProvider>
          <TRPCReactProvider cookies={cookies().toString()}>
            {children}
          </TRPCReactProvider>
        </AuthProvider>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
