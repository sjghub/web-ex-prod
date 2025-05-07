"use client";

import VerifyIdentity from "@/components/verify";
import { useRouter } from "next/navigation";

export default function FindIdVerifyPage() {
  const router = useRouter();

  return (
    <VerifyIdentity
      backLink="/login/find-password"
      onSuccess={() => router.push("/login/find-password/change-password")}
    />
  );
}
