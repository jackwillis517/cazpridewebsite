"use client";

import { useEffect, useState } from "react";
import { Clock, MapPin, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Event, formatGoogleEvent } from "@/lib/event-utils";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function UpcomingEvents() {
  const CALENDAR_API_KEY =
    process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY || "";
  const CALENDAR_ID = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_ID || "";

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // const cacheKey = "upcoming_events";
    // const cachedData = EventCache.get(cacheKey);

    // if (cachedData) {
    //   setEvents(cachedData);
    //   setLoading(false);
    //   return;
    // }

    const controller = new AbortController();

    const fetchUpcoming = async () => {
      try {
        setLoading(true);
        const now = new Date();
        const timeMin = now.toISOString();

        const response = await fetch(
          `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${CALENDAR_API_KEY}&timeMin=${timeMin}&singleEvents=true&orderBy=startTime&maxResults=5`,
          { signal: controller.signal },
        );

        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        const formattedEvents = data.items.map(formatGoogleEvent);
        setEvents(formattedEvents);
        // EventCache.set(cacheKey, formattedEvents);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return;
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchUpcoming();

    return () => controller.abort();
  }, [CALENDAR_API_KEY, CALENDAR_ID]);

  if (loading) {
    return <div className="text-center py-12">Loading upcoming events...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {events.length > 0 ? (
        events.map((event) => (
          <div key={event.id} className="card-pride bg-background p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              <div className="flex-shrink-0 text-center md:text-left">
                <div className="text-4xl font-bold text-accent">
                  {event.date.getDate()}
                </div>
                <div className="text-sm text-muted-foreground">
                  {months[event.date.getMonth()]} {event.date.getFullYear()}
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {event.title}
                </h3>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {event.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {event.location}
                  </span>
                </div>
                <p className="text-muted-foreground mb-4">
                  {event.description}
                </p>
                {event.hasTickets && (
                  <Button variant="rainbow" size="sm">
                    <Ticket className="h-4 w-4 mr-2" />
                    Register / Get Tickets
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No upcoming events at this time. Check back soon!
          </p>
        </div>
      )}
    </div>
  );
}
