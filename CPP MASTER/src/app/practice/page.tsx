"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Filter, Clock, Code } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DifficultyBadge } from "@/components/difficulty-badge"
import { Navbar } from "@/components/navbar"

export default function PracticePage() {
  const [searchQuery, setSearchQuery] = useState("")

  const allProblems = [
    {
      id: "two-sum",
      title: "Two Sum",
      difficulty: "Easy",
      category: "Arrays",
      timeEstimate: "15 min",
      description: "Find two numbers in an array that add up to a target value",
    },
    {
      id: "valid-parentheses",
      title: "Valid Parentheses",
      difficulty: "Easy",
      category: "Stacks",
      timeEstimate: "15 min",
      description: "Determine if the input string has valid parentheses",
    },
    {
      id: "linked-list-cycle",
      title: "Linked List Cycle",
      difficulty: "Easy",
      category: "Linked Lists",
      timeEstimate: "20 min",
      description: "Determine if a linked list has a cycle in it",
    },
    {
      id: "binary-tree-level-order-traversal",
      title: "Binary Tree Level Order Traversal",
      difficulty: "Medium",
      category: "Trees",
      timeEstimate: "30 min",
      description: "Return the level order traversal of a binary tree's values",
    },
    {
      id: "merge-k-sorted-lists",
      title: "Merge K Sorted Lists",
      difficulty: "Hard",
      category: "Linked Lists",
      timeEstimate: "45 min",
      description: "Merge k sorted linked lists into one sorted linked list",
    },
    {
      id: "lru-cache",
      title: "LRU Cache",
      difficulty: "Medium",
      category: "Design",
      timeEstimate: "40 min",
      description: "Design and implement a data structure for Least Recently Used cache",
    },
  ]

  const filteredProblems = allProblems.filter(
    (problem) =>
      problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      problem.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      problem.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const easyProblems = filteredProblems.filter((problem) => problem.difficulty === "Easy")
  const mediumProblems = filteredProblems.filter((problem) => problem.difficulty === "Medium")
  const hardProblems = filteredProblems.filter((problem) => problem.difficulty === "Hard")

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container py-8">
          <h1 className="text-3xl font-bold mb-6">Practice Problems</h1>

          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search problems..."
                className="w-full pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </Button>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="all">All Problems</TabsTrigger>
              <TabsTrigger value="easy">Easy</TabsTrigger>
              <TabsTrigger value="medium">Medium</TabsTrigger>
              <TabsTrigger value="hard">Hard</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {filteredProblems.length > 0 ? (
                filteredProblems.map((problem) => (
                  <Card key={problem.id} className="p-4">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{problem.title}</h3>
                        <p className="text-muted-foreground mt-1">{problem.description}</p>
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                          <DifficultyBadge difficulty={problem.difficulty as "Easy" | "Medium" | "Hard"} />
                          <span className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-full">
                            {problem.category}
                          </span>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>{problem.timeEstimate}</span>
                          </div>
                        </div>
                      </div>
                      <Button className="md:self-start" asChild>
                        <Link href={`/problem/${problem.id}`}>
                          <Code className="h-4 w-4 mr-2" />
                          Solve
                        </Link>
                      </Button>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No problems found matching your search.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="easy" className="space-y-4">
              {easyProblems.length > 0 ? (
                easyProblems.map((problem) => (
                  <Card key={problem.id} className="p-4">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{problem.title}</h3>
                        <p className="text-muted-foreground mt-1">{problem.description}</p>
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                          <DifficultyBadge difficulty={problem.difficulty as "Easy" | "Medium" | "Hard"} />
                          <span className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-full">
                            {problem.category}
                          </span>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>{problem.timeEstimate}</span>
                          </div>
                        </div>
                      </div>
                      <Button className="md:self-start" asChild>
                        <Link href={`/problem/${problem.id}`}>
                          <Code className="h-4 w-4 mr-2" />
                          Solve
                        </Link>
                      </Button>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No easy problems found matching your search.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="medium" className="space-y-4">
              {mediumProblems.length > 0 ? (
                mediumProblems.map((problem) => (
                  <Card key={problem.id} className="p-4">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{problem.title}</h3>
                        <p className="text-muted-foreground mt-1">{problem.description}</p>
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                          <DifficultyBadge difficulty={problem.difficulty as "Easy" | "Medium" | "Hard"} />
                          <span className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-full">
                            {problem.category}
                          </span>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>{problem.timeEstimate}</span>
                          </div>
                        </div>
                      </div>
                      <Button className="md:self-start" asChild>
                        <Link href={`/problem/${problem.id}`}>
                          <Code className="h-4 w-4 mr-2" />
                          Solve
                        </Link>
                      </Button>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No medium problems found matching your search.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="hard" className="space-y-4">
              {hardProblems.length > 0 ? (
                hardProblems.map((problem) => (
                  <Card key={problem.id} className="p-4">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{problem.title}</h3>
                        <p className="text-muted-foreground mt-1">{problem.description}</p>
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                          <DifficultyBadge difficulty={problem.difficulty as "Easy" | "Medium" | "Hard"} />
                          <span className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-full">
                            {problem.category}
                          </span>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>{problem.timeEstimate}</span>
                          </div>
                        </div>
                      </div>
                      <Button className="md:self-start" asChild>
                        <Link href={`/problem/${problem.id}`}>
                          <Code className="h-4 w-4 mr-2" />
                          Solve
                        </Link>
                      </Button>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No hard problems found matching your search.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
