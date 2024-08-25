export function getDateString(date: Date): string {
  const now = new Date();

  const diff = now.getTime() - date.getTime();

  if (diff < 60 * 1000) {
    return "たった今";
  } else if (diff < 60 * 60 * 1000) {
    return `${Math.floor(diff / (60 * 1000))}分前`;
  } else if (diff < 24 * 60 * 60 * 1000) {
    return `${Math.floor(diff / (60 * 60 * 1000))}時間前`;
  } else if (diff < 7 * 24 * 60 * 60 * 1000) {
    return `${Math.floor(diff / (24 * 60 * 60 * 1000))}日前`;
  } else {
    return date.toLocaleDateString();
  }
}
