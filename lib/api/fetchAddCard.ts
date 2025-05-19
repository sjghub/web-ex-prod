import { fetchWithAuth } from "@/lib/api-fetch";
import { CommonResponse } from "@/types/api-response";

interface AddCardRequest {
  cardNumber: string;
  month: string;
  year: string;
  cvc: string;
  pinPrefix: string;
}

type EmptyResponse = Record<string, never>; // 빈 응답 객체

export const fetchAddCard = async (cardData: AddCardRequest) => {
  const response = await fetchWithAuth("/card", {
    method: "POST",
    body: JSON.stringify(cardData),
  });

  const data = await response.json();
  return data as CommonResponse<EmptyResponse>;
};
