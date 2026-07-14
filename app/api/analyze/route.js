import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { mockAnalyze } from "../../../lib/mockAnalyzer";
import { logActivity } from "../../../lib/server/activityStore";

export async function POST(request) {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email || "unknown";

  try {
    const body = await request.json();
    const comments = Array.isArray(body.comments) ? body.comments.filter((c) => c && c.trim()) : [];

    if (comments.length === 0) {
      logActivity({ email, commentsCount: 0, success: false, error: "No comments provided." });
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
        logActivity({ email, commentsCount: comments.length, success: true, summary: data.summary, comments, results: data.results });
        return NextResponse.json(data);
      } catch (error) {
        console.error("Model API call failed, falling back to mock analyzer:", error.message);
        const fallback = mockAnalyze(comments);
        logActivity({ email, commentsCount: comments.length, success: true, summary: fallback.summary, comments, results: fallback.results, usedFallback: true });
        return NextResponse.json({ ...fallback, usedFallback: true });
      }
    }

    const result = mockAnalyze(comments);
    logActivity({ email, commentsCount: comments.length, success: true, summary: result.summary, comments, results: result.results });
    return NextResponse.json(result);
  } catch (error) {
    console.error("Analyze route failed:", error);
    logActivity({ email, commentsCount: 0, success: false, error: error.message || "Unexpected server error." });
    return NextResponse.json({ error: "Something went wrong while analyzing. Please try again." }, { status: 500 });
  }
}