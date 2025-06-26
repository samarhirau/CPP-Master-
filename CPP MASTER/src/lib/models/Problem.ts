import mongoose, { type Document, Schema } from "mongoose"

export interface IProblem extends Document {
  _id: string
  title: string
  description: string
  difficulty: "Easy" | "Medium" | "Hard"
  category: string
  tags: string[]
  examples: {
    input: string
    output: string
    explanation?: string
  }[]
  constraints: string[]
  starterCode: {
    javascript: string
    python: string
    java: string
  }
  solution: string
  testCases: {
    input: string
    expectedOutput: string
  }[]
  createdAt: Date
  updatedAt: Date
}

const ProblemSchema = new Schema<IProblem>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    difficulty: {
      type: String,
      required: [true, "Difficulty is required"],
      enum: ["Easy", "Medium", "Hard"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    examples: [
      {
        input: {
          type: String,
          required: true,
        },
        output: {
          type: String,
          required: true,
        },
        explanation: {
          type: String,
        },
      },
    ],
    constraints: [
      {
        type: String,
        trim: true,
      },
    ],
    starterCode: {
      javascript: {
        type: String,
        default: "",
      },
      python: {
        type: String,
        default: "",
      },
      java: {
        type: String,
        default: "",
      },
    },
    solution: {
      type: String,
      required: [true, "Solution is required"],
    },
    testCases: [
      {
        input: {
          type: String,
          required: true,
        },
        expectedOutput: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.Problem || mongoose.model<IProblem>("Problem", ProblemSchema)
