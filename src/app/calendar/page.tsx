'use client';

import { useMemo, useState } from 'react';
import CalendarHeader from '@/components/home/calendar/CalendarHeader';
import Calendar from '@/components/home/calendar/Calendar';
import ConcertGrid from '@/components/my/MyConcertGrid';
import { mockConcerts } from '@/mocks/mockConcerts';

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showCalendar, setShowCalendar] = useState(true);

  const concertsToShow = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const base = !selectedDate ? mockConcerts : mockConcerts.filter((c) => c.date === selectedDate);

    return [...base].sort((a, b) => {
      const aDate = new Date(a.date);
      const bDate = new Date(b.date);

      const aPast = aDate < today;
      const bPast = bDate < today;

      if (aPast !== bPast) return aPast ? 1 : -1;
      if (!aPast) return bDate.getTime() - aDate.getTime();
      return aDate.getTime() - bDate.getTime();
    });
  }, [selectedDate]);

  return (
    <div className="text-white flex flex-col items-center min-h-screen bg-black">
      <CalendarHeader
        isCalendarOpen={showCalendar}
        onToggleCalendar={() => setShowCalendar((prev) => !prev)}
      />
      {showCalendar && <Calendar selectedDate={selectedDate} onSelectDate={setSelectedDate} />}
      <div className="w-full flex justify-start ml-10">
        <ConcertGrid concerts={concertsToShow} />
      </div>
    </div>
  );
}
