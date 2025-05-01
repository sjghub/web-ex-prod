'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCardScroll } from './page-script';
import { HeaderNavBar } from '@/components/header-nav-bar';

export default function DashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('home');

  // Initialize card scroll functionality
  useCardScroll();

  // 사용자 정보 (예시)
  const user = {
    name: '홍길동',
    totalDiscount: '12,345',
    previousDiscount: '1,000',
  };

  // 혜택별 최고의 카드 (예시)
  const bestCards = [
    {
      id: 1,
      name: '넷플릭스',
      logo: '/netflix_icon.png',
    },
    {
      id: 2,
      name: '스타벅스',
      logo: '/starbucks_icon.png',
    },
    {
      id: 3,
      name: 'CGV',
      logo: '/cgv_icon.png',
    },
  ];

  // 내 카드 목록 (예시)
  const myCards = [
    {
      id: 1,
      name: '현대카드 M Black',
      image: '/hyundaiblack.png',
      number: '5521-9876-3412-0001',
      benefits: ['스타벅스 10% 청구 할인', '해외 가맹점 1.5% 캐시백', '특급호텔 무료 발렛'],
      isMain: false,
    },
    {
      id: 2,
      name: '카드의정석 EVERY DISCOUNT',
      image: '/everydiscount.png',
      number: '4582-1234-5678-0002',
      benefits: ['대중교통 10% 할인', '이동통신 요금 10% 할인', '편의점 5% 할인'],
      isMain: true,
    },
    {
      id: 3,
      name: '삼성카드 taptap 0',
      image: '/taptap0.png',
      number: '4012-3456-7890-0003',
      benefits: ['넷플릭스 10% 할인', '스타벅스 30% 할인', '배달앱 10% 할인'],
      isMain: false,
    },
    {
      id: 4,
      name: '카드의정석 오하CHECK',
      image: '/ohacheck.png',
      number: '3792-0000-1111-0004',
      benefits: ['영화 3,000원 할인', '버스/지하철 10% 할인', '배달의민족 5% 적립'],
      isMain: false,
    },
    {
      id: 5,
      name: 'KB국민 My WE:SH 카드',
      image: '/mywish.png',
      number: '6254-4444-2222-0005',
      benefits: ['온라인 쇼핑 5% 할인', '헬스장/필라테스 10% 할인', '디지털 콘텐츠 구독 7% 할인'],
      isMain: false,
    },
  ];

  const sortedCards = [...myCards].sort((a, b) => (b.isMain ? 1 : 0) - (a.isMain ? 1 : 0));

  // 최근 결제 내역 (예시)
  const recentTransactions = [
    {
      id: 1,
      store: '무신사',
      amount: '58,000',
      date: '2025-04-25 14:33',
      cardName: '카드의정석 오하CHECK',
    },
    {
      id: 2,
      store: '무신사',
      amount: '58,000',
      date: '2025-04-25 14:33',
      cardName: '카드의정석 오하CHECK',
    },
    {
      id: 3,
      store: '무신사',
      amount: '58,000',
      date: '2025-04-25 14:33',
      cardName: '카드의정석 오하CHECK',
    },
    {
      id: 4,
      store: '무신사',
      amount: '58,000',
      date: '2025-04-25 14:33',
      cardName: '카드의정석 오하CHECK',
    },
  ];

  // Handle tab navigation
  const handleTabClick = (tab: string) => {
    if (tab === 'myInfo') {
      router.push('/mypage');
    } else if (tab === 'cardManagement') {
      router.push('/mycard');
    } else {
      setActiveTab(tab);
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 내비게이션 바 */}
      <HeaderNavBar />

      {/* 메인 콘텐츠 */}
      <main className="container mx-auto px-4 py-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 혜택별 최고의 카드 */}
          <Card>
            <CardContent className="px-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-3xl font-bold">혜택별 최고의 카드</h2>
                <Button variant="ghost" size="sm" className="text-gray-500">
                  더보기
                </Button>
              </div>

              <div className="relative">
                <div className="flex justify-center items-center space-x-8 py-4">
                  <Button variant="ghost" size="icon" className="absolute left-0 z-10">
                    <ChevronLeft className="h-6 w-6" />
                  </Button>

                  {bestCards.map((card) => (
                    <div key={card.id} className="flex flex-col items-center">
                      <div className="w-auto h-auto rounded-full overflow-hidden flex items-center justify-center">
                        <Image
                          src={card.logo || '/placeholder.svg'}
                          alt={card.name}
                          width={120}
                          height={120}
                          className="object-contain"
                        />
                      </div>
                    </div>
                  ))}

                  <Button variant="ghost" size="icon" className="absolute right-0 z-10">
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 이번 달 총 할인 금액 */}
          <Card className="border-4 border-black">
            <CardContent className="h-full px-6 flex flex-col justify-between">
              <h2 className="text-2xl font-bold">
                <span className="text-3xl">{user.name}</span>님 이번 달 총 할인 금액
              </h2>
              <p className="text-8xl font-bold">{user.totalDiscount}원</p>
              <p className="text-gray-600">
                지난달 대비 <span className="text-xl font-bold">{user.previousDiscount}원</span> 더
                절약했어요!
              </p>
            </CardContent>
          </Card>
        </div>

        {/* 내 카드 + 최근 결제 내역 (가로 배치) */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* 내 카드 */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">내 카드</h2>
              <Button
                variant="ghost"
                size="sm"
                className="text-blue-500"
                onClick={() => router.push('/mycard')}
              >
                전체 보기
              </Button>
            </div>

            <div className="relative">
              {/* Scroll buttons */}
              <button
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 transition-colors duration-200 scroll-button-left"
                aria-label="이전 카드 보기"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              <button
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 transition-colors duration-200 scroll-button-right"
                aria-label="다음 카드 보기"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              {/* Scrollable container */}
              <div className="cards-scroll-container overflow-x-auto pb-4 hide-scrollbar">
                <div className="inline-flex gap-4 px-8">
                  {sortedCards.map((card) => (
                    <div
                      key={card.id}
                      className="flex-none w-[150px] md:w-[180px] aspect-[1/1.58] perspective"
                    >
                      <div className="relative w-full h-full transition-transform duration-500 transform-style-preserve-3d hover:rotate-y-180">
                        {/* 앞면 */}
                        <div className="absolute inset-0 backface-hidden">
                          <Image
                            src={card.image || '/placeholder.svg'}
                            alt={card.name}
                            fill
                            className="rounded-lg shadow-sm object-cover"
                          />
                        </div>

                        {/* 뒷면 */}
                        <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-lg overflow-hidden">
                          <Image
                            src={card.image || '/placeholder.svg'}
                            alt={card.name}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-white/60 backdrop-blur-md px-4 py-3 flex flex-col justify-between text-left text-gray-800">
                            <div>
                              <h3 className="text-base font-semibold mb-1">{card.name}</h3>
                              <p className="text-sm">**** **** **** {card.number.slice(-4)}</p>
                            </div>
                            <ul className="text-xs space-y-1">
                              {card.benefits.slice(0, 3).map((benefit, index) => (
                                <li key={index}>• {benefit}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* 카드 등록 */}
                  <div
                    className="relative flex-none w-[150px] md:w-[180px] aspect-[1/1.58] border-2 border-dashed rounded-lg flex items-center justify-center"
                    onClick={() => router.push('/card/register')}
                  >
                    <div className="flex flex-col items-center text-gray-500 pointer-events-none">
                      <Plus className="h-6 w-6 mb-1" />
                      <span className="text-sm">카드 등록하기</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 최근 결제 내역 */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">최근 결제 내역</h2>
              <Button
                variant="ghost"
                size="sm"
                className="text-blue-500"
                onClick={() => router.push('/transactions')}
              >
                전체 보기
              </Button>
            </div>

            <Card className="p-0">
              <CardContent className="p-0">
                <div className="divide-y">
                  {recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4">
                      <div>
                        <p className="font-medium">{transaction.store}</p>
                        <p className="text-sm text-gray-500">{transaction.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{transaction.amount}원</p>
                        <p className="text-sm text-gray-500">{transaction.cardName}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
