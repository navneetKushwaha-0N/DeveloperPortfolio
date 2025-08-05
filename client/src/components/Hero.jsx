"use client"
import { FaChevronDown, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa"
import { motion } from "framer-motion"

const Hero = () => {
  const scrollToProjects = () => {
    document.getElementById("projects").scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Profile Image */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mx-auto w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-2xl"
          >
            <img src="/NavProf.png" alt="Navneet kushwaha" className="w-full h-full object-cover" />
          </motion.div>

          {/* Name and Title */}
          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold text-gray-800"
            >
              Navneet kushwaha
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-2xl md:text-3xl gradient-text font-semibold"
            >
              Full Stack Developer
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              Turning concepts into seamless web experiences with MERN stack and a drive for innovation.
            </motion.p>
          </div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex justify-center space-x-6"
          >
            {[
              { icon: FaGithub, href: "https://github.com/navneetKushwaha-0N", label: "GitHub" },
              { icon: FaLinkedin, href: "https://www.linkedin.com/in/navneet--kushwaha/", label: "LinkedIn" },
              { icon: FaTwitter, href: "https://twitter.com", label: "Twitter" },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 text-gray-700 hover:text-primary-600"
                aria-label={social.label}
              >
                <social.icon size={24} />
              </a>
            ))}
          </motion.div>

          {/* Scroll Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            onClick={scrollToProjects}
            className="mt-12 p-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full shadow-md hover:shadow-xl transition-all duration-300 hover:scale-110 animate-pulse"

          >
            <FaChevronDown size={24} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
