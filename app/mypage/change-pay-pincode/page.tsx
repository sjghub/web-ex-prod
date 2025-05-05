"use client";

import { useRouter } from "next/navigation";
import PincodeForm from "@/components/ui/pincode-form";

export default function ChangePincodePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <PincodeForm
        title="간편 결제 비밀번호 변경"
        description="변경할 간편 결제 비밀번호를 입력해주세요."
        onBack={() => router.push("/mypage")}
        onComplete={(pincode) => {
          console.log("변경된 PIN:", pincode);
          // 추후 변경 API 적용
          /*
          fetch("/api/cards/pincode", {
            method: "PATCH",
            body: JSON.stringify({ newPincode }),
          }).then(() => router.push("/mypage"));
          */
          router.push("/mypage");
        }}
        
      />
    </div>
  );
}
