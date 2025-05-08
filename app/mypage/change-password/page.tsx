"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ChangePasswordPage() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4">
        <div className="text-left">
          <h1 className="text-2xl font-bold mb-1">새 비밀번호 설정</h1>
          <p className="text-sm text-gray-500">
            보안을 위해 새 비밀번호를 설정해주세요.
            <br />
            이전 비밀번호는 더 이상 사용되지 않습니다.
          </p>
        </div>

        <Card>
          <CardContent className="py-6 space-y-10">
            <div className="space-y-2">
              <Label>새로운 비밀번호</Label>
              <div className="relative">
                <Input
                  type={showNew ? "text" : "password"}
                  placeholder="새로운 비밀번호를 입력해주세요"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-3 top-2.5 text-gray-400"
                  onClick={() => setShowNew(!showNew)}
                >
                  {showNew ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>새로운 비밀번호 확인</Label>
              <div className="relative">
                <Input
                  type={showConfirm ? "text" : "password"}
                  placeholder="새로운 비밀번호를 다시 입력해주세요"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-3 top-2.5 text-gray-400"
                  onClick={() => setShowConfirm(!showConfirm)}
                >
                  {showConfirm ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
            </div>

            <Button
              className="w-full bg-black text-white text-sm py-3 mt-10"
              onClick={() => router.push("/mypage")}
            >
              비밀번호 변경
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
