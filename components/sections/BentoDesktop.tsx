"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FolderKanban, User, Wrench, FileText, Mail, Github, Linkedin, Twitter, Loader2 } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";

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

interface Project {
    id: string;
    title: string;
    category: string;
    imageSrc: string;
    link?: string;
}

export function BentoDesktop() {
    const [activeApp, setActiveApp] = useState<AppType>(null);
    const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
    const [loadingProjects, setLoadingProjects] = useState(true);

    // Fetch only featured projects from the Mainframe database
    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                const q = query(collection(db, "projects"), where("isFeatured", "==", true));
                const querySnapshot = await getDocs(q);

                const fetched = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as Project[];

                setFeaturedProjects(fetched);
            } catch (error) {
                console.error("Error fetching featured projects:", error);
            } finally {
                setLoadingProjects(false);
            }
        };

        fetchFeatured();
    }, []);

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
            <section className="min-h-screen w-full pt-20 pb-32 px-6 md:px-12 lg:px-24 relative">
                <motion.div
                    className="w-full max-w-6xl mx-auto flex flex-col gap-24 relative z-10"
                    variants={container}
                    initial="hidden"
                    animate="show"
                >

                    {/* TOP SECTION: Femi's OS Dashboard */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        {/* Left Column: Widgets */}
                        <div className="md:col-span-4 flex flex-col gap-6">
                            <motion.div variants={item} className="h-32"><ClockWidget /></motion.div>
                            <motion.div variants={item} className="h-64"><CalendarWidget /></motion.div>
                            <motion.div variants={item} className="h-40"><WeatherWidget /></motion.div>
                        </div>

                        {/* Middle & Right Column: Large Apps */}
                        <div className="md:col-span-8 grid grid-cols-2 lg:grid-cols-4 gap-6 items-start content-start">
                            <motion.div variants={item} className="col-span-1 lg:col-span-2">
                                <AppIcon title="Projects" icon={FolderKanban} colorClass="bg-blue-500" isLarge onClick={() => setActiveApp("Projects")} />
                            </motion.div>
                            <motion.div variants={item} className="col-span-1 lg:col-span-2">
                                <AppIcon title="About" icon={User} colorClass="bg-purple-500" isLarge onClick={() => setActiveApp("About")} />
                            </motion.div>
                            <motion.div variants={item} className="col-span-1 lg:col-span-2">
                                <AppIcon title="Skills" icon={Wrench} colorClass="bg-red-500" isLarge onClick={() => setActiveApp("Skills")} />
                            </motion.div>
                            <motion.div variants={item} className="col-span-1 lg:col-span-2">
                                <AppIcon title="Resume" icon={FileText} colorClass="bg-orange-500" isLarge onClick={() => setActiveApp("Resume")} />
                            </motion.div>

                            {/* Bottom Row: Social & Contact Mini Apps */}
                            <div className="col-span-2 lg:col-span-4 grid grid-cols-4 gap-4 lg:gap-6 mt-2">
                                <motion.div variants={item}><AppIcon title="Mail" icon={Mail} colorClass="bg-green-500" href="mailto:isaiahkboadi14@gmail.com" /></motion.div>
                                <motion.div variants={item}><AppIcon title="GitHub" icon={Github} colorClass="bg-gray-800 dark:bg-gray-700" href="#" /></motion.div>
                                <motion.div variants={item}><AppIcon title="LinkedIn" icon={Linkedin} colorClass="bg-blue-600" href="#" /></motion.div>
                                <motion.div variants={item}><AppIcon title="X" icon={Twitter} colorClass="bg-black" href="https://x.com/hackerslord_24" /></motion.div>
                            </div>
                        </div>
                    </div>

                    {/* BOTTOM SECTION: Chaitanya's Dynamic Scrolling Feed */}
                    <motion.div variants={item} className="flex flex-col gap-10">
                        <div className="flex items-center gap-4 px-2">
                            <h2 className="text-3xl md:text-5xl font-[family-name:var(--font-playfair)] font-bold tracking-tight">
                                Featured Work
                            </h2>
                            <div className="h-[1px] flex-1 bg-border/50 mt-2" />
                        </div>

                        {loadingProjects ? (
                            <div className="w-full py-20 flex flex-col items-center justify-center gap-4 text-foreground/50">
                                <Loader2 className="w-8 h-8 animate-spin" />
                                <span className="text-sm font-sans tracking-widest uppercase">Accessing Database...</span>
                            </div>
                        ) : featuredProjects.length === 0 ? (
                            <div className="w-full py-20 flex items-center justify-center text-foreground/50 font-sans border border-dashed border-border/50 rounded-2xl">
                                No featured projects online. Boot up the Admin Dashboard to push content.
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                                {featuredProjects.map((project, index) => (
                                    <motion.div
                                        key={project.id}
                                        whileHover={{ y: -10 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                        // This alternating margin creates that beautiful asymmetrical masonry flow
                                        className={index % 2 !== 0 ? "md:mt-12" : ""}
                                    >
                                        <ProjectCard
                                            title={project.title}
                                            category={project.category}
                                            imageSrc={project.imageSrc}
                                            link={project.link}
                                        />
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </motion.div>

                </motion.div>
            </section>

            {/* OS Windows Rendering */}
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