import { NextResponse } from "next/server";
import { mockAnalyze } from "../../../lib/mockAnalyzer";
export async function POST(request) {
  const body = await request.json();
  const comments = Array.isArray(body.comments) ? body.comments.filter((c) => c && c.trim()) : [];
  if (comments.length === 0) {
    return NextResponse.json({ error: "No comments provided." }, { status: 400 });
  }
  const modelUrl = process.env.MODEL_API_URL;
  if (modelUrl) {
    try {
      const response = await fetch(modelUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comments }),
      });
      if (!response.ok) {
        throw new Error(`Model API responded with status ${response.status}`);
      }
      const data = await response.json();
      return NextResponse.json(data);
    } catch (error) {
      console.error("Model API call failed, falling back to mock analyzer:", error.message);
      const fallback = mockAnalyze(comments);
      return NextResponse.json({ ...fallback, usedFallback: true });
    }
  }
  const result = mockAnalyze(comments);
  return NextResponse.json(result);
}


// {
//   "results": [{ "id": 1, "text": "...", "sentiment": "positive", "confidence": 0.91 }],
//   "summary": { "counts": { "positive": 2, "negative": 1, "neutral": 0 }, "percentages": { "positive": 67, "negative": 33, "neutral": 0 }, "total": 3 },
//   "overview": "short text summary",
//   "suggestions": ["suggestion 1", "suggestion 2"]
// }

