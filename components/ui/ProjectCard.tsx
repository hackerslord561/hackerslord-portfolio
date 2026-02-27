"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Images } from "lucide-react";
import Image from "next/image";

interface ProjectCardProps {
    title: string;
    category: string;
    imageSrc?: string;
    link?: string;
    gallery?: string[];
    onClick?: () => void; // Added onClick handler
}

export function ProjectCard({ title, category, imageSrc, link, gallery, onClick }: ProjectCardProps) {
    const isGallery = gallery && gallery.length > 0;

    // If it's a gallery, we want it to act like a button. If not, it acts like a link.
    const CardWrapper = isGallery ? "button" : motion.a;
    const wrapperProps = isGallery
        ? { onClick, className: "group block w-full cursor-none overflow-hidden clickable text-left" }
        : { href: link || "#", target: "_blank", rel: "noopener noreferrer", className: "group block w-full cursor-none overflow-hidden clickable" };

    return (
        <CardWrapper {...wrapperProps as any}>
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-accent rounded-2xl mb-4 border border-border/50">
                {imageSrc ? (
                    <motion.div
                        className="w-full h-full relative"
                        variants={{
                            initial: { scale: 1 },
                            hover: { scale: 1.05 },
                        }}
                        transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                    >
                        <Image
                            src={imageSrc}
                            alt={title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover"
                            loading="lazy"
                        />
                    </motion.div>
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-foreground/5 text-foreground/40 font-sans text-sm">
                        [ Image Placeholder ]
                    </div>
                )}

                {/* Subtle overlay that appears on hover */}
                <motion.div
                    className="absolute inset-0 bg-background/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center pointer-events-none"
                >
                    <div className="bg-background text-foreground rounded-full p-3 shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        {isGallery ? <Images className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                    </div>
                </motion.div>
            </div>

            <div className="flex flex-col gap-1 px-1">
                <p className="text-xs uppercase tracking-widest text-foreground/50 font-sans font-medium">
                    {category}
                </p>
                <h3 className="text-xl md:text-2xl font-[family-name:var(--font-playfair)] font-medium text-foreground tracking-tight group-hover:text-foreground/70 transition-colors duration-300">
                    {title}
                </h3>
            </div>
        </CardWrapper>
    );
}