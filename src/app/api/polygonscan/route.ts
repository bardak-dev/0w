// app/api/polygonscan/route.ts
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  // Extract params from client request
  const module = searchParams.get("module");
  const action = searchParams.get("action");
  const address = searchParams.get("address");

  if (!address) {
    return new Response(JSON.stringify({ error: "Missing address" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const API_KEY = "KAD44JN72BUH4QCTRTFNWGNS86SMFR2KI7";
  const url = `https://api.polygonscan.com/api?module=${module}&action=${action}&address=${address}&apikey=${API_KEY}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    return new Response(JSON.stringify(data), {
      status: res.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Failed to fetch from Polygonscan" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
