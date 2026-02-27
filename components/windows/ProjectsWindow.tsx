"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { db } from "@/lib/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { Loader2 } from "lucide-react";

type Category = "All" | "Photography" | "Websites" | "Video Edits" | "Cinematography";

interface Project {
    id: string;
    title: string;
    category: string;
    imageSrc: string;
    link?: string;
}

const categories: Category[] = ["All", "Photography", "Websites", "Video Edits", "Cinematography"];

export function ProjectsWindow() {
    const [activeCategory, setActiveCategory] = useState<Category>("All");
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetch projects from Firebase when the window opens
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                // Query projects ordered by creation date (newest first)
                const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
                const querySnapshot = await getDocs(q);
                const fetchedProjects = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as Project[];

                setProjects(fetchedProjects);
            } catch (error) {
                console.error("Error fetching projects:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    const filteredProjects = projects.filter(
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
                        A curated collection of visual stories, digital experiences, and cinematic moments from the Mainframe.
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

            {loading ? (
                <div className="w-full h-64 flex flex-col items-center justify-center gap-4 text-foreground/50">
                    <Loader2 className="w-8 h-8 animate-spin" />
                    <span className="text-xs font-sans tracking-widest uppercase">Fetching from Database...</span>
                </div>
            ) : projects.length === 0 ? (
                <div className="w-full h-64 flex items-center justify-center text-foreground/50 font-sans">
                    No projects found. Add some from the Admin Dashboard!
                </div>
            ) : (
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
                                    link={project.link}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            )}
        </div>
    );
}