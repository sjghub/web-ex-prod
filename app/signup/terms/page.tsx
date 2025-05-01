'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ChevronDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';

export default function SignupTermsPage() {
  const router = useRouter();
  const [agreements, setAgreements] = useState({
    all: false,
    service: false,
    privacy: false,
    marketing: false,
  });

  // State for tracking which sections are open
  const [openSections, setOpenSections] = useState({
    service: false,
    privacy: false,
    marketing: false,
  });

  // Toggle section open/close
  const toggleSection = (section: 'service' | 'privacy' | 'marketing') => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Check if all required agreements are accepted
  const isNextEnabled = agreements.service && agreements.privacy;

  // Handle "agree to all" checkbox
  const handleAgreeAll = (checked: boolean) => {
    setAgreements({
      all: checked,
      service: checked,
      privacy: checked,
      marketing: checked,
    });
  };

  // Handle individual checkbox changes
  const handleAgreementChange = (key: 'service' | 'privacy' | 'marketing', checked: boolean) => {
    const newAgreements = {
      ...agreements,
      [key]: checked,
    };

    // Update "all" checkbox based on individual selections
    newAgreements.all = newAgreements.service && newAgreements.privacy && newAgreements.marketing;

    setAgreements(newAgreements);
  };

  // Handle next button click
  const handleNext = () => {
    if (isNextEnabled) {
      // Navigate to the next step (identity verification)
      router.push('/signup/verify');
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-4">
      <div className="w-full max-w-md">
        <Button variant="ghost" className="mb-4" onClick={() => router.push('/')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          돌아가기
        </Button>

        <Card className="border-gray-100 shadow-sm">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-3xl font-bold" style={{ fontFamily: 'SBAggroB' }}>
              약관 동의
            </CardTitle>
            <CardDescription className="text-gray-600">
              서비스 이용을 위한 약관에 동의해주세요.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Agree to all */}
            <div className="rounded-md bg-blue-100 p-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="agree-all"
                  checked={agreements.all}
                  onCheckedChange={(checked) => handleAgreeAll(checked as boolean)}
                  className="border-gray-700"
                />
                <label
                  htmlFor="agree-all"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  모든 약관에 동의합니다
                </label>
              </div>
            </div>

            {/* Service Terms */}
            <div className="border rounded-md overflow-hidden">
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="service-terms"
                    checked={agreements.service}
                    onCheckedChange={(checked) =>
                      handleAgreementChange('service', checked as boolean)
                    }
                    className="border-gray-700"
                  />
                  <label
                    htmlFor="service-terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    서비스 이용약관 동의 <span className="text-red-500">(필수)</span>
                  </label>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-0 h-auto"
                  onClick={() => toggleSection('service')}
                >
                  <span className="text-gray-500">보기</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${
                      openSections.service ? 'transform rotate-180' : ''
                    }`}
                  />
                </Button>
              </div>
              {openSections.service && (
                <div className="text-sm text-gray-700 p-4 pt-0">
                  <h3 className="font-bold mb-2 mt-4">제 1 조 (목적)</h3>
                  <p className="mb-4">
                    본 약관은 페이득 서비스 이용에 관한 기본적인 사항을 규정합니다. 서비스를
                    이용함에 있어 회원과 회사 간의 권리, 의무 및 책임사항, 기타 필요한 사항을
                    규정함을 목적으로 합니다.
                  </p>

                  <h3 className="font-bold mb-2">제 2 조 (정의)</h3>
                  <p className="mb-2">
                    1. "서비스"란 회사가 제공하는 페이득 서비스 및 관련 제반 서비스를 의미합니다.
                  </p>
                  <p className="mb-2">
                    2. "회원"이란 본 약관에 동의하고 서비스를 이용하는 자를 의미합니다.
                  </p>
                  <p className="mb-4">
                    3. "계정"이란 회원의 식별과 서비스 이용을 위하여 회원이 설정하고 회사가 승인한
                    이메일 주소와 비밀번호를 의미합니다.
                  </p>

                  <h3 className="font-bold mb-2">제 3 조 (약관의 효력 및 변경)</h3>
                  <p className="mb-2">
                    1. 회사는 본 약관의 내용을 회원이 쉽게 알 수 있도록 서비스 초기 화면에
                    게시합니다.
                  </p>
                  <p className="mb-2">
                    2. 회사는 관련 법령을 위배하지 않는 범위에서 본 약관을 개정할 수 있습니다.
                  </p>
                  <p className="mb-4">
                    3. 회사가 약관을 개정할 경우에는 적용일자 및 개정사유를 명시하여 현행 약관과
                    함께 서비스 초기 화면에 그 적용일자 7일 전부터 공지합니다.
                  </p>
                </div>
              )}
            </div>

            {/* Privacy Terms */}
            <div className="border rounded-md overflow-hidden">
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="privacy-terms"
                    checked={agreements.privacy}
                    onCheckedChange={(checked) =>
                      handleAgreementChange('privacy', checked as boolean)
                    }
                    className="border-gray-700"
                  />
                  <label
                    htmlFor="privacy-terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    개인정보 수집 및 이용 동의 <span className="text-red-500">(필수)</span>
                  </label>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-0 h-auto"
                  onClick={() => toggleSection('privacy')}
                >
                  <span className="text-gray-500">보기</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${
                      openSections.privacy ? 'transform rotate-180' : ''
                    }`}
                  />
                </Button>
              </div>
              {openSections.privacy && (
                <div className="text-sm text-gray-700 p-4 pt-0">
                  <h3 className="font-bold mb-2 mt-4">1. 수집하는 개인정보 항목</h3>
                  <p className="mb-2">
                    회사는 서비스 제공을 위해 아래와 같은 개인정보를 수집합니다:
                  </p>
                  <ul className="list-disc pl-5 mb-4">
                    <li>필수항목: 이름, 생년월일, 휴대폰번호, 이메일</li>
                    <li>선택항목: 주소, 직업, 관심분야</li>
                  </ul>

                  <h3 className="font-bold mb-2">2. 개인정보의 수집 및 이용목적</h3>
                  <ul className="list-disc pl-5 mb-4">
                    <li>회원 식별 및 가입의사 확인</li>
                    <li>서비스 제공 및 계약이행</li>
                    <li>고객 상담 및 불만처리</li>
                    <li>신규 서비스 개발 및 마케팅·광고에의 활용</li>
                  </ul>

                  <h3 className="font-bold mb-2">3. 개인정보의 보유 및 이용기간</h3>
                  <p className="mb-4">
                    회사는 회원탈퇴 시 또는 수집·이용목적 달성 시까지 회원님의 개인정보를
                    보유합니다. 단, 관계법령에 의해 보존할 필요가 있는 경우 해당 법령에서 정한 기간
                    동안 보관합니다.
                  </p>
                </div>
              )}
            </div>

            {/* Marketing Terms */}
            <div className="border rounded-md overflow-hidden">
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="marketing-terms"
                    checked={agreements.marketing}
                    onCheckedChange={(checked) =>
                      handleAgreementChange('marketing', checked as boolean)
                    }
                    className="border-gray-700"
                  />
                  <label
                    htmlFor="marketing-terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    마케팅 정보 수신 동의 <span className="text-gray-500">(선택)</span>
                  </label>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-0 h-auto"
                  onClick={() => toggleSection('marketing')}
                >
                  <span className="text-gray-500">보기</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${
                      openSections.marketing ? 'transform rotate-180' : ''
                    }`}
                  />
                </Button>
              </div>
              {openSections.marketing && (
                <div className="text-sm text-gray-700 p-4 pt-0">
                  <h3 className="font-bold mb-2 mt-4">마케팅 정보 수신 동의</h3>
                  <p className="mb-4">
                    회사는 새로운 서비스, 이벤트, 프로모션 등의 정보를 SMS, 이메일, 앱 푸시 알림
                    등의 방법으로 회원에게 제공할 수 있습니다.
                  </p>

                  <h3 className="font-bold mb-2">1. 마케팅 정보의 내용</h3>
                  <ul className="list-disc pl-5 mb-4">
                    <li>신규 서비스 및 기능 안내</li>
                    <li>이벤트 및 프로모션 정보</li>
                    <li>혜택 및 할인 정보</li>
                    <li>서비스 업데이트 및 변경사항</li>
                  </ul>

                  <h3 className="font-bold mb-2">2. 마케팅 정보 수신 방법</h3>
                  <ul className="list-disc pl-5 mb-4">
                    <li>SMS 및 카카오톡 등 메시지</li>
                    <li>이메일</li>
                    <li>앱 푸시 알림</li>
                  </ul>
                </div>
              )}
            </div>

            <Button
              className={`w-full mt-6 ${
                isNextEnabled ? 'bg-black text-white' : 'bg-[#cccccc] text-gray-500'
              }`}
              disabled={!isNextEnabled}
              onClick={handleNext}
            >
              다음
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
