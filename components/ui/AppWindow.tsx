"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Maximize2 } from "lucide-react";
import { ReactNode } from "react";

interface AppWindowProps {
    title: string;
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

export function AppWindow({ title, isOpen, onClose, children }: AppWindowProps) {
    // We completely removed the useEffect that locked the body scroll.
    // Now, the main page can scroll freely in the background while the window is open!

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {/* Backdrop click to close */}
                    <div
                        className="absolute inset-0 bg-background/20 backdrop-blur-sm cursor-none clickable"
                        onClick={onClose}
                    />

                    <motion.div
                        className="relative w-full max-w-5xl flex flex-col bg-background/80 dark:bg-background/90 backdrop-blur-2xl border border-border/50 shadow-2xl rounded-xl overflow-hidden cursor-none"
                        initial={{ scale: 0.9, y: 20, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.95, y: 10, opacity: 0 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        // Fix: Replaced forced height with dynamic height so it never cuts off
                        style={{ height: "auto", maxHeight: "85vh" }}
                    >
                        {/* Window Title Bar */}
                        <div className="flex items-center justify-between px-4 py-3 border-b border-border/30 bg-foreground/5 select-none">
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={onClose}
                                    className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center group clickable"
                                >
                                    <X className="w-2 h-2 text-black opacity-0 group-hover:opacity-100" />
                                </button>
                                <button className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 flex items-center justify-center group clickable">
                                    <Minus className="w-2 h-2 text-black opacity-0 group-hover:opacity-100" />
                                </button>
                                <button className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center group clickable">
                                    <Maximize2 className="w-2 h-2 text-black opacity-0 group-hover:opacity-100" />
                                </button>
                            </div>
                            <span className="text-xs font-medium text-foreground/70 tracking-wide font-sans">
                {title}
              </span>
                            <div className="w-12" /> {/* Spacer for centering title */}
                        </div>

                        {/* Window Content Area */}
                        <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar relative">
                            {children}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}