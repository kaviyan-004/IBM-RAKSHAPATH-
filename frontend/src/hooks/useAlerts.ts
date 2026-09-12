import { useEffect, useState } from "react";
import { fetchAlerts } from "@/api/alerts";
import type { AlertItem } from "@/types";

export function useAlerts() {
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetchAlerts().then((data) => {
      if (!cancelled) {
        setAlerts(data);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const markAllRead = () => setAlerts((prev) => prev.map((a) => ({ ...a, read: true })));
  const markRead = (id: string) => setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, read: true } : a)));
  const unreadCount = alerts.filter((a) => !a.read).length;

  return { alerts, loading, unreadCount, markAllRead, markRead };
}
