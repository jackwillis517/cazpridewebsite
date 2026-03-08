"use client";

import { useEffect, useState } from "react";
import { Calendar, MapPin, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Event, formatGoogleEvent } from "@/lib/event-utils";

const PAGE_SIZE = 5;

export function PastEvents() {
  const CALENDAR_API_KEY =
    process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY || "";
  const CALENDAR_ID = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_ID || "";

  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    const fetchPast = async () => {
      try {
        setLoading(true);
        const now = new Date();
        const startOfYear = new Date(now.getFullYear(), 0, 1);
        const timeMin = startOfYear.toISOString();
        const timeMax = now.toISOString();

        const response = await fetch(
          `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${CALENDAR_API_KEY}&timeMin=${timeMin}&timeMax=${timeMax}&singleEvents=true&orderBy=startTime`,
          { signal: controller.signal },
        );

        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        const formattedEvents = (data.items || [])
          .map(formatGoogleEvent)
          .reverse();
        setAllEvents(formattedEvents);
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

  const totalPages = Math.ceil(allEvents.length / PAGE_SIZE);
  const events = allEvents.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
        <p className="text-muted-foreground text-sm">Loading past events...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <Calendar className="h-10 w-10 text-muted-foreground/50 mx-auto mb-3" />
        <p className="text-muted-foreground">
          We couldn&apos;t load past events right now. Please check back later.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h3 className="text-lg font-semibold text-muted-foreground mb-4">
        Past Events Archive
      </h3>
      {events.length > 0 ? (
        <>
          {events.map((event) => {
            const CardWrapper = event.link ? "a" : "div";
            const cardProps = event.link
              ? { href: event.link, target: "_blank", rel: "noopener noreferrer" }
              : {};
            return (
              <CardWrapper
                key={event.id}
                {...cardProps}
                className={`p-6 bg-secondary rounded-xl opacity-75 block ${event.link ? "cursor-pointer hover:opacity-100 transition-opacity" : ""}`}
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
                {event.link && (
                  <p className="text-accent text-sm mt-2 underline truncate">
                    {event.link}
                  </p>
                )}
              </CardWrapper>
            );
          })}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 sm:gap-4 pt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => p - 1)}
                disabled={page === 0}
                className="min-w-0"
              >
                <ChevronLeft className="h-4 w-4 sm:mr-1 shrink-0" />
                <span className="hidden sm:inline">Previous</span>
              </Button>
              <span className="text-sm text-muted-foreground whitespace-nowrap">
                {page + 1} / {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => p + 1)}
                disabled={page >= totalPages - 1}
                className="min-w-0"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="h-4 w-4 sm:ml-1 shrink-0" />
              </Button>
            </div>
          )}
        </>
      ) : (
        <p className="text-muted-foreground">No past events to display.</p>
      )}
    </div>
  );
}
