"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { fetchWithoutAuth } from "@/lib/api-fetch";

const REDIRECT_AFTER_FAIL = "/pwInquiry";
const DEFAULT_ERROR_MESSAGE = "비밀번호 변경에 실패했습니다.";

interface ErrorResponse {
  message?: string;
  response?: {
    errorCode?: string;
    errors?: { field: string; message: string }[];
  };
  success?: boolean;
}

export default function ChangePasswordPage() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const handleErrorResponse = (response: Response, data: ErrorResponse) => {
    if (response.status === 422 && data.response?.errors) {
      const fieldErrors: Record<string, string> = {};
      data.response.errors.forEach((err) => {
        fieldErrors.password = fieldErrors.password
          ? `${fieldErrors.password}\n${err.message}`
          : err.message;
      });
      setErrors(fieldErrors);
    } else {
      setMessage(data.message || DEFAULT_ERROR_MESSAGE);
      const code = data.response?.errorCode;
      const NON_REDIRECT_CODES = ["USR_02"]; // 필요 시 추가
      setShouldRedirect(!NON_REDIRECT_CODES.includes(code ?? ""));
      setShowDialog(true);
    }
  };

  const handleChangePassword = async () => {
    setErrors({});
    setMessage("");
    setShouldRedirect(false);

    const username = sessionStorage.getItem("findPasswordUsername");

    if (!username) {
      setMessage("사용자 정보가 유실되었습니다. 다시 시도해주세요.");
      setShouldRedirect(true);
      setShowDialog(true);
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrors({ password: "비밀번호가 일치하지 않습니다." });
      return;
    }

    try {
      const response = await fetchWithoutAuth(
        `/reset-password?username=${encodeURIComponent(username)}`,
        {
          method: "POST",
          body: JSON.stringify({ password: newPassword }),
        },
      );

      const data: ErrorResponse = await response.json();

      if (!response.ok || data.success === false) {
        handleErrorResponse(response, data);
        return;
      }

      setMessage("비밀번호가 성공적으로 변경되었습니다.");
      sessionStorage.clear();
      setShowDialog(true);
    } catch (err) {
      console.error(err);
      setMessage("비밀번호 변경 요청 중 오류가 발생했습니다.");
      setShouldRedirect(true);
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

        <Card className="shadow-sm border-gray-100">
          <CardContent className="py-6 space-y-8">
            <div className="space-y-2">
              <Label>
                새로운 비밀번호
                <span className="text-red-500 ml-1">*</span>
              </Label>
              <div className="relative">
                <Input
                  type={showNew ? "text" : "password"}
                  placeholder="영문 대소문자, 숫자, 특수문자를 포함한 8자 이상"
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

            {errors.password && (
              <p className="text-sm text-red-500 whitespace-pre-line">
                {errors.password}
              </p>
            )}

            <Button
              className="w-full bg-black text-white text-sm py-3 mt-6 disabled:bg-gray-300 disabled:cursor-not-allowed"
              onClick={handleChangePassword}
              disabled={!newPassword || !confirmPassword}
            >
              비밀번호 변경
            </Button>
          </CardContent>
        </Card>

        <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
          <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-gray-900">
                알림
              </AlertDialogTitle>
              <AlertDialogDescription className="text-gray-700">
                {message}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction
                onClick={() => {
                  setShowDialog(false);
                  if (message === "비밀번호가 성공적으로 변경되었습니다.") {
                    router.push("/login");
                  } else if (shouldRedirect) {
                    router.push(REDIRECT_AFTER_FAIL);
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
    </div>
  );
}
