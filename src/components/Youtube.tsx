"use client";

import Modal from "./Modal";

interface PlayerProps {
  isMobile: boolean;
  url: string;
  start_ms: number;
  close: () => void;
}

export default function Player({
  url,
  start_ms,
  isMobile,
  close,
}: PlayerProps) {
  const start_secs = Math.round(start_ms / 1000);

  const youtube = new URL(url);
  const videoId = youtube.searchParams.get("v");

  if (!videoId) return null;

  const iframeUrl = `https://www.youtube-nocookie.com/embed/${videoId}?start=${start_secs}`;

  return (
    <Modal close={close}>
      <div className="flex h-full flex-col justify-center">
        {isMobile ? (
          <div
            style={{
              position: "relative",
              paddingBottom: "56.25%",
              height: 0,
              overflow: "hidden",
            }}
          >
            <iframe
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }}
              width={"400"}
              className="m-auto border-4 border-black"
              src={iframeUrl}
              allowFullScreen={true}
            />
          </div>
        ) : (
          <iframe
            className="m-auto border-4 border-black"
            src={iframeUrl}
            width="853"
            height="480"
          />
        )}
      </div>
    </Modal>
  );
}
