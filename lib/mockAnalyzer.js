const POSITIVE_WORDS = ["good", "great", "love", "amazing", "excellent", "best", "awesome", "happy", "satisfied", "recommend"];
const NEGATIVE_WORDS = ["bad", "worst", "hate", "terrible", "poor", "disappointed", "awful", "slow", "rude", "waste"];
function scoreComment(text) {
  const lower = text.toLowerCase();
  let score = 0;
  POSITIVE_WORDS.forEach((word) => {
    if (lower.includes(word)) score += 1;
  });
  NEGATIVE_WORDS.forEach((word) => {
    if (lower.includes(word)) score -= 1;
  });
  if (score > 0) return "positive";
  if (score < 0) return "negative";
  return "neutral";
}
export function mockAnalyze(comments) {
  const results = comments.map((text, index) => ({
    id: index + 1,
    text,
    sentiment: scoreComment(text),
    confidence: Number((0.7 + Math.random() * 0.29).toFixed(2)),
  }));
  const total = results.length || 1;
  const counts = { positive: 0, negative: 0, neutral: 0 };
  results.forEach((r) => counts[r.sentiment]++);
  const percentages = {
    positive: Math.round((counts.positive / total) * 100),
    negative: Math.round((counts.negative / total) * 100),
    neutral: Math.round((counts.neutral / total) * 100),
  };
  const overview = buildOverview(percentages, total);
  const suggestions = buildSuggestions(percentages);
  return {
    results,
    summary: { counts, percentages, total },
    overview,
    suggestions,
  };
}
function buildOverview(percentages, total) {
  if (percentages.positive >= 60) {
    return `Out of ${total} comments analyzed, the overall sentiment is strongly positive (${percentages.positive}%). Customers appear satisfied with the product, place, or service.`;
  }
  if (percentages.negative >= 40) {
    return `Out of ${total} comments analyzed, a significant portion is negative (${percentages.negative}%). This suggests recurring issues that need attention.`;
  }
  return `Out of ${total} comments analyzed, sentiment is mixed — ${percentages.positive}% positive, ${percentages.negative}% negative, and ${percentages.neutral}% neutral.`;
}
function buildSuggestions(percentages) {
  const suggestions = [];
  if (percentages.negative >= 30) {
    suggestions.push("Investigate the most common complaints and address the root cause quickly.");
    suggestions.push("Respond publicly to negative comments to show customers their feedback matters.");
  }
  if (percentages.neutral >= 40) {
    suggestions.push("Encourage more detailed reviews — many comments are neutral or unclear about experience quality.");
  }
  if (percentages.positive >= 60) {
    suggestions.push("Highlight positive testimonials in your marketing to reinforce trust.");
  }
  if (suggestions.length === 0) {
    suggestions.push("Continue monitoring sentiment regularly to catch emerging trends early.");
  }
  return suggestions;
}