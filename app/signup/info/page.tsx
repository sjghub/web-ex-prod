"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function UserInfoPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    birthdate: "",
    phone: "",
    personalAuthKey: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showDialog, setShowDialog] = useState(false);
  const [errorDialog, setErrorDialog] = useState({ show: false, message: "" });

  useEffect(() => {
    const stored = sessionStorage.getItem("verifiedUser");
    if (stored) {
      const formatBirthdate = (str: string) => str.replace(/-/g, ".");
      const formatPhone = (str: string) =>
        str.replace(/^(\d{3})(\d{3,4})(\d{4})$/, "$1-$2-$3");
      const verified = JSON.parse(stored);
      setFormData((prev) => ({
        ...prev,
        name: verified.name,
        birthdate: formatBirthdate(verified.birthdate),
        phone: formatPhone(verified.phone),
        personalAuthKey: verified.personalAuthKey,
      }));
    } else {
      setErrorDialog({
        show: true,
        message: "본인인증을 먼저 진행해주세요.",
      });
      router.replace("/verify");
    }
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({}); // 기존 에러 초기화

    if (formData.password !== formData.confirmPassword) {
      setErrors({
        confirmPassword: "비밀번호가 일치하지 않습니다.",
      });
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          name: formData.name,
          birthdate: formData.birthdate,
          phone: formData.phone,
          personalAuthKey: formData.personalAuthKey,
        }),
      });

      const resBody = await response.json();

      if (!response.ok) {
        if (response.status === 409) {
          setErrorDialog({
            show: true,
            message: resBody.message || "이미 사용 중인 아이디입니다.",
          });
        } else if (response.status === 422 && resBody?.response?.errors) {
          const fieldErrors: Record<string, string> = {};
          resBody.response.errors.forEach(
            (err: { field: string; message: string }) => {
              fieldErrors[err.field] = err.message;
            },
          );
          setErrors(fieldErrors);
        } else {
          throw new Error("회원가입 실패");
        }
        return;
      }

      setShowDialog(true);
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err) {
      console.error(err);
      setErrorDialog({
        show: true,
        message: "회원가입 중 오류가 발생했습니다.",
      });
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4">
        <div className="text-left">
          <h1 className="text-2xl font-bold mb-1">회원가입</h1>
          <p className="text-sm text-gray-500">
            페이득 서비스 이용을 위한 계정을 만들어보세요.
          </p>
        </div>

        <Card className="border-gray-100 shadow-sm">
          <CardContent className="py-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">이름</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  readOnly
                  className="bg-gray-50 text-gray-400 cursor-not-allowed !ring-0"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="birthdate">생년월일</Label>
                <Input
                  id="birthdate"
                  name="birthdate"
                  value={formData.birthdate}
                  readOnly
                  className="bg-gray-50 text-gray-400 cursor-not-allowed !ring-0"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">전화번호</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  readOnly
                  className="bg-gray-50 text-gray-400 cursor-not-allowed !ring-0"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">
                  아이디 <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="username"
                  name="username" // userId → username
                  placeholder="아이디를 입력하세요"
                  value={formData.username}
                  onChange={handleChange}
                />
                {errors.username && (
                  <p className="text-sm text-red-500">{errors.username}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">
                  이메일 <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="이메일을 입력하세요"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">
                  비밀번호 <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="영문 대소문자, 숫자, 특수문자를 포함한 8자 이상"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">
                  비밀번호 확인 <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="비밀번호를 다시 입력하세요"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <Button type="submit" className="w-full mt-6 bg-black text-white">
                회원가입
              </Button>
            </form>
          </CardContent>
        </Card>

        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent className="bg-white" showCloseButton={false}>
            <DialogHeader>
              <DialogTitle>회원가입 완료</DialogTitle>
              <DialogDescription>회원가입이 완료되었습니다.</DialogDescription>
            </DialogHeader>
            <DialogFooter />
          </DialogContent>
        </Dialog>

        <Dialog
          open={errorDialog.show}
          onOpenChange={(open) =>
            setErrorDialog({ ...errorDialog, show: open })
          }
        >
          <DialogContent className="bg-white">
            <DialogHeader>
              <DialogTitle>알림</DialogTitle>
              <DialogDescription>{errorDialog.message}</DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
