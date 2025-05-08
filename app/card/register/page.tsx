"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MonthSelectBox, YearSelectBox } from "@/components/ui/selectbox";
import { VirtualKeypad } from "@/components/virtual-keypad";

export default function CardRegisterPage() {
  const router = useRouter();

  const [cardParts, setCardParts] = useState({
    part1: "",
    part2: "",
    part3: "",
    part4: "",
  });

  const [formData, setFormData] = useState({
    expiryMonth: "",
    expiryYear: "",
    cvc: "",
    password: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showKeypad, setShowKeypad] = useState(false);
  const keypadRef = useRef<HTMLDivElement>(null);

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const handleCardPartChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const { name, value } = e.target;
    if (!/^\d*$/.test(value)) return;
    if (errors.cardNumber) setErrors({ ...errors, cardNumber: "" });

    const next = value.slice(0, 4);
    setCardParts((prev) => ({ ...prev, [name]: next }));

    // 앞칸에서 4자리 입력되면 다음칸 포커스
    if (next.length === 4 && index < 1) {
      inputRefs[index + 1].current?.focus();
    }

    if (name === "part2" && next.length === 4) {
      setShowKeypad(true);
      inputRefs[2].current?.focus(); // 가상 키패드 입력 필드로 포커스 이동
    }

    if ((name === "part1" || name === "part2") && next.length < 4) {
      setShowKeypad(false);
    }
  };

  const handleKeypadPress = (key: string) => {
    const raw = cardParts.part3 + cardParts.part4;

    if (key === "backspace") {
      const updated = raw.slice(0, -1);
      setCardParts({
        ...cardParts,
        part3: updated.slice(0, 4),
        part4: updated.slice(4, 8),
      });
    } else {
      if (raw.length < 8) {
        const updated = raw + key;
        setCardParts({
          ...cardParts,
          part3: updated.slice(0, 4),
          part4: updated.slice(4, 8),
        });
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (keypadRef.current && !keypadRef.current.contains(e.target as Node)) {
        setShowKeypad(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const total =
      cardParts.part1 + cardParts.part2 + cardParts.part3 + cardParts.part4;
    if (total.length === 16) {
      setShowKeypad(false);
    }
  }, [cardParts]);

  const handleOtherInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (errors[name]) setErrors({ ...errors, [name]: "" });

    const cleaned = value.replace(/\D/g, "");
    const limited =
      name === "expiryMonth"
        ? cleaned.slice(0, 2)
        : name === "expiryYear"
          ? cleaned.slice(0, 2)
          : name === "cvc"
            ? cleaned.slice(0, 3)
            : name === "password"
              ? cleaned.slice(0, 2)
              : value;

    setFormData((prev) => ({
      ...prev,
      [name]: limited,
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const total =
      cardParts.part1 + cardParts.part2 + cardParts.part3 + cardParts.part4;

    if (!/^\d{16}$/.test(total)) {
      newErrors.cardNumber = "카드 번호를 모두 입력해주세요.";
    }
    if (
      !formData.expiryMonth ||
      +formData.expiryMonth < 1 ||
      +formData.expiryMonth > 12
    ) {
      newErrors.expiryMonth = "유효한 월을 입력해주세요.";
    }
    const currentYear = new Date().getFullYear() % 100;
    if (!formData.expiryYear || +formData.expiryYear < currentYear) {
      newErrors.expiryYear = "유효한 년도를 입력해주세요.";
    }
    if (!/^\d{3,4}$/.test(formData.cvc)) {
      newErrors.cvc = "유효한 CVC를 입력해주세요.";
    }
    if (!/^\d{2}$/.test(formData.password)) {
      newErrors.password = "비밀번호 앞 2자리를 입력해주세요.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const fullCardNumber = `${cardParts.part1}${cardParts.part2}${cardParts.part3}${cardParts.part4}`;
      console.log("Submitted:", { cardNumber: fullCardNumber, ...formData });
      router.push("/card/set-pay-pincode");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4">
        <div className="text-left">
          <h1 className="text-2xl font-bold mb-1">카드 등록</h1>
          <p className="text-sm text-gray-500">카드 정보를 입력해주세요.</p>
        </div>
        <Card className="shadow-sm border-gray-100">
          <CardContent className="py-4">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label>
                  카드 번호 <span className="text-red-500">*</span>
                </Label>
                <div className="grid grid-cols-4 gap-2">
                  {["part1", "part2"].map((name, idx) => (
                    <Input
                      key={name}
                      name={name}
                      placeholder={idx === 0 ? "1234" : "5678"}
                      value={cardParts[name as "part1" | "part2"]}
                      onChange={(e) => handleCardPartChange(e, idx)}
                      maxLength={4}
                      ref={inputRefs[idx]}
                    />
                  ))}
                  {["part3", "part4"].map((name, idx) => (
                    <Input
                      key={name}
                      name={name}
                      placeholder="••••"
                      value={"•".repeat(
                        cardParts[name as "part3" | "part4"].length,
                      )}
                      readOnly
                      onFocus={() => setShowKeypad(true)}
                      ref={inputRefs[idx + 2]}
                    />
                  ))}
                </div>
                {errors.cardNumber && (
                  <p className="text-xs text-red-500 pl-1">
                    {errors.cardNumber}
                  </p>
                )}
                {showKeypad && (
                  <div
                    ref={keypadRef}
                    className="mt-2 relative z-50"
                    style={{
                      position: "absolute",
                      left: "50%",
                      transform: "translateX(-50%)",
                    }}
                  >
                    <VirtualKeypad
                      onKeyPress={handleKeypadPress}
                      onClose={() => setShowKeypad(false)}
                      shuffle
                    />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>
                    만료 월 <span className="text-red-500">*</span>
                  </Label>
                  <MonthSelectBox
                    value={formData.expiryMonth}
                    onChange={(val) => {
                      setFormData((prev) => ({ ...prev, expiryMonth: val }));
                      setErrors((prev) => ({ ...prev, expiryMonth: "" }));
                      setShowKeypad(false);
                    }}
                  />
                  {errors.expiryMonth && (
                    <p className="text-xs text-red-500 pl-1">
                      {errors.expiryMonth}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>
                    만료 년 <span className="text-red-500">*</span>
                  </Label>
                  <YearSelectBox
                    value={formData.expiryYear}
                    onChange={(val) => {
                      setFormData((prev) => ({ ...prev, expiryYear: val }));
                      setErrors((prev) => ({ ...prev, expiryYear: "" }));
                    }}
                  />
                  {errors.expiryYear && (
                    <p className="text-xs text-red-500 pl-1">
                      {errors.expiryYear}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>
                    CVC <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    name="cvc"
                    placeholder="000"
                    value={formData.cvc}
                    onChange={handleOtherInput}
                  />
                  {errors.cvc && (
                    <p className="text-xs text-red-500 pl-1">{errors.cvc}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label>
                  카드 비밀번호 앞 2자리 <span className="text-red-500">*</span>
                </Label>
                <Input
                  name="password"
                  type="password"
                  placeholder="**"
                  value={formData.password}
                  onChange={handleOtherInput}
                />
                {errors.password && (
                  <p className="text-xs text-red-500 pl-1">{errors.password}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-black hover:bg-gray-800 text-white mt-6"
              >
                다음
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
