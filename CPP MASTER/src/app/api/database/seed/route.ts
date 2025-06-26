import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import User from "@/lib/models/User"
import Problem from "@/lib/models/Problem"

const sampleUsers = [
  {
    username: "admin",
    email: "admin@codingplatform.com",
    password: "admin123",
    role: "admin",
  },
  {
    username: "john_doe",
    email: "john.doe@example.com",
    password: "password123",
    role: "user",
  },
  {
    username: "jane_smith",
    email: "jane.smith@example.com",
    password: "password123",
    role: "user",
  },
  {
    username: "alex_dev",
    email: "alex.developer@example.com",
    password: "password123",
    role: "user",
  },
  {
    username: "sarah_coder",
    email: "sarah.coder@example.com",
    password: "password123",
    role: "user",
  },
]

const sampleProblems = [
  {
    title: "Two Sum",
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.`,
    difficulty: "Easy",
    category: "Array",
    tags: ["Array", "Hash Table"],
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
      },
    ],
    constraints: ["2 <= nums.length <= 10^4", "-10^9 <= nums[i] <= 10^9"],
    starterCode: {
      javascript: "function twoSum(nums, target) {\n    // Your code here\n}",
      python: "def two_sum(nums, target):\n    // Your code here\n    pass",
      java: "public int[] twoSum(int[] nums, int target) {\n    // Your code here\n}",
    },
    solution: `function twoSum(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
    return [];
}`,
    testCases: [
      { input: "[2,7,11,15], 9", expectedOutput: "[0,1]" },
      { input: "[3,2,4], 6", expectedOutput: "[1,2]" },
    ],
  },
  {
    title: "Valid Parentheses",
    description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.`,
    difficulty: "Easy",
    category: "String",
    tags: ["String", "Stack"],
    examples: [
      {
        input: 's = "()"',
        output: "true",
      },
    ],
    constraints: ["1 <= s.length <= 10^4"],
    starterCode: {
      javascript: "function isValid(s) {\n    // Your code here\n}",
      python: "def is_valid(s):\n    // Your code here\n    pass",
      java: "public boolean isValid(String s) {\n    // Your code here\n}",
    },
    solution: `function isValid(s) {
    const stack = [];
    const map = { ')': '(', '}': '{', ']': '[' };
    
    for (let char of s) {
        if (char in map) {
            if (stack.pop() !== map[char]) return false;
        } else {
            stack.push(char);
        }
    }
    
    return stack.length === 0;
}`,
    testCases: [
      { input: '"()"', expectedOutput: "true" },
      { input: '"()[]{}"', expectedOutput: "true" },
    ],
  },
  {
    title: "Merge Two Sorted Lists",
    description: `You are given the heads of two sorted linked lists list1 and list2. Merge the two lists in a one sorted list.`,
    difficulty: "Easy",
    category: "Linked List",
    tags: ["Linked List", "Recursion"],
    examples: [
      {
        input: "list1 = [1,2,4], list2 = [1,3,4]",
        output: "[1,1,2,3,4,4]",
      },
    ],
    constraints: ["The number of nodes in both lists is in the range [0, 50]."],
    starterCode: {
      javascript: "function mergeTwoLists(list1, list2) {\n    // Your code here\n}",
      python: "def merge_two_lists(list1, list2):\n    // Your code here\n    pass",
      java: "public ListNode mergeTwoLists(ListNode list1, ListNode list2) {\n    // Your code here\n}",
    },
    solution: `function mergeTwoLists(list1, list2) {
    const dummy = new ListNode(0);
    let current = dummy;
    
    while (list1 && list2) {
        if (list1.val <= list2.val) {
            current.next = list1;
            list1 = list1.next;
        } else {
            current.next = list2;
            list2 = list2.next;
        }
        current = current.next;
    }
    
    current.next = list1 || list2;
    return dummy.next;
}`,
    testCases: [{ input: "[1,2,4], [1,3,4]", expectedOutput: "[1,1,2,3,4,4]" }],
  },
  {
    title: "Add Two Numbers",
    description: `You are given two non-empty linked lists representing two non-negative integers. Add the two numbers and return the sum as a linked list.`,
    difficulty: "Medium",
    category: "Linked List",
    tags: ["Linked List", "Math"],
    examples: [
      {
        input: "l1 = [2,4,3], l2 = [5,6,4]",
        output: "[7,0,8]",
        explanation: "342 + 465 = 807.",
      },
    ],
    constraints: ["The number of nodes in each linked list is in the range [1, 100]."],
    starterCode: {
      javascript: "function addTwoNumbers(l1, l2) {\n    // Your code here\n}",
      python: "def add_two_numbers(l1, l2):\n    // Your code here\n    pass",
      java: "public ListNode addTwoNumbers(ListNode l1, ListNode l2) {\n    // Your code here\n}",
    },
    solution: `function addTwoNumbers(l1, l2) {
    const dummy = new ListNode(0);
    let current = dummy;
    let carry = 0;
    
    while (l1 || l2 || carry) {
        const val1 = l1 ? l1.val : 0;
        const val2 = l2 ? l2.val : 0;
        const sum = val1 + val2 + carry;
        
        carry = Math.floor(sum / 10);
        current.next = new ListNode(sum % 10);
        current = current.next;
        
        if (l1) l1 = l1.next;
        if (l2) l2 = l2.next;
    }
    
    return dummy.next;
}`,
    testCases: [{ input: "[2,4,3], [5,6,4]", expectedOutput: "[7,0,8]" }],
  },
  {
    title: "Longest Substring Without Repeating Characters",
    description: `Given a string s, find the length of the longest substring without repeating characters.`,
    difficulty: "Medium",
    category: "String",
    tags: ["Hash Table", "String", "Sliding Window"],
    examples: [
      {
        input: 's = "abcabcbb"',
        output: "3",
        explanation: 'The answer is "abc", with the length of 3.',
      },
    ],
    constraints: ["0 <= s.length <= 5 * 10^4"],
    starterCode: {
      javascript: "function lengthOfLongestSubstring(s) {\n    // Your code here\n}",
      python: "def length_of_longest_substring(s):\n    // Your code here\n    pass",
      java: "public int lengthOfLongestSubstring(String s) {\n    // Your code here\n}",
    },
    solution: `function lengthOfLongestSubstring(s) {
    const seen = new Set();
    let left = 0;
    let maxLength = 0;
    
    for (let right = 0; right < s.length; right++) {
        while (seen.has(s[right])) {
            seen.delete(s[left]);
            left++;
        }
        seen.add(s[right]);
        maxLength = Math.max(maxLength, right - left + 1);
    }
    
    return maxLength;
}`,
    testCases: [
      { input: '"abcabcbb"', expectedOutput: "3" },
      { input: '"bbbbb"', expectedOutput: "1" },
    ],
  },
]

export async function POST() {
  try {
    await connectDB()

    // Check if data already exists
    const existingUsers = await User.countDocuments()
    const existingProblems = await Problem.countDocuments()

    let usersAdded = 0
    let problemsAdded = 0

    // Add users if none exist
    if (existingUsers === 0) {
      const insertedUsers = await User.insertMany(sampleUsers)
      usersAdded = insertedUsers.length
    }

    // Add problems if none exist
    if (existingProblems === 0) {
      const insertedProblems = await Problem.insertMany(sampleProblems)
      problemsAdded = insertedProblems.length
    }

    const finalUserCount = await User.countDocuments()
    const finalProblemCount = await Problem.countDocuments()

    return NextResponse.json({
      success: true,
      message: "Database seeded successfully",
      data: {
        usersAdded,
        problemsAdded,
        totalUsers: finalUserCount,
        totalProblems: finalProblemCount,
      },
    })
  } catch (error: any) {
    console.error("Seeding error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to seed database",
      },
      { status: 500 },
    )
  }
}
