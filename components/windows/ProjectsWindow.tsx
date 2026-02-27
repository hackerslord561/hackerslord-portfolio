"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectCard } from "@/components/ui/ProjectCard";

type Category = "All" | "Photography" | "Websites" | "Video Edits" | "Cinematography";

interface Project {
    id: string;
    title: string;
    category: Category;
    imageSrc?: string;
}

const portfolioData: Project[] = [
    // Websites
    { id: "1", title: "KNUST E-learning Data Center", category: "Websites" },
    { id: "2", title: "Vault Git Version Control", category: "Websites" },
    { id: "3", title: "Hostelhubb", category: "Websites" },
    { id: "4", title: "Achimota School 2002 Year Group Website", category: "Websites" },
    { id: "5", title: "Berry Pulse Media Website", category: "Websites" },
    // Video Edits
    { id: "6", title: "Tasty Tom Promo Video", category: "Video Edits" },
    { id: "7", title: "Berry Pulse Media Highlights Reel", category: "Video Edits" },
    { id: "8", title: "Berry Pulse News Reel", category: "Video Edits" },
    // Cinematography
    { id: "9", title: "CWA Movie Premiere Animation", category: "Cinematography" },
    { id: "10", title: "Hype Room Studios Trailer", category: "Cinematography" },
    // Photography
    { id: "11", title: "Lauderium Shots", category: "Photography" },
    { id: "12", title: "TLOC Lauderium 4.0", category: "Photography" }
];

const categories: Category[] = ["All", "Photography", "Websites", "Video Edits", "Cinematography"];

export function ProjectsWindow() {
    const [activeCategory, setActiveCategory] = useState<Category>("All");

    const filteredProjects = portfolioData.filter(
        (project) => activeCategory === "All" || project.category === activeCategory
    );

    return (
        <div className="flex flex-col h-full w-full cursor-none">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                <div>
                    <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-playfair)] font-bold tracking-tight mb-3">
                        Selected Works
                    </h2>
                    <p className="text-foreground/60 font-sans max-w-md text-sm">
                        A curated collection of visual stories, digital experiences, and cinematic moments.
                    </p>
                </div>

                {/* Filter Tabs */}
                <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-3 py-1.5 rounded-full text-xs font-sans transition-all duration-300 clickable ${
                                activeCategory === category
                                    ? "bg-foreground text-background"
                                    : "bg-transparent text-foreground hover:bg-foreground/10 border border-border/50"
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-10 pb-12">
                <AnimatePresence mode="popLayout">
                    {filteredProjects.map((project) => (
                        <motion.div
                            key={project.id}
                            layout
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
                        >
                            <ProjectCard
                                title={project.title}
                                category={project.category}
                                imageSrc={project.imageSrc}
                            />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}