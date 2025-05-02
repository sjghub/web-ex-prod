"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, CreditCard, RefreshCw, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function PaymentPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState<string>("");
  const [shuffledKeys, setShuffledKeys] = useState<number[]>([]);
  const PIN_LENGTH = 6;
  const [hasRepresentCard, setHasRepresentCard] = useState<boolean>(false);

  // Initialize and shuffle the keypad
  useEffect(() => {
    shuffleKeypad();
  }, []);

  type card = {
    isRepresent: boolean;
  };

  // 대표 카드 여부 확인
  useEffect(() => {
    const fetchCardInfo = async () => {
      try {
        const res = await fetch("/api/cards"); // 실제 API 경로로 수정
        const data = await res.json();

        // 대표카드가 있는지 여부 판단 (예: 대표카드에 isRepresent: true 필드가 있다고 가정)
        const has = data.some((card: card) => card.isRepresent === true);
        setHasRepresentCard(has);
      } catch (error) {
        console.error("카드 정보 조회 실패:", error);
      }
    };

    fetchCardInfo();
  }, []);

  // Shuffle the keypad numbers
  const shuffleKeypad = () => {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
    setShuffledKeys(numbers);
  };

  // Handle number key press
  const handleKeyPress = (num: number) => {
    if (password.length < PIN_LENGTH) {
      setPassword(password + num.toString());
    }
  };

  // Handle delete key press
  const handleDelete = () => {
    if (password.length > 0) {
      setPassword(password.slice(0, -1));
    }
  };

  // Handle form submission
  const handleComplete = () => {
    if (password.length === PIN_LENGTH) {
      console.log("Payment password set:", password);
      if (hasRepresentCard) {
        router.push("/card/change-represent-card");
      } else {
        router.push("/card/set-represent-card");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Button
          variant="ghost"
          className="mb-4"
          onClick={() => router.push("/card/register")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          돌아가기
        </Button>

        <Card className="shadow-sm border-gray-100">
          <CardContent className="pt-6 pb-8">
            <div className="flex justify-center mb-6">
              <div className="bg-blue-100 rounded-full p-4">
                <CreditCard className="h-8 w-8 text-blue-500" />
              </div>
            </div>

            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold mb-2">
                간편 결제 비밀번호 설정
              </h1>
              <p className="text-gray-500">
                간편 결제 시 사용할 비밀번호를 설정해주세요.
              </p>
            </div>

            {/* Password display */}
            <div className="flex justify-center space-x-4 mb-8">
              {Array.from({ length: PIN_LENGTH }).map((_, index) => (
                <span
                  key={index}
                  className="text-2xl font-mono w-4 text-center"
                >
                  {index < password.length ? "•" : "_"}
                </span>
              ))}
            </div>

            {/* Keypad */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {shuffledKeys.slice(0, 9).map((num) => (
                <button
                  key={num}
                  className="h-14 flex items-center justify-center text-xl font-medium active:bg-gray-100 cursor-pointer"
                  onClick={() => handleKeyPress(num)}
                >
                  {num}
                </button>
              ))}
              <button
                className="h-14 flex items-center justify-center text-xl font-medium active:bg-gray-100 cursor-pointer"
                onClick={shuffleKeypad}
              >
                <RefreshCw className="h-5 w-5" />
              </button>
              <button
                className="h-14 flex items-center justify-center text-xl font-medium active:bg-gray-100 cursor-pointer"
                onClick={() => handleKeyPress(shuffledKeys[9])}
              >
                {shuffledKeys[9]}
              </button>
              <button
                className="h-14 flex items-center justify-center text-xl font-medium active:bg-gray-100 cursor-pointer"
                onClick={handleDelete}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <Button
              className="w-full bg-black hover:bg-gray-800 text-white"
              disabled={password.length !== PIN_LENGTH}
              onClick={handleComplete}
            >
              완료
            </Button>

            <p className="text-xs text-gray-400 text-center mt-4">
              * 생년월일, 전화번호 등 추측하기 쉬운 번호는 사용하지 마세요.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
