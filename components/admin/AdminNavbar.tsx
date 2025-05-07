"use client";

import { useRouter } from "next/navigation";
import { Bell, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TopNavBarProps {
  onSearch?: (query: string) => void;
}

export default function TopNavBar({ onSearch }: TopNavBarProps) {
  const router = useRouter();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  return (
    <header className="bg-white border-b">
      <div className="flex items-center justify-end px-6 py-3">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="가맹점 검색..."
              className="pl-10 w-64"
              onChange={handleSearch}
            />
          </div>

          <Button variant="ghost" size="icon" className="relative">
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
