"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";

export default function SetRepresentCardPage() {
  const router = useRouter();

  // Mock data
  const newCard = {
    id: "new-card-123",
    name: "현대카드 M Black",
    image: "/hyundaiblack.png",
  };

  const handleYes = () => {
    // 대표 카드 설정 처리
    router.push("/mycard");
  };

  const handleNo = () => {
    router.push("/mycard");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4">
        <div className="text-left">
          <h1 className="text-2xl font-bold mb-1">대표카드로 설정할까요?</h1>
          <p className="text-sm text-gray-500">
            대표카드는 혜택 비교 시 우선적으로 선택되는 카드입니다.
          </p>
        </div>
        <Card className="shadow-sm border-gray-100 p-0">
          <CardContent className="pb-6">
            <div className="flex justify-center">
              <div className="relative w-90 h-60 rounded-md overflow-hidden">
                <Image
                  src={newCard.image || "/placeholder.svg"}
                  alt={newCard.name}
                  fill
                  className="object-contain transform -rotate-90 origin-center"
                />
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
                className="flex-1 bg-black hover:bg-gray-800 text-white"
                onClick={handleYes}
              >
                예
              </Button>
              <Button variant="outline" className="flex-1" onClick={handleNo}>
                아니오
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
