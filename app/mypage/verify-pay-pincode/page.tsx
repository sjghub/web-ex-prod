"use client";

import { useRouter } from "next/navigation";
import PincodeForm from "@/components/ui/pincode-form";

export default function ChangePincodePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <PincodeForm
        title="간편 결제 비밀번호 확인"
        description="현재 간편 결제 비밀번호를 입력해주세요."
        onBack={() => router.push("/mypage")}
        onComplete={(pincode) => {
          console.log("변경된 PIN:", pincode);
          // 추후 검증 API 적용
          /*
        fetch("/api/cards/verify-pincode", {
          method: "POST",
          body: JSON.stringify({ pincode: enteredPincode }),
        })
          .then((res) => {
            if (res.ok) router.push("/mypage/change-pay-pincode");
            else alert("비밀번호가 일치하지 않습니다.");
          });
        */

          router.push("/mypage/change-pay-pincode");
        }}
        validateHasPincode={true}
      />
    </div>
  );
}
