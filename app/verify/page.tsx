"use client";

import VerifyIdentity from "@/components/verify";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function VerifyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  useEffect(() => {
    // 올바른 type이 아니면 접근 불가
    const validTypes = ["signup", "idInquiry", "pwInquiry"];
    if (!type || !validTypes.includes(type)) {
      router.replace("/");
      return;
    }
    // 약관 동의 여부 확인 (localStorage에 agreeTerms === 'true'로 저장되어 있는지 확인)
    if (type === "signup") {
      if (sessionStorage.getItem("agreeTerms") !== "true") {
        router.replace("/signup/terms");
      }
    }

    // 비밀번호 찾기 시 이름/아이디 입력 여부 확인
    if (type === "pwInquiry") {
      if (sessionStorage.getItem("pwInquiryName") !== "true") {
        router.replace("/pwInquiry");
      }
    }
  }, [type, router]);

  const getSuccessPath = () => {
    switch (type) {
      case "signup":
        return "/signup/info";
      case "idInquiry":
        return "/idInquiry";
      case "pwInquiry":
        return "/pwInquiry/reset";
      default:
        return "/";
    }
  };

  return <VerifyIdentity onSuccess={() => router.push(getSuccessPath())} />;
}
