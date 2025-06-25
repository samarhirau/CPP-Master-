"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { BookOpen } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/context/auth-context"
import { Navbar } from "@/components/navbar"
import { DifficultyBadge } from "@/components/difficulty-badge"

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  if (loading || !user) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-pulse">Loading...</div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container py-8">
          {/* <h1 className="text-3xl font-bold mb-2">Welcome, {user.name}!</h1> */}
          <p className="text-muted-foreground mb-8">Track your progress and continue your learning journey</p>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Lessons Completed</CardTitle>
                <CardDescription>Your learning progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">2/24</div>
                <div className="h-2 w-full rounded-full bg-muted mt-2">
                  <div className="h-full w-[8%] rounded-full bg-primary" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Problems Solved</CardTitle>
                <CardDescription>Your coding practice</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">5/120</div>
                <div className="h-2 w-full rounded-full bg-muted mt-2">
                  <div className="h-full w-[4%] rounded-full bg-primary" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Current Streak</CardTitle>
                <CardDescription>Days of continuous learning</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">3 days</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Current Level</CardTitle>
                <CardDescription>Your expertise level</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">Beginner</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold mb-4">Continue Learning</h2>
              <Card>
                <CardHeader>
                  <CardTitle>Variables and Data Types</CardTitle>
                  <CardDescription>Understanding different data types in C++</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <BookOpen className="h-4 w-4" />
                    <span>60 min</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-full w-[75%] rounded-full bg-primary" />
                  </div>
                  <p className="text-xs text-right mt-1 text-muted-foreground">75% complete</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Continue</Button>
                </CardFooter>
              </Card>

              <h2 className="text-2xl font-bold mt-8 mb-4">Recommended Learning Path</h2>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-6 w-6" />
                    <CardTitle>Beginner Path</CardTitle>
                  </div>
                  <CardDescription>Learn the basics of C++ and fundamental data structures</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {["C++ Basics", "Arrays & Strings", "Linked Lists", "Stacks & Queues"].map((topic, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">View Path</Button>
                </CardFooter>
              </Card>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Recommended Problems</h2>
              <div className="space-y-4">
                {[
                  {
                    title: "Two Sum",
                    difficulty: "Easy",
                    category: "Arrays",
                    completion: 0,
                  },
                  {
                    title: "Valid Parentheses",
                    difficulty: "Easy",
                    category: "Stacks",
                    completion: 0,
                  },
                  {
                    title: "Reverse Linked List",
                    difficulty: "Easy",
                    category: "Linked Lists",
                    completion: 0,
                  },
                ].map((problem, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="flex items-center p-4">
                      <div className="flex-1">
                        <h3 className="font-semibold">{problem.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <DifficultyBadge difficulty={problem.difficulty} />
                          <span className="text-sm text-muted-foreground">{problem.category}</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/problem/${problem.title.toLowerCase().replace(/\s+/g, "-")}`}>Solve</Link>
                      </Button>
                    </div>
                  </Card>
                ))}
                <div className="text-center mt-4">
                  <Button variant="outline" asChild>
                    <Link href="/practice">View all problems</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
