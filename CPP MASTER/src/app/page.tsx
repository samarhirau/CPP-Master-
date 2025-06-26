'use client';


import React from 'react';
import {Navbar} from '@/components/navbar';

import Link from "next/link"
import { ArrowRight, BookOpen, Code, Trophy, BarChart4 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { DifficultyBadge } from "@/components/difficulty-badge"
import { ProgressCircle } from "@/components/progress-circle"
import { Footer } from "@/components/footer"

import problems from "@/data/problems.json"

export default function Page() {

  const paths = [
                {
                  title: "Beginner",
                  description: "Learn the basics of C++ and fundamental data structures",
                  topics: ["C++ Basics", "Arrays & Strings", "Linked Lists", "Stacks & Queues"],
                  icon: <BookOpen className="h-10 w-10" />,
                },
                {
                  title: "Intermediate",
                  description: "Dive deeper into complex data structures and algorithms",
                  topics: ["Trees & Graphs", "Sorting Algorithms", "Searching Algorithms", "Dynamic Programming Intro"],
                  icon: <Code className="h-10 w-10" />,
                },
                {
                  title: "Advanced",
                  description: "Master complex algorithms and optimization techniques",
                  topics: [
                    "Advanced Dynamic Programming",
                    "Graph Algorithms",
                    "Greedy Algorithms",
                    "Competitive Programming",
                  ],
                  icon: <Trophy className="h-10 w-10" />,
                },
              ]
           
  const easyProblems = problems.filter(problem => problem.difficulty === "Easy");
  const mediumProblems = problems.filter(problem => problem.difficulty === "Medium");
  const hardProblems = problems.filter(problem => problem.difficulty === "Hard");
  return (
    < >
    <div className="flex min-h-screen flex-col">
     <Navbar />
        <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-50 dark:bg-slate-900">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Master C++ Data Structures & Algorithms
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  From beginner to pro - interactive lessons, practice problems, and personalized learning paths to help
                  you excel in DSA interviews and competitions.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" className='bg-white text-slate-900 hover:bg-slate-900 hover:text-white hover:border-amber-50 border-1' asChild>
                    <Link href="/learn">
                      Start Learning
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href="/roadmap">View Roadmap</Link>
                  </Button>
                </div>
              </div>
              <div className="flex justify-center">
                <img
                  src="./image.png"
                  alt="DSA Learning Platform"
                  width={500}
                  height={400}
                  className="rounded-lg object-cover"
                />
              </div>
            </div>
          </div>
        </section>





        

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Learning Paths</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Choose your learning path based on your experience level
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-8">
              {paths.map((path, index) => (
                <Card key={index} className="flex flex-col">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      {path.icon}
                      <CardTitle>{path.title}</CardTitle>
                    </div>
                    <CardDescription>{path.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <ul className="space-y-2">
                      {path.topics.map((topic, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-white" />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-white text-black hover:bg-slate-900 hover:text-white" asChild >
                      <Link href="/learn">Start This Path</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-50 dark:bg-slate-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Practice Problems</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Sharpen your skills with our curated collection of practice problems
                </p>
              </div>
            </div>
            <Tabs defaultValue="all" className="mt-8 w-full max-w-4xl mx-auto">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="easy">Easy</TabsTrigger>
                <TabsTrigger value="medium">Medium</TabsTrigger>
                <TabsTrigger value="hard">Hard</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-6">
                <div className="grid gap-4">
                  {problems.slice(0, 6).map((problem, index) => (
                    <Card key={index} className="overflow-hidden">
                      <div className="flex items-center p-4">
                        <div className="flex-1">
                          <h3 className="font-semibold">{problem.title}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <DifficultyBadge difficulty={problem.difficulty} />
                            <span className="text-sm text-muted-foreground">{problem.category}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <ProgressCircle value={problem.completion} />
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/problem/${problem.title.toLowerCase().replace(/\s+/g, "-")}`}>Solve</Link>
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="easy" className="mt-6">
                <div className="grid gap-4">
                  {easyProblems.slice(0, 6).map((problem, index) => (
                    <Card key={index} className="overflow-hidden">
                      <div className="flex items-center p-4">
                        <div className="flex-1">
                          <h3 className="font-semibold">{problem.title}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <DifficultyBadge difficulty={problem.difficulty} />
                            <span className="text-sm text-muted-foreground">{problem.category}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <ProgressCircle value={problem.completion} />
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/problem/${problem.title.toLowerCase().replace(/\s+/g, "-")}`}>Solve</Link>
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="medium" className="mt-6">
                <div className="grid gap-4">
                  {mediumProblems.slice(0, 6).map((problem, index) => (
                    <Card key={index} className="overflow-hidden">
                      <div className="flex items-center p-4">
                        <div className="flex-1">
                          <h3 className="font-semibold">{problem.title}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <DifficultyBadge difficulty={problem.difficulty} />
                            <span className="text-sm text-muted-foreground">{problem.category}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <ProgressCircle value={problem.completion} />
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/problem/${problem.title.toLowerCase().replace(/\s+/g, "-")}`}>Solve</Link>
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="hard" className="mt-6">
                <div className="grid gap-4">
                  {hardProblems.slice(0, 6).map((problem, index) => (
                    <Card key={index} className="overflow-hidden">
                      <div className="flex items-center p-4">
                        <div className="flex-1">
                          <h3 className="font-semibold">{problem.title}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <DifficultyBadge difficulty={problem.difficulty} />
                            <span className="text-sm text-muted-foreground">{problem.category}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <ProgressCircle value={problem.completion} />
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/problem/${problem.title.toLowerCase().replace(/\s+/g, "-")}`}>Solve</Link>
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
            </Tabs>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Track Your Progress</h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Monitor your learning journey with detailed analytics and personalized recommendations to improve your
                  skills.
                </p>
                <Button asChild className='bg-white text-black hover:bg-black border-1 hover:border-amber-50 hover:text-white'>
                  <Link href="/dashboard">View Dashboard</Link>
                </Button>
              </div>
             <div className="flex justify-center">
                <div className="rounded-lg border bg-card p-8 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold">Your Progress</h3>
                    <BarChart4 className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Data Structures</span>
                        <span className="text-sm text-muted-foreground">65%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-800">
                        <div className="h-full w-[65%] rounded-full bg-white" />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Algorithms</span>
                        <span className="text-sm text-muted-foreground">42%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-800">
                        <div className="h-full w-[42%] rounded-full bg-white" />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Problem Solving</span>
                        <span className="text-sm text-muted-foreground">78%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-800">
                        <div className="h-full w-[78%] rounded-full bg-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      </div>
    </>
  );
}
