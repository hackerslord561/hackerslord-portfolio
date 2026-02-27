"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function ClockWidget() {
    const [time, setTime] = useState<Date | null>(null);

    useEffect(() => {
        setTime(new Date());
        const interval = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    if (!time) return <div className="glass-panel rounded-3xl h-full w-full animate-pulse" />;

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        });
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
        });
    };

    return (
        <motion.div
            className="glass-panel rounded-3xl p-6 flex flex-col justify-center items-start h-full w-full clickable"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
            <div className="flex items-baseline gap-2">
                <h2 className="text-4xl md:text-5xl font-light tracking-tight text-foreground">
                    {formatTime(time)}
                </h2>
                <span className="text-sm font-medium text-foreground/60 uppercase tracking-widest">
          {formatDate(time)}
        </span>
            </div>
        </motion.div>
    );
}