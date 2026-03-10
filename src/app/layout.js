import { Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Theme from "../../components/Theme";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "../../components/Navbar";


const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weights: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Blog App",
  description: "A simple blog application built with Next.js and Tailwind CSS.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${outfit.variable} antialiased 
    bg-white text-gray-700 
    dark:bg-gray-900 dark:text-gray-200`}
      >
        <ClerkProvider>
          <ThemeProvider attribute="class">
            <Theme>
              <Navbar />
              {children}
            </Theme>
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
