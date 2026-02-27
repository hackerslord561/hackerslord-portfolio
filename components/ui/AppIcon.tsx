"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface AppIconProps {
    title: string;
    icon: LucideIcon;
    colorClass: string;
    href?: string;
    onClick?: () => void;
    isLarge?: boolean;
}

export function AppIcon({ title, icon: Icon, colorClass, href, onClick, isLarge = false }: AppIconProps) {
    const content = (
        <motion.div
            className={`glass-panel flex flex-col items-center justify-center gap-3 cursor-none clickable ${
                isLarge ? "rounded-3xl p-6 aspect-[4/3]" : "rounded-2xl p-4 aspect-square"
            }`}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            onClick={onClick}
        >
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg ${colorClass}`}>
                <Icon className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm font-medium text-foreground/90 tracking-wide font-sans">
        {title}
      </span>
        </motion.div>
    );

    if (href) {
        return (
            <a href={href} target={href.startsWith("http") ? "_blank" : "_self"} rel="noreferrer" className="w-full">
                {content}
            </a>
        );
    }

    return <div className="w-full" onClick={onClick}>{content}</div>;
}