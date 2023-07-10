//

export function timestamp(ms: number) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours === 0) {
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  }

  return `${String(hours).padStart(2, "0")}.${String(minutes).padStart(
    2,
    "0"
  )}:${String(seconds).padStart(2, "0")}`;
}

export function truncate(str: string, maxLength: number) {
  if (str.length > maxLength) {
    return str.slice(0, maxLength - 3) + "...";
  }
  return str;
}
