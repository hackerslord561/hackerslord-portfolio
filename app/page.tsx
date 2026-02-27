import { CustomCursor } from "@/components/ui/CustomCursor";
import { BentoDesktop } from "@/components/sections/BentoDesktop";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export default function Home() {
    return (
        <main className="relative min-h-screen w-full flex flex-col bg-background selection:bg-accent selection:text-accent-foreground">
            {/* The custom anime pointer */}
            <CustomCursor />

            {/* Optional: Keep theme toggle but make it fit the OS vibe */}
            <div className="clickable">
                <ThemeToggle />
            </div>

            {/* The OS Interface */}
            <BentoDesktop />
        </main>
    );
}