"use client";

import { use, useState, useEffect } from "react";
import Image from "next/image";
import { Check, ShoppingBag, Utensils, Bus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeaderNavBar } from "@/components/header-nav-bar";

// 카드 상세 정보 타입
interface CardDetail {
  id: number;
  name: string;
  image: string;
  company: string;
  annualFee: string;
  minSpending: string;
  benefits: {
    category: string;
    rate: string;
    icon: React.ElementType;
    details?: string[];
  }[];
  additionalBenefits: {
    title: string;
    details: string[];
  }[];
}

export default function CardDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [card, setCard] = useState<CardDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 실제로는 API 호출을 통해 카드 정보를 가져올 것입니다.
    // 여기서는 예시 데이터를 사용합니다.
    const cardData: Record<string, CardDetail> = {
      "1": {
        id: 1,
        name: "카드의 정석 오하CHECK",
        image: "/ohacheck.png",
        company: "우리카드",
        annualFee: "10,000원",
        minSpending: "300,000원 이상",
        benefits: [
          {
            category: "온라인 쇼핑",
            rate: "5%",
            icon: ShoppingBag,
            details: ["쿠팡, 무신사, 마켓컬리 캐시백", "월 횟수 제한 (1회)"],
          },
          {
            category: "음식점",
            rate: "5%",
            icon: Utensils,
          },
          {
            category: "교통",
            rate: "10%",
            icon: Bus,
          },
        ],
        additionalBenefits: [
          {
            title: "할인한도안내",
            details: [
              "전월실적 30만원~50만원 : 3천원",
              "전월실적 50만원~70만원 : 7천원",
              "전월실적 70만원~100만원 : 1만원",
            ],
          },
        ],
      },
      "2": {
        id: 2,
        name: "삼성카드 taptap O",
        image: "/taptap0.png",
        company: "삼성카드",
        annualFee: "15,000원",
        minSpending: "250,000원 이상",
        benefits: [
          {
            category: "스타벅스",
            rate: "30%",
            icon: Utensils,
            details: ["월 최대 5,000원 할인", "월 횟수 제한 (3회)"],
          },
          {
            category: "배달앱",
            rate: "10%",
            icon: Utensils,
          },
          {
            category: "편의점",
            rate: "5%",
            icon: ShoppingBag,
          },
        ],
        additionalBenefits: [
          {
            title: "할인한도안내",
            details: [
              "전월실적 25만원~50만원 : 5천원",
              "전월실적 50만원~80만원 : 1만원",
              "전월실적 80만원 이상 : 1만 5천원",
            ],
          },
        ],
      },
      "3": {
        id: 3,
        name: "현대카드 M Black",
        image: "/hyundaiblack.png",
        company: "현대카드",
        annualFee: "30,000원",
        minSpending: "500,000원 이상",
        benefits: [
          {
            category: "레스토랑",
            rate: "10%",
            icon: Utensils,
            details: ["프리미엄 레스토랑 할인", "월 최대 20,000원"],
          },
          {
            category: "커피전문점",
            rate: "20%",
            icon: Utensils,
          },
          {
            category: "해외 식당",
            rate: "5%",
            icon: Utensils,
          },
        ],
        additionalBenefits: [
          {
            title: "할인한도안내",
            details: [
              "전월실적 50만원~100만원 : 1만원",
              "전월실적 100만원~150만원 : 2만원",
              "전월실적 150만원 이상 : 3만원",
            ],
          },
        ],
      },
    };

    if (cardData[id]) {
      setCard(cardData[id]);
    }
    setLoading(false);
  }, [id]);

  const getCompanyBadgeClass = (company: string) => {
    switch (company) {
      case "우리카드":
        return "bg-sky-500 text-white";
      case "삼성카드":
        return "bg-indigo-600 text-white";
      case "현대카드":
        return "bg-white text-black border-2 border-black";
      case "국민카드":
        return "bg-yellow-400 text-white";
      case "신한카드":
        return "bg-blue-600 text-white";
      case "롯데카드":
        return "bg-red-400 text-white";
      default:
        return "bg-neutral-200 text-white";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        로딩 중...
      </div>
    );
  }

  if (!card) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        카드 정보를 찾을 수 없습니다.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 상단 네비게이션 바 */}
      <HeaderNavBar />

      {/* 메인 콘텐츠 */}
      <main className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">카드 상세 정보</h1>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-8">
            {/* 카드 이미지 및 신청 버튼 */}
            <div className="md:w-2/5 flex flex-col items-center py-10">
              <div className="w-64 h-64 relative bg-gray-200 rounded-full p-4 flex items-center justify-center mb-10">
                <div className="w-70 h-70 relative">
                  <Image
                    src={card.image || "/placeholder.svg"}
                    alt={card.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* 연회비 + 전월실적 텍스트 */}
              <p className="text-sm text-gray-600 font-medium mb-10">
                연회비 <span className="font-bold">{card.annualFee}</span> /
                전월실적 <span className="font-bold">{card.minSpending}</span>
              </p>

              {/* 카드 신청 버튼 */}
              <Button className="w-full bg-black hover:bg-gray-800 py-4 text-lg text-white">
                카드 신청
              </Button>
            </div>

            {/* 카드 정보 */}
            <div className="md:w-2/3">
              <div className="flex items-center mb-6">
                <h2 className="text-3xl font-bold">{card.name}</h2>
                <span
                  className={`ml-2 text-xs font-bold px-2 py-1 rounded-full ${getCompanyBadgeClass(
                    card.company,
                  )}`}
                >
                  {card.company}
                </span>
              </div>

              {/* 주요 혜택 + 연회비/전월실적 */}
              <div className="mb-6 flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                {/* 주요 혜택 */}
                <div className="flex-1 space-y-4">
                  <h3 className="text-lg font-medium flex items-center mb-2">
                    <Check className="mr-2 text-blue-500" /> 주요 혜택
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                    {card.benefits.map((benefit, index) => (
                      <div
                        key={index}
                        className="flex items-center border rounded-lg p-4 h-full bg-white shadow-sm"
                      >
                        <benefit.icon className="h-6 w-6 text-gray-600 mr-3" />
                        <div className="flex-1">
                          <span className="text-gray-600">
                            {benefit.category}
                          </span>
                        </div>
                        <span className="text-xl font-bold text-blue-500">
                          {benefit.rate} 캐시백
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 상세 혜택 설명 */}
              {card.benefits[0].details && (
                <div className="bg-blue-50 rounded-lg p-4 mb-6">
                  <h3 className="text-lg font-medium flex items-center mb-2">
                    <Check className="mr-2 text-green-500" />{" "}
                    {card.benefits[0].category} {card.benefits[0].rate} 캐시백
                  </h3>
                  <ul className="ml-6 space-y-2">
                    {card.benefits[0].details.map((detail, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-xs mr-2 mt-1">•</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* 추가 혜택 */}
              {card.additionalBenefits.map((benefit, index) => (
                <div key={index} className="bg-blue-50 rounded-lg p-4 mb-6">
                  <h3 className="text-lg font-medium flex items-center mb-2">
                    <Check className="mr-2 text-green-500" /> {benefit.title}
                  </h3>
                  <ul className="ml-6 space-y-2">
                    {benefit.details.map((detail, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-xs mr-2 mt-1">•</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
