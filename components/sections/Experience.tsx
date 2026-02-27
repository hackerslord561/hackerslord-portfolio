"use client";

import { motion } from "framer-motion";

interface Role {
    id: string;
    title: string;
    company: string;
    period: string;
    description: string[];
}

const experiences: Role[] = [
    {
        id: "1",
        title: "Senior Technical Director",
        company: "Berry Pulse Media Inc.",
        period: "Feb 2025 - Present",
        description: [
            "Oversee production and creative technology initiatives.",
            "Develop innovative software solutions to enhance operations and client offerings.",
            "Collaborate with cross-functional teams to ensure seamless integration of technology."
        ]
    },
    {
        id: "2",
        title: "Advertising Manager",
        company: "Hostelhubb",
        period: "Apr 2025 - Present",
        description: [
            "Design and implement social media strategies to increase online engagement.",
            "Manage digital campaigns to promote hostel services and events."
        ]
    },
    {
        id: "3",
        title: "Organizer",
        company: "AXI Pipeline Launch",
        period: "Dec 2025 - Present",
        description: [
            "Collaborate with organizers to handle the overall planning of the Ideation Axis AXI Launch in February 2026."
        ]
    },
    {
        id: "4",
        title: "Intern (Cybersecurity)",
        company: "Ideation Axis",
        period: "Sep 2024 - Nov 2024",
        description: [
            "Conducted penetration testing and ethical hacking.",
            "Ensured company security systems were updated and free from vulnerabilities."
        ]
    },
    {
        id: "5",
        title: "Media and Technical Head",
        company: "Assemblies of God International Church - CCC",
        period: "Sep 2023 - Present",
        description: [
            "Revamped social media presence and created appealing visual content.",
            "Managed internal church technical systems."
        ]
    }
];

export function Experience() {
    return (
        <section id="experience" className="py-24 px-6 md:px-12 lg:px-24 bg-background text-foreground">
            <div className="max-w-4xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-6xl font-[family-name:var(--font-playfair)] font-bold tracking-tight mb-16"
                >
                    Work Experience
                </motion.h2>

                <div className="space-y-16">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={exp.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group flex flex-col md:flex-row gap-4 md:gap-12"
                        >
                            <div className="md:w-1/4 flex-shrink-0">
                                <p className="text-sm font-sans text-foreground/50 uppercase tracking-widest mt-1">
                                    {exp.period}
                                </p>
                            </div>

                            <div className="md:w-3/4">
                                <h3 className="text-2xl font-[family-name:var(--font-playfair)] font-medium text-foreground mb-1">
                                    {exp.title}
                                </h3>
                                <h4 className="text-lg font-sans text-foreground/70 mb-4">
                                    {exp.company}
                                </h4>
                                <ul className="space-y-2">
                                    {exp.description.map((item, i) => (
                                        <li key={i} className="text-foreground/80 font-sans leading-relaxed flex items-start">
                                            <span className="mr-3 text-foreground/30 mt-1.5">•</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}