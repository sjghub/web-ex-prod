"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { fetchWithAuth } from "@/lib/api-fetch";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function ChangePasswordPage() {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [message, setMessage] = useState("");
  const [showDialog, setShowDialog] = useState(false);

  const isFormValid = currentPassword && newPassword && confirmPassword;

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setMessage("새 비밀번호가 일치하지 않습니다.");
      setShowDialog(true);
      return;
    }

    try {
      const response = await fetchWithAuth(
        "/change-password",
        {
          method: "POST",
          body: JSON.stringify({
            oldPassword: currentPassword,
            newPassword: newPassword,
          }),
        },
        "json",
        "http://localhost:8080/auth/api",
      );

      if (!response.ok) {
        const data = await response.json();
        setMessage(data.message || "비밀번호 변경에 실패했습니다.");
        setShowDialog(true);
        return;
      }

      setMessage("비밀번호가 성공적으로 변경되었습니다.");
      setShowDialog(true);
    } catch (error) {
      console.error("비밀번호 변경 실패:", error);
      setMessage(
        "서버와의 통신 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
      );
      setShowDialog(true);
    }
  };

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
              <Label>
                현재 비밀번호
                <span className="text-red-500 ml-1">*</span>
              </Label>
              <div className="relative">
                <Input
                  type={showCurrent ? "text" : "password"}
                  placeholder="현재 비밀번호를 입력해주세요"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-3 top-2.5 text-gray-400"
                  onClick={() => setShowCurrent(!showCurrent)}
                >
                  {showCurrent ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>
                새로운 비밀번호
                <span className="text-red-500 ml-1">*</span>
              </Label>
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
              <Label>
                새로운 비밀번호 확인
                <span className="text-red-500 ml-1">*</span>
              </Label>
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
              className="w-full bg-black text-white text-sm py-3 mt-10 disabled:bg-gray-300 disabled:cursor-not-allowed"
              onClick={handleChangePassword}
              disabled={!isFormValid}
            >
              비밀번호 변경
            </Button>
          </CardContent>
        </Card>
      </div>

      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-gray-900">알림</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-700">
              {message}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => {
                setShowDialog(false);
                if (message === "비밀번호가 성공적으로 변경되었습니다.") {
                  router.push("/mypage");
                }
              }}
              className="bg-black hover:bg-gray-700 text-white"
            >
              확인
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
