"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, Database, Users, BookOpen, CheckCircle, Play } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function SeedButton() {
  const { toast } = useToast()
  const [seeding, setSeeding] = useState(false)
  const [seeded, setSeeded] = useState(false)
  const [seedData, setSeedData] = useState<any>(null)

  const handleSeed = async () => {
    setSeeding(true)
    try {
      const response = await fetch("/api/database/seed", {
        method: "POST",
      })
      const result = await response.json()

      if (result.success) {
        setSeeded(true)
        setSeedData(result.data)
        toast({
          title: "Success!",
          description: `Added ${result.data.usersAdded} users and ${result.data.problemsAdded} problems`,
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
    } finally {
      setSeeding(false)
    }
  }

  return (
    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100 rounded-lg">
            <Database className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <CardTitle className="text-lg font-semibold">Sample Data</CardTitle>
            <CardDescription className="text-gray-600">Add sample users and coding problems</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {!seeded ? (
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">What will be added:</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-600" />
                  <span>8 Sample Users</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  <span>10 Coding Problems</span>
                </div>
              </div>
              <div className="mt-3 text-xs text-blue-700">
                <p>• Users: admin, developers, and regular users</p>
                <p>• Problems: Easy, Medium, and Hard difficulty levels</p>
                <p>• Categories: Array, String, Linked List, etc.</p>
              </div>
            </div>

            <Button onClick={handleSeed} disabled={seeding} className="w-full gap-2" size="lg">
              {seeding ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Adding Sample Data...
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  Add Sample Data
                </>
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-green-700">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">Sample data added successfully!</span>
            </div>

            {seedData && (
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{seedData.totalUsers}</div>
                  <div className="text-sm text-blue-700">Total Users</div>
                  {seedData.usersAdded > 0 && (
                    <Badge variant="secondary" className="mt-1 text-xs">
                      +{seedData.usersAdded} new
                    </Badge>
                  )}
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{seedData.totalProblems}</div>
                  <div className="text-sm text-green-700">Total Problems</div>
                  {seedData.problemsAdded > 0 && (
                    <Badge variant="secondary" className="mt-1 text-xs">
                      +{seedData.problemsAdded} new
                    </Badge>
                  )}
                </div>
              </div>
            )}

            <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">
              <p>✅ Your database now has sample data!</p>
              <p>✅ Refresh the page to see the updated statistics</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
