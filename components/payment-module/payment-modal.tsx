"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Button } from "@/components/ui/button";
import { PaymentKeypad } from "@/components/payment-module/payment-keypad";
import { CheckCircle, AlertCircle, X, ThumbsUp } from "lucide-react";

interface PaymentModalProps {
  paymentInfo: {
    merchantName: string;
    productName: string;
    quantity: number;
    price: number;
    totalAmount: number;
    orderId: string;
  };
  onPaymentComplete?: () => void;
}

interface CardInfo {
  id: number;
  name: string;
  number: string;
  color: string;
  logo: string;
  discount: number;
  benefits: string[];
}

export function PaymentModal({
  paymentInfo,
  onPaymentComplete,
}: PaymentModalProps) {
  // 카드 정보 목록
  const cards: CardInfo[] = [
    {
      id: 1,
      name: "카드의정석 EVERY DISCOUNT",
      number: "(1234)",
      color: "bg-gradient-to-r from-green-600 to-green-700",
      logo: "/everydiscount.png",
      discount: 10,
      benefits: [
        "온라인 쇼핑몰 10% 할인",
        "5만원 이상 결제 시 2천원 할인",
        "해외 직구 무료 배송",
      ],
    },
    {
      id: 2,
      name: "현대카드 MX Black Edition2",
      number: "(1234)",
      color: "bg-gradient-to-r from-orange-300 to-orange-400",
      logo: "/hyundaiblack.png",
      discount: 5,
      benefits: [
        "프리미엄 서비스 무료 이용",
        "공항 라운지 무료 이용",
        "해외 결제 수수료 면제",
      ],
    },
    {
      id: 3,
      name: "삼성카드 taptap O",
      number: "(1234)",
      color: "bg-gradient-to-r from-pink-400 to-pink-500",
      logo: "/taptap0.png",
      discount: 3,
      benefits: [
        "온라인몰 7% 할인",
        "생활비 자동이체 할인",
        "영화 티켓 1+1 혜택",
      ],
    },
    {
      id: 4,
      name: "카드의정석 오하CHECK",
      number: "(1234)",
      color: "bg-gradient-to-r from-gray-800 to-gray-900",
      logo: "/ohacheck.png",
      discount: 0,
      benefits: [
        "현금 할인",
        "무이자 할부 최대 12개월",
        "생일 월 추가 5% 할인",
      ],
    },
  ];

  // 최고 할인율 카드 찾기
  const bestDiscountCard = cards.reduce((prev, current) =>
    prev.discount > current.discount ? prev : current,
  );

  const [step, setStep] = useState<
    "select-card" | "enter-password" | "processing" | "complete" | "error"
  >("select-card");
  const [selectedCard, setSelectedCard] = useState<CardInfo | null>(
    bestDiscountCard,
  );
  const [password, setPassword] = useState<string>("");

  // 비밀번호 입력 처리
  const handlePasswordInput = (value: number) => {
    if (password.length < 6) {
      const newPassword = password + value;
      setPassword(newPassword);

      if (newPassword.length === 6) {
        setStep("processing");

        // 결제 처리 시뮬레이션
        setTimeout(() => {
          // 성공 처리
          setStep("complete");
        }, 2000);
      }
    }
  };

  // 비밀번호 지우기
  const handlePasswordDelete = () => {
    if (password.length > 0) {
      setPassword(password.slice(0, -1));
    }
  };

  // 카드 선택 처리
  const handleCardSelect = (card: CardInfo) => {
    setSelectedCard(card);
  };

  // 선택된 카드로 결제 진행
  const handleProceedToPayment = () => {
    if (selectedCard) {
      setStep("enter-password");
    }
  };

  // 결제 완료 후 처리
  const handleComplete = () => {
    if (onPaymentComplete) {
      onPaymentComplete();
    }
  };

  // 할인 금액 계산
  const calculateDiscount = () => {
    if (!selectedCard) return 0;
    return Math.round((paymentInfo.totalAmount * selectedCard.discount) / 100);
  };

  // 최종 결제 금액 계산
  const calculateFinalAmount = () => {
    return paymentInfo.totalAmount - calculateDiscount();
  };

  return (
      <div
        className={`${
          step === "select-card" ? "sm:max-w-[1000px]" : "sm:max-w-[400px]"
        } transition-none h-[720px] px-6 pb-6 pt-0 gap-0 border-0 overflow-hidden bg-white`}
      >
        {/* 기존 DialogContent 내부 코드 그대로 넣기 */}
        <VisuallyHidden>
          <h2 className="text-lg leading-none font-semibold sr-only">
            결제 모달
          </h2>
          {/* 눈에는 안 보이지만 스크린 리더용 */}
        </VisuallyHidden>
        <div className="flex flex-col">
          {/* 헤더 */}
          <div className="relative flex items-center justify-center h-16">
            {/* 로고 (가운데) */}
            <img
              src="/logo.png"
              alt="페이득 로고"
              className="h-12 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            />

            {/* 닫기 버튼 (오른쪽) */}
            <button
              onClick={() => console.log("닫기")} // TODO: 닫기 처리 어떻게 할 지
              className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              <X className="size-6" />
            </button>
          </div>

          {/* 아래 선 (헤더 바깥) */}
          <div className="h-px w-19/20 mx-auto bg-gray-200"></div>

          {/* 콘텐츠 */}
          <div className="flex flex-col md:flex-row">
            {/* 왼쪽: 결제 정보 */}
            <div className="flex-1 p-6">
              <h2 className="text-xl font-bold mb-4">결제 정보</h2>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">상점명</span>
                  <span className="font-medium">
                    {paymentInfo.merchantName}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">상품명</span>
                  <span className="font-medium">{paymentInfo.productName}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">수량</span>
                  <span className="font-medium">{paymentInfo.quantity}개</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">결제 금액</span>
                  <span className="font-bold">
                    {paymentInfo.totalAmount.toLocaleString()}원
                  </span>
                </div>
              </div>

              <div className="mt-4 border border-gray-200 rounded-lg p-4">
                <p className="text-sm text-gray-600">
                  "테크몰"에 3번이나 방문하셨네요!
                </p>
                <p className="text-sm text-gray-600">
                  최대 혜택을 받을 수 있는 카드를 추천해드릴까요?
                </p>
                <div className="flex justify-end mt-2">
                  <a
                    href="https://pc.wooricard.com/dcpc/main.do"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 font-medium hover:underline"
                  >
                    카드 추천 받으러 가기 →
                  </a>
                </div>
              </div>

              {/* 카드 프로모션 배너 */}
              <div className="mt-4 overflow-hidden">
                <img
                  src="/starlit-starbucks-card.png"
                  alt="별이 쏟아지는, 스타벅스 현대카드"
                  className="w-full h-auto"
                />
              </div>
            </div>

            {/* 오른쪽: 결제 카드 선택 */}
            <div className="flex-1 p-6">
              <h2 className="text-xl font-bold mb-4">결제 카드 선택</h2>

              {/* 최고 혜택 카드 */}
              <div
                className={`${
                  selectedCard?.id === bestDiscountCard.id
                    ? "bg-blue-100 border-2 border-blue-500"
                    : "bg-white border border-gray-200 hover:border-gray-300"
                } rounded-lg overflow-hidden mb-4 flex flex-col cursor-pointer`}
                onClick={() => handleCardSelect(bestDiscountCard)}
              >
                {/* 타이틀 */}
                <div className="flex items-center px-3 pt-3">
                  <ThumbsUp className="text-green-500 mr-2 size-5" />
                  <span className="text-green-500 text-base font-semibold">
                    최고 혜택 추천 카드
                  </span>
                  <span className="ml-auto bg-black text-white text-sm px-3 py-0.5 rounded-full">
                    대표
                  </span>
                </div>

                {/* 카드 정보 */}
                <div className="flex items-center px-3">
                  <div className="flex items-center justify-center min-w-[100px] min-h-[100px] mr-3 overflow-hidden">
                    <img
                      src="/everydiscount.png"
                      alt="카드의정석 EVERY DISCOUNT"
                      className="h-24 w-auto -rotate-90 object-contain"
                    />
                  </div>
                  <div>
                    <p className="text-lg font-bold whitespace-nowrap overflow-hidden text-ellipsis max-w-[270px]">
                      {bestDiscountCard.number} {bestDiscountCard.name}
                    </p>
                    <div className="bg-green-100 text-green-800 text-[10px] font-medium px-2 py-0.5 rounded-full inline-block mt-1">
                      {bestDiscountCard.discount}% 할인
                    </div>
                  </div>
                </div>

                {/* 결제 버튼 - 선택된 경우에만 표시 */}
                {selectedCard?.id === bestDiscountCard.id && (
                  <div className="px-3 pb-3 mt-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProceedToPayment();
                      }}
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 text-sm font-medium rounded-lg"
                    >
                      이 카드로 결제하기
                    </button>
                  </div>
                )}
              </div>

              {/* 다른 카드 목록 */}
              {cards
                .filter((card) => card.id !== bestDiscountCard.id)
                .map((card) => (
                  <div
                    key={card.id}
                    className={`${
                      selectedCard?.id === card.id
                        ? "bg-blue-100 border-2 border-blue-500"
                        : "bg-white border border-gray-200 hover:border-gray-300"
                    } rounded-lg mb-3 overflow-hidden cursor-pointer`}
                    onClick={() => handleCardSelect(card)}
                  >
                    <div className="flex px-4 py-2 items-center">
                      {/* 카드 이미지 */}
                      <div className="flex items-center justify-center min-w-[60px] min-h-[60px] mr-3 overflow-hidden">
                        <img
                          src={card.logo || "/placeholder.svg"}
                          alt={card.name}
                          className="h-14 w-auto -rotate-90 object-contain"
                        />
                      </div>

                      {/* 카드 이름 + 혜택 뱃지 (수직 정렬) */}
                      <div className="flex flex-col justify-center">
                        <p className="text-sm font-medium leading-tight">
                          {card.number} {card.name}
                        </p>
                        <span className="mt-1 bg-gray-100 text-gray-800 text-[10px] font-medium px-2 py-0.5 rounded-full inline-block w-fit">
                          {card.discount > 0
                            ? `${card.discount}% 할인`
                            : "할인 없음"}
                        </span>
                      </div>
                    </div>

                    {/* 결제 버튼 - 선택된 경우에만 표시 */}
                    {selectedCard?.id === card.id && (
                      <div className="px-3 pb-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleProceedToPayment();
                          }}
                          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 text-sm font-medium rounded-lg"
                        >
                          이 카드로 결제하기
                        </button>
                      </div>
                    )}
                  </div>
                ))}

              {/* 카드 등록 버튼 */}
              <button className="w-full border border-dashed border-gray-300 rounded-lg py-3 mt-2 text-gray-600 hover:bg-gray-50">
                + 카드 등록하기
              </button>
            </div>
          </div>

          {/* 비밀번호 입력 단계 */}
          {step === "enter-password" && selectedCard && (
            <div className="absolute inset-0 bg-white z-10 flex flex-col items-center justify-center">
              <button
                onClick={() => setStep("select-card")}
                className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
              >
                <X className="size-6" />
              </button>

              <div className="mb-6 text-center">
                <h3 className="mb-1 text-xl font-bold">{selectedCard.name}</h3>
                <p className="text-sm text-gray-600">{selectedCard.number}</p>
              </div>

              <div className="mb-6">
                <p className="mb-12 text-center text-sm text-gray-600">
                  간편 결제를 위한 6자리 비밀번호를 입력해주세요.
                </p>
                <div className="flex justify-center gap-3">
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="flex items-center justify-center w-6 h-6"
                    >
                      {password.length > i ? (
                        // 입력한 칸: 검은 점
                        <div className="w-2 h-2 bg-black rounded-full"></div>
                      ) : (
                        // 입력 안 한 칸: 검은 가로줄
                        <div className="w-6 h-0.5 bg-black"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-64">
                <PaymentKeypad
                  onNumberClick={handlePasswordInput}
                  onDeleteClick={handlePasswordDelete}
                />
              </div>
            </div>
          )}

          {/* 처리 중 단계 */}
          {step === "processing" && (
            <div className="absolute inset-0 bg-white z-10 flex flex-col items-center justify-center">
              <div className="mb-4 flex justify-center">
                <div className="size-12 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"></div>
              </div>
              <h3 className="mb-1 text-lg font-medium">결제 처리 중</h3>
              <p className="text-sm text-gray-600">잠시만 기다려주세요...</p>
            </div>
          )}

          {/* 완료 단계 */}
          {step === "complete" && (
            <div className="absolute inset-0 bg-white z-10 flex flex-col">
              <button
                onClick={() => setStep("select-card")}
                className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
              >
                <X className="size-6" />
              </button>

              {/* 콘텐츠 */}
              <div className="flex-1 flex flex-col items-center px-6 py-18 max-w-md mx-auto w-full">
                {/* 체크 아이콘 */}
                <div className="rounded-full bg-green-100 p-4 mb-4">
                  <CheckCircle className="size-8 text-green-500" />
                </div>

                {/* 타이틀 */}
                <h3 className="text-xl font-bold mb-1">결제 완료</h3>
                <p className="text-gray-600 mb-6 text-center">
                  결제가 성공적으로 완료되었습니다.
                </p>

                {/* 알림 메시지 */}
                <div className="bg-blue-50 rounded-lg p-4 mb-6 w-full text-center">
                  <p className="text-sm text-gray-700">
                    이용해주셔서 감사합니다. 결제 내역은 홈페이지에서 확인하실
                    수 있습니다.
                  </p>
                </div>

                {/* 결제 정보 */}
                <div className="bg-gray-100 rounded-lg p-4 w-full mb-6">
                  <div className="flex justify-between py-2">
                    <span className="text-gray-700">상점명</span>
                    <span className="font-medium">
                      {paymentInfo.merchantName}
                    </span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-700">상품명</span>
                    <span className="font-medium">
                      {paymentInfo.productName}
                    </span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-700">결제 카드</span>
                    <span className="font-medium">{selectedCard?.name}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-700">결제 금액</span>
                    <span className="font-medium">
                      {paymentInfo.totalAmount.toLocaleString()}원
                    </span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-700">할인 금액</span>
                    <span className="font-medium text-green-500">
                      -{calculateDiscount().toLocaleString()}원
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-t border-gray-200 mt-2 pt-3">
                    <span className="text-gray-900 font-bold">
                      최종 결제 금액
                    </span>
                    <span className="font-bold">
                      {calculateFinalAmount().toLocaleString()}원
                    </span>
                  </div>
                </div>

                {/* 확인 버튼 */}
                <button
                  onClick={handleComplete}
                  className="w-full bg-black hover:bg-gray-800 text-white py-4 font-medium rounded-lg"
                >
                  확인
                </button>
              </div>
            </div>
          )}

          {/* 에러 단계 */}
          {step === "error" && (
            <div className="absolute inset-0 bg-white z-10 flex flex-col items-center justify-center">
              <div className="mb-4 flex justify-center">
                <div className="rounded-full bg-red-100 p-3">
                  <AlertCircle className="size-10 text-red-600" />
                </div>
              </div>
              <h3 className="mb-1 text-lg font-medium">결제 실패</h3>
              <p className="mb-6 text-sm text-gray-600">
                결제 처리 중 오류가 발생했습니다. 다시 시도해주세요.
              </p>
              <Button onClick={() => setStep("select-card")} className="w-40">
                다시 시도
              </Button>
            </div>
          )}
        </div>
      </div>
  );
}
