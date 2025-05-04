"use client";

import { ArrowLeft, Check } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function IdLookupResultPage() {
  const router = useRouter();
  const foundId = "CHACHA";

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50">
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
          <CardHeader className="space-y-1">
            <CardTitle
              className="text-2xl font-bold"
              style={{ fontFamily: "SBAggroB" }}
            >
              아이디 조회 결과
            </CardTitle>
            <CardDescription className="text-gray-600">
              입증 정보와 일치하는 아이디예요
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-gray-100 p-4 rounded-md flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">아이디</p>
                <p className="text-lg font-medium">{foundId}</p>
              </div>
              <div className="bg-green-500 rounded-full p-1">
                <Check className="h-5 w-5 text-white" />
              </div>
            </div>

            <div className="space-y-3">
              <Button
                className="w-full bg-black hover:bg-gray-800 text-white py-6"
                onClick={() => router.push("/login")}
              >
                로그인하기
              </Button>
              <Button
                variant="outline"
                className="w-full border-gray-300 hover:bg-gray-100 text-black py-6"
                onClick={() => router.push("/reset-password")}
              >
                비밀번호 재설정
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
