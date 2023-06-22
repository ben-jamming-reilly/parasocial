import { redirect } from "next/navigation";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col">
        <div className="flex flex-row justify-end"></div>
        <h3 className="mb-3 text-center text-2xl font-bold capitalize text-zinc-100"></h3>
        <div className="grid grid-cols-3 gap-5"></div>
      </div>
    </main>
  );
}
