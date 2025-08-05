"use client"
import { motion } from "framer-motion"
import { FaDownload, FaFileAlt } from "react-icons/fa"

const Resume = () => {
  const handleDownload = () => {
    // Create a link element and trigger download
    const link = document.createElement("a")
    link.href = "/resume.pdf" // Make sure to add your resume PDF to the public folder
    link.download = "Navneet_kushwaha.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <section id="resume" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Resume</h2>
          <div className="w-24 h-1 bg-primary-600 mx-auto mb-8"></div>

          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg p-8 mb-8"
            >
              <FaFileAlt className="text-6xl text-primary-600 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Download My Resume</h3>
              <p className="text-gray-600 mb-6">
                Get a detailed overview of my experience, education, and skills. Available in PDF format for easy
                viewing and printing.
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDownload}
                className="inline-flex items-center space-x-3 bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-800 transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                <FaDownload />
                <span>Download Resume</span>
              </motion.button>
            </motion.div>

            {/* Quick Summary */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-6 text-center"
            >
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="text-3xl font-bold text-primary-600 mb-2">💡</div>
                <div className="text-gray-600">Actively Learning</div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="text-3xl font-bold text-primary-600 mb-2">10+</div>
                <div className="text-gray-600">Projects Completed</div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="text-3xl font-bold text-primary-600 mb-2">20+</div>
                <div className="text-gray-600">Technologies</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Resume
