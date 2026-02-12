"use client";

import { useState } from "react";
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

export interface Event {                                                   
  id: string;                                                              
  title: string;                                                           
  date: Date;                                                              
  time: string;                                                            
  location: string;                                                        
  description: string;                                                     
  hasTickets: boolean;                                                     
}                                                                          

export const formatGoogleEvent = (item: GoogleEvent): Event => {
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
      

export default function Events() {
  const [view, setView] = useState<"upcoming" | "calendar" | "past">(
    "upcoming",
  );

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
          {view === "upcoming" && ( <UpcomingEvents/> )}
          {view === "calendar" && ( <CalendarView/> )}
          {view === "past" && ( <PastEvents/> )}
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