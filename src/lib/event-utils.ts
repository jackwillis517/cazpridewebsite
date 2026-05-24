const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

// Interfaces
export interface Event {
  id: string;
  title: string;
  date: Date;
  endDate: Date;
  time: string;
  location: string;
  description: string;
  rawDescription: string;
  link: string | null;
  hasTickets: boolean;
}

interface GoogleEvent {
  id: string;
  summary: string;
  location: string;
  description: string;
  start: {
    dateTime: string;
    date: string;
  };
  end: {
    dateTime: string;
    date: string;
  };
}

interface CachedData<T> {
  data: T;
  timestamp: number;
}

// Objects
export const EventCache = {
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
        endDate: new Date(event.endDate),
      }));
    } catch (e) {
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

export function getStartOfDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function isUpcomingEvent(event: Event, now = new Date()): boolean {
  if (event.endDate.getTime() <= now.getTime()) return false;

  const today = getStartOfDay(now);
  const eventStartDay = getStartOfDay(event.date);
  return eventStartDay.getTime() >= today.getTime();
}

export function filterUpcomingEvents(
  events: Event[],
  now = new Date(),
): Event[] {
  return events
    .filter((e) => isUpcomingEvent(e, now))
    .sort((a, b) => a.date.getTime() - b.date.getTime());
}

export function getNextUpcomingEvent(
  events: Event[],
  now = new Date(),
): Event | null {
  const upcoming = filterUpcomingEvents(events, now);
  return upcoming[0] ?? null;
}

// Helpers
export const formatGoogleEvent = (item: GoogleEvent): Event => {
  // For all-day events, Google returns "YYYY-MM-DD" with no time.
  // new Date("YYYY-MM-DD") parses as UTC midnight, which shifts back a day
  // in local time. Appending "T00:00:00" forces local-time interpretation.
  const startDate = item.start.dateTime
    ? new Date(item.start.dateTime)
    : new Date(item.start.date + "T00:00:00");
  const endDate = item.end.dateTime
    ? new Date(item.end.dateTime)
    : new Date(item.end.date + "T00:00:00");

  const timeString = item.start.dateTime && item.end.dateTime
    ? `${startDate.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })} - ${endDate.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}`
    : "All Day";

  const cleanLocation = (loc?: string) => {
    if (!loc) return "TBD";
    const stateZipRegex = /^[A-Z]{2}(\s+\d{5})?$/i;
    const countryRegex = /^(USA|United States)$/i;

    return loc
      .split(",")
      .map((p) => p.trim())
      .filter((p) => !stateZipRegex.test(p) && !countryRegex.test(p))
      .join(", ");
  };

  const rawDescription = item.description || "";
  const ticketMatch = rawDescription.match(/Tickets?:\s*<a\s[^>]*href=["']([^"']*)["'][^>]*>.*?<\/a>/i);
  const ticketLink = ticketMatch ? ticketMatch[1] : null;
  const description = rawDescription
    .replace(/<a\s[^>]*>.*?<\/a>/gi, "")
    .replace(/<[^>]*>/g, "")
    .trim() || "No description provided.";

  return {
    id: item.id,
    title: item.summary,
    date: startDate,
    endDate,
    time: timeString,
    location: cleanLocation(item.location),
    description,
    rawDescription,
    link: ticketLink,
    hasTickets: true,
  };
};