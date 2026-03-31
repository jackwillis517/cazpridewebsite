"use client";

import { useEffect, useState } from "react";
import {
  Clock,
  MapPin,
  Ticket,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Calendar,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Event, formatGoogleEvent } from "@/lib/event-utils";

const PAGE_SIZE = 5;

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

  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchUpcoming = async () => {
      try {
        setLoading(true);
        const now = new Date();
        const timeMin = now.toISOString();
        const endOfYear = new Date(now.getFullYear(), 11, 31, 23, 59, 59);
        const timeMax = endOfYear.toISOString();

        const response = await fetch(
          `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${CALENDAR_API_KEY}&timeMin=${timeMin}&timeMax=${timeMax}&singleEvents=true&orderBy=startTime`,
          { signal: controller.signal },
        );

        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        console.log("[UpcomingEvents] Raw Google Calendar API response:", data);
        const formattedEvents = (data.items || []).map(formatGoogleEvent);
        console.log("[UpcomingEvents] Formatted events:", formattedEvents);
        setAllEvents(formattedEvents);
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

  const totalPages = Math.ceil(allEvents.length / PAGE_SIZE);
  const events = allEvents.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
        <p className="text-muted-foreground text-sm">
          Loading upcoming events...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <Clock className="h-10 w-10 text-muted-foreground/50 mx-auto mb-3" />
        <p className="text-muted-foreground">
          We couldn&apos;t load upcoming events right now. Please check back
          later.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {events.length > 0 ? (
        <>
          {events.map((event) => (
            <div
              key={event.id}
              onClick={() => setSelectedEvent(event)}
              className="card-pride bg-background p-6 md:p-8 cursor-pointer hover:shadow-lg transition-all"
            >
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
                  {event.link ? (
                    <Button
                      asChild
                      variant="rainbow"
                      size="sm"
                      onClick={(e: React.MouseEvent) => e.stopPropagation()}
                    >
                      <a
                        href={event.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Ticket className="h-4 w-4 mr-2" />
                        Register/Get Tickets
                      </a>
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      disabled
                      className="text-black"
                      onClick={(e: React.MouseEvent) => e.stopPropagation()}
                    >
                      See Description for Tickets
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
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
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No upcoming events at this time. Check back soon!
          </p>
        </div>
      )}

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="bg-background rounded-xl shadow-xl max-w-lg w-full max-h-[80vh] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between p-6 border-b border-border">
              <div>
                <h3 className="text-xl font-bold text-foreground">
                  {selectedEvent.title}
                </h3>
                <div className="flex flex-wrap gap-3 mt-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {selectedEvent.date.toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {selectedEvent.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {selectedEvent.location}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedEvent(null)}
                className="p-1 rounded-lg hover:bg-secondary transition-colors shrink-0 ml-4"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div
              className="p-6 overflow-y-auto text-sm text-muted-foreground leading-relaxed [&_a]:text-accent [&_a]:underline"
              dangerouslySetInnerHTML={{ __html: selectedEvent.rawDescription }}
            />
            <div className="p-6 border-t border-border">
              {selectedEvent.link ? (
                <Button asChild variant="rainbow" className="w-full">
                  <a
                    href={selectedEvent.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Ticket className="h-4 w-4 mr-2" />
                    Register/Get Tickets
                  </a>
                </Button>
              ) : (
                <Button
                  variant="outline"
                  className="w-full text-foreground"
                  disabled
                >
                  See Description for Tickets
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
