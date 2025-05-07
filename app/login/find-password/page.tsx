"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
      <div className="w-full max-w-md">
        <Button variant="ghost" className="mb-4" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          돌아가기
        </Button>

        <Card className="border border-gray-100 shadow-sm">
          <CardHeader className="space-y-1 text-center">
            <CardTitle
              className="text-3xl font-bold"
              style={{ fontFamily: "SBAggroB" }}
            >
              비밀번호 찾기
            </CardTitle>
            <CardDescription className="text-gray-600">
              이름과 아이디를 입력해주세요.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
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
