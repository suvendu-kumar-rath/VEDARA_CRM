const STORAGE_KEY = "vedara_activity_log";
const MAX_ENTRIES = 50;

export function logActivity(title, desc, icon = "★") {
  try {
    const existing = getActivities();
    const entry = { title, desc, icon, timestamp: new Date().toISOString() };
    const updated = [entry, ...existing].slice(0, MAX_ENTRIES);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    // Notify any listening components
    window.dispatchEvent(new Event("vedara_activity_updated"));
  } catch {
    // localStorage unavailable — silently skip
  }
}

export function getActivities() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function timeAgo(isoString) {
  const diff = Date.now() - new Date(isoString).getTime();
  const mins  = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days  = Math.floor(diff / 86400000);
  if (mins  < 1)  return "just now";
  if (mins  < 60) return `${mins} min ago`;
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  if (days  < 7)  return `${days} day${days > 1 ? "s" : ""} ago`;
  return new Date(isoString).toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
}
