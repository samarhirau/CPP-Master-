"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Info, Clock, BookOpen } from "lucide-react"
import { DifficultyBadge } from "@/components/difficulty-badge"
import { CodeEditor } from "@/components/code-editor"
import { Navbar } from "@/components/navbar"
import { useAuth } from "@/context/auth-context"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

// Mock problem data - in a real app, this would come from an API or database
const problems = {
  "two-sum": {
    id: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    category: "Arrays",
    timeEstimate: "15 min",
    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
        explanation: "Because nums[1] + nums[2] == 6, we return [1, 2].",
      },
    ],
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists.",
    ],
    hints: [
      "Try using a hash map to store the values you've seen so far.",
      "For each element, check if target - current element exists in the hash map.",
    ],
    testCases: [
      {
        input: "nums = [2,7,11,15], target = 9",
        expectedOutput: "[0,1]",
      },
      {
        input: "nums = [3,2,4], target = 6",
        expectedOutput: "[1,2]",
      },
    ],
    initialCode: `#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Write your solution here
        
    }
};

int main() {
    // Test your solution here
    Solution sol;
    vector<int> nums = {2, 7, 11, 15};
    int target = 9;
    vector<int> result = sol.twoSum(nums, target);
    
    cout << "[" << result[0] << "," << result[1] << "]" << endl;
    
    return 0;
}`,
  },
  "valid-parentheses": {
    id: "valid-parentheses",
    title: "Valid Parentheses",
    difficulty: "Easy",
    category: "Stacks",
    timeEstimate: "15 min",
    description:
      "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if: Open brackets must be closed by the same type of brackets, and open brackets must be closed in the correct order.",
    examples: [
      {
        input: 's = "()"',
        output: "true",
      },
      {
        input: 's = "()[]{}"',
        output: "true",
      },
      {
        input: 's = "(]"',
        output: "false",
      },
    ],
    constraints: ["1 <= s.length <= 10^4", "s consists of parentheses only '()[]{}'."],
    hints: [
      "Use a stack to keep track of opening brackets.",
      "When you encounter a closing bracket, check if it matches the most recent opening bracket.",
    ],
    testCases: [
      {
        input: 's = "()"',
        expectedOutput: "true",
      },
      {
        input: 's = "()[]{}"',
        expectedOutput: "true",
      },
    ],
    initialCode: `#include <iostream>
#include <string>
#include <stack>
using namespace std;

class Solution {
public:
    bool isValid(string s) {
        // Write your solution here
        
    }
};

int main() {
    // Test your solution here
    Solution sol;
    string s = "()[]{}";
    bool result = sol.isValid(s);
    
    cout << (result ? "true" : "false") << endl;
    
    return 0;
}`,
  },
}

// Add this function after the problem data in the file
const getSampleSolution = (problemId: string) => {
  switch (problemId) {
    case "two-sum":
      return `#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> map; // value -> index
        
        for (int i = 0; i < nums.size(); i++) {
            int complement = target - nums[i];
            
            // Check if complement exists in map
            if (map.find(complement) != map.end()) {
                return {map[complement], i};
            }
            
            // Add current element to map
            map[nums[i]] = i;
        }
        
        // No solution found (problem states there is always a solution)
        return {};
    }
};

int main() {
    Solution sol;
    vector<int> nums = {2, 7, 11, 15};
    int target = 9;
    vector<int> result = sol.twoSum(nums, target);
    
    cout << "[" << result[0] << "," << result[1] << "]" << endl;
    
    return 0;
}`
    case "valid-parentheses":
      return `#include <iostream>
#include <string>
#include <stack>
using namespace std;

class Solution {
public:
    bool isValid(string s) {
        stack<char> brackets;
        
        for (char c : s) {
            if (c == '(' || c == '{' || c == '[') {
                // Push opening brackets onto stack
                brackets.push(c);
            } else {
                // For closing brackets, check if stack is empty
                if (brackets.empty()) {
                    return false;
                }
                
                // Check if current closing bracket matches the top of the stack
                if (c == ')' && brackets.top() != '(') return false;
                if (c == '}' && brackets.top() != '{') return false;
                if (c == ']' && brackets.top() != '[') return false;
                
                // Remove the matching opening bracket
                brackets.pop();
            }
        }
        
        // If stack is empty, all brackets were matched
        return brackets.empty();
    }
};

int main() {
    Solution sol;
    string s = "()[]{}";
    bool result = sol.isValid(s);
    
    cout << (result ? "true" : "false") << endl;
    
    return 0;
}`
    default:
      return ""
  }
}

