"use client";

import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { LogOut, LayoutDashboard } from "lucide-react";
import { ProjectsManager } from "@/components/admin/ProjectsManager";

export default function AdminDashboard() {
    const handleLogout = async () => {
        await signOut(auth);
    };

    return (
        <div className="min-h-screen w-full bg-background text-foreground flex flex-col relative overflow-hidden">
            {/* Background Styling */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            {/* Top Navigation Bar */}
            <header className="w-full border-b border-border/50 bg-background/50 backdrop-blur-xl sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-foreground text-background flex items-center justify-center rounded-lg">
                            <LayoutDashboard className="w-4 h-4" />
                        </div>
                        <h1 className="font-[family-name:var(--font-playfair)] font-bold text-xl tracking-tight">
                            Mainframe Control
                        </h1>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-sm font-sans text-foreground/70 hover:text-red-500 transition-colors"
                    >
                        <LogOut className="w-4 h-4" />
                        Disconnect
                    </button>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-8 relative z-10">
                <ProjectsManager />
            </main>
        </div>
    );
}