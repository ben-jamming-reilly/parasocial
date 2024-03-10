"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";
import { SearchQuery } from "@prisma/client";
import { SearchQueryList } from "./SearchQueries";
import { ProfileImage } from "~/components/ProfileImage";
import { UploadForm } from "./UploadForm";
import { UploadList } from "./UploadList";

export default function ProfilePage() {
  const { data, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") router.back();
  }, [status]);

  const { data: searchQueries } = api.user.searchHistory.useQuery();

  const { data: uploads } = api.user.uploads.useQuery(undefined, {
    refetchInterval: 5000,
  });

  return (
    <main className="grid sm:grid-cols-2 gap-4 pt-4 max-w-6xl mx-auto">
      <div className="flex flex-col gap-2 items-center">
        <div className="relative">
          <div className="-left-1/2 h-full absolute items-center flex justify-center my-auto">
            <Button
              className="text-black"
              variant={"link"}
              onClick={() => signOut()}
            >
              Sign out
            </Button>
          </div>

          <ProfileImage
            height={150}
            width={150}
            label={data?.user.name!}
            src={data?.user.image!}
          />
        </div>

        <UploadForm placeholder="" />
        <UploadList documents={uploads || []} />
      </div>
      <div className="flex flex-col items-center">
        {searchQueries && <SearchQueryList queries={searchQueries} />}
      </div>
    </main>
  );
}
