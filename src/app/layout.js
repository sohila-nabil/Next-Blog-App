import { Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Theme from "../../components/Theme";
import { ClerkProvider } from "@clerk/nextjs";
// import Navbar from "../../components/Navbar";
import { ThemeModeScript } from "flowbite-react";

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
      <head>
        <ThemeModeScript />
      </head>
      <body
        className={`${outfit.variable} antialiased 
    bg-white text-gray-700 
    dark:bg-gray-900 dark:text-gray-200`}
      >
        <ClerkProvider>
          <ThemeProvider attribute="class">
            <Theme>
              {/* <Navbar /> */}
              {children}
            </Theme>
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}



// Fake blog data
  // const blogs = [
  //   {
  //     id: "BLG001",
  //     image:
  //       "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=60&h=40&fit=crop",
  //     title: "Getting Started with Next.js 14",
  //     category: "Technology",
  //     author: "John Doe",
  //     authorAvatar: "https://i.pravatar.cc/32?u=1",
  //     status: "Published",
  //     date: "2024-01-15",
  //     views: "2.5k",
  //     comments: 24,
  //     excerpt:
  //       "Learn how to build modern web applications with Next.js 14 and its new features...",
  //   },
  //   {
  //     id: "BLG002",
  //     image:
  //       "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=60&h=40&fit=crop",
  //     title: "Understanding React Server Components",
  //     category: "Development",
  //     author: "Jane Smith",
  //     authorAvatar: "https://i.pravatar.cc/32?u=2",
  //     status: "Draft",
  //     date: "2024-02-01",
  //     views: "0",
  //     comments: 0,
  //     excerpt:
  //       "Deep dive into React Server Components and how they revolutionize web development...",
  //   },
  //   {
  //     id: "BLG003",
  //     image:
  //       "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=60&h=40&fit=crop",
  //     title: "Ultimate Guide to Tailwind CSS",
  //     category: "CSS",
  //     author: "Mike Johnson",
  //     authorAvatar: "https://i.pravatar.cc/32?u=3",
  //     status: "Published",
  //     date: "2024-01-28",
  //     views: "1.8k",
  //     comments: 12,
  //     excerpt:
  //       "Master Tailwind CSS with this comprehensive guide covering everything from basics to advanced...",
  //   },
  //   {
  //     id: "BLG004",
  //     image:
  //       "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=60&h=40&fit=crop",
  //     title: "10 Tips for Better Code Quality",
  //     category: "Programming",
  //     author: "Sarah Wilson",
  //     authorAvatar: "https://i.pravatar.cc/32?u=4",
  //     status: "Scheduled",
  //     date: "2024-03-10",
  //     views: "0",
  //     comments: 0,
  //     excerpt:
  //       "Improve your code quality with these 10 essential tips and best practices...",
  //   },
  //   {
  //     id: "BLG005",
  //     image:
  //       "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=60&h=40&fit=crop",
  //     title: "Modern JavaScript Features You Should Know",
  //     category: "JavaScript",
  //     author: "Alex Chen",
  //     authorAvatar: "https://i.pravatar.cc/32?u=5",
  //     status: "Published",
  //     date: "2024-02-05",
  //     views: "3.2k",
  //     comments: 31,
  //     excerpt:
  //       "Explore the latest JavaScript features that will make your code more efficient and readable...",
  //   },
  //   {
  //     id: "BLG006",
  //     image:
  //       "https://images.unsplash.com/photo-1522252234503-e356532cafd5?w=60&h=40&fit=crop",
  //     title: "Introduction to TypeScript",
  //     category: "TypeScript",
  //     author: "Emily Brown",
  //     authorAvatar: "https://i.pravatar.cc/32?u=6",
  //     status: "Draft",
  //     date: "2024-02-12",
  //     views: "0",
  //     comments: 0,
  //     excerpt:
  //       "Get started with TypeScript and learn how it can improve your development experience...",
  //   },
  // ];