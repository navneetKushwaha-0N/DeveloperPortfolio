"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import axios from "axios"
import ProjectCard from "./ProjectCard"
import { FaSpinner, FaArrowRight } from "react-icons/fa"

const Projects = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(0)
  const [isClicked, setIsClicked] = useState(false)
  const projectsPerPage = 3

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/projects`)
      const data = Array.isArray(response.data) ? response.data : response.data.projects || []
      setProjects(data)
    } catch (err) {
      setError("Failed to load projects")
      console.error("Error fetching projects:", err)
    } finally {
      setLoading(false)
    }
  }

  const totalPages = Math.ceil(projects.length / projectsPerPage)
  const currentProjects = projects.slice(page * projectsPerPage, (page + 1) * projectsPerPage)

  const handleNext = () => {
    setIsClicked(true)
    setTimeout(() => setIsClicked(false), 300)
    setPage((prev) => (prev + 1) % totalPages)
  }

  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="text-center">
            <FaSpinner className="animate-spin text-4xl text-blue-600 mx-auto mb-4" />
            <p className="text-gray-600">Loading projects...</p>
          </div>
        ) : error ? (
          <div className="text-center">
            <p className="text-red-600">{error}</p>
          </div>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">My Projects</h2>
              <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Here are some of my recent projects that showcase my skills and experience in full-stack development.
              </p>
            </motion.div>

            <div className="relative">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentProjects.map((project, index) => (
                  <motion.div
                    key={project._id || index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <ProjectCard project={project} />
                  </motion.div>
                ))}
              </div>

              {projects.length > projectsPerPage && (
                <div className="flex justify-center mt-8">
                  <motion.button
                    onClick={handleNext}
                    whileTap={{ scale: 0.9, rotate: 10 }}
                    animate={isClicked ? { scale: [1, 1.2, 1], rotate: [0, 10, 0] } : {}}
                    transition={{ duration: 0.3 }}
                    className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                    aria-label="Next Projects"
                  >
                    <FaArrowRight size={20} />
                  </motion.button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default Projects
