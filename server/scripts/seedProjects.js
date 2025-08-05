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
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce platform built with MERN stack featuring user authentication, payment integration, admin dashboard, and real-time inventory management.",
    techStack: ["React", "Node.js", "Express", "MongoDB", "Stripe", "JWT"],
    githubLink: "https://github.com/johndoe/ecommerce-platform",
    liveLink: "https://ecommerce-demo.vercel.app",
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
  {
    title: "Weather Dashboard",
    description:
      "A responsive weather dashboard that displays current weather conditions, forecasts, and interactive maps. Features location-based weather data and beautiful data visualizations.",
    techStack: ["React", "Chart.js", "OpenWeather API", "Tailwind CSS"],
    githubLink: "https://github.com/johndoe/weather-dashboard",
    liveLink: "https://weather-dashboard-demo.vercel.app",
    featured: false,
  },
  {
    title: "Social Media Analytics",
    description:
      "A comprehensive analytics dashboard for social media metrics with real-time data processing, custom reporting, and automated insights generation.",
    techStack: ["Next.js", "Python", "FastAPI", "Redis", "Chart.js"],
    githubLink: "https://github.com/johndoe/social-analytics",
    liveLink: "https://social-analytics-demo.vercel.app",
    featured: false,
  },
  {
    title: "Recipe Sharing Platform",
    description:
      "A community-driven recipe sharing platform where users can upload, share, and discover recipes. Features include ratings, comments, and meal planning.",
    techStack: ["React", "Node.js", "Express", "MongoDB", "Cloudinary"],
    githubLink: "https://github.com/johndoe/recipe-platform",
    liveLink: "https://recipes-demo.vercel.app",
    featured: false,
  },
  {
    title: "Real-time Chat Application",
    description:
      "A modern real-time chat application with multiple rooms, file sharing, emoji reactions, and user presence indicators. Built for scalability and performance.",
    techStack: ["React", "Socket.io", "Node.js", "Redis", "JWT"],
    githubLink: "https://github.com/johndoe/chat-app",
    liveLink: "https://chat-demo.vercel.app",
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
