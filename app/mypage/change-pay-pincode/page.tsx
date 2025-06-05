"use client";

import { useRouter } from "next/navigation";
import PincodeForm from "@/components/ui/pincode-form";
import { fetchWithAuth } from "@/lib/api-fetch";
import { useRef, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function ChangePincodePage() {
  const router = useRouter();
  const pincodeFormRef = useRef<{ resetPassword: () => void }>(null);
  const [message, setMessage] = useState("");
  const [showErrorDialog, setShowErrorDialog] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <PincodeForm
        ref={pincodeFormRef}
        title="간편 결제 비밀번호 변경"
        description="변경할 간편 결제 비밀번호를 입력해주세요."
        onBack={() => router.back()}
        onComplete={async (newPaymentPinCode) => {
          try {
            const response = await fetchWithAuth("/user/payment-pin-code", {
              method: "PATCH",
              body: JSON.stringify({ newPaymentPinCode }),
            });

            if (!response.ok) {
              const data = await response.json();
              if (data.response?.errorCode === "PIN_01") {
                setMessage(
                  "생년월일, 연속된 숫자 등 추측하기 쉬운 번호는 사용할 수 없습니다.\n(예: 250101, 123456, 111111)",
                );
              } else {
                setMessage(data.message || "비밀번호 변경에 실패했습니다.");
              }
              setShowErrorDialog(true);
              pincodeFormRef.current?.resetPassword();
              return;
            }

            setMessage("비밀번호가 성공적으로 변경되었습니다.");
            setShowErrorDialog(true);
          } catch (error) {
            console.error("PIN 코드 변경 실패:", error);
            setMessage(
              "서버와의 통신 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
            );
            setShowErrorDialog(true);
            pincodeFormRef.current?.resetPassword();
          }
        }}
      />

      <AlertDialog open={showErrorDialog} onOpenChange={setShowErrorDialog}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-gray-900">알림</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-700 whitespace-pre-line">
              {message}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => {
                setShowErrorDialog(false);
                if (message === "비밀번호가 성공적으로 변경되었습니다.") {
                  router.push("/mypage");
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
