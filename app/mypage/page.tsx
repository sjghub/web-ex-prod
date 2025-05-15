"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronRight, Edit2, Pencil, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToggleSwitch } from "@/components/ui/toggle-switch";
import { Separator } from "@/components/ui/separator";
import { HeaderNavBar } from "@/components/header-nav-bar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function MyPage() {
  const router = useRouter();
  const emailInputRef = useRef<HTMLInputElement>(null);
  const addressInputRef = useRef<HTMLInputElement>(null);
  const [user, setUser] = useState({
    name: "",
    email: "",
    birthDate: "",
    phone: "",
    address: "",
    //TODO: 사용자 프로필을 받을지 안 받을지 미정, 우선 기본값으로 지정, DB자체에 저장을 안함함
    profileImage: "/profile-image.png",
  });

  const [emailEditable, setEmailEditable] = useState(false);
  const [addressEditable, setAddressEditable] = useState(false);
  const [formData, setFormData] = useState({
    email: user.email,
    address: user.address,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const [notifications, setNotifications] = useState({
    email: true,
    sms: true,
    marketing: false,
    security: true,
  });

  const [showDialog, setShowDialog] = useState(false);

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key],
    });
  };

  const getCookie = (name: string): string | null => {
    const matches = document.cookie.match(
      new RegExp("(^| )" + name + "=([^;]+)"),
    );
    return matches ? decodeURIComponent(matches[2]) : null;
  };

  useEffect(() => {
    const token = getCookie("accessToken");
    if (!token) return;

    fetch("http://localhost:8080/api/user/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const { name, email, birth, phoneNumber, address } = data.response;
        setUser({
          name,
          email,
          birthDate: birth,
          phone: phoneNumber,
          address,
          profileImage: "/profile-image.png",
        });
        setFormData((prev) => ({
          ...prev,
          email,
          address,
        }));
      })
      .catch((err) => {
        console.error("유저 정보 불러오기 실패:", err);
      });
  }, []);

  const handleSaveProfile = async (
    field: "email" | "address",
    value: string,
  ) => {
    const token = getCookie("accessToken");
    const fieldNameKor = field === "email" ? "이메일" : "주소";
    try {
      const response = await fetch(
        `http://localhost:8080/api/user/profile/${field}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ [field]: value }),
        },
      );

      if (!response.ok) {
        throw new Error(`${fieldNameKor} 저장 실패`);
      }

      if (field === "email") {
        setUser((prev) => ({ ...prev, email: value }));
        console.log(` ${fieldNameKor} 변경 성공`, formData.email);
      } else {
        console.log(` ${fieldNameKor} 변경 성공`, formData.address);
      }
    } catch (error) {
      console.error(` ${fieldNameKor} 저장 에러:`, error);
    }
  };

  return (
    <div className="min-h-screen">
      <HeaderNavBar />

      <main className="container mx-auto px-4 py-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold mb-2">내 정보</h1>
          <p className="text-gray-500 mb-6">
            개인 정보를 관리하고 설정을 변경할 수 있습니다.
          </p>

          <div className="flex flex-col md:flex-row gap-6">
            {/* 왼쪽: 개인정보 (2/5) */}
            <div className="w-full md:w-2/5">
              <Card>
                <CardContent className="px-6 py-4">
                  {/* 프로필 이미지 + 이름/이메일 */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
                        <Image
                          src={user.profileImage}
                          alt="프로필 이미지"
                          width={96}
                          height={96}
                          className="object-cover"
                        />
                      </div>
                      <button className="absolute bottom-0 right-0 bg-black text-white rounded-full p-1.5 shadow-md">
                        <Edit2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <div className="flex flex-col justify-center">
                      <p className="text-lg font-semibold">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>

                  {/* 기본 정보 입력 필드 */}
                  <div className="w-full space-y-4">
                    <div>
                      <Label htmlFor="name" className="mb-2">
                        이름
                      </Label>
                      <Input
                        id="name"
                        value={user.name}
                        readOnly
                        className="bg-gray-50"
                      />
                    </div>

                    <div>
                      <Label htmlFor="birthDate" className="mb-2">
                        생년월일
                      </Label>
                      <Input
                        id="birthDate"
                        value={user.birthDate}
                        readOnly
                        className="bg-gray-50"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone" className="mb-2">
                        전화번호
                      </Label>
                      <Input
                        id="phone"
                        value={user.phone}
                        readOnly
                        className="bg-gray-50"
                      />
                    </div>

                    <div>
                      <div className="flex items-center gap-1 mb-1">
                        <Label htmlFor="email">이메일 주소</Label>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-5 w-5"
                          onClick={() => {
                            if (emailEditable) {
                              handleSaveProfile("email", formData.email);
                              setShowDialog(true);
                              setTimeout(() => {
                                setShowDialog(false);
                              }, 1000);
                            } else {
                              setTimeout(
                                () => emailInputRef.current?.focus(),
                                0,
                              );
                            }
                            setEmailEditable(!emailEditable);
                          }}
                        >
                          {emailEditable ? (
                            <Save className="h-4 w-4" />
                          ) : (
                            <Pencil className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      <Input
                        id="email"
                        ref={emailInputRef}
                        value={formData.email}
                        readOnly={!emailEditable}
                        onChange={handleInputChange}
                        className={emailEditable ? "" : "bg-gray-50"}
                      />
                    </div>

                    <div>
                      <div className="flex items-center gap-1 mb-1">
                        <Label htmlFor="address">주소</Label>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-5 w-5"
                          onClick={() => {
                            if (addressEditable) {
                              handleSaveProfile("address", formData.address);
                              setShowDialog(true);
                              setTimeout(() => {
                                setShowDialog(false);
                              }, 1000);
                            } else {
                              setTimeout(
                                () => addressInputRef.current?.focus(),
                                0,
                              );
                            }
                            setAddressEditable(!addressEditable);
                          }}
                        >
                          {addressEditable ? (
                            <Save className="h-4 w-4" />
                          ) : (
                            <Pencil className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      <Input
                        id="address"
                        ref={addressInputRef}
                        value={formData.address}
                        readOnly={!addressEditable}
                        onChange={handleInputChange}
                        className={addressEditable ? "" : "bg-gray-50"}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 오른쪽: 설정 카드들 (3/5) */}
            <div className="w-full md:w-3/5 space-y-4">
              {/* 보안 설정 */}
              <div>
                <h2 className="text-2xl font-bold mb-4">보안 설정</h2>
                <Card className="mb-10">
                  <CardContent className="px-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between py-2">
                        <div>
                          <h3 className="font-medium">비밀번호 변경</h3>
                          <p className="text-sm text-gray-500">
                            계정 비밀번호를 변경합니다.
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => router.push("/mypage/change-password")}
                        >
                          변경하기
                        </Button>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between py-2">
                        <div>
                          <h3 className="font-medium">
                            간편 결제 비밀번호 변경
                          </h3>
                          <p className="text-sm text-gray-500">
                            결제 시 사용하는 6자리 비밀번호를 변경합니다.
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            router.push("/mypage/verify-pay-pincode")
                          }
                        >
                          변경하기
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* 알림 설정 */}
              <div>
                <h2 className="text-2xl font-bold mb-4">알림 설정</h2>
                <Card className="mb-10">
                  <CardContent className="px-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between py-2">
                        <div>
                          <h3 className="font-medium">이메일 알림</h3>
                          <p className="text-sm text-gray-500">
                            중요 알림을 이메일로 받습니다.
                          </p>
                        </div>
                        <ToggleSwitch
                          checked={notifications.email}
                          onCheckedChange={() =>
                            handleNotificationChange("email")
                          }
                        />
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between py-2">
                        <div>
                          <h3 className="font-medium">SMS 알림</h3>
                          <p className="text-sm text-gray-500">
                            중요 알림을 SMS로 받습니다.
                          </p>
                        </div>
                        <ToggleSwitch
                          checked={notifications.sms}
                          onCheckedChange={() =>
                            handleNotificationChange("sms")
                          }
                        />
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between py-2">
                        <div>
                          <h3 className="font-medium">마케팅 알림</h3>
                          <p className="text-sm text-gray-500">
                            프로모션 및 마케팅 정보를 받습니다.
                          </p>
                        </div>
                        <ToggleSwitch
                          checked={notifications.marketing}
                          onCheckedChange={() =>
                            handleNotificationChange("marketing")
                          }
                        />
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between py-2">
                        <div>
                          <h3 className="font-medium">보안 알림</h3>
                          <p className="text-sm text-gray-500">
                            계정 보안 관련 알림을 받습니다.
                          </p>
                        </div>
                        <ToggleSwitch
                          checked={notifications.security}
                          onCheckedChange={() =>
                            handleNotificationChange("security")
                          }
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* 고객 지원 */}
              <div>
                <h2 className="text-2xl font-bold mb-4">고객 지원</h2>
                <Card className="mb-10">
                  <CardContent className="px-6">
                    <div className="space-y-4">
                      {[
                        {
                          title: "공지사항",
                          desc: "서비스 업데이트 및 공지사항을 확인하세요.",
                        },
                        {
                          title: "1:1 문의",
                          desc: "궁금한 점이나 문제가 있으면 문의하세요.",
                        },
                        {
                          title: "서비스 이용약관",
                          desc: "서비스 이용약관을 확인하세요.",
                        },
                        {
                          title: "개인정보 처리방침",
                          desc: "개인정보 처리방침을 확인하세요.",
                        },
                      ].map(({ title, desc }, index, arr) => (
                        <div key={title}>
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-medium">{title}</h3>
                              <p className="text-sm text-gray-500">{desc}</p>
                            </div>
                            <Button variant="ghost" size="sm">
                              <ChevronRight className="h-5 w-5" />
                            </Button>
                          </div>
                          {index < arr.length - 1 && (
                            <Separator className="my-4" />
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              {/* 회원탈퇴 */}
              <div className="flex justify-end">
                <Button variant="ghost" className="text-sm px-0">
                  회원탈퇴 <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* 프로필 수정 확인 다이얼로그 */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="bg-white" showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>프로필 수정 완료</DialogTitle>
            <DialogDescription>프로필 수정이 완료되었습니다.</DialogDescription>
          </DialogHeader>
          <DialogFooter></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
