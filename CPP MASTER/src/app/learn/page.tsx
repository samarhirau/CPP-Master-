import Link from "next/link"
import {Navbar} from "@/components/navbar"
import { Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LearnPage() {
  return (
    <div className="flex min-h-screen flex-col">
<Navbar />
      <main className="flex-1 mx-10">
        <div className="container py-8">
          <h1 className="text-3xl font-bold mb-6">Learning Modules</h1>

          <Tabs defaultValue="beginner" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="beginner">Beginner</TabsTrigger>
              <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>

            <TabsContent value="beginner" className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4">C++ Fundamentals</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      title: "Introduction to C++",
                      description: "Learn the basics of C++ programming language",
                      duration: "45 min",
                      progress: 100,
                    },
                    {
                      title: "Variables and Data Types",
                      description: "Understanding different data types in C++",
                      duration: "60 min",
                      progress: 75,
                    },
                    {
                      title: "Control Flow",
                      description: "Conditionals and loops in C++",
                      duration: "90 min",
                      progress: 0,
                    },
                  ].map((lesson, index) => (
                    <Card key={index}>
                      <CardHeader className="pb-2">
                        <CardTitle>{lesson.title}</CardTitle>
                        <CardDescription>{lesson.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                          <Clock className="h-4 w-4" />
                          <span>{lesson.duration}</span>
                        </div>
                        <Progress value={lesson.progress} className="h-2" />
                        <p className="text-xs text-right mt-1 text-muted-foreground">{lesson.progress}% complete</p>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full">
                          {lesson.progress === 0 ? "Start" : lesson.progress === 100 ? "Review" : "Continue"}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Basic Data Structures</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      title: "Arrays in C++",
                      description: "Working with arrays and vectors",
                      duration: "75 min",
                      progress: 0,
                    },
                    {
                      title: "Strings",
                      description: "String manipulation and operations",
                      duration: "60 min",
                      progress: 0,
                    },
                    {
                      title: "Linked Lists",
                      description: "Implementation and operations on linked lists",
                      duration: "120 min",
                      progress: 0,
                    },
                  ].map((lesson, index) => (
                    <Card key={index}>
                      <CardHeader className="pb-2">
                        <CardTitle>{lesson.title}</CardTitle>
                        <CardDescription>{lesson.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                          <Clock className="h-4 w-4" />
                          <span>{lesson.duration}</span>
                        </div>
                        <Progress value={lesson.progress} className="h-2" />
                        <p className="text-xs text-right mt-1 text-muted-foreground">{lesson.progress}% complete</p>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full" variant={lesson.progress === 0 ? "outline" : "default"}>
                          {lesson.progress === 0 ? "Start" : lesson.progress === 100 ? "Review" : "Continue"}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </section>
            </TabsContent>

            <TabsContent value="intermediate">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: "Trees and Binary Trees",
                    description: "Understanding tree data structures",
                    duration: "120 min",
                    progress: 0,
                  },
                  {
                    title: "Graphs",
                    description: "Graph representations and traversals",
                    duration: "150 min",
                    progress: 0,
                  },
                  {
                    title: "Sorting Algorithms",
                    description: "Common sorting techniques and their complexity",
                    duration: "90 min",
                    progress: 0,
                  },
                ].map((lesson, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-2">
                      <CardTitle>{lesson.title}</CardTitle>
                      <CardDescription>{lesson.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                        <Clock className="h-4 w-4" />
                        <span>{lesson.duration}</span>
                      </div>
                      <Progress value={lesson.progress} className="h-2" />
                      <p className="text-xs text-right mt-1 text-muted-foreground">{lesson.progress}% complete</p>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full" variant="outline">
                        Start
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="advanced">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: "Dynamic Programming",
                    description: "Advanced problem-solving technique",
                    duration: "180 min",
                    progress: 0,
                  },
                  {
                    title: "Advanced Graph Algorithms",
                    description: "Dijkstra's, Bellman-Ford, and more",
                    duration: "150 min",
                    progress: 0,
                  },
                  {
                    title: "Competitive Programming Techniques",
                    description: "Strategies for coding competitions",
                    duration: "120 min",
                    progress: 0,
                  },
                ].map((lesson, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-2">
                      <CardTitle>{lesson.title}</CardTitle>
                      <CardDescription>{lesson.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                        <Clock className="h-4 w-4" />
                        <span>{lesson.duration}</span>
                      </div>
                      <Progress value={lesson.progress} className="h-2" />
                      <p className="text-xs text-right mt-1 text-muted-foreground">{lesson.progress}% complete</p>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full" variant="outline">
                        Start
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
