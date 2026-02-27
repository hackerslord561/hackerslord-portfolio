"use client";

import { motion } from "framer-motion";

const services = [
    { name: "Web Designing", icon: "🌐" },
    { name: "Photography", icon: "📸" },
    { name: "Cinematography", icon: "🎥" },
    { name: "Penetration Testing", icon: "👨‍💻" },
    { name: "Graphic Designing", icon: "🎨" },
    { name: "Social Media Management", icon: "📱" },
    { name: "Community Management", icon: "🤝" }
];

const tools = [
    { name: "JavaScript", level: "Expert", color: "bg-green-500/20 text-green-500" },
    { name: "React", level: "Intermediate", color: "bg-blue-500/20 text-blue-500" },
    { name: "WordPress", level: "Expert", color: "bg-green-500/20 text-green-500" },
    { name: "Adobe Premiere Pro", level: "Expert", color: "bg-green-500/20 text-green-500" },
    { name: "Adobe After Effects", level: "Expert", color: "bg-green-500/20 text-green-500" },
    { name: "Adobe Photoshop", level: "Expert", color: "bg-green-500/20 text-green-500" },
    { name: "Adobe Illustrator", level: "Expert", color: "bg-green-500/20 text-green-500" },
    { name: "Adobe Lightroom", level: "Expert", color: "bg-green-500/20 text-green-500" },
    { name: "Figma", level: "Intermediate", color: "bg-blue-500/20 text-blue-500" },
    { name: "Canva", level: "Expert", color: "bg-green-500/20 text-green-500" },
    { name: "Meta Business Suite", level: "Intermediate", color: "bg-blue-500/20 text-blue-500" }
];

export function SkillsWindow() {
    return (
        <div className="flex flex-col gap-12 w-full cursor-none">
            {/* Services Section */}
            <section>
                <h2 className="text-3xl font-[family-name:var(--font-playfair)] font-bold mb-6">Services</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {services.map((service, i) => (
                        <motion.div
                            key={service.name}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="glass-panel p-4 rounded-xl flex flex-col items-center justify-center text-center gap-2 hover:bg-foreground/5 transition-colors clickable"
                        >
                            <span className="text-2xl">{service.icon}</span>
                            <span className="text-sm font-medium">{service.name}</span>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Tools Section */}
            <section>
                <h2 className="text-3xl font-[family-name:var(--font-playfair)] font-bold mb-6">Tools & Expertise</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {tools.map((tool, i) => (
                        <motion.div
                            key={tool.name}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="glass-panel p-4 rounded-xl flex justify-between items-center clickable hover:bg-foreground/5 transition-colors"
                        >
                            <span className="font-medium font-sans">{tool.name}</span>
                            <span className={`text-xs px-2.5 py-1 rounded-full font-semibold tracking-wide ${tool.color}`}>
                {tool.level}
              </span>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
}