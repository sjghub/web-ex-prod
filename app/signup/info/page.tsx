"use client";

import type React from "react";

import { useState } from "react";
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

  // 인증된 사용자 정보 (예시용)
  const verifiedUser = {
    name: "홍길동",
    birthdate: "1999.01.01",
    phone: "010-1234-5678",
  };

  const [formData, setFormData] = useState({
    name: verifiedUser.name,
    birthdate: verifiedUser.birthdate,
    phone: verifiedUser.phone,
    userId: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showDialog, setShowDialog] = useState(false);

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

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.userId.trim()) {
      newErrors.userId = "아이디를 입력해주세요.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "이메일을 입력해주세요.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "올바른 이메일 형식이 아닙니다.";
    }

    if (!formData.password) {
      newErrors.password = "비밀번호를 입력해주세요.";
    } else if (formData.password.length < 8) {
      newErrors.password = "비밀번호는 8자 이상이어야 합니다.";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "비밀번호 확인을 입력해주세요.";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Form submitted:", formData);
      setShowDialog(true);
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-4">
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
                  placeholder="홍길동"
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
                  placeholder="1999.01.01"
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
                  placeholder="010-1234-5678"
                  value={formData.phone}
                  readOnly
                  className="bg-gray-50 text-gray-400 cursor-not-allowed !ring-0"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="userId">
                  아이디 <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="userId"
                  name="userId"
                  placeholder="아이디를 입력하세요"
                  value={formData.userId}
                  onChange={handleChange}
                />
                {errors.userId && (
                  <p className="text-sm text-red-500">{errors.userId}</p>
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
                    placeholder="비밀번호를 입력하세요"
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
            <DialogFooter></DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
