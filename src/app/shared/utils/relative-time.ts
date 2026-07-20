// Shared "freshness" formatting for anything driven by the pipeline's
// mart_*_meta.json `generated_at` — keeps Home and the dashboards in sync.
export function relativeTime(iso: string, now: Date = new Date()): string {
  const diffMs = now.getTime() - new Date(iso).getTime();
  const mins = Math.round(diffMs / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.round(hrs / 24)}d ago`;
}

// The OpenAQ ingest job always targets the prior calendar day's window
// (see pipeline/openaq/openaq_ingest.py), so a reading's effective date is
// always one day behind the pipeline's generated_at.
export function relativeDayLabel(readingDate: Date, now: Date = new Date()): string {
  const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const diffDays = Math.round((startOfDay(now).getTime() - startOfDay(readingDate).getTime()) / 86400000);
  if (diffDays <= 0) return 'today';
  if (diffDays === 1) return 'yesterday';
  return `${diffDays} days ago`;
}
