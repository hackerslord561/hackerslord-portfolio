"use client";

import { motion } from "framer-motion";

const skills = [
    "Web Designing",
    "Photography",
    "Cinematography",
    "Graphic Designing",
    "Penetration Testing"
];

const tools = [
    "JavaScript", "React", "Next.js", "WordPress",
    "Adobe Premiere Pro", "Adobe After Effects", "Adobe Photoshop",
    "Adobe Illustrator", "Adobe Lightroom", "Figma", "Canva"
];

export function About() {
    return (
        <section id="about" className="py-24 px-6 md:px-12 lg:px-24 bg-background text-foreground border-t border-border/30">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">

                {/* Bio Column */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="lg:col-span-7 flex flex-col gap-8"
                >
                    <h2 className="text-4xl md:text-6xl font-[family-name:var(--font-playfair)] font-bold tracking-tight">
                        About Me
                    </h2>
                    <div className="text-lg md:text-xl text-foreground/80 font-sans leading-relaxed space-y-6">
                        <p>
                            I am Isaiah Katakyie Boadi, known digitally as Hackerslord. I am a self-driven, hardworking, and enthusiastic creative, always ready for a new challenge.
                        </p>
                        <p>
                            My career objective is to enhance my professional and personal skills in a dynamic workplace, focusing on career growth while meeting corporate goals. I am fundamentally a Math student who turns complex data into cinematic stories and builds tailored websites for student startups, bridging the gap between motion graphics and code.
                        </p>
                        <p>
                            Whether I am behind the lens as a photographer and cinematographer, or in front of an IDE writing "hello world", I live and create with character.
                        </p>
                    </div>

                    <div className="pt-8 border-t border-border/50">
                        <h3 className="text-sm uppercase tracking-widest text-foreground/50 mb-4 font-sans font-medium">Education</h3>
                        <ul className="space-y-2 font-sans text-lg">
                            <li>BSc Mathematics</li>
                            <li className="text-foreground/60">High School Diploma</li>
                        </ul>
                    </div>
                </motion.div>

                {/* Skills & Tools Column */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="lg:col-span-5 flex flex-col gap-12"
                >
                    <div>
                        <h3 className="text-sm uppercase tracking-widest text-foreground/50 mb-6 font-sans font-medium">Skill Set</h3>
                        <div className="flex flex-wrap gap-3">
                            {skills.map((skill) => (
                                <span key={skill} className="px-4 py-2 border border-border rounded-full text-sm font-sans hover:bg-foreground hover:text-background transition-colors duration-300">
                  {skill}
                </span>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm uppercase tracking-widest text-foreground/50 mb-6 font-sans font-medium">Software & Tools</h3>
                        <div className="flex flex-wrap gap-3">
                            {tools.map((tool) => (
                                <span key={tool} className="px-4 py-2 bg-accent text-accent-foreground rounded-sm text-sm font-sans">
                  {tool}
                </span>
                            ))}
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}