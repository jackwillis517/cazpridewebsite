"use client";

import { useEffect, useState } from "react";
import { Calendar, MapPin } from "lucide-react";
import { Event, formatGoogleEvent } from "../../lib/event-utils" 
import { EventCache } from "@/lib/event-utils";

export function PastEvents() {
  const CALENDAR_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY || "";
  const CALENDAR_ID = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_ID || "";

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cacheKey = "past_events";
    const cachedData = EventCache.get(cacheKey);

    if (cachedData) {
      setEvents(cachedData);
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    const fetchPast = async () => {
      try {
        setLoading(true);
        const now = new Date();
        const timeMax = now.toISOString();
        // Go back 1 year for past events search
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(now.getFullYear() - 1);
        const timeMin = oneYearAgo.toISOString();

        const response = await fetch(
          `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${CALENDAR_API_KEY}&timeMin=${timeMin}&timeMax=${timeMax}&singleEvents=true&orderBy=startTime`,
          { signal: controller.signal }
        );

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        // Reverse to show most recent past event first, then take top 5
        const formattedEvents = data.items.map(formatGoogleEvent).reverse().slice(0, 5);
        setEvents(formattedEvents);
        EventCache.set(cacheKey, formattedEvents);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return;
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchPast();

    return () => controller.abort();
  }, [CALENDAR_API_KEY, CALENDAR_ID]);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return <div className="text-center py-12">Loading past events...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h3 className="text-lg font-semibold text-muted-foreground mb-4">
        Past Events Archive
      </h3>
      {events.length > 0 ? (
        events.map((event) => (
          <div
            key={event.id}
            className="p-6 bg-secondary rounded-xl opacity-75"
          >
            <h3 className="text-lg font-bold text-foreground mb-2">
              {event.title}
            </h3>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {formatDate(event.date)}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {event.location}
              </span>
            </div>
          </div>
        ))
      ) : (
        <p className="text-muted-foreground">No past events to display.</p>
      )}
    </div>
  );
}