export default function ProblemPage({ params }: { params: { id: string } }) {
  const { user, loading } = useAuth()
  const router = useRouter()

  // Get problem data
  const problem = problems[params.id as keyof typeof problems]

  // Redirect if problem not found
  useEffect(() => {
    if (!loading && !problem) {
      router.push("/practice")
    }
  }, [problem, loading, router])

  if (!problem) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div>Problem not found</div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="container flex h-16 items-center justify-between border-b">
        <div className="flex items-center gap-4">
          <Link
            href="/practice"
            className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Problems</span>
          </Link>
          <div className="text-lg font-semibold">{problem.title}</div>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <BookOpen className="h-4 w-4 mr-2" />
              View Solution
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-auto">
            <DialogHeader>
              <DialogTitle>Sample Solution: {problem.title}</DialogTitle>
              <DialogDescription>
                This is one possible solution to the problem. Try to understand the approach before looking at the code.
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4">
              <h3 className="font-medium mb-2">Approach:</h3>
              {problem.id === "two-sum" && (
                <div className="mb-4">
                  <p className="mb-2">
                    For the Two Sum problem, we can use a hash map to achieve O(n) time complexity:
                  </p>
                  <ol className="list-decimal pl-5 space-y-1">
                    <li>Create a hash map to store each element's value and its index</li>
                    <li>Iterate through the array</li>
                    <li>For each element, calculate its complement (target - current value)</li>
                    <li>Check if the complement exists in the hash map</li>
                    <li>If found, return the current index and the complement's index</li>
                    <li>Otherwise, add the current element to the hash map and continue</li>
                  </ol>
                </div>
              )}
              {problem.id === "valid-parentheses" && (
                <div className="mb-4">
                  <p className="mb-2">For the Valid Parentheses problem, we can use a stack:</p>
                  <ol className="list-decimal pl-5 space-y-1">
                    <li>Create an empty stack to keep track of opening brackets</li>
                    <li>Iterate through each character in the string</li>
                    <li>If the character is an opening bracket, push it onto the stack</li>
                    <li>If it's a closing bracket, check if the stack is empty (return false if it is)</li>
                    <li>Check if the top of the stack matches the current closing bracket</li>
                    <li>If they match, pop the top element from the stack and continue</li>
                    <li>If they don't match, return false</li>
                    <li>After processing all characters, return true if the stack is empty</li>
                  </ol>
                </div>
              )}
              <h3 className="font-medium mb-2">Code:</h3>
              <pre className="bg-slate-100 dark:bg-slate-900 p-4 rounded-md overflow-auto text-sm font-mono">
                {getSampleSolution(problem.id)}
              </pre>
              <div className="mt-4 bg-yellow-50 dark:bg-yellow-950 p-4 rounded-md">
                <p className="text-yellow-800 dark:text-yellow-300 text-sm">
                  <strong>Note:</strong> There are often multiple ways to solve a problem. This is just one approach.
                  Try to implement your own solution before looking at this one.
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <main className="flex-1 flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 border-r overflow-auto">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <h1 className="text-2xl font-bold">{problem.title}</h1>
              <DifficultyBadge difficulty={problem.difficulty as "Easy" | "Medium" | "Hard"} />
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{problem.timeEstimate}</span>
              </div>
              <div>{problem.category}</div>
            </div>

            <div className="prose dark:prose-invert max-w-none">
              <p>{problem.description}</p>

              <h3>Examples:</h3>
              {problem.examples.map((example, index) => (
                <div key={index} className="mb-4 p-3 bg-slate-50 dark:bg-slate-900 rounded-md">
                  <p>
                    <strong>Input:</strong> {example.input}
                  </p>
                  <p>
                    <strong>Output:</strong> {example.output}
                  </p>
                  {example.explanation && (
                    <p>
                      <strong>Explanation:</strong> {example.explanation}
                    </p>
                  )}
                </div>
              ))}

              <h3>Constraints:</h3>
              <ul>
                {problem.constraints.map((constraint, index) => (
                  <li key={index}>{constraint}</li>
                ))}
              </ul>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-md flex gap-3 mt-6">
                <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-1">Hints:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {problem.hints.map((hint, index) => (
                      <li key={index} className="text-blue-700 dark:text-blue-400">
                        {hint}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex flex-col h-[600px] lg:h-auto">
          <CodeEditor initialCode={problem.initialCode} problemId={problem.id} testCases={problem.testCases} />
        </div>
      </main>
    </div>
  )
}
