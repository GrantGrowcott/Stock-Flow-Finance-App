// app/api/news/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(
      `https://newsapi.org/v2/top-headlines?category=business&apiKey=${process.env.NEWS_API_KEY}`
    );

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch news" }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
  
}
