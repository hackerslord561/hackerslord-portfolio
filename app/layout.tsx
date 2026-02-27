import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { AuthProvider } from "@/components/providers/AuthProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
    title: "Isaiah Katakyie Boadi | Mainframe",
    description: "A Math Student who turns data into cinematic stories and websites for student startups.",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body className={`${inter.variable} ${playfair.variable} font-sans antialiased overflow-x-hidden w-full selection:bg-accent selection:text-accent-foreground`}>
        {/* AuthProvider secures the Admin routes, Providers handles Dark/Light Mode */}
        <AuthProvider>
            <Providers>
                {children}
            </Providers>
        </AuthProvider>
        </body>
        </html>
    );
}