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

export default function ProfilePage() {
  const { data, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") router.back();
  }, [status]);

  const { data: searchQueries } = api.user.searchHistory.useQuery();

  return (
    <main className="flex min-h-screen flex-col items-center gap-4 pt-4">
      <ProfileImage
        height={170}
        width={170}
        label={data?.user.name!}
        src={data?.user.image!}
      />

      <Button className="text-black" variant={"link"} onClick={() => signOut()}>
        Sign out
      </Button>
      <UploadForm placeholder="" />

      {searchQueries && <SearchQueryList queries={searchQueries} />}
    </main>
  );
}
