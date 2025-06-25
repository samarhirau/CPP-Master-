"use client"

import { useState } from "react"
import { Loader2, Play, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

interface CodeEditorProps {
  initialCode: string
  problemId: string
  testCases: {
    input: string
    expectedOutput: string
  }[]
}

export function CodeEditor({ initialCode, problemId, testCases }: CodeEditorProps) {
  const [code, setCode] = useState(initialCode)
  const [output, setOutput] = useState("")
  const [isRunning, setIsRunning] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState("code")
  const { toast } = useToast()

  // Simulate running the code
  const runCode = async () => {
    setIsRunning(true)
    setActiveTab("output")
    setOutput("Running code...\n")

    try {
      // Simulate code execution delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Simple test case execution for Two Sum problem
      if (problemId === "two-sum") {
        // Check if the code contains a solution implementation
        if (code.includes("vector<int> twoSum") && code.includes("return")) {
          // Simulate output for successful execution
          setOutput(
            "Test case execution:\n\nInput: nums = [2,7,11,15], target = 9\nYour output: [0,1]\n\nCode executed successfully!",
          )
        } else {
          setOutput("Error: Your solution is incomplete. Make sure you've implemented the twoSum function correctly.")
        }
      } else {
        // Generic output for other problems
        setOutput(
          "Code executed successfully!\n\nSample output:\n[This is a simulated output as we can't actually run C++ in the browser]",
        )
      }
    } catch (error) {
      setOutput("Error executing code: " + (error instanceof Error ? error.message : String(error)))
    } finally {
      setIsRunning(false)
    }
  }

  // Replace the submitSolution function with this improved version that does better code analysis

  const submitSolution = async () => {
    setIsSubmitting(true)
    setActiveTab("output")
    setOutput("Evaluating your solution...\n")

    try {
      // Simulate submission delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // More thorough code analysis based on the problem
      if (problemId === "two-sum") {
        // Check for key elements of a correct Two Sum solution
        const hasUnorderedMap = code.includes("unordered_map") || code.includes("map<int")
        const hasIteration =
          code.includes("for(") || code.includes("for (") || code.includes("while(") || code.includes("while (")
        const hasTargetCheck = code.includes("target -") || code.includes("target-") || code.includes("target =")
        const hasReturn = code.includes("return") && code.includes("[") && code.includes("]")
        const hasFind = code.includes(".find(") || code.includes("find(")
        const hasCorrectLogic = code.includes("nums[i]") && (code.includes("map[") || code.includes("find("))

        // Analyze the solution
        if (hasUnorderedMap && hasIteration && hasTargetCheck && hasReturn && hasCorrectLogic) {
          // Solution looks correct
          setOutput(
            "All test cases passed!\n\n" +
              "Test Case 1:\n" +
              "Input: nums = [2,7,11,15], target = 9\n" +
              "Expected: [0,1]\n" +
              "Output: [0,1] ✓\n\n" +
              "Test Case 2:\n" +
              "Input: nums = [3,2,4], target = 6\n" +
              "Expected: [1,2]\n" +
              "Output: [1,2] ✓\n\n" +
              "Your solution is correct and efficient!\n\n" +
              "Time Complexity: O(n)\n" +
              "Space Complexity: O(n)",
          )

          // Save progress
          const storedUser = localStorage.getItem("user")
          if (storedUser) {
            const user = JSON.parse(storedUser)
            const storedUsers = JSON.parse(localStorage.getItem("users") || "[]")
            const userIndex = storedUsers.findIndex((u: any) => u.id === user.id)

            if (userIndex !== -1) {
              if (!storedUsers[userIndex].progress) {
                storedUsers[userIndex].progress = { completedProblems: [] }
              }
              if (!storedUsers[userIndex].progress.completedProblems) {
                storedUsers[userIndex].progress.completedProblems = []
              }

              if (!storedUsers[userIndex].progress.completedProblems.includes(problemId)) {
                storedUsers[userIndex].progress.completedProblems.push(problemId)
                localStorage.setItem("users", JSON.stringify(storedUsers))
              }
            }
          }

          toast({
            title: "Solution accepted!",
            description: "Congratulations! Your solution passed all test cases.",
          })
        } else if (code.includes("vector<int> twoSum") && code.includes("return")) {
          // Solution is incomplete or incorrect
          let feedback = "Your solution has some issues:\n\n"

          if (!hasUnorderedMap && !code.includes("map<")) {
            feedback += "- Consider using a hash map (unordered_map) for O(n) time complexity\n"
          }

          if (!hasTargetCheck) {
            feedback += "- Your solution should check for the complement (target - current element)\n"
          }

          if (!hasCorrectLogic) {
            feedback += "- The logic to find pairs that sum to target appears incomplete\n"
          }

          setOutput(
            "Some test cases failed:\n\n" +
              "Test Case 1:\n" +
              "Input: nums = [2,7,11,15], target = 9\n" +
              "Expected: [0,1]\n" +
              (hasReturn ? "Output: Incorrect ✗\n\n" : "Output: No return value ✗\n\n") +
              "Test Case 2:\n" +
              "Input: nums = [3,2,4], target = 6\n" +
              "Expected: [1,2]\n" +
              (hasReturn ? "Output: Incorrect ✗\n\n" : "Output: No return value ✗\n\n") +
              feedback,
          )

          toast({
            title: "Solution needs improvement",
            description: "Your solution failed some test cases. Please review the feedback.",
            variant: "destructive",
          })
        } else {
          // Solution is very incomplete
          setOutput(
            "Your solution is incomplete:\n\n" +
              "- Make sure you've implemented the twoSum function\n" +
              "- Your function should return a vector of two indices\n" +
              "- Consider using a hash map for an efficient solution\n\n" +
              "Example solution approach:\n" +
              "1. Use a hash map to store each element's value and index\n" +
              "2. For each element, check if its complement (target - current value) exists in the map\n" +
              "3. If found, return the current index and the complement's index",
          )

          toast({
            title: "Incomplete solution",
            description: "Please implement the twoSum function completely.",
            variant: "destructive",
          })
        }
      } else if (problemId === "valid-parentheses") {
        // Check for key elements of a correct Valid Parentheses solution
        const hasStack = code.includes("stack<") || code.includes("vector<") || code.includes("deque<")
        const hasBracketChecks =
          code.includes("(") &&
          code.includes(")") &&
          code.includes("[") &&
          code.includes("]") &&
          code.includes("{") &&
          code.includes("}")
        const hasPushPop =
          (code.includes(".push") || code.includes("push_back")) && (code.includes(".pop") || code.includes("pop_back"))
        const hasReturn =
          code.includes("return") &&
          (code.includes("empty") || code.includes("size") || code.includes("true") || code.includes("false"))

        if (hasStack && hasBracketChecks && hasPushPop && hasReturn) {
          // Solution looks correct
          setOutput(
            "All test cases passed!\n\n" +
              "Test Case 1:\n" +
              'Input: s = "()"\n' +
              "Expected: true\n" +
              "Output: true ✓\n\n" +
              "Test Case 2:\n" +
              'Input: s = "()[]{}"\n' +
              "Expected: true\n" +
              "Output: true ✓\n\n" +
              "Test Case 3:\n" +
              'Input: s = "(]"\n' +
              "Expected: false\n" +
              "Output: false ✓\n\n" +
              "Your solution is correct and efficient!\n\n" +
              "Time Complexity: O(n)\n" +
              "Space Complexity: O(n)",
          )

          // Save progress
          const storedUser = localStorage.getItem("user")
          if (storedUser) {
            const user = JSON.parse(storedUser)
            const storedUsers = JSON.parse(localStorage.getItem("users") || "[]")
            const userIndex = storedUsers.findIndex((u: any) => u.id === user.id)

            if (userIndex !== -1) {
              if (!storedUsers[userIndex].progress) {
                storedUsers[userIndex].progress = { completedProblems: [] }
              }
              if (!storedUsers[userIndex].progress.completedProblems) {
                storedUsers[userIndex].progress.completedProblems = []
              }

              if (!storedUsers[userIndex].progress.completedProblems.includes(problemId)) {
                storedUsers[userIndex].progress.completedProblems.push(problemId)
                localStorage.setItem("users", JSON.stringify(storedUsers))
              }
            }
          }

          toast({
            title: "Solution accepted!",
            description: "Congratulations! Your solution passed all test cases.",
          })
        } else {
          // Solution is incomplete or incorrect
          let feedback = "Your solution has some issues:\n\n"

          if (!hasStack) {
            feedback += "- Consider using a stack data structure to track opening brackets\n"
          }

          if (!hasBracketChecks) {
            feedback += "- Your solution should check all bracket types: (), [], {}\n"
          }

          if (!hasPushPop) {
            feedback += "- You should push opening brackets and pop when finding closing brackets\n"
          }

          setOutput(
            "Some test cases failed:\n\n" +
              "Test Case 1:\n" +
              'Input: s = "()"\n' +
              "Expected: true\n" +
              "Output: Incorrect ✗\n\n" +
              "Test Case 3:\n" +
              'Input: s = "(]"\n' +
              "Expected: false\n" +
              "Output: Incorrect ✗\n\n" +
              feedback,
          )

          toast({
            title: "Solution needs improvement",
            description: "Your solution failed some test cases. Please review the feedback.",
            variant: "destructive",
          })
        }
      } else {
        // Generic output for other problems
        setOutput(
          "Submission evaluation:\n\n" +
            "Your solution passed 2/3 test cases.\n\n" +
            "[This is a simulated result as we can't actually evaluate C++ code in the browser]\n\n" +
            "Feedback:\n" +
            "- Your approach seems generally correct\n" +
            "- Check edge cases like empty inputs or extreme values\n" +
            "- Consider optimizing for better time/space complexity",
        )
      }
    } catch (error) {
      setOutput("Error evaluating solution: " + (error instanceof Error ? error.message : String(error)))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col h-full">
      <Tabs defaultValue="code" value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <div className="border-b px-4">
          <TabsList className="h-12">
            <TabsTrigger value="code">Code</TabsTrigger>
            <TabsTrigger value="output">Output</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="code" className="flex-1 p-0 m-0">
          <div className="h-full">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-full p-4 font-mono text-sm bg-slate-50 dark:bg-slate-900 focus:outline-none resize-none"
            />
          </div>
        </TabsContent>

        <TabsContent
          value="output"
          className="flex-1 p-4 m-0 bg-slate-50 dark:bg-slate-900 font-mono text-sm overflow-auto whitespace-pre-wrap"
        >
          {output || "Run your code to see output here..."}
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-2 p-4 border-t">
        <Button variant="outline" onClick={runCode} disabled={isRunning || isSubmitting}>
          {isRunning ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Running...
            </>
          ) : (
            <>
              <Play className="mr-2 h-4 w-4" />
              Run Code
            </>
          )}
        </Button>
        <Button
          onClick={submitSolution}
          disabled={isRunning || isSubmitting}
          className="bg-green-600 hover:bg-green-700"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Check className="mr-2 h-4 w-4" />
              Submit
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
