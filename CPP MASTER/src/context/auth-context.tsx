"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

type User = {
  id: string
  name: string
  email: string
}

type AuthContextType = {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  // Check if user is logged in on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  // Mock login function - in a real app, this would call an API
  const login = async (email: string, password: string) => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock validation - in a real app, this would be handled by the backend
      const storedUsers = JSON.parse(localStorage.getItem("users") || "[]")
      const foundUser = storedUsers.find((u: any) => u.email === email)

      if (!foundUser || foundUser.password !== password) {
        throw new Error("Invalid email or password")
      }

      // Create user object without password
      const loggedInUser = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
      }

      // Save to state and localStorage
      setUser(loggedInUser)
      localStorage.setItem("user", JSON.stringify(loggedInUser))

      toast({
        title: "Login successful",
        description: `Welcome back, ${loggedInUser.name}!`,
      })

      router.push("/dashboard")
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Mock signup function
  const signup = async (name: string, email: string, password: string) => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Check if user already exists
      const storedUsers = JSON.parse(localStorage.getItem("users") || "[]")
      if (storedUsers.some((u: any) => u.email === email)) {
        throw new Error("User with this email already exists")
      }

      // Create new user
      const newUser = {
        id: `user-${Date.now()}`,
        name,
        email,
        password, // In a real app, this would be hashed
        progress: {
          completedLessons: [],
          completedProblems: [],
        },
      }

      // Save to localStorage
      storedUsers.push(newUser)
      localStorage.setItem("users", JSON.stringify(storedUsers))

      // Log in the new user
      const loggedInUser = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      }

      setUser(loggedInUser)
      localStorage.setItem("user", JSON.stringify(loggedInUser))

      toast({
        title: "Account created",
        description: "Your account has been created successfully!",
      })

      router.push("/dashboard")
    } catch (error: any) {
      toast({
        title: "Signup failed",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    router.push("/")
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    })
  }

  return <AuthContext.Provider value={{ user, loading, login, signup, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
