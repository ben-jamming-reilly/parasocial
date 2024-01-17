"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

import { Button } from "~/components/ui/button";

export default function ProfilePage() {
  const { data, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") router.back();
  }, [status]);

  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex flex-row justify-center gap-2">
        <Image
          src={data?.user.image!}
          className="border-4 border-black"
          width="100"
          height="100"
          alt=""
        />

        <h1 className="h-fit w-fit bg-black px-1 font-bold tracking-widest text-white">
          {data?.user.name}
        </h1>

        <Button onClick={() => signOut()}>Sign out</Button>
      </div>
    </main>
  );
}
