"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Users,
  BookOpen,
  Plus,
  Calendar,
  TrendingUp,
  Activity,
  Clock,
  Star,
  BarChart3,
  Filter,
  Search,
  Download,
  Settings,
} from "lucide-react"
import ProblemForm from "@/components/admin/problemForm"
import { useToast } from "@/hooks/use-toast"

interface User {
  _id: string
  username: string
  email: string
  role: string
  createdAt: string
}

interface Problem {
  _id: string
  title: string
  difficulty: "Easy" | "Medium" | "Hard"
  category: string
  tags: string[]
  createdAt: string
}

interface DashboardData {
  totalUsers: number
  recentUsers: User[]
  problems: Problem[]
  totalProblems: number
}

export default function AdminDashboard() {
  const { toast } = useToast()
  const [data, setData] = useState<DashboardData>({
    totalUsers: 0,
    recentUsers: [],
    problems: [],
    totalProblems: 0,
  })
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  const fetchDashboardData = async () => {
    try {
      setLoading(true)

      // Fetch users data
      const usersResponse = await fetch("/api/users")
      const usersResult = await usersResponse.json()

      // Fetch problems data
      const problemsResponse = await fetch("/api/problems")
      const problemsResult = await problemsResponse.json()

      if (usersResult.success && problemsResult.success) {
        setData({
          totalUsers: usersResult.data.totalUsers,
          recentUsers: usersResult.data.recentUsers,
          problems: problemsResult.data.problems,
          totalProblems: problemsResult.data.totalProblems,
        })
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch dashboard data.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const handleProblemCreated = () => {
    fetchDashboardData()
    setActiveTab("overview")
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-emerald-50 text-emerald-700 border-emerald-200"
      case "Medium":
        return "bg-amber-50 text-amber-700 border-amber-200"
      case "Hard":
        return "bg-rose-50 text-rose-700 border-rose-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto p-6 lg:p-8">
          <div className="animate-pulse space-y-8">
            {/* Header skeleton */}
            <div className="space-y-4">
              <div className="h-10 bg-gray-200 rounded-lg w-80"></div>
              <div className="h-6 bg-gray-200 rounded w-96"></div>
            </div>

            {/* Stats cards skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-white rounded-xl shadow-sm border"></div>
              ))}
            </div>

            {/* Content skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="h-96 bg-white rounded-xl shadow-sm border"></div>
              <div className="h-96 bg-white rounded-xl shadow-sm border"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 mt-2 text-lg">Manage your platform with powerful tools</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700">
                <Download className="w-4 h-4" />
                Export Data
              </Button>
              <Button variant="outline" size="sm" className="gap-2 bg-gradient-to-r from-gray-800 to-gray-800 hover:from-gray-500">
                <Settings className="w-4 h-4" />
                Settings
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-white/70 backdrop-blur-sm p-1.5 rounded-xl border shadow-sm w-fit">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === "overview"
                  ? "bg-white text-blue-700 shadow-md ring-1 ring-blue-100"
                  : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
              }`}
            >
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Overview
              </div>
            </button>
            <button
              onClick={() => setActiveTab("add-problem")}
              className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === "add-problem"
                  ? "bg-white text-blue-700 shadow-md ring-1 ring-blue-100"
                  : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
              }`}
            >
              <div className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Problem
              </div>
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-blue-100">Total Users</CardTitle>
                    <div className="p-2 bg-white/20 rounded-lg">
                      <Users className="h-5 w-5" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-1">{data.totalUsers.toLocaleString()}</div>
                  <p className="text-blue-100 text-sm">Registered users</p>
                </CardContent>
                <div className="absolute -right-4 -bottom-4 opacity-20">
                  <Users className="h-24 w-24" />
                </div>
              </Card>

              <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-emerald-100">Total Problems</CardTitle>
                    <div className="p-2 bg-white/20 rounded-lg">
                      <BookOpen className="h-5 w-5" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-1">{data.totalProblems.toLocaleString()}</div>
                  <p className="text-emerald-100 text-sm">Coding challenges</p>
                </CardContent>
                <div className="absolute -right-4 -bottom-4 opacity-20">
                  <BookOpen className="h-24 w-24" />
                </div>
              </Card>

              <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-amber-500 to-orange-500 text-white">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-amber-100">Easy Problems</CardTitle>
                    <div className="p-2 bg-white/20 rounded-lg">
                      <TrendingUp className="h-5 w-5" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-1">
                    {data.problems.filter((p) => p.difficulty === "Easy").length}
                  </div>
                  <p className="text-amber-100 text-sm">Beginner friendly</p>
                </CardContent>
                <div className="absolute -right-4 -bottom-4 opacity-20">
                  <Star className="h-24 w-24" />
                </div>
              </Card>

              <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-rose-500 to-pink-600 text-white">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-rose-100">Hard Problems</CardTitle>
                    <div className="p-2 bg-white/20 rounded-lg">
                      <Activity className="h-5 w-5" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-1">
                    {data.problems.filter((p) => p.difficulty === "Hard").length}
                  </div>
                  <p className="text-rose-100 text-sm">Expert level</p>
                </CardContent>
                <div className="absolute -right-4 -bottom-4 opacity-20">
                  <Activity className="h-24 w-24" />
                </div>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Users */}
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl font-semibold text-gray-900">Recent Users</CardTitle>
                      <CardDescription className="text-gray-600">Latest registered members</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="gap-2">
                        <Search className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="gap-2">
                        <Filter className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {data.recentUsers.map((user, index) => (
                    <div
                      key={user._id}
                      className="group flex items-center gap-4 p-4 rounded-xl bg-gray-50/50 hover:bg-white hover:shadow-md transition-all duration-200 border border-transparent hover:border-gray-200"
                    >
                      <Avatar className="h-12 w-12 ring-2 ring-white shadow-sm">
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-semibold">
                          {getInitials(user.username)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-gray-900 truncate">{user.username}</p>
                          <Badge
                            variant={user.role === "admin" ? "default" : "secondary"}
                            className={user.role === "admin" ? "bg-purple-100 text-purple-700 border-purple-200" : ""}
                          >
                            {user.role}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 truncate">{user.email}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Clock className="w-3 h-3 text-gray-400" />
                          <p className="text-xs text-gray-500">
                            {new Date(user.createdAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                  {data.recentUsers.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>No users found</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Recent Problems */}
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl font-semibold text-gray-900">Recent Problems</CardTitle>
                      <CardDescription className="text-gray-600">Latest coding challenges</CardDescription>
                    </div>
                    <Button
                      onClick={() => setActiveTab("add-problem")}
                      size="sm"
                      className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                    >
                      <Plus className="w-4 h-4" />
                      Add Problem
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {data.problems.slice(0, 5).map((problem, index) => (
                    <div
                      key={problem._id}
                      className="group flex items-start gap-4 p-4 rounded-xl bg-gray-50/50 hover:bg-white hover:shadow-md transition-all duration-200 border border-transparent hover:border-gray-200"
                    >
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0 flex-1">
                            <h4 className="font-semibold text-gray-900 truncate group-hover:text-blue-700 transition-colors">
                              {problem.title}
                            </h4>
                            <p className="text-sm text-gray-600 mt-1">{problem.category}</p>
                            <div className="flex flex-wrap gap-1.5 mt-2">
                              {problem.tags.slice(0, 3).map((tag, tagIndex) => (
                                <Badge key={tagIndex} variant="outline" className="text-xs px-2 py-0.5 bg-white/50">
                                  {tag}
                                </Badge>
                              ))}
                              {problem.tags.length > 3 && (
                                <Badge variant="outline" className="text-xs px-2 py-0.5 bg-white/50">
                                  +{problem.tags.length - 3}
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <Badge className={`${getDifficultyColor(problem.difficulty)} border font-medium`}>
                              {problem.difficulty}
                            </Badge>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-gray-400" />
                              <p className="text-xs text-gray-500">
                                {new Date(problem.createdAt).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                })}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {data.problems.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>No problems found</p>
                      <Button onClick={() => setActiveTab("add-problem")} variant="outline" size="sm" className="mt-3">
                        Create your first problem
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === "add-problem" && (
          <div className="max-w-5xl mx-auto">
            <ProblemForm onSuccess={handleProblemCreated} />
          </div>
        )}
      </div>
    </div>
  )
}
