"use client";

import { useRouter } from "next/navigation";
import { CreditCard, Home, Settings, Store, Users } from "lucide-react";

// 사이드바 메뉴 아이템 타입 정의
export interface SidebarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
}

interface SidebarProps {
  activeTab: string;
  onTabChange?: (tabId: string) => void;
}

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const router = useRouter();

  // 사이드바 메뉴 아이템
  const sidebarItems: SidebarItem[] = [
    {
      id: "dashboard",
      label: "대시보드",
      icon: <Home className="h-5 w-5" />,
      path: "/admin",
    },
    {
      id: "merchants",
      label: "가맹점 관리",
      icon: <Store className="h-5 w-5" />,
      path: "/admin/merchants",
    },
    {
      id: "transactions",
      label: "거래 내역",
      icon: <CreditCard className="h-5 w-5" />,
      path: "/admin/transactions",
    },
    {
      id: "users",
      label: "사용자 관리",
      icon: <Users className="h-5 w-5" />,
      path: "/admin/users",
    },
    {
      id: "settings",
      label: "설정",
      icon: <Settings className="h-5 w-5" />,
      path: "/admin/settings",
    },
  ];

  // 사이드바 메뉴 클릭 핸들러
  const handleSidebarItemClick = (item: SidebarItem) => {
    if (onTabChange) {
      onTabChange(item.id);
    }
    router.push(item.path);
  };

  return (
    <div className="w-64 bg-white border-r flex flex-col">
      <div className="p-4 border-b">
        <h1 className="text-xl font-bold">페이득 관리자</h1>
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1">
          {sidebarItems.map((item) => (
            <li key={item.id}>
              <button
                className={`w-full flex items-center px-4 py-3 text-left ${
                  activeTab === item.id
                    ? "bg-gray-100 text-black font-medium"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
                onClick={() => handleSidebarItemClick(item)}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
