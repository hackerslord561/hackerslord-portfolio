"use client";

import { motion } from "framer-motion";

const experience = [
    {
        role: "Senior Technical Director",
        company: "Berry Pulse Media Inc.",
        date: "Feb 2025 - Present",
        desc: "Oversaw production and creative technology initiatives. Developed innovative software solutions to enhance company operations and collaborated with cross-functional teams."
    },
    {
        role: "Advertising Manager",
        company: "Hostelhubb",
        date: "Apr 2025 - Present",
        desc: "Designed and implemented social media strategies, increasing online engagement. Managed digital campaigns to promote hostel services and events."
    },
    {
        role: "Organizer",
        company: "AXI Pipeline Launch",
        date: "Dec 2025 - Present",
        desc: "Collaborated with other organizers to handle the overall organization of the Ideation Axis AXI Launch in February 2026."
    },
    {
        role: "Intern (Cybersecurity)",
        company: "Ideation Axis",
        date: "Sep 2024 - Nov 2024",
        desc: "Interned as an Ethical hacker and Penetration tester ensuring that security systems were up to date and free from vulnerabilities. Ran tests on labs."
    },
    {
        role: "Media and Technical Head",
        company: "Assemblies of God International Church - CCC",
        date: "Sep 2023 - Present",
        desc: "Revamped the social media presence and created appealing visuals. Managed internal church systems."
    }
];

export function ResumeWindow() {
    return (
        <div className="w-full max-w-3xl mx-auto cursor-none">
            <h2 className="text-4xl font-[family-name:var(--font-playfair)] font-bold mb-10 tracking-tight">
                Work Experience
            </h2>

            <div className="relative border-l border-foreground/20 ml-3 md:ml-4 space-y-10 pb-8">
                {experience.map((job, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
                        className="relative pl-8 md:pl-10"
                    >
                        {/* Timeline Dot */}
                        <div className="absolute w-3 h-3 bg-foreground rounded-full -left-[6.5px] top-2 shadow-[0_0_0_4px_hsl(var(--background))]" />

                        <div className="flex flex-col gap-1">
              <span className="text-xs font-bold tracking-widest text-foreground/50 uppercase">
                {job.date}
              </span>
                            <h3 className="text-2xl font-[family-name:var(--font-playfair)] font-medium mt-1">
                                {job.role}
                            </h3>
                            <h4 className="text-sm font-sans text-foreground/80 font-medium mb-3">
                                {job.company}
                            </h4>
                            <p className="text-sm font-sans text-foreground/70 leading-relaxed">
                                {job.desc}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}