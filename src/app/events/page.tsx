"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import { UpcomingEvents } from "./upcoming-events";
import { CalendarView } from "./calendar-view";
import { PastEvents } from "./past-events";

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

interface Event {                                                   
  id: string;                                                              
  title: string;                                                           
  date: Date;                                                              
  time: string;                                                            
  location: string;                                                        
  description: string;                                                     
  hasTickets: boolean;                                                     
}                                                                          
                                                                           
export interface EventProps {                                              
  events: Event[];                                                         
  loading: boolean;                                                        
  error: string | null;                                                    
}  

export interface CalendarProps {
  events: Event[];                                                         
  loading: boolean;                                                        
  error: string | null;                                                    
  currentDate: Date;
  onMonthChange: (date: Date) => void;
}
      

export default function Events() {
  const CALENDAR_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY || "";
  const CALENDAR_ID = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_ID || "";

  const [view, setView] = useState<"upcoming" | "calendar" | "past">(
    "upcoming",
  );

  // Upcoming Events State
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [upcomingLoading, setUpcomingLoading] = useState(true);
  const [upcomingError, setUpcomingError] = useState<string | null>(null);

  // Calendar View State
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [calendarEvents, setCalendarEvents] = useState<Event[]>([]);
  const [calendarLoading, setCalendarLoading] = useState(false);
  const [calendarError, setCalendarError] = useState<string | null>(null);

  // Past Events State
  const [pastEvents, setPastEvents] = useState<Event[]>([]);
  const [pastLoading, setPastLoading] = useState(true);
  const [pastError, setPastError] = useState<string | null>(null);

  const formatGoogleEvent = (item: GoogleEvent): Event => {
    const startDate = item.start.dateTime ? new Date(item.start.dateTime) : new Date(item.start.date);
    const endDate = item.end.dateTime ? new Date(item.end.dateTime) : new Date(item.end.date);

    const timeString = item.start.dateTime && item.end.dateTime
      ? `${startDate.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })} - ${endDate.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}`
      : "All Day";

    return {
      id: item.id,
      title: item.summary,
      date: startDate,
      time: timeString,
      location: item.location || "TBD",
      description: item.description || "No description provided.",
      hasTickets: false,
    };
  };

  // Fetch Upcoming Events
  useEffect(() => {
    const fetchUpcoming = async () => {
      try {
        setUpcomingLoading(true);
        const now = new Date();
        const timeMin = now.toISOString();

        const response = await fetch(
          `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${CALENDAR_API_KEY}&timeMin=${timeMin}&singleEvents=true&orderBy=startTime&maxResults=5`
        );

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        setUpcomingEvents(data.items.map(formatGoogleEvent));
      } catch (err) {
        setUpcomingError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setUpcomingLoading(false);
      }
    };

    fetchUpcoming();
  }, [CALENDAR_API_KEY, CALENDAR_ID]);

  // Fetch Calendar Events
  const fetchCalendarEvents = useCallback(async (date: Date) => {
    try {
      setCalendarLoading(true);
      const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
      const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59);

      const timeMin = startOfMonth.toISOString();
      const timeMax = endOfMonth.toISOString();

      const response = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${CALENDAR_API_KEY}&timeMin=${timeMin}&timeMax=${timeMax}&singleEvents=true&orderBy=startTime`
      );

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      setCalendarEvents(data.items.map(formatGoogleEvent));
    } catch (err) {
      setCalendarError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setCalendarLoading(false);
    }
  }, [CALENDAR_API_KEY, CALENDAR_ID]);

  useEffect(() => {
    fetchCalendarEvents(calendarDate);
  }, [fetchCalendarEvents, calendarDate]);

  // Fetch Past Events
  useEffect(() => {
    const fetchPast = async () => {
      try {
        setPastLoading(true);
        const now = new Date();
        const timeMax = now.toISOString();
        // Go back 1 year for past events search
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(now.getFullYear() - 1);
        const timeMin = oneYearAgo.toISOString();

        const response = await fetch(
          `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${CALENDAR_API_KEY}&timeMin=${timeMin}&timeMax=${timeMax}&singleEvents=true&orderBy=startTime`
        );

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        // Reverse to show most recent past event first, then take top 5
        const sortedPast = data.items.map(formatGoogleEvent).reverse().slice(0, 5);
        setPastEvents(sortedPast);
      } catch (err) {
        setPastError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setPastLoading(false);
      }
    };

    fetchPast();
  }, [CALENDAR_API_KEY, CALENDAR_ID]);

  return (
    <>
      {/* Hero */}
      <section className="py-20 bg-pride-soft">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-background rounded-full shadow-sm mb-6">
              <Calendar className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium text-foreground">
                Events & Calendar
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Join Us at <span className="text-rainbow">Our Events</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              From Pride celebrations to community gatherings, there&apos;s always
              something happening.
            </p>
          </div>
        </div>
      </section>

      {/* View Toggle */}
      <section className="py-6 bg-background border-b border-border sticky top-20 z-40">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 justify-center">
            <Button
              variant={view === "upcoming" ? "default" : "outline"}
              size="sm"
              onClick={() => setView("upcoming")}
            >
              Upcoming
            </Button>
            <Button
              variant={view === "calendar" ? "default" : "outline"}
              size="sm"
              onClick={() => setView("calendar")}
            >
              Calendar
            </Button>
            <Button
              variant={view === "past" ? "default" : "outline"}
              size="sm"
              onClick={() => setView("past")}
            >
              Past Events
            </Button>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          {view === "upcoming" && (
            <UpcomingEvents
              events={upcomingEvents}
              loading={upcomingLoading}
              error={upcomingError}
            />
          )}
          {view === "calendar" && (
            <CalendarView 
              events={calendarEvents} 
              loading={calendarLoading}
              error={calendarError}
              currentDate={calendarDate}
              onMonthChange={setCalendarDate}
            />
          )}
          {view === "past" && (
            <PastEvents 
              events={pastEvents}
              loading={pastLoading}
              error={pastError}
            />
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-rainbow">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
            Want to Help With an Event?
          </h2>
          <p className="text-primary-foreground/90 mb-8 max-w-xl mx-auto">
            We&apos;re always looking for volunteers to help make our events
            successful.
          </p>
          <Button asChild variant="secondary" size="lg">
            <Link href="/contact" className="flex items-center gap-2">
              Get Involved
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}