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

export function Work() {
    const [activeCategory, setActiveCategory] = useState<Category>("All");

    const filteredProjects = portfolioData.filter(
        (project) => activeCategory === "All" || project.category === activeCategory
    );

    return (
        <section id="work" className="py-24 px-6 md:px-12 lg:px-24 min-h-screen bg-background text-foreground">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                    <div>
                        <h2 className="text-4xl md:text-6xl font-[family-name:var(--font-playfair)] font-bold tracking-tight mb-4">
                            Selected Works
                        </h2>
                        <p className="text-foreground/60 font-sans max-w-md">
                            A curated collection of visual stories, digital experiences, and cinematic moments.
                        </p>
                    </div>

                    {/* Custom Filter Tabs */}
                    <div className="flex flex-wrap gap-2 md:gap-4">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`px-4 py-2 rounded-full text-sm font-sans transition-all duration-300 ${
                                    activeCategory === category
                                        ? "bg-foreground text-background"
                                        : "bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground border border-border"
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-8 gap-y-16">
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project) => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
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
        </section>
    );
}