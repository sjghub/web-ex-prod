"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PincodeForm from "@/components/ui/pincode-form";
import { fetchWithoutAuth } from "@/lib/api-fetch";
import { useRef } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const SIGNUP_INFO_KEY = "signupInfo";
const VERIFIED_KEY = "verifiedUser";

export default function PincodePage() {
  const router = useRouter();
  const pincodeFormRef = useRef<{ resetPassword: () => void }>(null);
  const [message, setMessage] = useState("");
  const [showErrorDialog, setShowErrorDialog] = useState(false);

  useEffect(() => {
    const signupInfo = sessionStorage.getItem(SIGNUP_INFO_KEY);
    const verifiedInfo = sessionStorage.getItem(VERIFIED_KEY);

    if (!signupInfo || !verifiedInfo) {
      setMessage("회원가입 정보가 없습니다.");
      setShowErrorDialog(true);
      setTimeout(() => router.push("/signup/info"), 2000);
    }
  }, [router]);

  const handleSignup = async (paymentPinCode: string) => {
    try {
      const signupInfo = JSON.parse(
        sessionStorage.getItem(SIGNUP_INFO_KEY) || "{}",
      );

      const response = await fetchWithoutAuth("/signup", {
        method: "POST",
        body: JSON.stringify({
          ...signupInfo,
          paymentPinCode,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        if (data.response?.errorCode === "PIN_01") {
          setMessage(
            "생년월일, 연속된 숫자 등 추측하기 쉬운 번호는 사용할 수 없습니다.\n(예: 250101, 123456, 111111)",
          );
        } else {
          setMessage(data.message || "회원가입에 실패했습니다.");
        }
        setShowErrorDialog(true);
        pincodeFormRef.current?.resetPassword();
        return;
      }

      sessionStorage.clear();
      setMessage("회원가입이 완료되었습니다.");
      setShowErrorDialog(true);
    } catch (error) {
      console.error("회원가입 실패:", error);
      setMessage(
        "서버와의 통신 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
      );
      setShowErrorDialog(true);
      pincodeFormRef.current?.resetPassword();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <PincodeForm
        ref={pincodeFormRef}
        title="간편 결제 비밀번호 설정"
        description="간편 결제 시 사용할 비밀번호를 입력해주세요."
        onBack={() => router.push("/signup/info")}
        onComplete={handleSignup}
      />
      <AlertDialog open={showErrorDialog} onOpenChange={setShowErrorDialog}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-gray-900">알림</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-700">
              {message}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => {
                setShowErrorDialog(false);
                if (message === "회원가입이 완료되었습니다.") {
                  router.push("/login");
                }
              }}
              className="bg-black hover:bg-gray-700 text-white"
            >
              확인
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
