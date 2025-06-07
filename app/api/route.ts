process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // 개발 환경용 (주의)

import { NextRequest, NextResponse } from "next/server";

// ✅ endpoint만 교체하고 나머지 요청 복사해서 백엔드로 전달
async function proxyFetchWithModifiedEndpoint(
  req: NextRequest,
  newEndpoint: string,
): Promise<Response> {
  const method = req.method;
  const backendUrl = new URL(
    newEndpoint,
    "https://internal-alb.example.com",
  ).toString();

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
