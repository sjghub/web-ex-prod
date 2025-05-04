"use client";

import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeaderNavBar() {
  const router = useRouter();
  const pathname = usePathname();

  const getActiveTab = () => {
    if (pathname.startsWith("/mycard")) return "cardManagement";
    if (pathname.startsWith("/mypage")) return "myInfo";
    return "home";
  };

  const activeTab = getActiveTab();

  return (
    <header className="sticky top-0 z-10 bg-white border-b">
      <div className="relative container mx-auto px-4 py-3 flex items-center justify-center">
        {/* 왼쪽 영역 */}
        <div className="absolute left-0 flex items-center space-x-6">
          <Button
            variant="ghost"
            className={`cursor-pointer px-3 py-2 hover:bg-gray-100 ${
              activeTab === "home" ? "font-bold bg-gray-100 rounded-md" : ""
            }`}
            onClick={() => router.push("/dashboard")}
          >
            홈
          </Button>
          <Button
            variant="ghost"
            className={`cursor-pointer px-3 py-2 hover:bg-gray-100 ${
              activeTab === "cardManagement"
                ? "font-bold bg-gray-100 rounded-md"
                : ""
            }`}
            onClick={() => router.push("/mycard")}
          >
            카드 관리
          </Button>
          <Button
            variant="ghost"
            className={`cursor-pointer px-3 py-2 hover:bg-gray-100 ${
              activeTab === "myInfo" ? "font-bold bg-gray-100 rounded-md" : ""
            }`}
            onClick={() => router.push("/mypage")}
          >
            내 정보
          </Button>
        </div>

        {/* 가운데 로고 */}
        <div className="text-center">
          <Image
            src="/logo.png"
            alt="페이득 로고"
            width={100}
            height={32}
            className="cursor-pointer inline-block"
            onClick={() => router.push("/dashboard")}
            priority
          />
        </div>

        {/* 오른쪽 영역 */}
        <div className="absolute right-0 flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            className="cursor-pointer relative hover:bg-gray-100"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          </Button>
          <Button
            variant="ghost"
            className="cursor-pointer hover:bg-gray-100"
            onClick={() => router.push("/")}
          >
            로그아웃
          </Button>
        </div>
      </div>
    </header>
  );
}
