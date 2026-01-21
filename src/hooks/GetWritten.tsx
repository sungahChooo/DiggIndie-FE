
export function GetWritten(createdAt: string): string {
  const parsed = new Date(createdAt.replace(" ", "T"));
  const now = new Date();

  const diffMs = now.getTime() - parsed.getTime();

  if (diffMs <= 0) return "방금 전";

  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  if (diffMinutes < 60) {
    return `${diffMinutes}분 전`;
  }

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) {
    return `${diffHours}시간 전`;
  }

  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}일 전`;
}
