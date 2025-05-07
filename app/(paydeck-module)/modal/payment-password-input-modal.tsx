"use client";


import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RefreshCw, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, Description,DialogTitle } from "@radix-ui/react-dialog";
import Image from "next/image";
interface PaymentPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
}
export default function PaymentPasswordModal({ isOpen, onClose, onBack }: PaymentPasswordModalProps) {
  const [shuffledKeys, setShuffledKeys] = useState<number[]>([]);
  const router = useRouter();
  const PIN_LENGTH = 6;
  const [password, setPassword] = useState<string>("");

  //매번 모달이 열릴 때마다 password 및 keypad 셔플 적용
  useEffect(() => {
    if (isOpen) {
      setPassword("");
      shuffleKeypad();
    }
  }, [isOpen]);

  // Shuffle the keypad numbers
  const shuffleKeypad = () => {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
    setShuffledKeys(numbers);
  };

  // Handle delete key press
  const handleDelete = () => {
    if (password.length > 0) {
      setPassword(password.slice(0, -1));
    }
  };
  const handleKeyPress = (num: number) => {
    if (password.length < PIN_LENGTH) {
      setPassword(password + num.toString());
    }
  };
  // Handle form submission
  const handleComplete = () => {

    // if 비밀번호가 일치하면
    // 다음 결제 모듈로
    // else (1/N) 비밀번호가 일치 하지 않습니다.

    // N번 틀리면 변경하거나 추가 로직 필요

    // 예시 URL
    router.push("/card/change-represent-card");

  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl max-w-sm w-full shadow-lg overflow-hidden text-black">
          {/* Header */}
          <div className="flex justify-between items-center px-4 pt-3 pb-2 border-b border-black">
            <button className={"cursor-pointer mb-2"} onClick={onBack}>
              <ArrowLeft className="w-5 h-5 text-gray-500" />
            </button>
            <DialogTitle>
              <Image
                src="/logo.png"
                alt="페이득 로고"
                width={80}
                height={24}
                onClick={() => router.push("/dashboard")}
                className="cursor-pointer"
              />
            </DialogTitle>

            <button className={"cursor-pointer mb-2"} onClick={onClose}>
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* 카드 정보 */}
          <div className="px-4 pt-4 text-center flex flex-col items-center">
            {/* 카드 이미지. 없애도됨 */}
            <Image
              src="/loca365.png"
              alt="카드 이미지"
              width={80}
              height={24}
              className={"mb-4"}
            />
            <Description className="text-sm font-semibold">카드의정석 오하CHECK</Description>
            <span className="text-xs text-gray-500 mb-4">
              **** **** **** 1234
            </span>
            <span className="text-xs text-gray-500 mb-4">
              간편 결제를 위한 6자리 비밀번호를 입력해주세요.
            </span>
          </div>

          {/* 비밀번호 입력 상태 표시 */}
          <div className="flex justify-center space-x-4 mb-8">
            {Array.from({ length: PIN_LENGTH }).map((_, index) => (
              <span key={index} className="text-2xl font-mono w-4 text-center">
                {index < password.length ? "•" : "_"}
              </span>
            ))}
          </div>

          {/* Keypad */}
          <div className="grid grid-cols-3 gap-4 mb-4">
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
              onClick={()=>{
                shuffleKeypad();
                setPassword("");
              }}
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

          {/* 결제 버튼 / 비밀 찾기 버튼*/}
          <div className="px-4">
            <Button
              className="w-full bg-black text-white hover:bg-gray-800"
              disabled={password.length !== PIN_LENGTH}
              onClick={handleComplete}
            >
              결제하기
            </Button>
            <div className="text-center my-3 flex justify-center items-center">
              <button
                className="text-xs text-blue-500 hover:underline "
                onClick={() => router.push("/card/pay-password/reset")}
              >
                forget password?
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};