process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // 개발 환경용 (주의)

import { NextRequest, NextResponse } from "next/server";

// ✅ endpoint만 교체하고 나머지 요청 복사해서 백엔드로 전달
async function proxyFetchWithModifiedEndpoint(
  req: NextRequest,
  newEndpoint: string,
): Promise<Response> {
  const method = req.method;
  const backendUrl = new URL(newEndpoint, "http://localhost:8080").toString();

  // 🔁 클라이언트 요청 헤더 복사 (필요 시 필터링)
  const headers = new Headers();
  req.headers.forEach((value, key) => {
    if (key.toLowerCase() !== "x-internal-domain") {
      headers.set(key, value);
    }
  });

  const fetchOptions: RequestInit = {
    method,
    headers,
    credentials: "include",
  };

  // POST, PUT, PATCH 등의 경우 body 포함
  if (["POST", "PUT", "PATCH"].includes(method)) {
    const body = await req.text(); // JSON이든 form이든 raw로
    fetchOptions.body = body;
  }

  console.log(backendUrl);

  const res = await fetch(backendUrl, fetchOptions);

  const contentType = res.headers.get("content-type");
  const responseBody = contentType?.includes("application/json")
    ? JSON.stringify(await res.json())
    : await res.text();

  const responseHeaders = new Headers();
  res.headers.forEach((value, key) => {
    responseHeaders.set(key, value);
  });

  return new Response(responseBody, {
    status: res.status,
    headers: responseHeaders,
  });
}

// ✅ 공통 endpoint 가공 함수 (원하면 여기서 rewrite 로직 구성 가능)
function rewriteEndpoint(originalEndpoint: string): string {
  // 예: /service/user → /internal/user 로 rewrite
  return originalEndpoint.replace(/^\/service\/user/, "/internal/user");

  // 또는 그대로 반환
  // return originalEndpoint;
}

// ✅ GET 핸들러
export async function GET(req: NextRequest) {
  const endpoint = req.headers.get("x-internal-domain");
  if (!endpoint) {
    return NextResponse.json(
      { message: "Missing 'x-internal-domain'" },
      { status: 400 },
    );
  }

  return await proxyFetchWithModifiedEndpoint(req, endpoint);
}

// ✅ POST 핸들러
export async function POST(req: NextRequest) {
  const endpoint = req.headers.get("x-internal-domain");
  if (!endpoint) {
    return NextResponse.json(
      { message: "Missing 'x-internal-domain'" },
      { status: 400 },
    );
  }

  return await proxyFetchWithModifiedEndpoint(req, endpoint);
}

// ✅ POST 핸들러
export async function PATCH(req: NextRequest) {
  const endpoint = req.headers.get("x-internal-domain");
  if (!endpoint) {
    return NextResponse.json(
      { message: "Missing 'x-internal-domain'" },
      { status: 400 },
    );
  }

  return await proxyFetchWithModifiedEndpoint(req, endpoint);
}
