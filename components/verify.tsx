import { Check, ChevronRight, ShieldCheck } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Script from "next/script";

const API_BASE_URL = "http://localhost:8080";

interface IamportResponse {
  success: boolean;
  imp_uid: string;
  merchant_uid: string;
  error_msg?: string;
}

interface VerificationResponse {
  success: boolean;
  message: string;
  data?: {
    certified: boolean;
    birthday: string;
    name: string;
    phone: string;
    unique_key: string;
  };
}

declare global {
  interface Window {
    IMP: {
      init: (impKey: string) => void;
      certification: (
        params: {
          pg: string;
          merchant_uid: string;
          name: string;
          phone: string;
          min_age: number;
        },
        callback: (response: IamportResponse) => void,
      ) => void;
    };
  }
}

export default function VerifyIdentityPage({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const [verificationStarted, setVerificationStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isIamportReady, setIsIamportReady] = useState(false);

  useEffect(() => {
    if (window.IMP) {
      const impKey = process.env.NEXT_PUBLIC_IAMPORT_IMP_KEY || "";
      window.IMP.init(impKey);
      setIsIamportReady(true);
    }
  }, []);

  const requestCertification = () => {
    if (!isIamportReady || !window.IMP) {
      alert("본인인증 모듈을 불러오는 중입니다. 잠시 후 다시 시도해주세요.");
      return;
    }

    setIsLoading(true);
    window.IMP.certification(
      {
        pg: "inicis_unified",
        merchant_uid: "ORD_" + new Date().getTime(),
        name: "본인인증",
        phone: "",
        min_age: 19,
      },
      async (rsp: IamportResponse) => {
        if (rsp.success) {
          try {
            const response = await fetch(
              `${API_BASE_URL}/api/auth/verification?imp_uid=${rsp.imp_uid}`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              },
            );

            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = (await response.json()) as VerificationResponse;

            if (result.success) {
              setVerificationStarted(true);
            } else {
              alert(result.message || "본인인증에 실패했습니다.");
            }
          } catch (error) {
            console.error("인증 결과 조회 중 에러 발생:", error);
            alert(
              "본인인증 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
            );
          }
        } else {
          alert("본인인증에 실패했습니다.");
        }
        setIsLoading(false);
      },
    );
  };

  const handleNext = () => {
    onSuccess();
  };

  return (
    <>
      <Script
        src="https://cdn.iamport.kr/js/iamport.payment-1.2.0.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (window.IMP) {
            window.IMP.init(process.env.NEXT_PUBLIC_IAMPORT_IMP_KEY || "");
            setIsIamportReady(true);
          }
        }}
      />
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <div className="w-full max-w-md space-y-4">
          <div className="text-left">
            <h1 className="text-2xl font-bold mb-1">본인인증</h1>
            <p className="text-sm text-gray-500">
              안전한 서비스 이용을 위해 본인인증을 진행해주세요.
            </p>
          </div>
          <Card className="border-gray-100 shadow-sm">
            <CardContent className="py-4 space-y-4">
              {/* Info Box */}
              <div
                className={`border-2 rounded-md p-6 text-center ${
                  verificationStarted
                    ? "border-green-500 bg-green-50"
                    : "border-red-500"
                }`}
              >
                <div className="flex justify-center mb-4">
                  <ShieldCheck
                    className={`h-12 w-12 ${verificationStarted ? "text-green-500" : "text-red-500"}`}
                  />
                </div>
                <p className="text-gray-800 font-medium">
                  안전한 금융 서비스 제공을 위해
                  <br />
                  본인인증이 필요합니다.
                </p>
              </div>

              {/* Verification Button */}
              <button
                className={`w-full border rounded-md p-4 flex justify-between items-center hover:bg-gray-50 transition-colors ${
                  verificationStarted ? "bg-gray-50" : ""
                }`}
                onClick={requestCertification}
                disabled={verificationStarted || isLoading || !isIamportReady}
              >
                <div className="flex items-center">
                  <span className="font-medium">간편 본인인증</span>
                </div>
                <div className="flex items-center">
                  {verificationStarted ? (
                    <span className="text-green-600 flex items-center">
                      <Check className="mr-1 h-4 w-4" />
                      완료
                    </span>
                  ) : (
                    <span className="text-red-500 flex items-center">
                      필요
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </span>
                  )}
                </div>
              </button>

              {/* Next Button */}
              <Button
                className={`w-full mt-6 ${
                  verificationStarted
                    ? "bg-black text-white"
                    : "bg-gray-400 text-gray-200"
                }`}
                disabled={!verificationStarted}
                onClick={handleNext}
              >
                다음
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
