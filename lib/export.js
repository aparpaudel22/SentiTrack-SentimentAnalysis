import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
export function exportReportAsPDF(report) {
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text("SentiTrack — Sentiment Analysis Report", 14, 20);
  doc.setFontSize(11);
  doc.setTextColor(100);
  doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 28);
  doc.setFontSize(12);
  doc.setTextColor(20);
  doc.text("Overview", 14, 40);
  const overviewLines = doc.splitTextToSize(report.overview, 180);
  doc.setFontSize(10);
  doc.text(overviewLines, 14, 47);
  const summaryStartY = 47 + overviewLines.length * 5 + 8;
  autoTable(doc, {
    startY: summaryStartY,
    head: [["Sentiment", "Count", "Percentage"]],
    body: [
      ["Positive", report.summary.counts.positive, `${report.summary.percentages.positive}%`],
      ["Negative", report.summary.counts.negative, `${report.summary.percentages.negative}%`],
      ["Neutral", report.summary.counts.neutral, `${report.summary.percentages.neutral}%`],
    ],
  });
  let nextY = doc.lastAutoTable.finalY + 12;
  doc.setFontSize(12);
  doc.text("Suggestions", 14, nextY);
  nextY += 6;
  doc.setFontSize(10);
  report.suggestions.forEach((suggestion) => {
    const lines = doc.splitTextToSize(`• ${suggestion}`, 180);
    doc.text(lines, 14, nextY);
    nextY += lines.length * 5 + 2;
  });
  autoTable(doc, {
    startY: nextY + 6,
    head: [["#", "Comment", "Sentiment", "Confidence"]],
    body: report.results.map((r, i) => [
      i + 1,
      r.text.length > 60 ? r.text.slice(0, 60) + "..." : r.text,
      r.sentiment,
      `${Math.round(r.confidence * 100)}%`,
    ]),
  });
  doc.save(`sentitrack-report-${Date.now()}.pdf`);
}
export function exportReportAsCSV(report) {
  const rows = [["#", "Comment", "Sentiment", "Confidence"]];
  report.results.forEach((r, i) => {
    rows.push([i + 1, `"${r.text.replace(/"/g, '""')}"`, r.sentiment, `${Math.round(r.confidence * 100)}%`]);
  });
  rows.push([]);
  rows.push(["Summary"]);
  rows.push(["Positive", report.summary.counts.positive, `${report.summary.percentages.positive}%`]);
  rows.push(["Negative", report.summary.counts.negative, `${report.summary.percentages.negative}%`]);
  rows.push(["Neutral", report.summary.counts.neutral, `${report.summary.percentages.neutral}%`]);
  const csvContent = rows.map((row) => row.join(",")).join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `sentitrack-report-${Date.now()}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}