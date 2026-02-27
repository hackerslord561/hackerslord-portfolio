"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Terminal, Lock, AlertCircle } from "lucide-react";

export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            await signInWithEmailAndPassword(auth, email, password);
            // AuthProvider will automatically redirect to /admin upon success
        } catch (err: any) {
            setError("Access Denied. Invalid credentials.");
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-background relative overflow-hidden cursor-none">
            {/* Subtle Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

            <div className="w-full max-w-md p-8 glass-panel rounded-2xl border border-border/50 relative z-10 shadow-2xl">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-16 h-16 bg-foreground/5 rounded-full flex items-center justify-center mb-4 border border-foreground/10">
                        <Terminal className="w-8 h-8 text-foreground" />
                    </div>
                    <h1 className="text-2xl font-[family-name:var(--font-playfair)] font-bold tracking-tight">
                        Mainframe Access
                    </h1>
                    <p className="text-sm text-foreground/50 font-sans mt-2 tracking-widest uppercase">
                        Restricted Area
                    </p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-3 text-red-500">
                        <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                        <p className="text-sm font-sans">{error}</p>
                    </div>
                )}

                <form onSubmit={handleLogin} className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-sans tracking-widest uppercase text-foreground/70">
                            Admin Identifier
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-background/50 border border-border/50 rounded-lg px-4 py-3 text-sm font-sans outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all clickable"
                            placeholder="admin@hackerslord.com"
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-sans tracking-widest uppercase text-foreground/70">
                            Passcode
                        </label>
                        <div className="relative">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-background/50 border border-border/50 rounded-lg px-4 py-3 text-sm font-sans outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all clickable"
                                placeholder="••••••••"
                                required
                            />
                            <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30" />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="mt-4 w-full bg-foreground text-background font-sans font-medium py-3 rounded-lg hover:bg-foreground/90 transition-all flex justify-center items-center clickable disabled:opacity-50"
                    >
                        {isLoading ? (
                            <div className="w-5 h-5 border-2 border-background border-t-transparent rounded-full animate-spin" />
                        ) : (
                            "Initialize Connection"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}