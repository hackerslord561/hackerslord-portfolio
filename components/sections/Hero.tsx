"use client";

import { motion } from "framer-motion";

export function Hero() {
    return (
        <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 pt-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-5xl"
            >
                <h2 className="text-sm md:text-lg font-medium tracking-widest text-foreground/60 mb-6 uppercase font-sans">
                    Hi there! I'm Isaiah Katakyie Boadi (Hackerslord)
                </h2>

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] mb-8 font-[family-name:var(--font-playfair)] tracking-tight">
                    Math student. <br />
                    <span className="text-foreground/40 italic">Visual storyteller.</span> <br />
                    Creative developer.
                </h1>

                <p className="text-lg md:text-2xl text-foreground/80 font-sans max-w-2xl leading-relaxed">
                    I turn data into cinematic stories and build bespoke websites for student startups using motion graphics and "hello world".
                </p>
            </motion.div>

            {/* Scroll indicator animation */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 1 }}
                className="absolute bottom-12 left-6 md:left-12 lg:left-24 hidden md:flex flex-col items-start gap-3"
            >
        <span className="text-xs uppercase tracking-[0.2em] font-medium text-foreground/50">
          Scroll to explore
        </span>
                <motion.div
                    className="w-[1px] h-16 bg-foreground/20 ml-[3.5rem] relative overflow-hidden"
                >
                    <motion.div
                        className="w-full h-full bg-foreground absolute top-0 left-0"
                        animate={{ y: ["-100%", "100%"] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    />
                </motion.div>
            </motion.div>
        </section>
    );
}