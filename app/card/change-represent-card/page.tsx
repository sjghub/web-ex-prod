"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ChangeRepresentCardPage() {
  const router = useRouter();

  const newCard = {
    id: "new-card-123",
    name: "현대카드 M Black",
    image: "/hyundaiblack.png",
  };

  const existingDefaultCard = {
    id: "existing-card-456",
    name: "삼성카드 taptap 0",
    image: "/taptap0.png",
  };

  const handleChange = () => {
    console.log("Change default card: Yes");
    router.push("/dashboard");
  };

  const handleNoChange = () => {
    console.log("Change default card: No");
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Button
          variant="ghost"
          className="mb-4"
          onClick={() => router.push("/card/register/payment-password")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          돌아가기
        </Button>

        <Card className="shadow-sm border-gray-100">
          <CardContent className="pt-6 pb-6">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold mb-2">
                대표카드를 변경할까요?
              </h1>
              <p className="text-gray-500">
                대표카드는 혜택 비교 시 우선적으로 선택되는 카드입니다.
              </p>
            </div>

            <div className="flex items-center justify-center mb-6">
              <div className="text-center">
                <p className="text-sm text-gray-500">현재 대표 카드</p>
                <div className="relative w-[192px] h-[128px] rounded-md overflow-hidden">
                  <Image
                    src={existingDefaultCard.image || "/placeholder.svg"}
                    alt={existingDefaultCard.name}
                    fill
                    className="object-contain transform -rotate-90 origin-center"
                  />
                </div>
              </div>

              <div className="text-2xl font-bold">{">"}</div>

              <div className="text-center">
                <p className="text-sm text-gray-500">변경 대상 카드</p>
                <div className="relative w-[192px] h-[128px] rounded-md overflow-hidden">
                  <Image
                    src={newCard.image || "/placeholder.svg"}
                    alt={newCard.name}
                    fill
                    className="object-contain transform -rotate-90 origin-center"
                  />
                </div>
              </div>
            </div>

            <div className="bg-gray-200 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2 mb-3 text-green-600">
                <Check className="w-4 h-4" />
                <span className="text-sm font-bold text-gray-700">
                  대표카드 혜택
                </span>
              </div>
              <ul className="space-y-2 text-sm text-gray-600 pl-6">
                <li className="flex items-start">
                  <span className="text-xs mr-2">•</span>
                  <span>통합 혜택 시 자동으로 선택됩니다.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-xs mr-2">•</span>
                  <span>홈 화면에 우선적으로 표시됩니다.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-xs mr-2">•</span>
                  <span>언제든지 다른 카드로 변경할 수 있습니다.</span>
                </li>
              </ul>
            </div>

            <div className="flex gap-3">
              <Button
                variant="default"
                className="flex-1 flex items-center justify-center bg-black hover:bg-gray-800 text-white"
                onClick={handleChange}
              >
                변경하기
              </Button>
              <Button
                variant="outline"
                className="flex-1 flex items-center justify-center"
                onClick={handleNoChange}
              >
                변경하지 않기
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
