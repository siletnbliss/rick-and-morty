import { ThemeProvider } from "@/components/ui/theme-provider";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rick and Morty App",
  description: "Find information about Rick and Morty episodes and characters",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen`}>
        {" "}
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}{" "}
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
