'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown, CreditCard, Filter, Search, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { HeaderNavBar } from '@/components/header-nav-bar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface Transaction {
  id: number;
  store: string;
  amount: string;
  date: string;
  cardName: string;
  category: string;
  benefit?: string;
}

export default function TransactionsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [dateRange, setDateRange] = useState<'all' | '1week' | '1month' | '3months' | 'custom'>(
    'all'
  );
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [cardFilter, setCardFilter] = useState<string>('all');
  const [sortOption, setSortOption] = useState<'recent' | 'oldest' | 'amount-high' | 'amount-low'>(
    'recent'
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // 결제 내역 목록 (예시)
  const transactions: Transaction[] = [
    {
      id: 1,
      store: '스타벅스 강남점',
      amount: '5,800',
      date: '2025-05-01 09:33',
      cardName: '현대카드 M Black',
      category: '카페',
      benefit: '10% 청구 할인 적용',
    },
    {
      id: 2,
      store: '무신사',
      amount: '58,000',
      date: '2025-04-25 14:33',
      cardName: '카드의정석 오하CHECK',
      category: '쇼핑',
      benefit: '5% 적립 적용',
    },
    {
      id: 3,
      store: 'CGV 용산아이파크몰',
      amount: '15,000',
      date: '2025-04-20 18:45',
      cardName: '카드의정석 오하CHECK',
      category: '영화',
      benefit: '3,000원 할인 적용',
    },
    {
      id: 4,
      store: '배달의민족',
      amount: '23,500',
      date: '2025-04-18 19:22',
      cardName: '삼성카드 taptap 0',
      category: '배달',
      benefit: '10% 할인 적용',
    },
    {
      id: 5,
      store: '넷플릭스',
      amount: '17,000',
      date: '2025-04-15 00:00',
      cardName: '삼성카드 taptap 0',
      category: '구독',
      benefit: '10% 할인 적용',
    },
    {
      id: 6,
      store: '스타벅스 홍대점',
      amount: '8,500',
      date: '2025-04-12 15:10',
      cardName: '현대카드 M Black',
      category: '카페',
      benefit: '10% 청구 할인 적용',
    },
    {
      id: 7,
      store: '교보문고',
      amount: '32,400',
      date: '2025-04-10 13:25',
      cardName: 'KB국민 My WE:SH 카드',
      category: '쇼핑',
      benefit: '5% 할인 적용',
    },
    {
      id: 8,
      store: '요기요',
      amount: '18,900',
      date: '2025-04-05 20:15',
      cardName: '삼성카드 taptap 0',
      category: '배달',
      benefit: '10% 할인 적용',
    },
    {
      id: 9,
      store: '올리브영',
      amount: '45,600',
      date: '2025-04-03 16:40',
      cardName: '카드의정석 EVERY DISCOUNT',
      category: '쇼핑',
      benefit: '5% 할인 적용',
    },
    {
      id: 10,
      store: '지하철',
      amount: '1,350',
      date: '2025-04-01 08:20',
      cardName: '카드의정석 EVERY DISCOUNT',
      category: '교통',
      benefit: '10% 할인 적용',
    },
    {
      id: 11,
      store: '스타벅스 삼성점',
      amount: '6,300',
      date: '2025-03-28 10:45',
      cardName: '현대카드 M Black',
      category: '카페',
      benefit: '10% 청구 할인 적용',
    },
    {
      id: 12,
      store: '쿠팡',
      amount: '67,800',
      date: '2025-03-25 11:30',
      cardName: 'KB국민 My WE:SH 카드',
      category: '쇼핑',
      benefit: '5% 할인 적용',
    },
  ];

  // 카드 목록 (필터용)
  const cards = [
    { id: 'all', name: '전체 카드' },
    { id: 'hyundaiblack', name: '현대카드 M Black' },
    { id: 'everydiscount', name: '카드의정석 EVERY DISCOUNT' },
    { id: 'taptap0', name: '삼성카드 taptap 0' },
    { id: 'ohacheck', name: '카드의정석 오하CHECK' },
    { id: 'mywish', name: 'KB국민 My WE:SH 카드' },
  ];

  // 카테고리 목록 (필터용)
  const categories = [
    { id: 'all', name: '전체 카테고리' },
    { id: 'cafe', name: '카페' },
    { id: 'shopping', name: '쇼핑' },
    { id: 'movie', name: '영화' },
    { id: 'delivery', name: '배달' },
    { id: 'subscription', name: '구독' },
    { id: 'transport', name: '교통' },
  ];

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.store.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.cardName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCard = cardFilter === 'all' || transaction.cardName.includes(cardFilter);

    let matchesDate = true;
    const transactionDate = new Date(transaction.date);
    const now = new Date();

    if (dateRange === '1week') {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(now.getDate() - 7);
      matchesDate = transactionDate >= oneWeekAgo;
    } else if (dateRange === '1month') {
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(now.getMonth() - 1);
      matchesDate = transactionDate >= oneMonthAgo;
    } else if (dateRange === '3months') {
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(now.getMonth() - 3);
      matchesDate = transactionDate >= threeMonthsAgo;
    }

    return matchesSearch && matchesCard && matchesDate;
  });

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortOption === 'recent') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (sortOption === 'oldest') {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    } else if (sortOption === 'amount-high') {
      return (
        Number.parseInt(b.amount.replace(/,/g, '')) - Number.parseInt(a.amount.replace(/,/g, ''))
      );
    } else if (sortOption === 'amount-low') {
      return (
        Number.parseInt(a.amount.replace(/,/g, '')) - Number.parseInt(b.amount.replace(/,/g, ''))
      );
    }
    return 0;
  });

  const totalPages = Math.ceil(sortedTransactions.length / itemsPerPage);
  const paginatedTransactions = sortedTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleViewTransactionDetail = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setShowDetailDialog(true);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderNavBar />
      <main className="container mx-auto px-4 py-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold mb-2">결제 내역</h1>
          <p className="text-gray-500 mb-6">모든 결제 내역을 확인하고 관리할 수 있습니다.</p>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="결제처 또는 카드 검색"
                className="pl-10"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
            <div className="flex items-center gap-3">
              <Popover open={filterOpen} onOpenChange={setFilterOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Filter className="h-4 w-4" />
                    필터
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 bg-white" align="end">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium mb-2">기간</h3>
                      <Select
                        value={dateRange}
                        onValueChange={(value: any) => {
                          setDateRange(value);
                          setCurrentPage(1);
                        }}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="기간 선택" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem value="all" className="hover:bg-gray-100 cursor-pointer">
                            전체 기간
                          </SelectItem>
                          <SelectItem value="1week" className="hover:bg-gray-100 cursor-pointer">
                            최근 1주일
                          </SelectItem>
                          <SelectItem value="1month" className="hover:bg-gray-100 cursor-pointer">
                            최근 1개월
                          </SelectItem>
                          <SelectItem value="3months" className="hover:bg-gray-100 cursor-pointer">
                            최근 3개월
                          </SelectItem>
                          <SelectItem value="custom" className="hover:bg-gray-100 cursor-pointer">
                            직접 설정
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {dateRange === 'custom' && (
                      <div className="flex flex-col gap-2">
                        <Label className="text-sm text-gray-700">시작일</Label>
                        <Input
                          type="date"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                        />
                        <Label className="text-sm text-gray-700">종료일</Label>
                        <Input
                          type="date"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                        />
                      </div>
                    )}

                    <div>
                      <h3 className="text-sm font-medium mb-2">카드</h3>
                      <Select
                        value={cardFilter}
                        onValueChange={(value: any) => {
                          setCardFilter(value);
                          setCurrentPage(1);
                        }}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="카드 선택" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          {cards.map((card) => (
                            <SelectItem
                              key={card.id}
                              value={card.id}
                              className="hover:bg-gray-100 cursor-pointer"
                            >
                              {card.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setDateRange('all');
                          setCardFilter('all');
                          setStartDate('');
                          setEndDate('');
                          setCurrentPage(1);
                        }}
                      >
                        초기화
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => setFilterOpen(false)}>
                        적용
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    정렬
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white">
                  {[
                    { label: '최신순', value: 'recent' },
                    { label: '오래된순', value: 'oldest' },
                    { label: '금액 높은순', value: 'amount-high' },
                    { label: '금액 낮은순', value: 'amount-low' },
                  ].map(({ label, value }) => (
                    <DropdownMenuItem
                      key={value}
                      onClick={() => {
                        setSortOption(value as any);
                        setCurrentPage(1);
                      }}
                      className="flex justify-between cursor-pointer"
                    >
                      {label}
                      {sortOption === value && <Check className="h-4 w-4 text-primary" />}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {paginatedTransactions.length > 0 ? (
            <Card className="py-0">
              <CardContent className="p-0">
                <div className="divide-y">
                  {paginatedTransactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleViewTransactionDetail(transaction)}
                    >
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
          ) : (
            <div className="text-center py-12">
              <CreditCard className="mx-auto h-12 w-12 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">결제 내역이 없습니다</h3>
              <p className="text-gray-500">검색 조건을 변경하거나 다른 기간을 선택해보세요.</p>
            </div>
          )}

          {/* 페이지네이션 */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6">
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="cursor-pointer"
                >
                  이전
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant="ghost"
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className={`cursor-pointer ${
                      currentPage === page ? 'bg-black text-white' : ''
                    }`}
                  >
                    {page}
                  </Button>
                ))}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="cursor-pointer"
                >
                  다음
                </Button>
              </div>
            </div>
          )}

          {/* 상세 다이얼로그 그대로 유지 */}
          <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
            <DialogContent className="sm:max-w-md bg-white">
              <DialogHeader>
                <DialogTitle className="text-xl">결제 상세 정보</DialogTitle>
              </DialogHeader>
              {selectedTransaction && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-lg">{selectedTransaction.store}</h3>
                      <p className="text-sm text-gray-500">
                        {formatDate(selectedTransaction.date)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">{selectedTransaction.amount}원</p>
                      <p className="text-xs text-green-600">{selectedTransaction.benefit}</p>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-sm text-gray-500">결제 카드</p>
                    <p className="font-medium">{selectedTransaction.cardName}</p>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">카테고리</p>
                      <p className="font-medium">{selectedTransaction.category}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">결제 방식</p>
                      <p className="font-medium">일시불</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">승인 번호</p>
                      <p className="font-medium">
                        {Math.floor(Math.random() * 1000000)
                          .toString()
                          .padStart(6, '0')}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">상태</p>
                      <p className="font-medium text-green-600">승인 완료</p>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 pt-4">
                    <Button variant="outline" onClick={() => setShowDetailDialog(false)}>
                      닫기
                    </Button>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </main>
    </div>
  );
}
