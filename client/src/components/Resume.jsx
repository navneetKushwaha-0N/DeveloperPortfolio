"use client"
import { motion } from "framer-motion"
import { FaDownload, FaFileAlt } from "react-icons/fa"

const Resume = () => {

  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = "/resume.pdf"
    link.download = "Navneet_kushwaha.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <section
      id="resume"
      className="py-24 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden"
    >

      {/* background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-40" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-40" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center md:text-left"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Resume
          </h2>

          <p className="text-slate-600 max-w-xl">
            Download my resume to explore my skills, experience, and projects in detail.
          </p>
        </motion.div>


        {/* Main Layout */}
        <div className="grid md:grid-cols-2 gap-12 items-center">


          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >

            <div className="
              bg-white border border-slate-200
              rounded-xl p-6 shadow-sm
            ">
              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                Professional Summary
              </h3>

              <p className="text-slate-600">
                Full Stack Developer specializing in MERN stack, cloud integration,
                and scalable web applications. Passionate about building efficient,
                user-friendly solutions.
              </p>
            </div>


            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">

              <div className="
                bg-white border border-slate-200
                rounded-lg p-4 text-center shadow-sm
              ">
                <div className="text-2xl font-bold text-blue-600">10+</div>
                <div className="text-sm text-slate-600">Projects</div>
              </div>

              <div className="
                bg-white border border-slate-200
                rounded-lg p-4 text-center shadow-sm
              ">
                <div className="text-2xl font-bold text-indigo-600">20+</div>
                <div className="text-sm text-slate-600">Technologies</div>
              </div>

              <div className="
                bg-white border border-slate-200
                rounded-lg p-4 text-center shadow-sm
              ">
                <div className="text-2xl font-bold text-green-600">Fresher</div>
                <div className="text-sm text-slate-600">Status</div>
              </div>

            </div>

          </motion.div>


          {/* RIGHT SIDE DOWNLOAD CARD */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >

            <div className="
              relative
              bg-white/70 backdrop-blur-lg
              border border-slate-200
              rounded-2xl
              p-10
              shadow-lg
              text-center
              hover:shadow-xl
              transition-all duration-300
            ">

              {/* icon */}
              <div className="
                w-20 h-20 mx-auto mb-6
                flex items-center justify-center
                rounded-full
                bg-blue-100
              ">
                <FaFileAlt className="text-blue-600 text-3xl" />
              </div>


              <h3 className="text-2xl font-semibold text-slate-800 mb-3">
                My Resume
              </h3>

              <p className="text-slate-600 mb-8">
                Download a detailed PDF version of my resume including skills,
                projects, and experience.
              </p>


              {/* download button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDownload}
                className="
                  inline-flex items-center gap-3
                  bg-blue-600 hover:bg-blue-700
                  text-white
                  px-8 py-4
                  rounded-lg
                  font-semibold
                  shadow-md hover:shadow-lg
                  transition-all duration-300
                "
              >
                <FaDownload />
                Download Resume
              </motion.button>

            </div>

          </motion.div>


        </div>

      </div>

    </section>
  )
}

export default Resume
