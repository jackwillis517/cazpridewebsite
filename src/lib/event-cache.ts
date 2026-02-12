import { Event } from "@/app/events/page";

interface CachedData<T> {
  data: T;
  timestamp: number;
}

const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export const eventCache = {
  get: (key: string): Event[] | null => {
    if (typeof window === "undefined") return null;

    const cached = localStorage.getItem(key);
    if (!cached) return null;

    try {
      const { data, timestamp }: CachedData<any[]> = JSON.parse(cached);
      
      const isExpired = Date.now() - timestamp > CACHE_DURATION;
      if (isExpired) {
        localStorage.removeItem(key);
        return null;
      }

      // Revive ISO strings back into Date objects
      return data.map((event) => ({
        ...event,
        date: new Date(event.date),
      }));
    } catch (e) {
      console.error("Cache parsing error", e);
      return null;
    }
  },

  set: (key: string, data: Event[]): void => {
    if (typeof window === "undefined") return;

    const cacheObject: CachedData<Event[]> = {
      data,
      timestamp: Date.now(),
    };
    localStorage.setItem(key, JSON.stringify(cacheObject));
  },
};
