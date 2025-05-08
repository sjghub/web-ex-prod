import { Check, ChevronRight, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { KeyRound } from "lucide-react";

export default function VerifyIdentityPage({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const [verificationStarted, setVerificationStarted] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);

  const handleVerificationClick = () => {
    // Open the verification modal
    setShowVerificationModal(true);
  };

  const handleVerificationComplete = () => {
    // Close the modal and mark verification as complete
    setShowVerificationModal(false);
    setVerificationStarted(true);
  };

  const handleNext = () => {
    onSuccess();
  };

  return (
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
              onClick={handleVerificationClick}
              disabled={verificationStarted}
            >
              <span className="font-medium">간편 본인인증</span>
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

      {/* Verification Modal */}
      <Dialog
        open={showVerificationModal}
        onOpenChange={setShowVerificationModal}
      >
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle className="text-center mb-6">
              인증 방법 선택
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="flex flex-col">
              <button
                className="border rounded-md p-3 text-center hover:bg-gray-50 transition-colors"
                onClick={handleVerificationComplete}
              >
                <div className="flex justify-center mb-2">
                  <KeyRound className="text-blue-500 w-6 h-6" />
                </div>
                <span className="text-sm">간편 본인인증</span>
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
