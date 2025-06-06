import { CommonResponse } from "@/types/api-response";
import { fetchWithoutAuth } from "./api-fetch";

const API_URL = "/auth";

interface TokenResponse {
  accessToken: string;
}

// 쿠키에서 토큰 가져오기
export const getCookie = (name: string): string | null => {
  const matches = document.cookie.match(
    new RegExp("(^| )" + name + "=([^;]+)"),
  );
  return matches ? decodeURIComponent(matches[2]) : null;
};

// 쿠키에 토큰 저장하기
export const setCookie = (name: string, value: string) => {
  document.cookie = `${name}=${value}; path=/`;
};

// 쿠키에서 토큰 삭제하기
export const removeCookie = (name: string) => {
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
};

// 토큰 재발급 요청
export const refreshAccessToken = async (): Promise<boolean> => {
  try {
    const response = await fetchWithoutAuth(`/refresh`, {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) {
      return false;
    }

    const data: CommonResponse<TokenResponse> = await response.json();

    if (!data.success || !data.response) {
      return false;
    }

    const { accessToken } = data.response;
    setCookie("accessToken", accessToken);

    return true;
  } catch (error) {
    console.error("토큰 재발급 실패:", error);
    return false;
  }
};
