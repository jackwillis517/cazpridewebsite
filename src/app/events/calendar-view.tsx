"use client";

import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Event, formatGoogleEvent } from "./page";
import { eventCache } from "@/lib/event-cache";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function CalendarView() {
  const CALENDAR_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY || "";
  const CALENDAR_ID = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_ID || "";

  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => { 
    const cacheKey = `calendar_events_${date.getFullYear()}_${date.getMonth()}`;
    const cachedData = eventCache.get(cacheKey);

    if (cachedData) {
      setEvents(cachedData);
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    const fetchMonth = async () => {
      try {
        setLoading(true);
        const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59);

        const timeMin = startOfMonth.toISOString();
        const timeMax = endOfMonth.toISOString();

        const response = await fetch(
          `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${CALENDAR_API_KEY}&timeMin=${timeMin}&timeMax=${timeMax}&singleEvents=true&orderBy=startTime`,
          { signal: controller.signal }
        );

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        const formattedEvents = data.items.map(formatGoogleEvent);
        setEvents(formattedEvents);
        eventCache.set(cacheKey, formattedEvents);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return;
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    fetchMonth();

    return () => controller.abort();
  }, [CALENDAR_API_KEY, CALENDAR_ID, date]);

  const currentMonth = date.getMonth();
  const currentYear = date.getFullYear();

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);

  const previousMonth = () => {
    setDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const nextMonth = () => {
    setDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return <div className="text-center py-12">Loading calendar events...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <Button variant="ghost" size="icon" onClick={previousMonth}>
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-xl font-bold text-foreground">
          {months[currentMonth]} {currentYear}
        </h2>
        <Button variant="ghost" size="icon" onClick={nextMonth}>
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 mb-8">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="text-center text-sm font-medium text-muted-foreground py-2"
          >
            {day}
          </div>
        ))}
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${i}`} className="aspect-square bg-muted/20 rounded-lg" />
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const dayEvents = events.filter(
            (e) => e.date.getDate() === day
          );
          
          return (
            <div
              key={day}
              className={`aspect-square flex flex-col p-1 rounded-lg border border-border bg-background hover:bg-muted/50 transition-colors overflow-hidden min-h-[80px]`}
            >
              <div className="text-right text-xs font-medium text-muted-foreground mb-1">
                {day}
              </div>
              <div className="flex flex-col gap-1 overflow-y-auto max-h-full no-scrollbar">
                {dayEvents.map((event) => (
                  <div
                    key={event.id}
                    className="bg-blue-600 text-[10px] text-white px-1.5 py-0.5 rounded truncate font-medium shadow-sm"
                    title={event.title}
                  >
                    {event.title}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Events this month List (optional, kept for accessibility/details) */}
      {events.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-bold text-foreground">Events this month:</h3>
          {events.map((event) => (
            <div key={event.id} className="p-4 bg-secondary rounded-lg">
              <div className="font-medium text-foreground">{event.title}</div>
              <div className="text-sm text-muted-foreground">
                {formatDate(event.date)} • {event.time}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
