"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export function CustomCursor() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    // Spring physics for the outer ring to give it that "anime UI" snappy feel
    const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
    const cursorXSpring = useSpring(0, springConfig);
    const cursorYSpring = useSpring(0, springConfig);

    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
            cursorXSpring.set(e.clientX);
            cursorYSpring.set(e.clientY);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest("button") || target.closest("a") || target.closest(".clickable")) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener("mousemove", updateMousePosition);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", updateMousePosition);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, [cursorXSpring, cursorYSpring]);

    return (
        <>
            {/* Outer Stylized Ring */}
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 rounded-full border-[1.5px] border-foreground/50 pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={{
                    scale: isHovering ? 1.5 : 1,
                    borderColor: isHovering ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.5)",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
                {/* Crosshair accents */}
                <div className="absolute w-[2px] h-[4px] bg-foreground/50 top-[-4px]" />
                <div className="absolute w-[2px] h-[4px] bg-foreground/50 bottom-[-4px]" />
                <div className="absolute h-[2px] w-[4px] bg-foreground/50 left-[-4px]" />
                <div className="absolute h-[2px] w-[4px] bg-foreground/50 right-[-4px]" />
            </motion.div>

            {/* Inner Dot */}
            <motion.div
                className="fixed top-0 left-0 w-2 h-2 bg-foreground rounded-full pointer-events-none z-[10000] mix-blend-difference"
                animate={{
                    x: mousePosition.x - 4,
                    y: mousePosition.y - 4,
                    scale: isHovering ? 0 : 1, // Dot disappears when hovering over links to emphasize the ring
                }}
                transition={{ type: "tween", ease: "backOut", duration: 0.1 }}
            />
        </>
    );
}