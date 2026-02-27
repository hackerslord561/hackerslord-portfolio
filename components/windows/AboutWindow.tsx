"use client";

import { motion } from "framer-motion";
import { GraduationCap, Mail, Phone, MapPin, ExternalLink } from "lucide-react";
import Image from "next/image";

export function AboutWindow() {
    const container = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const item = {
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300 } }
    };

    return (
        <motion.div
            className="flex flex-col md:flex-row gap-8 h-full w-full cursor-none"
            variants={container}
            initial="hidden"
            animate="show"
        >
            {/* Left Sidebar: Profile Details */}
            <motion.div variants={item} className="md:w-1/3 flex flex-col gap-6">
                <div className="aspect-square w-full bg-accent rounded-2xl overflow-hidden relative border border-border/50">
                    {/* FIX: Converted the Google Drive link to a direct view link */}
                    <Image
                        src="/assets/profile.jpg"
                        alt="Isaiah Katakyie Boadi"
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        priority
                        className="object-cover"
                    />
                </div>

                <div className="flex flex-col gap-3 glass-panel p-5 rounded-2xl text-sm">
                    <a href="mailto:isaiahkboadi14@gmail.com" className="flex items-center gap-3 text-foreground/80 hover:text-foreground transition-colors clickable">
                        <Mail className="w-4 h-4" />
                        isaiahkboadi14@gmail.com
                    </a>
                    <a href="tel:+233500145586" className="flex items-center gap-3 text-foreground/80 hover:text-foreground transition-colors clickable">
                        <Phone className="w-4 h-4" />
                        +233 500 145 586
                    </a>
                    <div className="flex items-center gap-3 text-foreground/80">
                        <MapPin className="w-4 h-4" />
                        Kumasi, Ghana
                    </div>
                    <a href="https://x.com/hackerslord_24" target="_blank" rel="noreferrer" className="flex items-center justify-between text-foreground/80 hover:text-foreground mt-2 pt-2 border-t border-border/50 transition-colors clickable">
                        <span>@hackerslord_24</span>
                        <ExternalLink className="w-4 h-4" />
                    </a>
                </div>
            </motion.div>

            {/* Right Main Content */}
            <motion.div variants={item} className="md:w-2/3 flex flex-col gap-8">
                <div>
                    <h1 className="text-4xl font-[family-name:var(--font-playfair)] font-bold mb-4 tracking-tight">
                        Isaiah Katakyie Boadi
                    </h1>
                    <h2 className="text-lg text-foreground/50 uppercase tracking-widest font-sans mb-6">
                        Hackerslord
                    </h2>
                    <div className="text-base text-foreground/80 font-sans leading-relaxed space-y-4">
                        <p>
                            I am a self-driven, hardworking, innovative, creative, and enthusiastic guy, always ready for a new challenge. My career objective is to enhance my professional and personal skills in a stable and dynamic workplace with good working conditions and opportunities for career growth.
                        </p>
                        <p>
                            Fundamentally, I am a Math student and photographer who turns data into cinematic stories and builds websites for student startups using motion graphics and "hello world".
                        </p>
                    </div>
                </div>

                <div className="pt-6 border-t border-border/30">
                    <h3 className="text-sm font-bold tracking-widest text-foreground/50 uppercase mb-4 flex items-center gap-2">
                        <GraduationCap className="w-4 h-4" /> Education
                    </h3>
                    <div className="flex flex-col gap-3">
                        <div className="glass-panel p-4 rounded-xl flex justify-between items-center">
                            <span className="font-medium">BSc Mathematics</span>
                            <span className="text-xs text-foreground/50">Kwame Nkrumah University of Science and Technology (KNUST)</span>
                        </div>
                        <div className="glass-panel p-4 rounded-xl flex justify-between items-center opacity-70">
                            <span className="font-medium">High School</span>
                            <span className="text-xs text-foreground/50">Diploma</span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}