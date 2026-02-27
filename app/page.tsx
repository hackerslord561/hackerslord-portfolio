import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Hero } from "@/components/sections/Hero";
import { Work } from "@/components/sections/Work";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";

export default function Home() {
    return (
        <main className="relative min-h-screen w-full flex flex-col">
            <ThemeToggle />
            <Hero />
            <Work />
            <Experience />
            <About />

            <footer className="w-full py-12 text-center text-sm text-foreground/50 font-sans border-t border-border/20">
                © {new Date().getFullYear()} Isaiah Katakyie Boadi. All rights reserved.
            </footer>
        </main>
    );
}