import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/context/auth-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CPP DSA Master",
  description: "Learn and practice C++ Data Structures and Algorithms",
  keywords: [
    "C++",
    "Data Structures",
    "Algorithms",
    "CPP DSA Master",
    "Learn C++",
    "Practice C++",
    "Coding",
    "Programming",
  ],
  authors: [
    {
      name: "SAMAR HIRAU",
     
    },]
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
