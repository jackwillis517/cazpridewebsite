"use client";

import { Clock, MapPin, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EventProps } from "./page" 

const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

export function UpcomingEvents({ events, loading, error }: EventProps) {
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
