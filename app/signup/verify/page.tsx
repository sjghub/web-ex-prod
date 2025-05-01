'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Shield, Check, ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export default function VerifyIdentityPage() {
  const router = useRouter();
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

  const handleVerificationCancel = () => {
    // Just close the modal without completing verification
    setShowVerificationModal(false);
  };

  const handleNext = () => {
    router.push('/signup/info');
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-4">
      <div className="w-full max-w-md">
        <Button variant="ghost" className="mb-4" onClick={() => router.push('/signup/terms')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          돌아가기
        </Button>

        <Card className="border-gray-100 shadow-sm">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-3xl font-bold" style={{ fontFamily: 'SBAggroB' }}>
              본인인증
            </CardTitle>
            <CardDescription className="text-gray-600">
              안전한 서비스 이용을 위해 본인인증을 진행해주세요.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Info Box */}
            <div
              className={`border-2 rounded-md p-6 text-center ${
                verificationStarted ? 'border-green-500 bg-green-50' : 'border-red-500'
              }`}
            >
              <div className="flex justify-center mb-4">
                <Shield
                  className={`h-12 w-12 ${verificationStarted ? 'text-green-500' : 'text-red-500'}`}
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
                verificationStarted ? 'bg-gray-50' : ''
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
                verificationStarted ? 'bg-black text-white' : 'bg-gray-400 text-gray-200'
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
      <Dialog open={showVerificationModal} onOpenChange={setShowVerificationModal}>
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle className="text-center">본인인증</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">인증 방법 선택</h3>
              <div className="flex flex-col gap-3">
                <button
                  className="border rounded-md p-3 text-center hover:bg-gray-50 transition-colors"
                  onClick={handleVerificationComplete}
                >
                  <div className="flex justify-center mb-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-blue-500"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </div>
                  <span className="text-sm">휴대폰 인증</span>
                </button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
