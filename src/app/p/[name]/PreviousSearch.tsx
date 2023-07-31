"use client";
import { useState, useEffect } from "react";
import { SearchQuery } from "@prisma/client";

function formatElapsedTime(date: Date): string {
  const currentDate = new Date();
  const elapsedMilliseconds = currentDate.getTime() - date.getTime();

  // Define the time units in milliseconds
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  const month = 30 * day;
  const year = 365 * day;

  if (elapsedMilliseconds < minute) {
    return `${Math.floor(elapsedMilliseconds / 1000)} seconds ago`;
  } else if (elapsedMilliseconds < hour) {
    return `${Math.floor(elapsedMilliseconds / minute)} minutes ago`;
  } else if (elapsedMilliseconds < day) {
    return `${Math.floor(elapsedMilliseconds / hour)} hours ago`;
  } else if (elapsedMilliseconds < week) {
    return `${Math.floor(elapsedMilliseconds / day)} days ago`;
  } else if (elapsedMilliseconds < month) {
    return `${Math.floor(elapsedMilliseconds / week)} weeks ago`;
  } else if (elapsedMilliseconds < year) {
    return `${Math.floor(elapsedMilliseconds / month)} months ago`;
  } else {
    return `${Math.floor(elapsedMilliseconds / year)} years ago`;
  }
}

interface PreviousQueryProps {
  search: SearchQuery;
}

export default function PreviousSearch({ search }: PreviousQueryProps) {
  const params = new URLSearchParams({
    q: search.query,
  });
  const date = new Date(search.create_date);

  const [elapsedTimeString, setElapsedTimeString] = useState(
    formatElapsedTime(date)
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setElapsedTimeString(formatElapsedTime(date));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [date.getTime()]);

  return (
    <a
      className="mx-auto flex flex-row flex-wrap gap-x-2 bg-black px-4 tracking-widest hover:underline"
      href={`/p/${encodeURIComponent(search.author!)}?${params.toString()}`}
    >
      <h4 className="line-clamp-2 text-justify text-sm">{search.query}</h4>
      <p
        className=" my-auto h-fit align-bottom text-xs text-neutral-400"
        suppressHydrationWarning
      >
        {elapsedTimeString}
      </p>
    </a>
  );
}
