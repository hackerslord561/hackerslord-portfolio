import { CustomCursor } from "@/components/ui/CustomCursor";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { CyberHero } from "@/components/sections/CyberHero";
import { BentoDesktop } from "@/components/sections/BentoDesktop";

export default function Home() {
    return (
        <main className="relative w-full flex flex-col bg-background selection:bg-accent selection:text-accent-foreground">
            {/* 1. Global UI Overlays */}
            <CustomCursor />

            <div className="clickable z-50">
                <ThemeToggle />
            </div>

            {/* 2. The Parallax Intro (120vh tall so it requires scrolling to pass) */}
            <CyberHero />

            {/* 3. The macOS Glassmorphic Desktop & Project Feed */}
            {/* We wrap this in a relative div with a higher z-index so that
        as you scroll down, it gracefully slides over the hero background.
      */}
            <div className="relative z-40 bg-background/50 backdrop-blur-3xl border-t border-border/20 shadow-[0_-20px_50px_rgba(0,0,0,0.3)]">
                <BentoDesktop />

                {/* Footer sits at the very bottom of the OS desktop */}
                <footer className="w-full py-12 text-center text-sm text-foreground/50 font-sans border-t border-border/20">
                    © {new Date().getFullYear()} Isaiah Katakyie Boadi. All rights reserved.
                </footer>
            </div>
        </main>
    );
}