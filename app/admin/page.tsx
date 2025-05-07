"use client";

import { Card, CardContent } from "@/components/ui/card";

// 차트 컴포넌트
const TransactionChart = () => {
  const amountData = [58000, 62000, 78000, 76000, 56000, 78000, 64000];
  const countData = [3200, 3000, 3600, 1800, 1200, 3200, 1600];
  const labels = [
    "4월 20일",
    "4월 21일",
    "4월 22일",
    "4월 23일",
    "4월 24일",
    "4월 25일",
    "4월 26일",
  ];

  const chartHeight = 260;
  const yTicks = 10;

  const amountStep = 10000;
  const countStep = 1000;
  const maxAmount = amountStep * yTicks;
  const maxCount = countStep * yTicks;

  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex w-full px-4">
        {/* 왼쪽 Y축 (금액) */}
        <div className="flex flex-col justify-between items-end pr-2 text-xs text-blue-500 h-[320px]">
          {Array.from({ length: yTicks + 1 }).map((_, i) => {
            const value = (yTicks - i) * amountStep;
            return (
              <div key={i} className="h-[32px] leading-none">
                {value.toLocaleString()}
              </div>
            );
          })}
        </div>

        {/* 차트 */}
        <div className="relative flex-1 flex items-end justify-between h-[320px] border-y border-gray-200">
          {amountData.map((amount, index) => {
            const amountHeight = (amount / maxAmount) * chartHeight;
            const countHeight = (countData[index] / maxCount) * chartHeight;

            return (
              <div
                key={index}
                className="flex flex-col items-center w-full mx-1"
              >
                <div
                  className="flex items-end gap-1"
                  style={{ height: chartHeight }}
                >
                  <div
                    className="w-3 bg-blue-400 rounded-t-sm"
                    style={{ height: `${amountHeight}px` }}
                  />
                  <div
                    className="w-3 bg-green-400 rounded-t-sm opacity-70"
                    style={{ height: `${countHeight}px` }}
                  />
                </div>
                <div className="mt-2 text-xs text-gray-500 whitespace-nowrap">
                  {labels[index]}
                </div>
              </div>
            );
          })}
        </div>

        {/* 오른쪽 Y축 (건수) */}
        <div className="flex flex-col justify-between items-start pl-2 text-xs text-green-500 h-[320px]">
          {Array.from({ length: yTicks + 1 }).map((_, i) => {
            const value = (yTicks - i) * countStep;
            return (
              <div key={i} className="h-[32px] leading-none">
                {value.toLocaleString()}
              </div>
            );
          })}
        </div>
      </div>
      {/* 범례 */}
      <div className="flex justify-center gap-6 mt-4 text-xs text-gray-500">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-400 mr-2 rounded-sm" />
          거래금액 (원)
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-400 mr-2 rounded-sm" />
          거래건수 (건)
        </div>
      </div>
    </div>
  );
};

export default function AdminDashboard() {
  // 가맹점 데이터
  const merchants = [
    {
      id: 1,
      name: "스타벅스",
      type: "카페",
      transactions: 8456,
      amount: "15,678 만원",
      status: "활성",
    },
    {
      id: 2,
      name: "CGV",
      type: "영화",
      transactions: 6234,
      amount: "12,456 만원",
      status: "활성",
    },
    {
      id: 3,
      name: "배달의민족",
      type: "배달",
      transactions: 5678,
      amount: "9,876 만원",
      status: "활성",
    },
    {
      id: 4,
      name: "쿠팡",
      type: "쇼핑",
      transactions: 4567,
      amount: "8,765 만원",
      status: "활성",
    },
    {
      id: 5,
      name: "올리브영",
      type: "쇼핑",
      transactions: 3456,
      amount: "6,543 만원",
      status: "활성",
    },
    {
      id: 6,
      name: "GS25",
      type: "편의점",
      transactions: 3210,
      amount: "4,321 만원",
      status: "활성",
    },
  ];

  return (
    <>
      <h1 className="text-3xl font-bold mb-4">관리자 대시보드</h1>
      <h2 className="text-gray-600 mb-4">
        가맹점 서비스 이용 현황을 확인하세요.
      </h2>
      <div className="mb-6">
        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white">
            <CardContent className="px-6">
              <div className="flex flex-col">
                <span className="text-base text-gray-500 mb-2">총 가맹점</span>
                <span className="text-3xl font-bold">1,248</span>
                <span className="text-sm text-gray-500 mt-2">
                  활성 가맹점: 1,156
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardContent className="px-6">
              <div className="flex flex-col">
                <span className="text-base text-gray-500 mb-2">
                  총 거래 건수
                </span>
                <span className="text-3xl font-bold">28,456</span>
                <span className="text-sm text-gray-500 mt-2">
                  최근 24시간: +342
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
                <span className="text-3xl font-bold">45,892만원</span>
                <span className="text-sm text-green-500 mt-2">
                  전월 대비: +8.5%
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
                <span className="text-3xl font-bold">16,127원</span>
                <span className="text-sm text-gray-500 mt-2">
                  거래당 평균 금액
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 차트 및 테이블 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold">거래 추이</h3>
              </div>
              <div className="h-[360px]">
                <TransactionChart />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardContent className="px-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold">상위 가맹점</h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-xs text-gray-500 border-b">
                      <th className="pb-2 text-left font-medium">가맹점명</th>
                      <th className="pb-2 text-center font-medium">
                        거래 건수
                      </th>
                      <th className="pb-2 text-center font-medium">
                        거래 금액
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {merchants.map((merchant) => (
                      <tr
                        key={merchant.id}
                        className="border-b last:border-0 hover:bg-gray-50"
                      >
                        <td className="py-3 text-left">{merchant.name}</td>
                        <td className="py-3 text-right">
                          {merchant.transactions.toLocaleString()}
                        </td>
                        <td className="py-3 text-right">{merchant.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
