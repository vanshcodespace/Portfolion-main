import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import SmoothScrolling from "@/components/smooth-scrolling";
import { Toaster } from "react-hot-toast";

// Import your persistent components
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Vansh Singla | Software Engineer (Frontend-Focused)",
    template: "%s | Vansh Singla",
  },
  description:
    "Vansh Singla is a frontend-focused full stack software engineer specializing in scalable APIs, system design, and data-driven web applications.",
  keywords: [
    "Vansh Singla",
    "Software Engineer",
    "Frontend Developer",
    "Full Stack Developer",
    "Next.js Developer",
    "Node.js",
  ],
  authors: [{ name: "Vansh Singla" }],
  creator: "Vansh Singla",
  metadataBase: new URL("https://portfolion-main.vercel.app"),

  icons: {
    icon: "/Icon.png",
  },

  openGraph: {
    title: "Vansh Singla | Software Engineer",
    description:
      "Frontend-focused full stack developer building scalable, production-ready web systems.",
    url: "https://portfolion-main.vercel.app",
    siteName: "Vansh Singla Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Vansh Singla Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Vansh Singla | Software Engineer",
    description:
      "Frontend-focused full stack developer building scalable, production-ready web systems.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* 1. Global Background Pattern */}
          <div className="fixed inset-0 -z-10 h-full w-full bg-white dark:bg-[#050505]">
            <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] dark:bg-[radial-gradient(#ffffff33_1px,transparent_1px)]"></div>
          </div>

          <SmoothScrolling>
            {/* 2. Global Navbar */}
            <Navbar />

            {/* 3. Page Content */}
            <main className="relative z-10 flex flex-col gap-0 min-h-screen">
              {children}
            </main>

            {/* 4. Global Footer */}
            <Footer />
          </SmoothScrolling>
        </ThemeProvider>

        <Toaster position="top-right" />
      </body>
    </html>
  );
}
