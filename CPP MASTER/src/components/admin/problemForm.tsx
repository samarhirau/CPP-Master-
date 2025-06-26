"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { X, Plus, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Example {
  input: string
  output: string
  explanation?: string
}

interface TestCase {
  input: string
  expectedOutput: string
}

interface StarterCode {
  javascript: string
  python: string
  java: string
}

interface ProblemFormData {
  title: string
  description: string
  difficulty: "Easy" | "Medium" | "Hard" | ""
  category: string
  tags: string[]
  examples: Example[]
  constraints: string[]
  starterCode: StarterCode
  solution: string
  testCases: TestCase[]
}

interface ProblemFormProps {
  onSuccess?: () => void
}

export default function ProblemForm({ onSuccess }: ProblemFormProps) {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentTag, setCurrentTag] = useState("")
  const [currentConstraint, setCurrentConstraint] = useState("")

  const [formData, setFormData] = useState<ProblemFormData>({
    title: "",
    description: "",
    difficulty: "",
    category: "",
    tags: [],
    examples: [{ input: "", output: "", explanation: "" }],
    constraints: [],
    starterCode: {
      javascript: "",
      python: "",
      java: "",
    },
    solution: "",
    testCases: [{ input: "", expectedOutput: "" }],
  })

  const handleInputChange = (field: keyof ProblemFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()],
      }))
      setCurrentTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const addConstraint = () => {
    if (currentConstraint.trim()) {
      setFormData((prev) => ({
        ...prev,
        constraints: [...prev.constraints, currentConstraint.trim()],
      }))
      setCurrentConstraint("")
    }
  }

  const removeConstraint = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      constraints: prev.constraints.filter((_, i) => i !== index),
    }))
  }

  const addExample = () => {
    setFormData((prev) => ({
      ...prev,
      examples: [...prev.examples, { input: "", output: "", explanation: "" }],
    }))
  }

  const removeExample = (index: number) => {
    if (formData.examples.length > 1) {
      setFormData((prev) => ({
        ...prev,
        examples: prev.examples.filter((_, i) => i !== index),
      }))
    }
  }

  const updateExample = (index: number, field: keyof Example, value: string) => {
    setFormData((prev) => ({
      ...prev,
      examples: prev.examples.map((example, i) => (i === index ? { ...example, [field]: value } : example)),
    }))
  }

  const addTestCase = () => {
    setFormData((prev) => ({
      ...prev,
      testCases: [...prev.testCases, { input: "", expectedOutput: "" }],
    }))
  }

  const removeTestCase = (index: number) => {
    if (formData.testCases.length > 1) {
      setFormData((prev) => ({
        ...prev,
        testCases: prev.testCases.filter((_, i) => i !== index),
      }))
    }
  }

  const updateTestCase = (index: number, field: keyof TestCase, value: string) => {
    setFormData((prev) => ({
      ...prev,
      testCases: prev.testCases.map((testCase, i) => (i === index ? { ...testCase, [field]: value } : testCase)),
    }))
  }

  const updateStarterCode = (language: keyof StarterCode, value: string) => {
    setFormData((prev) => ({
      ...prev,
      starterCode: { ...prev.starterCode, [language]: value },
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/problems", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (result.success) {
        toast({
          title: "Success!",
          description: "Problem created successfully.",
        })

        // Reset form
        setFormData({
          title: "",
          description: "",
          difficulty: "",
          category: "",
          tags: [],
          examples: [{ input: "", output: "", explanation: "" }],
          constraints: [],
          starterCode: {
            javascript: "",
            python: "",
            java: "",
          },
          solution: "",
          testCases: [{ input: "", expectedOutput: "" }],
        })

        onSuccess?.()
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to create problem.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto border-0 shadow-xl bg-white/90 backdrop-blur-sm text-black">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
        <CardTitle className="text-2xl font-bold text-gray-900">Add New Coding Problem</CardTitle>
        <CardDescription className="text-gray-600 text-base">
          Create a comprehensive coding challenge for your platform
        </CardDescription>
      </CardHeader>
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Two Sum"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) => handleInputChange("category", e.target.value)}
                placeholder="Array, Hash Table"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="difficulty">Difficulty *</Label>
            <select
              id="difficulty"
              value={formData.difficulty}
              onChange={(e) => handleInputChange("difficulty", e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              required
            >
              <option value="">Select difficulty</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Given an array of integers nums and an integer target..."
              rows={4}
              required
            />
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="flex gap-2">
              <Input
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                placeholder="Add a tag"
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
              />
              <Button type="button" onClick={addTag} variant="outline">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {tag}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => removeTag(tag)} />
                </Badge>
              ))}
            </div>
          </div>

          {/* Examples */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Examples</Label>
              <Button type="button" onClick={addExample} variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Example
              </Button>
            </div>
            {formData.examples.map((example, index) => (
              <Card key={index} className="p-6 bg-gray-50/50 border-gray-200 shadow-sm">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium">Example {index + 1}</h4>
                  {formData.examples.length > 1 && (
                    <Button type="button" onClick={() => removeExample(index)} variant="ghost" size="sm">
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Input</Label>
                    <Textarea
                      value={example.input}
                      onChange={(e) => updateExample(index, "input", e.target.value)}
                      placeholder="nums = [2,7,11,15], target = 9"
                      rows={2}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Output</Label>
                    <Textarea
                      value={example.output}
                      onChange={(e) => updateExample(index, "output", e.target.value)}
                      placeholder="[0,1]"
                      rows={2}
                    />
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <Label>Explanation (Optional)</Label>
                  <Textarea
                    value={example.explanation || ""}
                    onChange={(e) => updateExample(index, "explanation", e.target.value)}
                    placeholder="Because nums[0] + nums[1] == 9, we return [0, 1]."
                    rows={2}
                  />
                </div>
              </Card>
            ))}
          </div>

          {/* Constraints */}
          <div className="space-y-2">
            <Label>Constraints</Label>
            <div className="flex gap-2">
              <Input
                value={currentConstraint}
                onChange={(e) => setCurrentConstraint(e.target.value)}
                placeholder="2 <= nums.length <= 10^4"
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addConstraint())}
              />
              <Button type="button" onClick={addConstraint} variant="outline">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-2">
              {formData.constraints.map((constraint, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded">
                  <span className="flex-1">{constraint}</span>
                  <Button type="button" onClick={() => removeConstraint(index)} variant="ghost" size="sm">
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Starter Code */}
          <div className="space-y-4">
            <Label>Starter Code</Label>
            <div className="grid grid-cols-1 gap-4">
              {Object.entries(formData.starterCode).map(([language, code]) => (
                <div key={language} className="space-y-2">
                  <Label className="capitalize">{language}</Label>
                  <Textarea
                    value={code}
                    onChange={(e) => updateStarterCode(language as keyof StarterCode, e.target.value)}
                    placeholder={`function twoSum(nums, target) {\n    // Your code here\n}`}
                    rows={4}
                    className="font-mono text-sm"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Solution */}
          <div className="space-y-2">
            <Label htmlFor="solution">Solution *</Label>
            <Textarea
              id="solution"
              value={formData.solution}
              onChange={(e) => handleInputChange("solution", e.target.value)}
              placeholder="Provide the complete solution..."
              rows={6}
              className="font-mono text-sm"
              required
            />
          </div>

          {/* Test Cases */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Test Cases</Label>
              <Button type="button" onClick={addTestCase} variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Test Case
              </Button>
            </div>
            {formData.testCases.map((testCase, index) => (
              <Card key={index} className="p-6 bg-gray-50/50 border-gray-200 shadow-sm">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium">Test Case {index + 1}</h4>
                  {formData.testCases.length > 1 && (
                    <Button type="button" onClick={() => removeTestCase(index)} variant="ghost" size="sm">
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Input</Label>
                    <Textarea
                      value={testCase.input}
                      onChange={(e) => updateTestCase(index, "input", e.target.value)}
                      placeholder="[2,7,11,15], 9"
                      rows={2}
                      className="font-mono text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Expected Output</Label>
                    <Textarea
                      value={testCase.expectedOutput}
                      onChange={(e) => updateTestCase(index, "expectedOutput", e.target.value)}
                      placeholder="[0,1]"
                      rows={2}
                      className="font-mono text-sm"
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Button
            type="submit"
            className="w-full h-12 text-base font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-200"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                Creating Problem...
              </>
            ) : (
              <>
                <Plus className="w-5 h-5 mr-3" />
                Create Problem
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
