// import "~/styles/globals.css";
import "./global.css";
import Footer from "./Footer";
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  title: "parasocial",
  description:
    "Discover and relive the most memorable moments of your favorite streamers",
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
        <meta
          name="twitter:card"
          content="Discover and relive the most memorable moments of your favorite streamers"
        />
      </head>
      <body className="relative h-full min-h-screen bg-pink-900 text-zinc-100">
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
