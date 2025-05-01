'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { CreditCard, Plus, Search, Star, StarOff, Trash2, ChevronDown, Check } from 'lucide-react';
import { HeaderNavBar } from '@/components/header-nav-bar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface CardItem {
  id: number;
  name: string;
  image: string;
  number: string;
  benefits: string[];
  isDefault?: boolean;
}

export default function MyCardPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCard, setSelectedCard] = useState<CardItem | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [sortOption, setSortOption] = useState('default');

  // 내 카드 목록 (예시)
  const [myCards, setMyCards] = useState<CardItem[]>([
    {
      id: 1,
      name: '현대카드 M Black',
      image: '/hyundaiblack.png',
      number: '5521-9876-3412-0001',
      benefits: ['스타벅스 10% 청구 할인', '해외 가맹점 1.5% 캐시백', '특급호텔 무료 발렛'],
      isDefault: true,
    },
    {
      id: 2,
      name: '카드의정석 EVERY DISCOUNT',
      image: '/everydiscount.png',
      number: '4582-1234-5678-0002',
      benefits: ['대중교통 10% 할인', '이동통신 요금 10% 할인', '편의점 5% 할인'],
    },
    {
      id: 3,
      name: '삼성카드 taptap 0',
      image: '/taptap0.png',
      number: '4012-3456-7890-0003',
      benefits: ['넷플릭스 10% 할인', '스타벅스 30% 할인', '배달앱 10% 할인'],
    },
    {
      id: 4,
      name: '카드의정석 오하CHECK',
      image: '/ohacheck.png',
      number: '3792-0000-1111-0004',
      benefits: ['영화 3,000원 할인', '버스/지하철 10% 할인', '배달의민족 5% 적립'],
    },
    {
      id: 5,
      name: 'KB국민 My WE:SH 카드',
      image: '/mywish.png',
      number: '6254-4444-2222-0005',
      benefits: ['온라인 쇼핑 5% 할인', '헬스장/필라테스 10% 할인', '디지털 콘텐츠 구독 7% 할인'],
    },
  ]);

  // 카드 검색 필터링
  const filteredCards = myCards.filter((card) =>
    card.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 카드 정렬
  const sortedCards = [...filteredCards].sort((a, b) => {
    if (sortOption === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortOption === 'default') {
      return a.isDefault ? -1 : b.isDefault ? 1 : 0;
    }
    return 0;
  });

  // 대표 카드 설정
  const handleSetDefaultCard = (card: CardItem) => {
    setMyCards(
      myCards.map((c) => ({
        ...c,
        isDefault: c.id === card.id,
      }))
    );
  };

  // 카드 삭제
  const handleDeleteCard = () => {
    if (selectedCard) {
      setMyCards(myCards.filter((card) => card.id !== selectedCard.id));
      setShowDeleteDialog(false);
      setSelectedCard(null);
    }
  };

  // 카드 상세 정보 보기
  const handleViewCardDetail = (card: CardItem) => {
    setSelectedCard(card);
    setShowDetailDialog(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 상단 네비게이션 바 */}
      <HeaderNavBar />

      {/* 메인 콘텐츠 */}
      <main className="container mx-auto px-4 py-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold mb-2">내 카드</h1>
          <p className="text-gray-500 mb-6">등록된 카드를 확인하고 관리할 수 있습니다.</p>

          {/* 검색 및 필터 영역 */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="카드 검색"
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-4">
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="hover:bg-gray-100 !ring-0 cursor-pointer">
                    {sortOption === 'default' ? '기본 정렬' : '이름순 정렬'}
                    <ChevronDown className="ml-2 w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white">
                  <DropdownMenuItem
                    onClick={() => setSortOption('default')}
                    className="hover:bg-gray-100 cursor-pointer"
                  >
                    기본 정렬
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setSortOption('name')}
                    className="hover:bg-gray-100 cursor-pointer"
                  >
                    이름순 정렬
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                onClick={() => router.push('/card/register')}
                className="bg-black text-white cursor-pointer"
              >
                카드 추가
                <Plus className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* 카드 목록 */}
          {sortedCards.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedCards.map((card) => (
                <Card key={card.id} className="overflow-hidden p-0 pb-6">
                  <div className="relative aspect-[1.58/1] overflow-hidden">
                    <Image
                      src={card.image || '/placeholder.svg'}
                      alt={card.name}
                      fill
                      className="object-fill origin-center transform -rotate-90 scale-y-[1.58] scale-x-[0.63]"
                    />
                    {card.isDefault && (
                      <div className="absolute top-2 right-2 bg-black text-white text-xs px-2 py-1 rounded-full">
                        대표카드
                      </div>
                    )}
                  </div>
                  <CardContent className="px-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-bold">{card.name}</h3>
                        <p className="text-sm text-gray-500">
                          **** **** **** {card.number.slice(-4)}
                        </p>
                      </div>
                      <DropdownMenu modal={false}>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <span className="sr-only">메뉴 열기</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <circle cx="12" cy="12" r="1" />
                              <circle cx="12" cy="5" r="1" />
                              <circle cx="12" cy="19" r="1" />
                            </svg>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-white">
                          <DropdownMenuItem onClick={() => handleViewCardDetail(card)}>
                            <CreditCard className="mr-2 h-4 w-4" />
                            상세 정보
                          </DropdownMenuItem>
                          {!card.isDefault && (
                            <DropdownMenuItem onClick={() => handleSetDefaultCard(card)}>
                              <Star className="mr-2 h-4 w-4" />
                              대표카드 설정
                            </DropdownMenuItem>
                          )}
                          {card.isDefault && (
                            <DropdownMenuItem disabled>
                              <StarOff className="mr-2 h-4 w-4" />
                              대표카드 해제
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem
                            className="text-red-500"
                            onClick={() => {
                              setSelectedCard(card);
                              setShowDeleteDialog(true);
                            }}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            카드 삭제
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="space-y-1">
                      {card.benefits.slice(0, 3).map((benefit, index) => (
                        <p key={index} className="text-xs text-gray-600">
                          • {benefit}
                        </p>
                      ))}
                      {card.benefits.length > 3 && (
                        <p className="text-xs text-gray-400">
                          + {card.benefits.length - 3}개 더보기
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <CreditCard className="mx-auto h-12 w-12 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">등록된 카드가 없습니다</h3>
              <p className="text-gray-500 mb-4">카드를 등록하고 혜택을 받아보세요.</p>
              <Button onClick={() => router.push('/card/register')}>
                <Plus className="mr-2 h-4 w-4" />
                카드 등록하기
              </Button>
            </div>
          )}
        </div>
      </main>
      {/* 카드 삭제 확인 다이얼로그 */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>카드 삭제</DialogTitle>
            <DialogDescription>
              정말로 {selectedCard?.name} 카드를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowDeleteDialog(false)}>
              취소
            </Button>
            <Button variant="ghost" onClick={handleDeleteCard} className='text-red-600'>
              삭제
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* 카드 상세 정보 다이얼로그 */}
      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle className="text-xl">카드 상세 정보</DialogTitle>
          </DialogHeader>
          {selectedCard && (
            <div className="space-y-4">
              <div className="flex justify-center m-0 p-0">
                <div className="relative w-50 aspect-[1/1.58] -rotate-90 origin-center">
                  <Image
                    src={selectedCard.image || '/placeholder.svg'}
                    alt={selectedCard.name}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-lg">{selectedCard.name}</h3>
                <p className="text-sm text-gray-500">
                  카드번호: **** **** **** {selectedCard.number.slice(-4)}
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">카드 혜택</h4>
                <ul className="space-y-2">
                  {selectedCard.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-xs mr-2">
                        <Check />
                      </span>
                      <span className="text-sm mt-0.5">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button
                  variant="outline"
                  className="hover:bg-gray-100 cursor-pointer"
                  onClick={() => setShowDetailDialog(false)}
                >
                  닫기
                </Button>
                {!selectedCard.isDefault && (
                  <Button
                    variant="outline"
                    className="hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      handleSetDefaultCard(selectedCard);
                      setShowDetailDialog(false);
                    }}
                  >
                    <Star className="mr-2 h-4 w-4" />
                    대표카드 설정
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
