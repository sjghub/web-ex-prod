"use client";

import { useState } from "react";
import PaymentPasswordModal from "@/app/(paydeck-module)/modal/payment-password-input-modal";

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-6 py-3 bg-black text-white rounded-md"
      >
        Open Payment Modal
      </button>
      <PaymentPasswordModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onBack={() => setIsOpen(false)}
      />
    </>
  );
}
