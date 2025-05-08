"use client";

import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function IdLookupResultPage() {
  const router = useRouter();
  const foundId = "CHACHA";

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4">
        <div className="text-left">
          <h1 className="text-2xl font-bold mb-1">아이디 조회 결과</h1>
          <p className="text-sm text-gray-500">
            입증 정보와 일치하는 아이디예요.
          </p>
        </div>
        <Card className="border-gray-100 shadow-sm">
          <CardContent className="space-y-6">
            <div className="bg-gray-100 p-4 rounded-md flex items-center justify-between mb-10">
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
                className="w-full bg-black hover:bg-gray-800 text-white py-2 rounded mt-5"
                onClick={() => router.push("/login")}
              >
                로그인하기
              </Button>
              <Button
                variant="outline"
                className="w-full border-gray-300 hover:bg-gray-100 text-black py-2 rounded"
                onClick={() => router.push("login/find-password")}
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
