"use client";

import { useState } from "react";
import { MoreHorizontal, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// 사용자 타입 정의
interface User {
  id: string;
  name: string;
  email: string;
  status: "활성" | "비활성" | "임시";
  registrationDate: string;
}

export default function AdminUsersPage() {
  const [selectedFilter, setSelectedFilter] = useState("전체");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("기본 정렬");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showUserDetailDialog, setShowUserDetailDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // 사용자 데이터 (예시)
  const [users, setUsers] = useState<User[]>([
    {
      id: "USER1000",
      name: "홍길동",
      email: "gildong@naver.com",
      status: "활성",
      registrationDate: "2024.12.30",
    },
    {
      id: "USER1001",
      name: "김성준",
      email: "sungjun@naver.com",
      status: "활성",
      registrationDate: "2024.12.30",
    },
    {
      id: "USER1002",
      name: "임지섭",
      email: "jiseob@naver.com",
      status: "활성",
      registrationDate: "2024.12.30",
    },
    {
      id: "USER1003",
      name: "차승훈",
      email: "seunghoon@naver.com",
      status: "활성",
      registrationDate: "2024.12.30",
    },
    {
      id: "USER1004",
      name: "이원빈",
      email: "wonbin@naver.com",
      status: "비활성",
      registrationDate: "2024.12.30",
    },
    {
      id: "USER1005",
      name: "황혜영",
      email: "hyeyoung@naver.com",
      status: "활성",
      registrationDate: "2024.12.30",
    },
    {
      id: "USER1006",
      name: "박민지",
      email: "minji@naver.com",
      status: "활성",
      registrationDate: "2024.12.29",
    },
    {
      id: "USER1007",
      name: "정다운",
      email: "dawoon@naver.com",
      status: "비활성",
      registrationDate: "2024.12.29",
    },
    {
      id: "USER1008",
      name: "송태호",
      email: "taeho@naver.com",
      status: "활성",
      registrationDate: "2024.12.29",
    },
    {
      id: "USER1009",
      name: "유재석",
      email: "jaeseok@naver.com",
      status: "활성",
      registrationDate: "2024.12.28",
    },
    {
      id: "USER1010",
      name: "강호동",
      email: "hodong@naver.com",
      status: "비활성",
      registrationDate: "2024.12.28",
    },
    {
      id: "USER1011",
      name: "이수근",
      email: "sugeun@naver.com",
      status: "활성",
      registrationDate: "2024.12.28",
    },
  ]);

  // 필터링된 사용자 목록
  const filteredUsers = users.filter((user) => {
    if (selectedFilter === "활성" && user.status !== "활성") return false;
    if (selectedFilter === "비활성" && user.status !== "비활성") return false;
    if (selectedFilter === "임시" && user.status !== "임시") return false;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.id.toLowerCase().includes(query)
      );
    }

    return true;
  });

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    switch (sortOrder) {
      case "이름순":
        return a.name.localeCompare(b.name);
      case "가입일순":
        return b.registrationDate.localeCompare(a.registrationDate); // 최신순
      case "상태순":
        return a.status.localeCompare(b.status);
      default:
        return 0;
    }
  });

  // 사용자 상태별 카운트
  const totalUsers = users.length;
  const activeUsers = users.filter((user) => user.status === "활성").length;
  const inactiveUsers = users.filter((user) => user.status === "비활성").length;
  const tempUsers = users.filter((user) => user.status === "임시").length;

  // 사용자 상세 정보 보기
  const handleViewUserDetail = (user: User) => {
    setSelectedUser(user);
    setShowUserDetailDialog(true);
  };

  // 상태 변경 핸들러
  const handleToggleUserStatus = (user: User) => {
    const statusCycle: User["status"][] = ["활성", "비활성", "임시"];
    const currentIndex = statusCycle.indexOf(user.status);
    const nextStatus = statusCycle[(currentIndex + 1) % statusCycle.length];

    setUsers((prev) =>
      prev.map((u) => (u.id === user.id ? { ...u, status: nextStatus } : u)),
    );
  };

  // 사용자 삭제 확인
  const handleDeleteUser = (user: User) => {
    setSelectedUser(user);
    setShowDeleteDialog(true);
  };

  const usersPerPage = 10;
  const totalPages = Math.ceil(sortedUsers.length / usersPerPage);
  const paginatedUsers = sortedUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage,
  );

  return (
    <>
      {/* 메인 콘텐츠 */}
      <>
        {/* 사용자 관리 콘텐츠 */}
        <main>
          <h1 className="text-3xl font-bold mb-4">사용자 관리</h1>
          <h2 className="text-gray-600 mb-4">페이득 사용자를 관리합니다.</h2>
          <div className="mb-6">
            {/* 통계 카드 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="bg-white">
                <CardContent className="px-6">
                  <div className="flex flex-col">
                    <span className="text-base text-gray-500 mb-2">
                      총 사용자
                    </span>
                    <span className="text-3xl font-bold">
                      {totalUsers.toLocaleString()}명
                    </span>
                    <span className="text-sm text-gray-500 mt-2">
                      전월 대비 +9%
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardContent className="px-6">
                  <div className="flex flex-col">
                    <span className="text-base text-gray-500 mb-2">
                      활성 사용자
                    </span>
                    <span className="text-3xl font-bold">
                      {activeUsers.toLocaleString()}명
                    </span>
                    <span className="text-sm text-gray-500 mt-2">
                      전체의 81%
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardContent className="px-6">
                  <div className="flex flex-col">
                    <span className="text-base text-gray-500 mb-2">
                      비활성 사용자
                    </span>
                    <span className="text-3xl font-bold">
                      {inactiveUsers.toLocaleString()}명
                    </span>
                    <span className="text-sm text-gray-500 mt-2">
                      전체의 19%
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 필터 탭 */}
            <div className="mb-6">
              <Tabs
                defaultValue="전체"
                onValueChange={setSelectedFilter}
                className="w-full"
              >
                <TabsList className="grid grid-cols-4 max-w-md gap-x-2">
                  <TabsTrigger
                    value="전체"
                    className="relative text-black bg-white border border-gray-300 py-2 px-8 data-[state=active]:bg-black data-[state=active]:text-white cursor-pointer"
                  >
                    전체
                    <span className="ml-2 px-3 py-1 text-xs rounded-full bg-gray-700 text-white">
                      {totalUsers.toLocaleString()}
                    </span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="활성"
                    className="relative text-black bg-white border border-gray-300 data-[state=active]:bg-black data-[state=active]:text-white cursor-pointer"
                  >
                    활성
                    <span className="ml-1 px-2 py-0.5 text-xs rounded-full bg-green-500 text-white">
                      {activeUsers.toLocaleString()}
                    </span>
                  </TabsTrigger>

                  <TabsTrigger
                    value="비활성"
                    className="relative text-black bg-white border border-gray-300 data-[state=active]:bg-black data-[state=active]:text-white cursor-pointer"
                  >
                    비활성
                    <span className="ml-1 px-2 py-0.5 text-xs rounded-full bg-red-500 text-white">
                      {inactiveUsers.toLocaleString()}
                    </span>
                  </TabsTrigger>

                  <TabsTrigger
                    value="임시"
                    className="relative text-black bg-white border border-gray-300 data-[state=active]:bg-black data-[state=active]:text-white cursor-pointer"
                  >
                    임시
                    <span className="ml-1 px-2 py-0.5 text-xs rounded-full bg-amber-500 text-white">
                      {tempUsers.toLocaleString()}
                    </span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* 사용자 목록 */}
            <div className="bg-white rounded-md border shadow-sm">
              <div className="p-4 border-b flex justify-between items-center">
                <h3 className="text-lg font-medium">사용자 목록</h3>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="사용자 검색..."
                      className="pl-10 w-64"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select value={sortOrder} onValueChange={setSortOrder}>
                    <SelectTrigger className="w-[180px] cursor-pointer hover:bg-gray-100">
                      <SelectValue placeholder="정렬 방식" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem
                        value="기본 정렬"
                        className="hover:bg-gray-100 cursor-pointer"
                      >
                        기본 정렬
                      </SelectItem>
                      <SelectItem
                        value="이름순"
                        className="hover:bg-gray-100 cursor-pointer"
                      >
                        이름순
                      </SelectItem>
                      <SelectItem
                        value="가입일순"
                        className="hover:bg-gray-100 cursor-pointer"
                      >
                        가입일순
                      </SelectItem>
                      <SelectItem
                        value="상태순"
                        className="hover:bg-gray-100 cursor-pointer"
                      >
                        상태순
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-gray-500 border-b">
                      <th className="px-6 py-3 font-medium">ID</th>
                      <th className="px-6 py-3 font-medium">이름</th>
                      <th className="px-6 py-3 font-medium">이메일</th>
                      <th className="px-6 py-3 font-medium">상태</th>
                      <th className="px-6 py-3 font-medium">가입일</th>
                      <th className="px-6 py-3 font-medium text-center">
                        작업
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedUsers.map((user) => (
                      <tr
                        key={user.id}
                        className="border-b last:border-0 hover:bg-gray-50"
                      >
                        <td className="px-6 py-4">{user.id}</td>
                        <td className="px-6 py-4">{user.name}</td>
                        <td className="px-6 py-4">{user.email}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                              user.status === "활성"
                                ? "bg-green-100 text-green-800"
                                : user.status === "비활성"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-amber-100 text-amber-800"
                            }`}
                          >
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">{user.registrationDate}</td>
                        <td className="px-6 py-4 text-center">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 hover:bg-gray-100 cursor-pointer"
                              >
                                <span className="sr-only">메뉴 열기</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              align="end"
                              className="bg-white"
                            >
                              <DropdownMenuItem
                                onClick={() => handleViewUserDetail(user)}
                                className="hover:bg-gray-100 cursor-pointer"
                              >
                                상세 정보
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="hover:bg-gray-100 cursor-pointer"
                                onClick={() => handleToggleUserStatus(user)}
                              >
                                상태 변경
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-red-500 hover:bg-red-50 cursor-pointer"
                                onClick={() => handleDeleteUser(user)}
                              >
                                사용자 삭제
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* 페이지네이션 */}
              <div className="p-4 flex items-center justify-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                >
                  이전
                </Button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <Button
                    key={i + 1}
                    variant="ghost"
                    size="sm"
                    className={
                      currentPage === i + 1 ? "bg-black text-white" : ""
                    }
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </Button>
                ))}
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                >
                  다음
                </Button>
              </div>
            </div>
          </div>
        </main>
      </>

      {/* 사용자 상세 정보 다이얼로그 */}
      <Dialog
        open={showUserDetailDialog}
        onOpenChange={setShowUserDetailDialog}
      >
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle>사용자 상세 정보</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">ID</p>
                  <p className="font-medium">{selectedUser.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">이름</p>
                  <p className="font-medium">{selectedUser.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">이메일</p>
                  <p className="font-medium">{selectedUser.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">상태</p>
                  <p className="font-medium">
                    <span
                      className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                        selectedUser.status === "활성"
                          ? "bg-green-100 text-green-800"
                          : selectedUser.status === "비활성"
                            ? "bg-red-100 text-red-800"
                            : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {selectedUser.status}
                    </span>
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">가입일</p>
                  <p className="font-medium">{selectedUser.registrationDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">최근 로그인</p>
                  <p className="font-medium">2024.05.03 14:23</p>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-2">
                <Button
                  variant="ghost"
                  onClick={() => setShowUserDetailDialog(false)}
                  className="text-red-500"
                >
                  닫기
                </Button>
                <Button variant="ghost">사용자 수정</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* 사용자 삭제 확인 다이얼로그 */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>사용자 삭제</DialogTitle>
            <DialogDescription>
              정말로 {selectedUser?.name} 사용자를 삭제하시겠습니까? 이 작업은
              되돌릴 수 없습니다.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowDeleteDialog(false)}>
              취소
            </Button>
            <Button
              variant="ghost"
              onClick={() => setShowDeleteDialog(false)}
              className="text-red-500"
            >
              삭제
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
