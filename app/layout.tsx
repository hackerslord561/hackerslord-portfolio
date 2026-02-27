import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
    title: "Isaiah Katakyie Boadi | Portfolio",
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
        <Providers>
            {children}
        </Providers>
        </body>
        </html>
    );
}