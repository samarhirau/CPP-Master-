import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Problem from "@/lib/models/Problem"

export async function GET() {
  try {
    await connectDB()

    const problems = await Problem.find().select("title difficulty category tags createdAt").sort({ createdAt: -1 })

    const totalProblems = await Problem.countDocuments()

    return NextResponse.json({
      success: true,
      data: {
        problems,
        totalProblems,
      },
    })
  } catch (error) {
    console.error("Error fetching problems:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch problems" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const body = await request.json()

    // Validate required fields
    const requiredFields = ["title", "description", "difficulty", "category", "solution"]
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ success: false, error: `${field} is required` }, { status: 400 })
      }
    }

    // Create new problem
    const problem = new Problem({
      title: body.title,
      description: body.description,
      difficulty: body.difficulty,
      category: body.category,
      tags: body.tags || [],
      examples: body.examples || [],
      constraints: body.constraints || [],
      starterCode: {
        javascript: body.starterCode?.javascript || "",
        python: body.starterCode?.python || "",
        java: body.starterCode?.java || "",
      },
      solution: body.solution,
      testCases: body.testCases || [],
    })

    await problem.save()

    return NextResponse.json(
      {
        success: true,
        data: problem,
        message: "Problem created successfully",
      },
      { status: 201 },
    )
  } catch (error: any) {
    console.error("Error creating problem:", error)

    if (error.name === "ValidationError") {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 })
    }

    return NextResponse.json({ success: false, error: "Failed to create problem" }, { status: 500 })
  }
}
