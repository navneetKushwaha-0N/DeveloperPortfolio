"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import axios from "axios"
import ProjectCard from "./ProjectCard"
import { FaSpinner, FaArrowRight, FaSearch } from "react-icons/fa"

const Projects = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(0)
  const [isClicked, setIsClicked] = useState(false)

  // Search state
  const [searchTerm, setSearchTerm] = useState("")

  const projectsPerPage = 3

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/projects`
      )

      const data = Array.isArray(response.data)
        ? response.data
        : response.data.projects || []

      setProjects(data)
    } catch (err) {
      setError("Failed to load projects")
      console.error("Error fetching projects:", err)
    } finally {
      setLoading(false)
    }
  }

  // Filter projects based on search
  const filteredProjects = projects.filter((project) => {
    const title = project.title?.toLowerCase() || ""
    const description = project.description?.toLowerCase() || ""
    const tech = project.techStack?.join(" ").toLowerCase() || ""

    return (
      title.includes(searchTerm.toLowerCase()) ||
      description.includes(searchTerm.toLowerCase()) ||
      tech.includes(searchTerm.toLowerCase())
    )
  })

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage)

  const currentProjects = filteredProjects.slice(
    page * projectsPerPage,
    (page + 1) * projectsPerPage
  )

  const handleNext = () => {
    setIsClicked(true)

    setTimeout(() => setIsClicked(false), 300)

    setPage((prev) => (prev + 1) % totalPages)
  }

  // Reset page when searching
  useEffect(() => {
    setPage(0)
  }, [searchTerm])

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
            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                My Projects
              </h2>

              <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>

              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Here are some of my recent projects that showcase my skills and
                experience in full-stack development.
              </p>
            </motion.div>

            {/* Search Bar */}
            <div className="max-w-xl mx-auto mb-12">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-5 py-3 pl-12 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* Projects */}
            <div className="relative">
              {filteredProjects.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-gray-500 text-lg">
                    No projects found
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {currentProjects.map((project, index) => (
                      <motion.div
                        key={project._id || index}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: index * 0.1,
                          duration: 0.6,
                        }}
                        viewport={{ once: true }}
                      >
                        <ProjectCard project={project} />
                      </motion.div>
                    ))}
                  </div>

                  {/* Next Button */}
                  {filteredProjects.length > projectsPerPage && (
                    <div className="flex justify-center mt-8">
                      <motion.button
                        onClick={handleNext}
                        whileTap={{ scale: 0.9, rotate: 10 }}
                        animate={
                          isClicked
                            ? {
                                scale: [1, 1.2, 1],
                                rotate: [0, 10, 0],
                              }
                            : {}
                        }
                        transition={{ duration: 0.3 }}
                        className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                        aria-label="Next Projects"
                      >
                        <FaArrowRight size={20} />
                      </motion.button>
                    </div>
                  )}
                </>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default Projects