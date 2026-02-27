"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ShieldAlert, TerminalSquare } from "lucide-react";
import Image from "next/image";

export function CyberHero() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const bgTextY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
    const hackerY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
    const hackerScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

    const propLeftY = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);
    const propRightY = useTransform(scrollYProgress, [0, 1], ["0%", "90%"]);

    const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const globalOpacity = useTransform(scrollYProgress, [0.6, 1], [1, 0]);

    return (
        <motion.section
            ref={containerRef}
            style={{ opacity: globalOpacity }}
            className="relative h-[120vh] w-full flex flex-col items-center justify-center overflow-hidden cursor-none"
        >
            {/* 1. The Binary Rain Video Background */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-background">
                {/* FIX: Removed mix-blend-screen and added standard opacity that works in both modes */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    className="w-full h-full object-cover opacity-20 dark:opacity-40"
                >
                    <source src="/assets/cyber-bg.mp4" type="video/mp4" />
                </video>
                {/* Adjusted the gradient overlay to blend softer */}
                <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background" />
            </div>

            {/* 2. Deep Background Catchphrase */}
            <motion.div
                style={{ y: bgTextY, opacity: textOpacity }}
                className="absolute z-10 flex flex-col items-center text-center w-full pointer-events-none"
            >
                <h1 className="text-[12vw] leading-none font-black text-foreground/5 tracking-tighter uppercase font-sans whitespace-nowrap">
                    NO SYSTEM
                </h1>
                <h1 className="text-[12vw] leading-none font-black text-foreground/5 tracking-tighter uppercase font-sans whitespace-nowrap">
                    IS SAFE
                </h1>
            </motion.div>

            {/* 3. Floating Edge Elements */}
            <motion.div
                style={{ y: propLeftY }}
                className="absolute left-4 md:left-20 top-1/4 z-30 opacity-70 blur-[2px] pointer-events-none"
            >
                <div className="relative w-24 h-24 md:w-40 md:h-40">
                    <Image
                        src="/assets/prop-padlock.png"
                        alt="Security Prop"
                        fill
                        priority
                        sizes="(max-width: 768px) 96px, 160px"
                        className="object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                        onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.parentElement!.innerHTML = '<div class="w-full h-full flex items-center justify-center bg-foreground/10 rounded-2xl backdrop-blur-xl border border-border/50 shadow-2xl rotate-12"><ShieldAlert class="w-12 h-12 text-foreground/50" /></div>';
                        }}
                    />
                </div>
            </motion.div>

            <motion.div
                style={{ y: propRightY }}
                className="absolute right-4 md:right-20 bottom-1/4 z-30 opacity-60 blur-[3px] pointer-events-none"
            >
                <div className="relative w-32 h-32 md:w-48 md:h-48">
                    <Image
                        src="/assets/prop-chip.png"
                        alt="Hardware Prop"
                        fill
                        priority
                        sizes="(max-width: 768px) 128px, 192px"
                        className="object-contain drop-shadow-[0_0_40px_rgba(255,255,255,0.1)] -rotate-12"
                        onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.parentElement!.innerHTML = '<div class="w-full h-full flex items-center justify-center bg-foreground/10 rounded-2xl backdrop-blur-xl border border-border/50 shadow-2xl -rotate-12"><TerminalSquare class="w-16 h-16 text-foreground/50" /></div>';
                        }}
                    />
                </div>
            </motion.div>

            {/* 4. Central Character */}
            <motion.div
                style={{ y: hackerY, scale: hackerScale }}
                className="relative z-20 w-[90%] md:w-[600px] h-[50vh] md:h-[70vh] flex items-end justify-center pointer-events-none"
            >
                <Image
                    src="/assets/hacker-main.png"
                    alt="Hackerslord Mainframe"
                    fill
                    priority
                    sizes="(max-width: 768px) 90vw, 600px"
                    className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                    onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement!.innerHTML = '<div class="w-[300px] h-[400px] bg-gradient-to-t from-foreground/20 to-transparent rounded-t-full border-t border-border/50 backdrop-blur-sm flex items-end justify-center pb-10"><span class="text-foreground/30 font-sans tracking-widest text-sm">[ hacker-main.png ]</span></div>';
                    }}
                />
            </motion.div>

            {/* 5. Foreground Catchphrase */}
            <motion.div
                style={{ y: hackerY, opacity: textOpacity }}
                className="absolute z-40 bottom-32 md:bottom-20 flex flex-col items-center text-center px-6 pointer-events-none"
            >
                <div className="glass-panel px-6 py-3 rounded-full mb-6 border-white/10 flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs uppercase tracking-[0.2em] font-medium text-foreground/80 font-sans">
            Access Granted
          </span>
                </div>

                <h2 className="text-4xl md:text-6xl lg:text-7xl font-[family-name:var(--font-playfair)] font-bold tracking-tight text-foreground drop-shadow-xl">
                    Your firewall is my front door.
                </h2>
                <p className="text-xl md:text-2xl font-sans text-foreground/70 mt-4 font-light tracking-wide">
                    Welcome to the Mainframe, <span className="font-medium text-foreground">Hackerslord.</span>
                </p>
            </motion.div>

            {/* 6. Scroll Indicator */}
            <motion.div
                style={{ opacity: textOpacity }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
            >
        <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-foreground/40">
          Scroll to Initialize
        </span>
                <div className="w-[1px] h-12 bg-foreground/20 overflow-hidden relative">
                    <motion.div
                        className="w-full h-full bg-foreground absolute top-0 left-0"
                        animate={{ y: ["-100%", "100%"] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    />
                </div>
            </motion.div>
        </motion.section>
    );
}