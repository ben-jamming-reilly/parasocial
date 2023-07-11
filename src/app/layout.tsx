// import "~/styles/globals.css";
import "./global.css";
import Footer from "./Footer";

export const metadata = {
  title: "parasocial",
  description:
    "Discover and relive the most memorable moments of your favorite streamers",
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
      </head>
      <body className="relative bg-pink-900 text-zinc-100">
        {children}
        <Footer />
      </body>
    </html>
  );
}
