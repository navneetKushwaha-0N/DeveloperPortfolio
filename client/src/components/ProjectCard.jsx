"use client"

import { useState } from "react"
import Tilt from "react-parallax-tilt"
import Modal from "react-modal"
import Skeleton from "react-loading-skeleton"
import { motion } from "framer-motion"
import { FaGithub, FaExternalLinkAlt, FaCode, FaExpand } from "react-icons/fa"

Modal.setAppElement("#root") // Adjust if your root ID is different

const ProjectCard = ({ project }) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <>
      <Tilt
        glareEnable
        glareMaxOpacity={0.2}
        scale={1.01}
        transitionSpeed={300}
        tiltMaxAngleX={8}
        tiltMaxAngleY={8}
        className="rounded-xl"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          viewport={{ once: true }}
          className="rounded-xl shadow-md overflow-hidden border border-white/20 backdrop-blur-md bg-white/30 hover:shadow-xl transform transition-transform duration-200"
        >
          {/* Project Image */}
          <div className="h-48 relative overflow-hidden bg-gradient-to-br from-primary-400 to-primary-600 group">
            {project.image ? (
              <>
                {!imageLoaded && <Skeleton height="100%" />}
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  onLoad={() => setImageLoaded(true)}
                  className={`w-full h-full object-cover transition-opacity duration-300 ${
                    imageLoaded ? "opacity-100" : "opacity-0"
                  }`}
                />
              </>
            ) : (
              <div className="flex items-center justify-center h-full">
                <FaCode className="text-white text-4xl" />
              </div>
            )}
            <button
              onClick={() => setModalOpen(true)}
              className="absolute bottom-3 right-3 p-2 rounded-full bg-white/70 hover:bg-white transition-all duration-200 shadow-md"
              title="Preview Image"
            >
              <FaExpand className="text-gray-800" />
            </button>
            <div className="absolute inset-0 bg-black/20"></div>
          </div>

          {/* Project Content */}
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-2">{project.title}</h3>
            <p className="text-gray-700 mb-4 line-clamp-3">{project.description}</p>

            {/* Tech Stack */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-white/40 text-gray-800 text-sm rounded-full font-medium backdrop-blur-sm border border-white/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="flex space-x-6 mt-4">
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition"
                >
                  <FaGithub />
                  <span>Code</span>
                </a>
              )}
              {project.liveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition"
                >
                  <FaExternalLinkAlt />
                  <span>Live Demo</span>
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </Tilt>

      {/* Modal for Preview */}
      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        contentLabel="Project Image Preview"
        className="fixed inset-0 flex items-center justify-center bg-black/60 p-4 z-50"
        overlayClassName="fixed inset-0 bg-black/40"
      >
        <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-3xl w-full relative">
          <button
            onClick={() => setModalOpen(false)}
            className="absolute top-4 right-4 text-gray-500 hover:text-red-600 text-lg"
          >
            ✕
          </button>
          <img
            src={project.image}
            alt="Project Preview"
            className="w-full max-h-[80vh] object-contain"
          />
        </div>
      </Modal>
    </>
  )
}

export default ProjectCard
