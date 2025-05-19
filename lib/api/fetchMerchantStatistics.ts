import { fetchWithAuth } from "@/lib/api-fetch";

interface MerchantStatistics {
  merchantCount: number;
  transactionCount: number;
  totalTransactionAmount: number;
  averageTransactionAmount: number;
  activeMerchantCount: number;
  recent24hTransactionIncrease: number;
  transactionAmountChangePercent: number;
}
export const fetchMerchantStatistics =
  async (): Promise<MerchantStatistics> => {
    const response = await fetchWithAuth(`/admin/merchants/stats`);
    const data = await response.json();
    if (!data.success) {
      // 에러처리해야됌
    }
    return data.response;
  };
