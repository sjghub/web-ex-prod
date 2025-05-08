"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function PasswordFindForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (name === "testname" && userId === "testuser") {
      router.push("/verify?type=find-password");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-white">
      <div className="w-full max-w-md space-y-4">
        <div className="text-left">
          <h1 className="text-2xl font-bold mb-1">비밀번호 찾기</h1>
          <p className="text-sm text-gray-500">이름과 아이디를 입력해주세요.</p>
        </div>
        <Card className="border border-gray-100 shadow-sm">
          <CardContent className="py-4">
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="space-y-2">
                <Label htmlFor="name" className="font-medium">
                  이름
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="이름을 입력하세요"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="userId" className="font-medium">
                  아이디
                </Label>
                <Input
                  id="userId"
                  type="text"
                  placeholder="아이디를 입력하세요"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-black text-white hover:bg-gray-800 mt-4"
              >
                비밀번호 찾기
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
