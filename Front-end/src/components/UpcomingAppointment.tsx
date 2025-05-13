import React, { useMemo } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface AppointmentProps {
  date: string; // Expected format: "DD Month" (e.g., "15 March")
  day: string; // e.g., "Monday"
  doctor: string; // e.g., "Dr. Smith"
}

export function UpcomingAppointment({ date, day, doctor }: AppointmentProps) {
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString("default", { month: "long" });
  const currentYear = currentDate.getFullYear();

  // Validate date prop and parse appointment day
  const appointmentDay = (() => {
    if (!date || typeof date !== "string") return null;
    const dayPart = date.split(" ")[0];
    const parsedDay = parseInt(dayPart, 10);
    return isNaN(parsedDay) ? null : parsedDay;
  })();

  // Memoized calendar generation
  const calendar = useMemo(() => {
    const daysInMonth = new Date(
      currentYear,
      currentDate.getMonth() + 1,
      0
    ).getDate();
    const firstDayOfMonth = new Date(
      currentYear,
      currentDate.getMonth(),
      1
    ).getDay();
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const weeks: (number | null)[][] = [];
    let week: (number | null)[] = Array(7).fill(null);

    // Add empty cells for days before the first of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      week[i] = null;
    }

    // Fill in the days of the month
    let dayIndex = firstDayOfMonth;
    for (let i = 0; i < days.length; i++) {
      week[dayIndex % 7] = days[i];
      dayIndex++;
      if (dayIndex % 7 === 0 || i === days.length - 1) {
        weeks.push([...week]);
        week = Array(7).fill(null);
      }
    }

    // Ensure the last week is added if it has any days
    if (dayIndex % 7 !== 0) {
      weeks.push([...week]);
    }

    return weeks;
  }, [currentYear, currentDate.getMonth()]);

  return (
    <Card className="bg-blue-50 border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl">Upcoming appointment</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-3xl font-medium text-blue-500 mb-1">
              Your next visit is arriving soon
            </h3>
            <p className="text-lg font-medium">
              {date || "Date not provided"}, {day || "Day not provided"}
            </p>
            <p className="text-blue-500 mt-4">{doctor || "Doctor not provided"}</p>
            <Button className="mt-6 bg-blue-500 hover:bg-blue-600 text-white">
              Reschedule
            </Button>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-center mb-4">
              <h3 className="font-medium">
                {currentMonth} {currentYear}
              </h3>
            </div>
            <div className="grid grid-cols-7 text-center text-xs mb-2">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="text-blue-500">
                  {day}
                </div>
              ))}
            </div>
            {calendar.map((week, weekIndex) => (
              <div
                key={weekIndex}
                className="grid grid-cols-7 text-center"
                role="row"
              >
                {week.map((day, dayIndex) => (
                  <div key={dayIndex} className="py-1" role="gridcell">
                    {day !== null && (
                      <div
                        className={`h-8 w-8 mx-auto flex items-center justify-center rounded-full text-sm ${
                          day === appointmentDay
                            ? "bg-blue-500 text-white"
                            : "text-blue-600"
                        }`}
                        aria-label={`Day ${day}`}
                        role="button"
                        tabIndex={0}
                      >
                        {day}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}