import mongoose from "mongoose"
import path from "path"
import { fileURLToPath } from "url"
import dotenv from "dotenv"
import Project from "../models/Project.js"

// Resolve __dirname for ESM
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// ✅ Load .env manually from root folder
dotenv.config({ path: path.resolve(__dirname, "../.env") })

// ✅ Confirm .env loaded
if (!process.env.MONGODB_URI) {
  throw new Error("❌ MONGODB_URI is missing in .env file")
}

const sampleProjects = [
  {
  title: "LUMO AI ChatBot",
  description:
    "An AI-powered chatbot built with MERN stack, featuring real-time responses, secure authentication, and an intuitive UI for interactive conversations.",
  techStack: ["React", "Node.js", "Express", "MongoDB", "OpenAI API", "JWT"],
  githubLink: "https://github.com/navneetKushwaha-0N/LUMO-AI-chatBot.git",
  liveLink: "https://lumo-ai-chatbot.onrender.com",
  featured: true,
},

  {
    title: "Task Management App",
    description:
      "A collaborative task management application with real-time updates, drag-and-drop functionality, team collaboration features, and progress tracking.",
    techStack: ["React", "TypeScript", "Node.js", "Socket.io", "PostgreSQL"],
    githubLink: "https://github.com/johndoe/task-manager",
    liveLink: "https://taskmanager-demo.vercel.app",
    featured: true,
  },
  
]

const seedProjects = async () => {
  try {
    // Connect to MongoDB (Cloud)
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("✅ Connected to MongoDB")

    // Clear existing data
    await Project.deleteMany({})
    console.log("🧹 Cleared existing projects")

    // Insert new sample data
    const projects = await Project.insertMany(sampleProjects)
    console.log(`✅ Inserted ${projects.length} projects`)

    console.log("🎉 Database seeded successfully!")
    process.exit(0)
  } catch (error) {
    console.error("💥 Error seeding database:", error)
    process.exit(1)
  }
}

seedProjects()
