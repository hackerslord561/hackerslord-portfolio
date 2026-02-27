"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FolderKanban, User, Wrench, FileText, Mail, Github, Linkedin, Twitter } from "lucide-react";

// Widgets
import { ClockWidget } from "@/components/widgets/ClockWidget";
import { WeatherWidget } from "@/components/widgets/WeatherWidget";
import { CalendarWidget } from "@/components/widgets/CalendarWidget";

// UI Components
import { AppIcon } from "@/components/ui/AppIcon";
import { AppWindow } from "@/components/ui/AppWindow";
import { ProjectCard } from "@/components/ui/ProjectCard";

// Windows
import { ProjectsWindow } from "@/components/windows/ProjectsWindow";
import { AboutWindow } from "@/components/windows/AboutWindow";
import { SkillsWindow } from "@/components/windows/SkillsWindow";
import { ResumeWindow } from "@/components/windows/ResumeWindow";

type AppType = "Projects" | "About" | "Skills" | "Resume" | null;

export function BentoDesktop() {
    const [activeApp, setActiveApp] = useState<AppType>(null);

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.3 }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20, scale: 0.95 },
        show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
    };

    return (
        <>
            {/* Changed to min-h-screen with padding top/bottom to allow natural scrolling
        This completely fixes the mobile overlap issue.
      */}
            <section className="min-h-screen w-full pt-20 pb-32 px-6 md:px-12 lg:px-24 relative">
                <motion.div
                    className="w-full max-w-6xl mx-auto flex flex-col gap-24 relative z-10"
                    variants={container}
                    initial="hidden"
                    animate="show"
                >

                    {/* TOP SECTION: Femi's OS Dashboard */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        {/* Left Column: Widgets (Clock, Calendar, Weather) */}
                        <div className="md:col-span-4 flex flex-col gap-6">
                            <motion.div variants={item} className="h-32">
                                <ClockWidget />
                            </motion.div>

                            <motion.div variants={item} className="h-64">
                                <CalendarWidget />
                            </motion.div>

                            <motion.div variants={item} className="h-40">
                                <WeatherWidget />
                            </motion.div>
                        </div>

                        {/* Middle & Right Column: Large Apps */}
                        <div className="md:col-span-8 grid grid-cols-2 lg:grid-cols-4 gap-6 items-start content-start">
                            <motion.div variants={item} className="col-span-1 lg:col-span-2">
                                <AppIcon
                                    title="Projects"
                                    icon={FolderKanban}
                                    colorClass="bg-blue-500"
                                    isLarge
                                    onClick={() => setActiveApp("Projects")}
                                />
                            </motion.div>
                            <motion.div variants={item} className="col-span-1 lg:col-span-2">
                                <AppIcon
                                    title="About"
                                    icon={User}
                                    colorClass="bg-purple-500"
                                    isLarge
                                    onClick={() => setActiveApp("About")}
                                />
                            </motion.div>
                            <motion.div variants={item} className="col-span-1 lg:col-span-2">
                                <AppIcon
                                    title="Skills"
                                    icon={Wrench}
                                    colorClass="bg-red-500"
                                    isLarge
                                    onClick={() => setActiveApp("Skills")}
                                />
                            </motion.div>
                            <motion.div variants={item} className="col-span-1 lg:col-span-2">
                                <AppIcon
                                    title="Resume"
                                    icon={FileText}
                                    colorClass="bg-orange-500"
                                    isLarge
                                    onClick={() => setActiveApp("Resume")}
                                />
                            </motion.div>

                            {/* Bottom Row: Social & Contact Mini Apps */}
                            <div className="col-span-2 lg:col-span-4 grid grid-cols-4 gap-4 lg:gap-6 mt-2">
                                <motion.div variants={item}>
                                    <AppIcon title="Mail" icon={Mail} colorClass="bg-green-500" href="mailto:isaiahkboadi14@gmail.com" />
                                </motion.div>
                                <motion.div variants={item}>
                                    <AppIcon title="GitHub" icon={Github} colorClass="bg-gray-800 dark:bg-gray-700" href="#" />
                                </motion.div>
                                <motion.div variants={item}>
                                    <AppIcon title="LinkedIn" icon={Linkedin} colorClass="bg-blue-600" href="#" />
                                </motion.div>
                                <motion.div variants={item}>
                                    <AppIcon title="X" icon={Twitter} colorClass="bg-black" href="https://x.com/hackerslord_24" />
                                </motion.div>
                            </div>
                        </div>
                    </div>

                    {/* BOTTOM SECTION: Chaitanya's Scrolling Feed */}
                    <motion.div variants={item} className="flex flex-col gap-10">
                        <div className="flex items-center gap-4 px-2">
                            <h2 className="text-3xl md:text-5xl font-[family-name:var(--font-playfair)] font-bold tracking-tight">
                                Featured Work
                            </h2>
                            <div className="h-[1px] flex-1 bg-border/50 mt-2" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                            {/* Featured Project 1 */}
                            <motion.div whileHover={{ y: -10 }} transition={{ type: "spring", stiffness: 300 }}>
                                <ProjectCard
                                    title="KNUST E-learning Data Center"
                                    category="Websites"
                                    imageSrc="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop"
                                />
                            </motion.div>

                            {/* Featured Project 2 */}
                            <motion.div whileHover={{ y: -10 }} transition={{ type: "spring", stiffness: 300 }} className="md:mt-12">
                                <ProjectCard
                                    title="Lauderium Shots"
                                    category="Photography"
                                    imageSrc="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2000&auto=format&fit=crop"
                                />
                            </motion.div>

                            {/* Featured Project 3 */}
                            <motion.div whileHover={{ y: -10 }} transition={{ type: "spring", stiffness: 300 }}>
                                <ProjectCard
                                    title="Hostelhubb"
                                    category="Websites"
                                    imageSrc="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=2069&auto=format&fit=crop"
                                />
                            </motion.div>

                            {/* Featured Project 4 */}
                            <motion.div whileHover={{ y: -10 }} transition={{ type: "spring", stiffness: 300 }} className="md:mt-12">
                                <ProjectCard
                                    title="Tasty Tom Promo Video"
                                    category="Cinematography"
                                    imageSrc="https://images.unsplash.com/photo-1574717024453-354056a3df3c?q=80&w=2070&auto=format&fit=crop"
                                />
                            </motion.div>
                        </div>
                    </motion.div>

                </motion.div>
            </section>

            {/* OS Windows Rendering (These still pop open as modals when icons are clicked!) */}
            <AppWindow title="Projects.app" isOpen={activeApp === "Projects"} onClose={() => setActiveApp(null)}>
                <ProjectsWindow />
            </AppWindow>

            <AppWindow title="About.app" isOpen={activeApp === "About"} onClose={() => setActiveApp(null)}>
                <AboutWindow />
            </AppWindow>

            <AppWindow title="Skills.app" isOpen={activeApp === "Skills"} onClose={() => setActiveApp(null)}>
                <SkillsWindow />
            </AppWindow>

            <AppWindow title="Resume.app" isOpen={activeApp === "Resume"} onClose={() => setActiveApp(null)}>
                <ResumeWindow />
            </AppWindow>
        </>
    );
}