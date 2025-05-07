"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// 가맹점 상세 정보 타입
interface MerchantDetail {
  id: number;
  name: string;
  category: string;
  status: "활성" | "비활성";
  totalTransactions: number;
  totalAmount: string;
  averageAmount: string;
  commissionRate: string;
  recentTransactions: Transaction[];
}

// 거래 내역 타입
interface Transaction {
  id: string;
  amount: string;
  paymentMethod: string;
  dateTime: string;
  status: "완료" | "취소" | "보류";
}

export default function MerchantDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // 가맹점 데이터 (예시)
  const merchantsData: Record<string, MerchantDetail> = {
    "1": {
      id: 1,
      name: "스타벅스",
      category: "카페",
      status: "활성",
      totalTransactions: 1248,
      totalAmount: "15,678만원",
      averageAmount: "18,541원",
      commissionRate: "3.5%",
      recentTransactions: [
        {
          id: "TRX-100000",
          amount: "15,678 만원",
          paymentMethod: "현대카드 ****123",
          dateTime: "2025-04-28 오전 01:04",
          status: "완료",
        },
        {
          id: "TRX-100001",
          amount: "15,678 만원",
          paymentMethod: "현대카드 ****123",
          dateTime: "2025-04-28 오전 01:04",
          status: "완료",
        },
        {
          id: "TRX-100002",
          amount: "15,678 만원",
          paymentMethod: "현대카드 ****123",
          dateTime: "2025-04-28 오전 01:04",
          status: "완료",
        },
        {
          id: "TRX-100003",
          amount: "15,678 만원",
          paymentMethod: "현대카드 ****123",
          dateTime: "2025-04-28 오전 01:04",
          status: "완료",
        },
        {
          id: "TRX-100004",
          amount: "15,678 만원",
          paymentMethod: "현대카드 ****123",
          dateTime: "2025-04-28 오전 01:04",
          status: "완료",
        },
        {
          id: "TRX-100005",
          amount: "15,678 만원",
          paymentMethod: "현대카드 ****123",
          dateTime: "2025-04-28 오전 01:04",
          status: "완료",
        },
      ],
    },
    "2": {
      id: 2,
      name: "CGV",
      category: "영화",
      status: "활성",
      totalTransactions: 987,
      totalAmount: "12,456만원",
      averageAmount: "15,432원",
      commissionRate: "4.0%",
      recentTransactions: [
        {
          id: "TRX-200000",
          amount: "12,000 만원",
          paymentMethod: "삼성카드 ****456",
          dateTime: "2025-04-27 오후 03:15",
          status: "완료",
        },
        {
          id: "TRX-200001",
          amount: "12,000 만원",
          paymentMethod: "삼성카드 ****456",
          dateTime: "2025-04-27 오후 03:15",
          status: "완료",
        },
      ],
    },
  };

  // 현재 가맹점 정보 가져오기
  const merchant = merchantsData[id];
  const [isActive, setIsActive] = useState(merchant.status === "활성");

  // 가맹점 삭제 핸들러
  const handleDeleteMerchant = () => {
    // 실제로는 API 호출 등의 로직이 들어갈 것
    setShowDeleteDialog(false);
    router.push("/admin/merchants");
  };

  const handleStatusChange = (checked: boolean) => {
    setIsActive(checked);
    // 실제로는 여기서 API 호출을 통해 서버에 상태 변경을 저장할 것
  };

  if (!merchant) {
    return <div>가맹점을 찾을 수 없습니다.</div>;
  }

  return (
    <div>
      {/* 메인 콘텐츠 */}
      <div>
        {/* 가맹점 상세 콘텐츠 */}
        <main>
          <div className="mb-6">
            {/* 뒤로 가기 버튼 */}
            <div className="flex items-center mb-4">
              <Button
                variant="ghost"
                className="flex items-center text-gray-600 hover:text-gray-900"
                onClick={() => router.push("/admin/merchants")}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                가맹점 목록
              </Button>
            </div>

            {/* 가맹점 헤더 */}
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold">{merchant.name}</h1>
                <div
                  onClick={() => handleStatusChange(!isActive)}
                  className={`w-24 h-10 flex items-center rounded-full cursor-pointer transition-colors duration-300 ${
                    isActive ? "bg-green-500" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`w-12 h-10 rounded-full bg-white shadow-md transform transition-transform duration-300 flex items-center justify-center font-bold text-sm ${
                      isActive ? "translate-x-12" : "translate-x-0"
                    }`}
                  >
                    {isActive ? "활성" : "비활성"}
                  </div>
                </div>
              </div>
              <Button
                variant="destructive"
                onClick={() => setShowDeleteDialog(true)}
                className="text-white hover:text-red-800 bg-red-600"
              >
                가맹점 제거
              </Button>
            </div>

            {/* 가맹점 카테고리 */}
            <p className="text-gray-600 mb-6">{merchant.category}</p>

            {/* 통계 카드 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="bg-white">
                <CardContent className="px-6">
                  <div className="flex flex-col">
                    <span className="text-base text-gray-500 mb-2">
                      총 거래 건수
                    </span>
                    <span className="text-3xl font-bold">
                      {merchant.totalTransactions.toLocaleString()}건
                    </span>
                    <span className="text-sm text-gray-500 mt-2">
                      최근 24시간: +342건
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardContent className="px-6">
                  <div className="flex flex-col">
                    <span className="text-base text-gray-500 mb-2">
                      총 거래 금액
                    </span>
                    <span className="text-3xl font-bold">
                      {merchant.totalAmount}
                    </span>
                    <span className="text-sm text-gray-500 mt-2">
                      전월 대비: +6.5%
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardContent className="px-6">
                  <div className="flex flex-col">
                    <span className="text-base text-gray-500 mb-2">
                      평균 거래 금액
                    </span>
                    <span className="text-3xl font-bold">
                      {merchant.averageAmount}
                    </span>
                    <span className="text-sm text-gray-500 mt-2">
                      거래당 평균 금액
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardContent className="px-6">
                  <div className="flex flex-col">
                    <span className="text-base text-gray-500 mb-2">
                      수수료율
                    </span>
                    <span className="text-3xl font-bold">
                      {merchant.commissionRate}
                    </span>
                    <span className="text-sm text-gray-500 mt-2">
                      기본 수수료율
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 탭 네비게이션 */}
            <Tabs defaultValue="거래 내역" className="w-full">
              <TabsList>
                <TabsTrigger
                  value="거래 내역"
                  className="data-[state=active]:bg-gray-200 cursor-pointer"
                >
                  거래 내역
                </TabsTrigger>
                <TabsTrigger
                  value="상세 정보"
                  className="data-[state=active]:bg-gray-200 cursor-pointer"
                >
                  상세 정보
                </TabsTrigger>
              </TabsList>

              <TabsContent value="거래 내역">
                <Card className="py-2 bg-white">
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="text-left text-gray-500 border-b">
                            <th className="px-6 py-3 font-medium">거래 ID</th>
                            <th className="px-6 py-3 font-medium">금액</th>
                            <th className="px-6 py-3 font-medium">결제 수단</th>
                            <th className="px-6 py-3 font-medium">날짜/시간</th>
                            <th className="px-6 py-3 font-medium">상태</th>
                          </tr>
                        </thead>
                        <tbody>
                          {merchant.recentTransactions.map((transaction) => (
                            <tr
                              key={transaction.id}
                              className="border-b last:border-0 hover:bg-gray-50"
                            >
                              <td className="px-6 py-4">{transaction.id}</td>
                              <td className="px-6 py-4">
                                {transaction.amount}
                              </td>
                              <td className="px-6 py-4">
                                {transaction.paymentMethod}
                              </td>
                              <td className="px-6 py-4">
                                {transaction.dateTime}
                              </td>
                              <td className="px-6 py-4">
                                <span
                                  className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                                    transaction.status === "완료"
                                      ? "bg-green-100 text-green-800"
                                      : transaction.status === "취소"
                                        ? "bg-red-100 text-red-800"
                                        : "bg-amber-100 text-amber-800"
                                  }`}
                                >
                                  {transaction.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="상세 정보">
                <Card className="w-1/2 p-6 bg-white">
                  <CardContent className="p-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div>
                        <p className="text-base text-gray-500">
                          사업자 등록번호
                        </p>
                        <p className="font-medium">123-45-67890</p>
                      </div>
                      <div>
                        <p className="text-base text-gray-500">대표자명</p>
                        <p className="font-medium">홍길동</p>
                      </div>
                      <div>
                        <p className="text-base text-gray-500">연락처</p>
                        <p className="font-medium">02-1234-5678</p>
                      </div>
                      <div>
                        <p className="text-base text-gray-500">이메일</p>
                        <p className="font-medium">contact@starbucks.com</p>
                      </div>
                      <div>
                        <p className="text-base text-gray-500">주소</p>
                        <p className="font-medium">
                          서울특별시 강남구 테헤란로 123
                        </p>
                      </div>
                      <div>
                        <p className="text-base text-gray-500">계약 시작일</p>
                        <p className="font-medium">2024.01.01</p>
                      </div>
                      <div>
                        <p className="text-base text-gray-500">계약 종료일</p>
                        <p className="font-medium">2025.12.31</p>
                      </div>
                      <div>
                        <p className="text-base text-gray-500">정산 주기</p>
                        <p className="font-medium">월 1회</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>

      {/* 가맹점 삭제 확인 다이얼로그 */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>가맹점 삭제</DialogTitle>
            <DialogDescription>
              정말로 {merchant.name} 가맹점을 삭제하시겠습니까? 이 작업은 되돌릴
              수 없습니다.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
            >
              취소
            </Button>
            <Button variant="destructive" onClick={handleDeleteMerchant}>
              삭제
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
