import { NextResponse } from "next/server";

export async function GET() {
  const backendUrl = process.env.BACKEND_URL || "http://localhost:8000";
  
  try {
    const start = Date.now();
    const response = await fetch(`${backendUrl}/api/health`, {
      method: "GET",
      cache: "no-store",
    });
    const duration = Date.now() - start;
    
    if (response.ok) {
      const data = await response.json();
      return NextResponse.json({
        status: "success",
        message: "Proxy OK",
        backend: backendUrl,
        response: data,
        latency: `${duration}ms`
      });
    } else {
      return NextResponse.json({
        status: "error",
        message: `Backend returned ${response.status}`,
        backend: backendUrl,
        error: await response.text().catch(() => "Unknown error")
      }, { status: 502 });
    }
  } catch (error: any) {
    return NextResponse.json({
      status: "fail",
      message: "Could not reach backend from Vercel",
      backend: backendUrl,
      error: error.message
    }, { status: 500 });
  }
}
