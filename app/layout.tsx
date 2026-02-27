import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

// The Ultimate Open Graph & SEO Metadata Payload
export const metadata: Metadata = {
    title: "Isaiah Katakyie Boadi | Mainframe",
    description: "A Math student and photographer who turns data into cinematic stories and builds websites for student startups.",
    // Next.js requires the base URL to accurately resolve the image paths across the web
    metadataBase: new URL("https://hackerslord-portfolio.vercel.app"),

    // This handles Facebook, LinkedIn, WhatsApp, and iMessage
    openGraph: {
        title: "Isaiah Katakyie Boadi | Mainframe",
        description: "Welcome to the Mainframe. Explore visual stories, digital experiences, and cinematic moments.",
        url: "https://hackerslord-portfolio.vercel.app",
        siteName: "Hackerslord Portfolio",
        images: [
            {
                url: "/assets/og-image.png", // Make sure this matches the file you create!
                width: 1200,
                height: 630,
                alt: "Isaiah Katakyie Boadi - Hackerslord Mainframe",
            },
        ],
        locale: "en_US",
        type: "website",
    },

    // This specifically handles X (Twitter)
    twitter: {
        card: "summary_large_image",
        title: "Isaiah Katakyie Boadi | Mainframe",
        description: "Welcome to the Mainframe. Explore visual stories, digital experiences, and cinematic moments.",
        creator: "@hackerslord_24",
        images: ["/assets/og-image.png"],
    },
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body className={`${inter.variable} ${playfair.variable} font-sans antialiased overflow-x-hidden w-full selection:bg-accent selection:text-accent-foreground cursor-none`}>
        <AuthProvider>
            <Providers>
                {/* Global UI Elements */}
                <CustomCursor />
                <ThemeToggle />

                {/* Page Content */}
                {children}
            </Providers>
        </AuthProvider>
        </body>
        </html>
    );
}