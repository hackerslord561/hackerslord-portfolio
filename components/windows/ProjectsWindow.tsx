"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { db } from "@/lib/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { Loader2, X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

type Category = "All" | "Photography" | "Websites" | "Video Edits" | "Cinematography";

interface Project {
    id: string;
    title: string;
    category: string;
    imageSrc: string;
    gallery?: string[];
    link?: string;
}

const categories: Category[] = ["All", "Photography", "Websites", "Video Edits", "Cinematography"];

export function ProjectsWindow() {
    const [activeCategory, setActiveCategory] = useState<Category>("All");
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    // Gallery State
    const [activeGallery, setActiveGallery] = useState<Project | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
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

    const openGallery = (project: Project) => {
        if (project.gallery && project.gallery.length > 0) {
            setActiveGallery(project);
            setCurrentImageIndex(0);
        }
    };

    const nextImage = () => {
        if (activeGallery && activeGallery.gallery) {
            setCurrentImageIndex((prev) => (prev + 1) % activeGallery.gallery!.length);
        }
    };

    const prevImage = () => {
        if (activeGallery && activeGallery.gallery) {
            setCurrentImageIndex((prev) => (prev - 1 + activeGallery.gallery!.length) % activeGallery.gallery!.length);
        }
    };

    return (
        <div className="flex flex-col h-full w-full cursor-none relative">
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
                                    gallery={project.gallery}
                                    onClick={() => openGallery(project)}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            )}

            {/* Fullscreen Gallery Viewer Modal */}
            <AnimatePresence>
                {activeGallery && activeGallery.gallery && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] bg-background/95 backdrop-blur-xl flex flex-col"
                    >
                        {/* Gallery Header */}
                        <div className="flex items-center justify-between p-6 md:p-10 border-b border-border/20">
                            <div>
                                <h3 className="text-2xl font-[family-name:var(--font-playfair)] font-bold">{activeGallery.title}</h3>
                                <p className="text-xs uppercase tracking-widest text-foreground/50 font-sans mt-1">
                                    {currentImageIndex + 1} / {activeGallery.gallery.length}
                                </p>
                            </div>
                            <button
                                onClick={() => setActiveGallery(null)}
                                className="w-10 h-10 bg-foreground/10 rounded-full flex items-center justify-center hover:bg-foreground/20 transition-colors clickable"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Gallery Image Area */}
                        <div className="flex-1 relative flex items-center justify-center overflow-hidden p-6 md:p-10">
                            <motion.div
                                key={currentImageIndex}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="relative w-full max-w-5xl h-full"
                            >
                                <Image
                                    src={activeGallery.gallery[currentImageIndex]}
                                    alt={`${activeGallery.title} - Image ${currentImageIndex + 1}`}
                                    fill
                                    className="object-contain"
                                    quality={100}
                                />
                            </motion.div>

                            {/* Navigation Controls */}
                            {activeGallery.gallery.length > 1 && (
                                <>
                                    <button
                                        onClick={prevImage}
                                        className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 w-12 h-12 bg-background/80 backdrop-blur rounded-full flex items-center justify-center hover:bg-background border border-border/50 shadow-xl clickable"
                                    >
                                        <ChevronLeft className="w-6 h-6" />
                                    </button>
                                    <button
                                        onClick={nextImage}
                                        className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 w-12 h-12 bg-background/80 backdrop-blur rounded-full flex items-center justify-center hover:bg-background border border-border/50 shadow-xl clickable"
                                    >
                                        <ChevronRight className="w-6 h-6" />
                                    </button>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}