"use client";

import type React from "react";

import { ArrowLeft, KeyRound, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function LoginPage() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userId === "testuser" && password === "test1234") {
      console.log("Login success");
      router.push("/dashboard");
    } else {
      alert("아이디 또는 비밀번호가 올바르지 않습니다.");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Button
          variant="ghost"
          className="mb-4"
          onClick={() => router.push("/")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          홈으로 돌아가기
        </Button>

        <Card className="border-gray-100 shadow-sm">
          <CardHeader className="space-y-1 text-center">
            <CardTitle
              className="text-3xl font-bold"
              style={{ fontFamily: "SBAggroB" }}
            >
              로그인
            </CardTitle>
            <CardDescription className="text-gray-600">
              페이득 서비스 이용을 위해 로그인해주세요.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="userId" className="font-medium">
                  아이디
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 text-gray-400 -translate-y-1/2" />
                  <Input
                    id="userId"
                    type="text"
                    className="pl-10"
                    placeholder="아이디를 입력하세요"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2 pb-6">
                <Label htmlFor="password" className="font-medium">
                  비밀번호
                </Label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 h-4 w-4 text-gray-400 -translate-y-1/2" />
                  <Input
                    id="password"
                    type="password"
                    className="pl-10"
                    placeholder="비밀번호를 입력하세요"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <Button asChild>
                <button
                  type="submit"
                  className="w-full bg-black hover:bg-gray-800 text-white py-2 rounded"
                >
                  로그인
                </button>
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Separator />
            <div className="flex justify-center space-x-4 text-sm text-gray-500">
              <Link
                href="/find-id/verify"
                className="hover:text-black hover:underline flex items-center"
              >
                아이디 찾기
              </Link>
              <span>|</span>
              <Link
                href="/find-password"
                className="hover:text-black hover:underline flex items-center"
              >
                비밀번호 찾기
              </Link>
              <span>|</span>
              <Link
                href="/signup/terms"
                className="hover:text-black hover:underline flex items-center"
              >
                회원가입
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
