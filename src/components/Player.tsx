"use client";

interface PlayerProps {
  url: string;
  start_ms: number;
}

export default function Player({ url, start_ms }: PlayerProps) {
  const start_secs = Math.round(start_ms / 1000);

  const youtube = new URL(url);
  const videoId = youtube.searchParams.get("v");

  if (!videoId) return null;

  const iframeUrl = `https://www.youtube-nocookie.com/embed/${videoId}?start=${start_secs}`;

  return (
    <iframe
      className="m-auto border-4 border-black"
      src={iframeUrl}
      width="853"
      height="480"
    />
  );
}
