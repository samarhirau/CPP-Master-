"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Database, Download, Play, CheckCircle, AlertCircle, Copy, ExternalLink, Terminal, Cloud } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function QuickSetup() {
  const { toast } = useToast()
  const [connectionString, setConnectionString] = useState("mongodb://localhost:27017/coding-platform")
  const [testing, setTesting] = useState(false)

  const testConnection = async (uri: string) => {
    setTesting(true)
    try {
      const response = await fetch("/api/database/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uri }),
      })
      const result = await response.json()

      if (result.success) {
        toast({
          title: "Success!",
          description: "Database connection is working!",
        })
        return true
      } else {
        toast({
          title: "Connection Failed",
          description: result.error,
          variant: "destructive",
        })
        return false
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to test connection",
        variant: "destructive",
      })
      return false
    } finally {
      setTesting(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied!",
      description: "Command copied to clipboard",
    })
  }

  const seedDatabase = async () => {
    try {
      const response = await fetch("/api/database/seed", { method: "POST" })
      const result = await response.json()

      if (result.success) {
        toast({
          title: "Success!",
          description: "Sample data added to database",
        })
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to seed database",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to seed database",
        variant: "destructive",
      })
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto border-0 shadow-xl bg-white/90 backdrop-blur-sm">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Database className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-gray-900">Quick MongoDB Setup</CardTitle>
            <CardDescription className="text-gray-600 text-base">
              Get your database connected in minutes
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-8">
        <Tabs defaultValue="docker" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="docker" className="gap-2">
              <Terminal className="w-4 h-4" />
              Docker
            </TabsTrigger>
            <TabsTrigger value="local" className="gap-2">
              <Download className="w-4 h-4" />
              Local Install
            </TabsTrigger>
            <TabsTrigger value="atlas" className="gap-2">
              <Cloud className="w-4 h-4" />
              MongoDB Atlas
            </TabsTrigger>
          </TabsList>

          {/* Docker Setup */}
          <TabsContent value="docker" className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  Recommended
                </Badge>
                <span className="text-sm text-gray-600">Easiest and fastest setup</span>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Step 1: Start MongoDB with Docker</h4>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 p-2 bg-gray-800 text-green-400 rounded text-sm font-mono">
                      docker run -d -p 27017:27017 --name mongodb mongo
                    </code>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard("docker run -d -p 27017:27017 --name mongodb mongo")}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Step 2: Test Connection</h4>
                  <div className="flex items-center gap-2">
                    <Input
                      value={connectionString}
                      onChange={(e) => setConnectionString(e.target.value)}
                      className="font-mono text-sm"
                    />
                    <Button onClick={() => testConnection(connectionString)} disabled={testing}>
                      {testing ? "Testing..." : "Test"}
                    </Button>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Step 3: Add Sample Data</h4>
                  <Button onClick={seedDatabase} className="gap-2">
                    <Play className="w-4 h-4" />
                    Seed Database
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Local Installation */}
          <TabsContent value="local" className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <span>🍎</span> macOS
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <code className="flex-1 p-2 bg-gray-800 text-green-400 rounded text-xs font-mono">
                        brew install mongodb-community
                      </code>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard("brew install mongodb-community")}
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 p-2 bg-gray-800 text-green-400 rounded text-xs font-mono">
                        brew services start mongodb/brew/mongodb-community
                      </code>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard("brew services start mongodb/brew/mongodb-community")}
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <span>🐧</span> Linux
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <code className="flex-1 p-2 bg-gray-800 text-green-400 rounded text-xs font-mono">
                        sudo apt install mongodb-org
                      </code>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard("sudo apt install mongodb-org")}
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 p-2 bg-gray-800 text-green-400 rounded text-xs font-mono">
                        sudo systemctl start mongod
                      </code>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard("sudo systemctl start mongod")}
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-800">After Installation</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      MongoDB will be available at <code>mongodb://localhost:27017</code>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* MongoDB Atlas */}
          <TabsContent value="atlas" className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                  Cloud Solution
                </Badge>
                <span className="text-sm text-gray-600">No local installation required</span>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Step 1: Create Account</h4>
                  <Button variant="outline" className="gap-2" asChild>
                    <a href="https://www.mongodb.com/atlas" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4" />
                      Go to MongoDB Atlas
                    </a>
                  </Button>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Step 2: Create Cluster</h4>
                  <ul className="text-sm text-gray-600 space-y-1 ml-4">
                    <li>• Choose "Build a Database"</li>
                    <li>• Select "M0 Sandbox" (Free tier)</li>
                    <li>• Choose your preferred region</li>
                    <li>• Create cluster</li>
                  </ul>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Step 3: Get Connection String</h4>
                  <div className="space-y-2">
                    <Label htmlFor="atlas-uri">Paste your Atlas connection string:</Label>
                    <Input
                      id="atlas-uri"
                      placeholder="mongodb+srv://username:password@cluster.mongodb.net/..."
                      value={connectionString}
                      onChange={(e) => setConnectionString(e.target.value)}
                      className="font-mono text-sm"
                    />
                    <Button onClick={() => testConnection(connectionString)} disabled={testing} className="w-full">
                      {testing ? "Testing..." : "Test Atlas Connection"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-green-800">Once Connected</h4>
              <p className="text-sm text-green-700 mt-1">
                Your admin dashboard will automatically detect the connection and show "Connected" status. You can then
                add sample data and start managing your platform!
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
