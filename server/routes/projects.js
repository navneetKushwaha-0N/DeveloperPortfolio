import express from "express"
import Project from "../models/Project.js"

const router = express.Router()

// GET all projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 })
    res.json(projects)
  } catch (error) {
    console.error("Error fetching projects:", error)
    res.status(500).json({ message: "Error fetching projects" })
  }
})

// GET single project
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
    if (!project) {
      return res.status(404).json({ message: "Project not found" })
    }
    res.json(project)
  } catch (error) {
    console.error("Error fetching project:", error)
    res.status(500).json({ message: "Error fetching project" })
  }
})

// POST new project (for admin use)
router.post("/", async (req, res) => {
  try {
    const { title, description, techStack, githubLink, liveLink, image, featured } = req.body

    const project = new Project({
      title,
      description,
      techStack,
      githubLink,
      liveLink,
      image,
      featured,
    })

    const savedProject = await project.save()
    res.status(201).json(savedProject)
  } catch (error) {
    console.error("Error creating project:", error)
    res.status(400).json({ message: "Error creating project", error: error.message })
  }
})

export default router
