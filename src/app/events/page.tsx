"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Calendar,
  MapPin,
  Clock,
  ChevronLeft,
  ChevronRight,
  Ticket,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Event {
  id: number;
  title: string;
  date: Date;
  time: string;
  location: string;
  description: string;
  type: "upcoming" | "past";
  hasTickets: boolean;
}

const allEvents: Event[] = [
  {
    id: 1,
    title: "Pride in the Park",
    date: new Date(2025, 5, 15),
    time: "12:00 PM - 6:00 PM",
    location: "Lakeland Park, Cazenovia",
    description:
      "Our biggest celebration of the year! Join us for live music, food vendors, family activities, and community connection.",
    type: "upcoming",
    hasTickets: true,
  },
  {
    id: 2,
    title: "Youth Art Workshop",
    date: new Date(2025, 3, 20),
    time: "2:00 PM - 5:00 PM",
    location: "Community Center, 100 Main St",
    description:
      "Creative expression workshop for LGBTQIA+ youth ages 13-18 and allies. All art supplies provided.",
    type: "upcoming",
    hasTickets: false,
  },
  {
    id: 3,
    title: "Community Potluck",
    date: new Date(2025, 2, 8),
    time: "5:30 PM - 8:00 PM",
    location: "First Presbyterian Church",
    description:
      "Monthly gathering to share food, stories, and community connection. Bring a dish to share!",
    type: "upcoming",
    hasTickets: false,
  },
  {
    id: 4,
    title: "Ally Training Workshop",
    date: new Date(2025, 3, 5),
    time: "10:00 AM - 1:00 PM",
    location: "Cazenovia Library",
    description:
      "Learn how to be an effective ally to the LGBTQIA+ community. Open to all ages.",
    type: "upcoming",
    hasTickets: true,
  },
  {
    id: 5,
    title: "Rainbow Run 5K",
    date: new Date(2025, 4, 10),
    time: "9:00 AM",
    location: "Lakeland Park",
    description:
      "Fun run/walk supporting Cazenovia Pride. Costumes and rainbow attire encouraged!",
    type: "upcoming",
    hasTickets: true,
  },
  {
    id: 6,
    title: "Winter Fundraiser Gala",
    date: new Date(2024, 11, 15),
    time: "6:00 PM - 10:00 PM",
    location: "Lincklaen House",
    description:
      "Our annual winter fundraiser featuring dinner, silent auction, and entertainment.",
    type: "past",
    hasTickets: false,
  },
];

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

export default function Events() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<"upcoming" | "calendar" | "past">(
    "upcoming",
  );

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);

  const eventsInMonth = allEvents.filter((event) => {
    return (
      event.date.getMonth() === currentMonth &&
      event.date.getFullYear() === currentYear
    );
  });

  const upcomingEvents = allEvents
    .filter((e) => e.type === "upcoming")
    .sort((a, b) => a.date.getTime() - b.date.getTime());
  const pastEvents = allEvents
    .filter((e) => e.type === "past")
    .sort((a, b) => b.date.getTime() - a.date.getTime());

  const previousMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

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
          {/* Upcoming Events View */}
          {view === "upcoming" && (
            <div className="max-w-4xl mx-auto space-y-6">
              {upcomingEvents.length > 0 ? (
                upcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className="card-pride bg-background p-6 md:p-8"
                  >
                    <div className="flex flex-col md:flex-row md:items-start gap-6">
                      <div className="flex-shrink-0 text-center md:text-left">
                        <div className="text-4xl font-bold text-accent">
                          {event.date.getDate()}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {months[event.date.getMonth()].slice(0, 3)}{" "}
                          {event.date.getFullYear()}
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
          )}

          {/* Calendar View */}
          {view === "calendar" && (
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
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (day) => (
                    <div
                      key={day}
                      className="text-center text-sm font-medium text-muted-foreground py-2"
                    >
                      {day}
                    </div>
                  ),
                )}
                {Array.from({ length: firstDay }).map((_, i) => (
                  <div key={`empty-${i}`} className="aspect-square" />
                ))}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const hasEvent = eventsInMonth.some(
                    (e) => e.date.getDate() === day,
                  );
                  return (
                    <div
                      key={day}
                      className={`aspect-square flex items-center justify-center rounded-lg text-sm ${
                        hasEvent
                          ? "bg-rainbow text-primary-foreground font-bold"
                          : "hover:bg-secondary"
                      }`}
                    >
                      {day}
                    </div>
                  );
                })}
              </div>

              {/* Events this month */}
              {eventsInMonth.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-bold text-foreground">
                    Events this month:
                  </h3>
                  {eventsInMonth.map((event) => (
                    <div key={event.id} className="p-4 bg-secondary rounded-lg">
                      <div className="font-medium text-foreground">
                        {event.title}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {formatDate(event.date)} • {event.time}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Past Events View */}
          {view === "past" && (
            <div className="max-w-4xl mx-auto space-y-6">
              <h3 className="text-lg font-semibold text-muted-foreground mb-4">
                Past Events Archive
              </h3>
              {pastEvents.length > 0 ? (
                pastEvents.map((event) => (
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
                <p className="text-muted-foreground">
                  No past events to display.
                </p>
              )}
            </div>
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
