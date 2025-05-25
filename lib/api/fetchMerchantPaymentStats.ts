import { fetchWithAuth } from "../api-fetch";

export interface MerchantPaymentStats {
  totalTransactionCount: number;
  transactionCountChangeRate: number;
  totalTransactionAmount: number;
  transactionAmountChangeRate: number;
  averageTransactionAmount: number;
  averageAmountChangeRate: number;
  activeTransactionRate: number;
}

export const fetchMerchantPaymentStats =
  async (): Promise<MerchantPaymentStats> => {
    const res = await fetchWithAuth("/admin/merchants/payments/stats");
    const data = await res.json();
    if (!data.success) throw new Error("통계 데이터 요청 실패");
    return data.response;
  };
