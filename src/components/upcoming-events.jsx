import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarIcon, MapPinIcon, UsersIcon } from "lucide-react";

export function UpcomingEvents() {
  const events = [
    {
      name: "US Import Shipping Summit 2024",
      date: "June 15-17, 2024",
      location: "New York, NY",
      attendees: 500,
    },
    {
      name: "Customs Compliance Workshop",
      date: "August 22, 2024",
      location: "Chicago, IL",
      attendees: 200,
    },
    {
      name: "Future of International Logistics Conference",
      date: "October 5-6, 2024",
      location: "San Francisco, CA",
      attendees: 350,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">
          Upcoming US Import Shipping Events
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.map((event, index) => (
            <div key={index} className="space-y-2">
              <h3 className="font-medium">{event.name}</h3>
              <div className="flex items-center text-sm text-muted-foreground">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {event.date}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPinIcon className="mr-2 h-4 w-4" />
                {event.location}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <UsersIcon className="mr-2 h-4 w-4" />
                {event.attendees} expected attendees
              </div>
              <Button variant="outline" size="sm">
                RSVP
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
