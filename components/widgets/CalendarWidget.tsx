"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function CalendarWidget() {
    const [currentDate, setCurrentDate] = useState<Date | null>(null);

    useEffect(() => {
        setCurrentDate(new Date());
    }, []);

    if (!currentDate) return <div className="glass-panel rounded-3xl h-full w-full animate-pulse" />;

    const monthNames = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
    const days = ["S", "M", "T", "W", "T", "F", "S"];

    const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const today = currentDate.getDate();

    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);

    const blankDays = Array.from({ length: firstDay }, (_, i) => i);
    const monthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    return (
        <motion.div
            className="glass-panel rounded-3xl p-5 flex flex-col h-full w-full clickable"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
            <h3 className="text-xs font-bold tracking-widest text-foreground/80 mb-4 uppercase">
                {monthNames[month]}
            </h3>

            <div className="grid grid-cols-7 gap-1 text-center mb-2">
                {days.map((day, i) => (
                    <div key={`header-${i}`} className="text-[10px] font-medium text-foreground/50">
                        {day}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-y-2 gap-x-1 text-center text-sm">
                {blankDays.map((_, i) => (
                    <div key={`blank-${i}`} className="w-6 h-6 mx-auto" />
                ))}
                {monthDays.map((day) => {
                    const isToday = day === today;
                    return (
                        <div key={day} className="flex justify-center items-center">
              <span
                  className={`w-6 h-6 flex items-center justify-center rounded-full ${
                      isToday
                          ? "bg-foreground text-background font-bold shadow-md scale-110"
                          : "text-foreground/80 hover:bg-foreground/10 transition-colors"
                  }`}
              >
                {day}
              </span>
                        </div>
                    );
                })}
            </div>
        </motion.div>
    );
}