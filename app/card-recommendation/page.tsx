"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HeaderNavBar } from "@/components/header-nav-bar";
import { Utensils, CreditCard, ShoppingBag, Film, Bus } from "lucide-react";

// 카드 타입 정의
interface CardBenefit {
  id: number;
  name: string;
  image: string;
  category: string;
  benefits: string[];
  company: string;
}

export default function CardBenefitsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL 파라미터의 카테고리를 실제 카테고리 이름으로 매핑
  const categoryMapping: { [key: string]: string } = {
    subscription: "정기결제",
    food_beverage: "식/음료",
    cultural: "문화",
    shopping: "쇼핑",
    transportation: "교통",
  };

  // 초기 카테고리 설정
  const getInitialCategory = () => {
    const category = searchParams.get("category");
    if (category && categoryMapping[category]) {
      return categoryMapping[category];
    }
    return "식/음료";
  };

  const [activeCategory, setActiveCategory] = useState(getInitialCategory());

  // URL 파라미터 처리
  useEffect(() => {
    const category = searchParams.get("category");
    if (category && categoryMapping[category]) {
      setActiveCategory(categoryMapping[category]);
    }
  }, [searchParams]);

  // 카테고리 변경 시 URL 업데이트
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);

    // 카테고리 이름을 URL 파라미터로 변환
    const categoryToParam: { [key: string]: string } = {
      정기결제: "subscription",
      "식/음료": "food_beverage",
      문화: "cultural",
      쇼핑: "shopping",
      교통: "transportation",
    };

    const param = categoryToParam[category];
    if (param) {
      router.push(`/card-recommendation?category=${param}`, { scroll: false });
    }
  };

  // 혜택별 카드 데이터
  const cardBenefits: CardBenefit[] = [
    {
      id: 1,
      name: "카드의 정석 오하CHECK",
      image: "/ohacheck.png",
      category: "식/음료",
      benefits: [
        "온라인 쇼핑 5% 캐시백",
        "편의점 쇼핑 5% 캐시백",
        "음식점 쇼핑 5% 캐시백",
      ],
      company: "우리카드",
    },
    {
      id: 2,
      name: "삼성카드 taptap O",
      image: "/taptap0.png",
      category: "식/음료",
      benefits: ["스타벅스 30% 할인", "배달앱 10% 할인", "편의점 5% 할인"],
      company: "삼성카드",
    },
    {
      id: 3,
      name: "현대카드 M Black",
      image: "/hyundaiblack.png",
      category: "식/음료",
      benefits: [
        "레스토랑 10% 할인",
        "커피전문점 20% 할인",
        "해외 식당 캐시백 5%",
      ],
      company: "현대카드",
    },
    {
      id: 4,
      name: "KB국민 My WE:SH 카드",
      image: "/mywish.png",
      category: "쇼핑",
      benefits: ["온라인 쇼핑 5% 할인", "백화점 7% 할인", "마트 3% 할인"],
      company: "국민카드",
    },
    {
      id: 5,
      name: "카드의정석 EVERY DISCOUNT",
      image: "/everydiscount.png",
      category: "교통",
      benefits: [
        "대중교통 10% 할인",
        "주유소 리터당 60원 할인",
        "고속도로 통행료 할인",
      ],
      company: "롯데카드",
    },
    {
      id: 6,
      name: "카드의 정석 오하CHECK",
      image: "/ohacheck.png",
      category: "문화",
      benefits: [
        "영화 3,000원 할인",
        "공연 예매 5% 할인",
        "스트리밍 서비스 10% 할인",
      ],
      company: "신한카드",
    },
    {
      id: 7,
      name: "삼성카드 taptap O",
      image: "/taptap0.png",
      category: "정기결제",
      benefits: [
        "넷플릭스 10% 할인",
        "유튜브 프리미엄 5% 할인",
        "멜론 20% 할인",
      ],
      company: "삼성카드",
    },
  ];

  // 카테고리별 카드 필터링
  const filteredCards = cardBenefits.filter(
    (card) => card.category === activeCategory,
  );

  // 카테고리 목록
  const categories = ["식/음료", "정기결제", "쇼핑", "문화", "교통"];

  // 카테고리에 맞는 아이콘 반환
  const getCategoryIcon = (category: string, size: number = 20) => {
    switch (category) {
      case "식/음료":
        return <Utensils size={size} />;
      case "정기결제":
        return <CreditCard size={size} />;
      case "쇼핑":
        return <ShoppingBag size={size} />;
      case "문화":
        return <Film size={size} />;
      case "교통":
        return <Bus size={size} />;
      default:
        return <Utensils size={size} />;
    }
  };

  // 카드사 배지 스타일 반환
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 상단 네비게이션 바 */}
      <HeaderNavBar />

      {/* 메인 콘텐츠 */}
      <main className="container mx-auto px-4 py-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">혜택별 카드 추천</h1>
          <p className="text-gray-600 mb-6">
            원하는 혜택 카테고리를 선택하여 최적을 카드를 찾아보세요
          </p>

          {/* 카테고리 탭 */}
          <Tabs
            value={activeCategory}
            onValueChange={handleCategoryChange}
            className="w-full mb-4 bg-white"
          >
            <TabsList className="grid grid-cols-5 w-full h-full p-0">
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="flex flex-col items-center justify-center h-full data-[state=active]:bg-blue-50"
                >
                  {getCategoryIcon(category)}
                  <span>{category}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          {/* 카드 목록 제목 */}
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <span className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded-full mr-2">
              {getCategoryIcon(activeCategory, 16)}
            </span>
            {activeCategory} 혜택 추천 카드
          </h2>

          {/* 카드 목록 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredCards.map((card) => (
              <Card key={card.id} className="overflow-hidden bg-white relative">
                <span
                  className={`absolute top-4 right-4 text-xs font-bold px-2 py-1 rounded-full z-10 ${getCompanyBadgeClass(card.company)}`}
                >
                  {card.company}
                </span>

                <div className="relative flex justify-center items-center py-6">
                  <div className="absolute w-40 h-40 rounded-full bg-gray-200 opacity-50" />
                  <div className="w-72 h-44 relative">
                    <Image
                      src={card.image || "/placeholder.svg"}
                      alt={card.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                <CardContent className="px-6">
                  <h3 className="text-xl font-bold mb-2">{card.name}</h3>

                  <div className="mb-16">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">
                      주요 혜택
                    </h4>
                    <ul className="space-y-3">
                      {card.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-5 h-5 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 text-xs font-semibold mr-2">
                            {index + 1}
                          </span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() =>
                        router.push(`/card-recommendation/${card.id}`)
                      }
                    >
                      상세 정보
                    </Button>
                    <Button className="flex-1 bg-black hover:bg-gray-800 text-white">
                      카드 신청
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
