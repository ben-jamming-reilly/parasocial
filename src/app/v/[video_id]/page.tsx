import { Suspense } from "react";
import SignInBtn from "~/components/UserButton";
import { api } from "~/trpc/server";

type SearchParamType = string | string[] | undefined;

type PageProps = {
  params: { video_id: string };
  searchParams: { [key: string]: SearchParamType };
};

function parseSearchQuery(param: SearchParamType): string | undefined {
  if (Array.isArray(param)) return param[0];
  else return param;
}

export default async function Page({ params, searchParams }: PageProps) {
  const video_id = decodeURI(params.video_id);
  return (
    <main className="flex min-h-screen flex-row gap-3  pt-2">{video_id}</main>
  );
}
