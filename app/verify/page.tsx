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
        return "/idInquiry";
      case "find-password":
        return "/pwInquiry/reset";
      default:
        return "/";
    }
  };

  return <VerifyIdentity onSuccess={() => router.push(getSuccessPath())} />;
}
