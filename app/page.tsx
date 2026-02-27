import { CyberHero } from "@/components/sections/CyberHero";
import { BentoDesktop } from "@/components/sections/BentoDesktop";

export default function Home() {
    return (
        <main className="relative w-full flex flex-col bg-background selection:bg-accent selection:text-accent-foreground">

            {/* 1. The Parallax Intro */}
            <CyberHero />

            {/* 2. The macOS Glassmorphic Desktop & Project Feed */}
            <div className="relative z-40 bg-background/50 backdrop-blur-3xl border-t border-border/20 shadow-[0_-20px_50px_rgba(0,0,0,0.3)]">
                <BentoDesktop />

                {/* Footer */}
                <footer className="w-full py-12 text-center text-sm text-foreground/50 font-sans border-t border-border/20">
                    © {new Date().getFullYear()} Isaiah Katakyie Boadi. All rights reserved.
                </footer>
            </div>
        </main>
    );
}