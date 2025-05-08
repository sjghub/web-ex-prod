"use client";

import { useRouter } from "next/navigation";
import PincodeForm from "@/components/ui/pincode-form";

export default function ChangePincodePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <PincodeForm
        title="간편 결제 비밀번호 설정"
        description="간편 결제 시 사용할 비밀번호를 입력해주세요."
        onBack={() => router.push("/card/register")}
        onComplete={async (pincode) => {
          //대표카드가 있는지 여부를 확인하고 분기별로 router를 다르게 설정(백엔드 API연동시)
          /*
          try {
            const res = await fetch("/api/cards");
            const data = await res.json();
            const hasRepresent = data.some((card: { isRepresent: boolean }) => card.isRepresent);
        
            // 여기에 실제 핀 저장 API 호출이 필요하면 추가
            await fetch("/api/cards/pincode", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ pincode }),
            });
        
            if (hasRepresent) {
              router.push("/card/change-represent-card");
            } else {
              router.push("/card/set-represent-card");
            }
          } catch (err) {
            console.error("대표카드 확인 또는 저장 실패", err);
          }
          */
          router.push("/card/set-represent-card");
        }}
        validateHasPincode={true}
      />
    </div>
  );
}
