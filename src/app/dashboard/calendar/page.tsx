'use client';

import { useState } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const localizer = momentLocalizer(moment);

const mockEvents = [
  {
    id: 1,
    title: 'Team Meeting',
    start: new Date(2025, 9, 20, 10, 0, 0),
    end: new Date(2025, 9, 20, 11, 0, 0),
  },
  {
    id: 2,
    title: 'Lunch with Client',
    start: new Date(2025, 9, 21, 13, 0, 0),
    end: new Date(2025, 9, 21, 14, 0, 0),
  },
  {
    id: 3,
    title: 'Project Deadline',
    start: new Date(2025, 9, 22, 18, 0, 0),
    end: new Date(2025, 9, 22, 18, 0, 0),
  },
];

export default function CalendarPage() {
  const [events, setEvents] = useState(mockEvents);

  return (
    <div className="space-y-8 p-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
        <p className="text-muted-foreground">
          Your schedule and events.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>My Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ height: 600 }}>
            <BigCalendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ flex: 1 }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
