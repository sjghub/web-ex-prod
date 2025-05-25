import { fetchWithAuth } from "@/lib/api-fetch";

export interface TransactionApiResponse {
  paymentId: number;
  cardNumber: string;
  cardName: string;
  createdAt: string;
  transactionAmount: number;
  status: boolean;
}

export interface Transaction {
  id: string;
  amount: string;
  paymentMethod: string;
  dateTime: string;
  status: "완료" | "취소";
}

export interface Pageable {
  page: number;
  size: number;
}

export interface PaginatedTransactionData {
  content: Transaction[];
  totalPages: number;
  totalElements: number;
  pageable: Pageable;
}

export const fetchSingleMerchantTransactions = async (
  merchantId: string,
  page: number = 1,
  size: number = 5,
): Promise<PaginatedTransactionData> => {
  const response = await fetchWithAuth(
    `/admin/merchants/${merchantId}/payments?page=${page}&size=${size}`,
  );

  const data = await response.json();

  if (!data.success || !Array.isArray(data.response?.content)) {
    return {
      content: [],
      totalPages: 0,
      totalElements: 0,
      pageable: { page, size },
    };
  }

  const content: Transaction[] = data.response.content.map(
    (t: TransactionApiResponse) => {
      const amount = `${t.transactionAmount.toLocaleString()}원`;
      const formattedCard = `${t.cardName} ****${t.cardNumber.slice(-4)}`;
      const date = new Date(t.createdAt).toLocaleString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      return {
        id: `TRX-${t.paymentId.toString().padStart(6, "0")}`,
        amount,
        paymentMethod: formattedCard,
        dateTime: date,
        status: t.status ? "완료" : "취소",
      };
    },
  );

  return {
    content,
    totalPages: data.response.totalPages,
    totalElements: data.response.totalElements,
    pageable: data.response.pageable,
  };
};
