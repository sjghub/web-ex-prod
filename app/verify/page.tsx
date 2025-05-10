"use client";

import VerifyIdentity from "@/components/verify";
import { useRouter, useSearchParams } from "next/navigation";

export default function VerifyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  const getSuccessPath = () => {
    switch (type) {
      case "signup":
        return "/signup/info";
      case "find-id":
        return "/find-id";
      case "find-password":
        return "/login/find-password/change-password";
      default:
        return "/";
    }
  };

  return <VerifyIdentity onSuccess={() => router.push(getSuccessPath())} />;
}
