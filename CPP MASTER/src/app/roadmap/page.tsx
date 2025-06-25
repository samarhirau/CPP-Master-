import Link from "next/link"
import { CheckCircle2, Circle, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function RoadmapPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <Link href="/">CPP DSA Master</Link>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
              Home
            </Link>
            <Link href="/learn" className="text-sm font-medium transition-colors hover:text-primary">
              Learn
            </Link>
            <Link href="/practice" className="text-sm font-medium transition-colors hover:text-primary">
              Practice
            </Link>
            <Link href="/roadmap" className="text-sm font-medium transition-colors hover:text-primary text-primary">
              Roadmap
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              Log in
            </Button>
            <Button size="sm">Sign up</Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-8">
          <h1 className="text-3xl font-bold mb-6">Learning Roadmap</h1>
          <p className="text-muted-foreground mb-8 max-w-3xl">
            Follow this structured learning path to master C++ Data Structures and Algorithms from beginner to advanced
            level. Each section builds upon the previous one.
          </p>

          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-muted" />

            <div className="space-y-8">
              {/* Phase 1 */}
              <div className="relative">
                <div className="flex items-center mb-4">
                  <div className="absolute -left-2">
                    <CheckCircle2 className="h-8 w-8 text-green-500 bg-background rounded-full" />
                  </div>
                  <h2 className="text-2xl font-bold ml-12">Phase 1: C++ Fundamentals</h2>
                </div>
                <div className="ml-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {[
                    {
                      title: "C++ Basics",
                      description: "Variables, data types, operators, and control flow",
                      completed: true,
                    },
                    {
                      title: "Functions and OOP",
                      description: "Functions, classes, objects, inheritance, and polymorphism",
                      completed: true,
                    },
                    {
                      title: "STL Basics",
                      description: "Introduction to Standard Template Library",
                      completed: false,
                    },
                  ].map((item, index) => (
                    <Card
                      key={index}
                      className={
                        item.completed
                          ? "border-green-200 bg-green-50/50 dark:bg-green-950/20 dark:border-green-900"
                          : ""
                      }
                    >
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{item.title}</CardTitle>
                          {item.completed ? (
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                          ) : (
                            <Circle className="h-5 w-5 text-muted-foreground" />
                          )}
                        </div>
                        <CardDescription>{item.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button variant={item.completed ? "outline" : "default"} size="sm" >
                          {item.completed ? "Review" : "Start Learning"}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Phase 2 */}
              <div className="relative">
                <div className="flex items-center mb-4">
                  <div className="absolute -left-2">
                    <Circle className="h-8 w-8 text-muted-foreground bg-background rounded-full" />
                  </div>
                  <h2 className="text-2xl font-bold ml-12">Phase 2: Basic Data Structures</h2>
                </div>
                <div className="ml-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {[
                    {
                      title: "Arrays and Vectors",
                      description: "Working with arrays and dynamic arrays",
                      completed: false,
                    },
                    {
                      title: "Strings",
                      description: "String manipulation and algorithms",
                      completed: false,
                    },
                    {
                      title: "Linked Lists",
                      description: "Singly and doubly linked lists implementation",
                      completed: false,
                    },
                    {
                      title: "Stacks and Queues",
                      description: "LIFO and FIFO data structures",
                      completed: false,
                    },
                  ].map((item, index) => (
                    <Card key={index}>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{item.title}</CardTitle>
                          <Circle className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <CardDescription>{item.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button variant="outline" size="sm">
                          Start Learning
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Phase 3 */}
              <div className="relative">
                <div className="flex items-center mb-4">
                  <div className="absolute -left-2">
                    <Circle className="h-8 w-8 text-muted-foreground bg-background rounded-full" />
                  </div>
                  <h2 className="text-2xl font-bold ml-12">Phase 3: Intermediate Data Structures</h2>
                </div>
                <div className="ml-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {[
                    {
                      title: "Trees",
                      description: "Binary trees, BST, AVL trees",
                      completed: false,
                    },
                    {
                      title: "Heaps",
                      description: "Min-heap, max-heap, priority queues",
                      completed: false,
                    },
                    {
                      title: "Hash Tables",
                      description: "Hash functions, collision resolution",
                      completed: false,
                    },
                    {
                      title: "Graphs",
                      description: "Graph representations and traversals",
                      completed: false,
                    },
                  ].map((item, index) => (
                    <Card key={index}>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{item.title}</CardTitle>
                          <Circle className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <CardDescription>{item.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button variant="outline" size="sm">
                          Start Learning
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Phase 4 */}
              <div className="relative">
                <div className="flex items-center mb-4">
                  <div className="absolute -left-2">
                    <Circle className="h-8 w-8 text-muted-foreground bg-background rounded-full" />
                  </div>
                  <h2 className="text-2xl font-bold ml-12">Phase 4: Algorithms</h2>
                </div>
                <div className="ml-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {[
                    {
                      title: "Sorting Algorithms",
                      description: "Bubble, insertion, merge, quick sort",
                      completed: false,
                    },
                    {
                      title: "Searching Algorithms",
                      description: "Linear, binary search, BFS, DFS",
                      completed: false,
                    },
                    {
                      title: "Dynamic Programming",
                      description: "Memoization, tabulation, common patterns",
                      completed: false,
                    },
                    {
                      title: "Greedy Algorithms",
                      description: "Optimal local choices for global solutions",
                      completed: false,
                    },
                  ].map((item, index) => (
                    <Card key={index}>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{item.title}</CardTitle>
                          <Circle className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <CardDescription>{item.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button variant="outline" size="sm">
                          Start Learning
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Phase 5 */}
              <div className="relative">
                <div className="flex items-center mb-4">
                  <div className="absolute -left-2">
                    <Circle className="h-8 w-8 text-muted-foreground bg-background rounded-full" />
                  </div>
                  <h2 className="text-2xl font-bold ml-12">Phase 5: Advanced Topics</h2>
                </div>
                <div className="ml-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {[
                    {
                      title: "Advanced Graph Algorithms",
                      description: "Dijkstra's, Bellman-Ford, Floyd-Warshall",
                      completed: false,
                    },
                    {
                      title: "String Algorithms",
                      description: "KMP, Rabin-Karp, suffix trees",
                      completed: false,
                    },
                    {
                      title: "Competitive Programming",
                      description: "Contest strategies and optimization",
                      completed: false,
                    },
                  ].map((item, index) => (
                    <Card key={index}>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{item.title}</CardTitle>
                          <Circle className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <CardDescription>{item.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button variant="outline" size="sm">
                          Start Learning
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">Ready to start your learning journey?</p>
            <Button size="lg" className="gap-2">
              Begin Learning Path
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
