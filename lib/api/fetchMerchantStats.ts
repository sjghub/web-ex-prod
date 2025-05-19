import { fetchWithAuth } from "../api-fetch";

export interface MerchantStats {
  totalTransactionCount: number;
  transactionCountChangeRate: number;
  totalTransactionAmount: number;
  transactionAmountChangeRate: number;
  averageTransactionAmount: number;
  averageAmountChangeRate: number;
  activeTransactionRate: number;
}

export const fetchMerchantStats = async (): Promise<MerchantStats> => {
  const res = await fetchWithAuth("/admin/merchants/payments/stats");
  const data = await res.json();
  if (!data.success) throw new Error("통계 데이터 요청 실패");
  return data.response;
};
