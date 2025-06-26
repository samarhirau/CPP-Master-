import mongoose from "mongoose"
import User from "../lib/models/User.js"
import Problem from "../lib/models/Problem.js"
import connectDB from "../lib/mongodb.js"

const sampleUsers = [
  {
    username: "admin",
    email: "admin@codingplatform.com",
    password: "admin123", // In production, this should be hashed
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
  {
    username: "mike_engineer",
    email: "mike.engineer@example.com",
    password: "password123",
    role: "user",
  },
  {
    username: "lisa_programmer",
    email: "lisa.programmer@example.com",
    password: "password123",
    role: "user",
  },
  {
    username: "david_tech",
    email: "david.tech@example.com",
    password: "password123",
    role: "user",
  },
]

const sampleProblems = [
  {
    title: "Two Sum",
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
    difficulty: "Easy",
    category: "Array",
    tags: ["Array", "Hash Table"],
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
    starterCode: {
      javascript: `function twoSum(nums, target) {
    // Your code here
}`,
      python: `def two_sum(nums, target):
    # Your code here
    pass`,
      java: `public int[] twoSum(int[] nums, int target) {
    // Your code here
}`,
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
      { input: "[3,3], 6", expectedOutput: "[0,1]" },
    ],
  },
  {
    title: "Valid Parentheses",
    description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
    difficulty: "Easy",
    category: "String",
    tags: ["String", "Stack"],
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
    starterCode: {
      javascript: `function isValid(s) {
    // Your code here
}`,
      python: `def is_valid(s):
    # Your code here
    pass`,
      java: `public boolean isValid(String s) {
    // Your code here
}`,
    },
    solution: `function isValid(s) {
    const stack = [];
    const map = { ')': '(', '}': '{', ']': '[' };
    
    for (let char of s) {
        if (char in map) {
            if (stack.pop() !== map[char]) {
                return false;
            }
        } else {
            stack.push(char);
        }
    }
    
    return stack.length === 0;
}`,
    testCases: [
      { input: '"()"', expectedOutput: "true" },
      { input: '"()[]{}"', expectedOutput: "true" },
      { input: '"(]"', expectedOutput: "false" },
    ],
  },
  {
    title: "Merge Two Sorted Lists",
    description: `You are given the heads of two sorted linked lists list1 and list2.

Merge the two lists in a one sorted list. The list should be made by splicing together the nodes of the first two lists.

Return the head of the merged linked list.`,
    difficulty: "Easy",
    category: "Linked List",
    tags: ["Linked List", "Recursion"],
    examples: [
      {
        input: "list1 = [1,2,4], list2 = [1,3,4]",
        output: "[1,1,2,3,4,4]",
      },
      {
        input: "list1 = [], list2 = []",
        output: "[]",
      },
    ],
    constraints: [
      "The number of nodes in both lists is in the range [0, 50].",
      "-100 <= Node.val <= 100",
      "Both list1 and list2 are sorted in non-decreasing order.",
    ],
    starterCode: {
      javascript: `function mergeTwoLists(list1, list2) {
    // Your code here
}`,
      python: `def merge_two_lists(list1, list2):
    # Your code here
    pass`,
      java: `public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
    // Your code here
}`,
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
    testCases: [
      { input: "[1,2,4], [1,3,4]", expectedOutput: "[1,1,2,3,4,4]" },
      { input: "[], []", expectedOutput: "[]" },
      { input: "[], [0]", expectedOutput: "[0]" },
    ],
  },
  {
    title: "Best Time to Buy and Sell Stock",
    description: `You are given an array prices where prices[i] is the price of a given stock on the ith day.

You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.

Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.`,
    difficulty: "Easy",
    category: "Array",
    tags: ["Array", "Dynamic Programming"],
    examples: [
      {
        input: "prices = [7,1,5,3,6,4]",
        output: "5",
        explanation: "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.",
      },
      {
        input: "prices = [7,6,4,3,1]",
        output: "0",
        explanation: "In this case, no transactions are done and the max profit = 0.",
      },
    ],
    constraints: ["1 <= prices.length <= 10^5", "0 <= prices[i] <= 10^4"],
    starterCode: {
      javascript: `function maxProfit(prices) {
    // Your code here
}`,
      python: `def max_profit(prices):
    # Your code here
    pass`,
      java: `public int maxProfit(int[] prices) {
    // Your code here
}`,
    },
    solution: `function maxProfit(prices) {
    let minPrice = prices[0];
    let maxProfit = 0;
    
    for (let i = 1; i < prices.length; i++) {
        if (prices[i] < minPrice) {
            minPrice = prices[i];
        } else if (prices[i] - minPrice > maxProfit) {
            maxProfit = prices[i] - minPrice;
        }
    }
    
    return maxProfit;
}`,
    testCases: [
      { input: "[7,1,5,3,6,4]", expectedOutput: "5" },
      { input: "[7,6,4,3,1]", expectedOutput: "0" },
    ],
  },
  {
    title: "Valid Palindrome",
    description: `A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.

Given a string s, return true if it is a palindrome, or false otherwise.`,
    difficulty: "Easy",
    category: "String",
    tags: ["Two Pointers", "String"],
    examples: [
      {
        input: 's = "A man, a plan, a canal: Panama"',
        output: "true",
        explanation: '"amanaplanacanalpanama" is a palindrome.',
      },
      {
        input: 's = "race a car"',
        output: "false",
        explanation: '"raceacar" is not a palindrome.',
      },
    ],
    constraints: ["1 <= s.length <= 2 * 10^5", "s consists only of printable ASCII characters."],
    starterCode: {
      javascript: `function isPalindrome(s) {
    // Your code here
}`,
      python: `def is_palindrome(s):
    # Your code here
    pass`,
      java: `public boolean isPalindrome(String s) {
    // Your code here
}`,
    },
    solution: `function isPalindrome(s) {
    const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    let left = 0;
    let right = cleaned.length - 1;
    
    while (left < right) {
        if (cleaned[left] !== cleaned[right]) {
            return false;
        }
        left++;
        right--;
    }
    
    return true;
}`,
    testCases: [
      { input: '"A man, a plan, a canal: Panama"', expectedOutput: "true" },
      { input: '"race a car"', expectedOutput: "false" },
      { input: '" "', expectedOutput: "true" },
    ],
  },
  {
    title: "Add Two Numbers",
    description: `You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.`,
    difficulty: "Medium",
    category: "Linked List",
    tags: ["Linked List", "Math", "Recursion"],
    examples: [
      {
        input: "l1 = [2,4,3], l2 = [5,6,4]",
        output: "[7,0,8]",
        explanation: "342 + 465 = 807.",
      },
      {
        input: "l1 = [0], l2 = [0]",
        output: "[0]",
      },
    ],
    constraints: [
      "The number of nodes in each linked list is in the range [1, 100].",
      "0 <= Node.val <= 9",
      "It is guaranteed that the list represents a number that does not have leading zeros.",
    ],
    starterCode: {
      javascript: `function addTwoNumbers(l1, l2) {
    // Your code here
}`,
      python: `def add_two_numbers(l1, l2):
    # Your code here
    pass`,
      java: `public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
    // Your code here
}`,
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
    testCases: [
      { input: "[2,4,3], [5,6,4]", expectedOutput: "[7,0,8]" },
      { input: "[0], [0]", expectedOutput: "[0]" },
      { input: "[9,9,9,9,9,9,9], [9,9,9,9]", expectedOutput: "[8,9,9,9,0,0,0,1]" },
    ],
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
      {
        input: 's = "bbbbb"',
        output: "1",
        explanation: 'The answer is "b", with the length of 1.',
      },
    ],
    constraints: ["0 <= s.length <= 5 * 10^4", "s consists of English letters, digits, symbols and spaces."],
    starterCode: {
      javascript: `function lengthOfLongestSubstring(s) {
    // Your code here
}`,
      python: `def length_of_longest_substring(s):
    # Your code here
    pass`,
      java: `public int lengthOfLongestSubstring(String s) {
    // Your code here
}`,
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
      { input: '"pwwkew"', expectedOutput: "3" },
    ],
  },
  {
    title: "Container With Most Water",
    description: `You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).

Find two lines that together with the x-axis form a container, such that the container contains the most water.

Return the maximum amount of water a container can store.

Notice that you may not slant the container.`,
    difficulty: "Medium",
    category: "Array",
    tags: ["Array", "Two Pointers", "Greedy"],
    examples: [
      {
        input: "height = [1,8,6,2,5,4,8,3,7]",
        output: "49",
        explanation:
          "The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49.",
      },
    ],
    constraints: ["n == height.length", "2 <= n <= 10^5", "0 <= height[i] <= 10^4"],
    starterCode: {
      javascript: `function maxArea(height) {
    // Your code here
}`,
      python: `def max_area(height):
    # Your code here
    pass`,
      java: `public int maxArea(int[] height) {
    // Your code here
}`,
    },
    solution: `function maxArea(height) {
    let left = 0;
    let right = height.length - 1;
    let maxWater = 0;
    
    while (left < right) {
        const width = right - left;
        const currentHeight = Math.min(height[left], height[right]);
        const currentWater = width * currentHeight;
        maxWater = Math.max(maxWater, currentWater);
        
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    
    return maxWater;
}`,
    testCases: [
      { input: "[1,8,6,2,5,4,8,3,7]", expectedOutput: "49" },
      { input: "[1,1]", expectedOutput: "1" },
    ],
  },
  {
    title: "Median of Two Sorted Arrays",
    description: `Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.

The overall run time complexity should be O(log (m+n)).`,
    difficulty: "Hard",
    category: "Array",
    tags: ["Array", "Binary Search", "Divide and Conquer"],
    examples: [
      {
        input: "nums1 = [1,3], nums2 = [2]",
        output: "2.00000",
        explanation: "merged array = [1,2,3] and median is 2.",
      },
      {
        input: "nums1 = [1,2], nums2 = [3,4]",
        output: "2.50000",
        explanation: "merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.",
      },
    ],
    constraints: [
      "nums1.length == m",
      "nums2.length == n",
      "0 <= m <= 1000",
      "0 <= n <= 1000",
      "1 <= m + n <= 2000",
      "-10^6 <= nums1[i], nums2[i] <= 10^6",
    ],
    starterCode: {
      javascript: `function findMedianSortedArrays(nums1, nums2) {
    // Your code here
}`,
      python: `def find_median_sorted_arrays(nums1, nums2):
    # Your code here
    pass`,
      java: `public double findMedianSortedArrays(int[] nums1, int[] nums2) {
    // Your code here
}`,
    },
    solution: `function findMedianSortedArrays(nums1, nums2) {
    if (nums1.length > nums2.length) {
        [nums1, nums2] = [nums2, nums1];
    }
    
    const m = nums1.length;
    const n = nums2.length;
    let left = 0;
    let right = m;
    
    while (left <= right) {
        const partitionX = Math.floor((left + right) / 2);
        const partitionY = Math.floor((m + n + 1) / 2) - partitionX;
        
        const maxLeftX = partitionX === 0 ? -Infinity : nums1[partitionX - 1];
        const minRightX = partitionX === m ? Infinity : nums1[partitionX];
        
        const maxLeftY = partitionY === 0 ? -Infinity : nums2[partitionY - 1];
        const minRightY = partitionY === n ? Infinity : nums2[partitionY];
        
        if (maxLeftX <= minRightY && maxLeftY <= minRightX) {
            if ((m + n) % 2 === 0) {
                return (Math.max(maxLeftX, maxLeftY) + Math.min(minRightX, minRightY)) / 2;
            } else {
                return Math.max(maxLeftX, maxLeftY);
            }
        } else if (maxLeftX > minRightY) {
            right = partitionX - 1;
        } else {
            left = partitionX + 1;
        }
    }
}`,
    testCases: [
      { input: "[1,3], [2]", expectedOutput: "2.00000" },
      { input: "[1,2], [3,4]", expectedOutput: "2.50000" },
    ],
  },
  {
    title: "Regular Expression Matching",
    description: `Given an input string s and a pattern p, implement regular expression matching with support for '.' and '*' where:

'.' Matches any single character.
'*' Matches zero or more of the preceding element.

The matching should cover the entire input string (not partial).`,
    difficulty: "Hard",
    category: "String",
    tags: ["String", "Dynamic Programming", "Recursion"],
    examples: [
      {
        input: 's = "aa", p = "a"',
        output: "false",
        explanation: '"a" does not match the entire string "aa".',
      },
      {
        input: 's = "aa", p = "a*"',
        output: "true",
        explanation:
          "\"*\" means zero or more of the preceding element, 'a'. Therefore, by repeating 'a' once, it becomes \"aa\".",
      },
    ],
    constraints: [
      "1 <= s.length <= 20",
      "1 <= p.length <= 30",
      "s contains only lowercase English letters.",
      "p contains only lowercase English letters, '.', and '*'.",
      "It is guaranteed for each appearance of the character '*', there will be a previous valid character to match.",
    ],
    starterCode: {
      javascript: `function isMatch(s, p) {
    // Your code here
}`,
      python: `def is_match(s, p):
    # Your code here
    pass`,
      java: `public boolean isMatch(String s, String p) {
    // Your code here
}`,
    },
    solution: `function isMatch(s, p) {
    const dp = Array(s.length + 1).fill().map(() => Array(p.length + 1).fill(false));
    dp[0][0] = true;
    
    for (let j = 1; j <= p.length; j++) {
        if (p[j - 1] === '*') {
            dp[0][j] = dp[0][j - 2];
        }
    }
    
    for (let i = 1; i <= s.length; i++) {
        for (let j = 1; j <= p.length; j++) {
            if (p[j - 1] === '*') {
                dp[i][j] = dp[i][j - 2] || (dp[i - 1][j] && (s[i - 1] === p[j - 2] || p[j - 2] === '.'));
            } else {
                dp[i][j] = dp[i - 1][j - 1] && (s[i - 1] === p[j - 1] || p[j - 1] === '.');
            }
        }
    }
    
    return dp[s.length][p.length];
}`,
    testCases: [
      { input: '"aa", "a"', expectedOutput: "false" },
      { input: '"aa", "a*"', expectedOutput: "true" },
      { input: '"ab", ".*"', expectedOutput: "true" },
    ],
  },
]

async function seedDatabase() {
  try {
    console.log("🌱 Starting database seeding...")

    // Connect to MongoDB
    await connectDB()
    console.log("✅ Connected to MongoDB")

    // Clear existing data (optional - comment out if you want to keep existing data)
    console.log("🧹 Clearing existing data...")
    await User.deleteMany({})
    await Problem.deleteMany({})
    console.log("✅ Cleared existing data")

    // Insert users
    console.log("👥 Adding sample users...")
    const insertedUsers = await User.insertMany(sampleUsers)
    console.log(`✅ Added ${insertedUsers.length} users`)

    // Insert problems
    console.log("📚 Adding sample problems...")
    const insertedProblems = await Problem.insertMany(sampleProblems)
    console.log(`✅ Added ${insertedProblems.length} problems`)

    // Display summary
    console.log("\n🎉 Database seeding completed!")
    console.log("=".repeat(50))
    console.log(`👥 Users added: ${insertedUsers.length}`)
    console.log(`📚 Problems added: ${insertedProblems.length}`)
    console.log("=".repeat(50))

    console.log("\n📋 Sample Users:")
    insertedUsers.forEach((user, index) => {
      console.log(`${index + 1}. ${user.username} (${user.email}) - ${user.role}`)
    })

    console.log("\n📋 Sample Problems:")
    insertedProblems.forEach((problem, index) => {
      console.log(`${index + 1}. ${problem.title} - ${problem.difficulty} (${problem.category})`)
    })

    console.log("\n🚀 Next steps:")
    console.log("1. Go to http://localhost:3000/admin")
    console.log("2. Check the Database Status - should show 'Connected'")
    console.log("3. View the users and problems in your dashboard")

    await mongoose.disconnect()
    console.log("👋 Disconnected from MongoDB")
  } catch (error) {
    console.error("❌ Error seeding database:", error)
    process.exit(1)
  }
}

// Run the seeding function
seedDatabase()
