"use client"

import React from "react"
import { motion } from "framer-motion"
import { FaCode, FaLaptopCode, FaRocket } from "react-icons/fa"

const About = () => {
  const features = [
    {
      icon: FaCode,
      title: "Clean Code",
      description: "Writing maintainable, scalable, and efficient code following best practices.",
    },
    {
      icon: FaLaptopCode,
      title: "Responsive Design",
      description: "Creating beautiful, responsive interfaces that work seamlessly across all devices.",
    },
    {
      icon: FaRocket,
      title: "Performance",
      description: "Optimizing applications for speed, performance, and excellent user experience.",
    },
  ]

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">About Me</h2>
          <div className="w-24 h-1 bg-primary-600 mx-auto"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-lg text-gray-600 leading-relaxed">
             Hello! I'm Navneet, a dedicated Full Stack Developer with a strong passion for crafting impactful web applications. With hands-on experience in the MERN stack, I take pride in transforming complex challenges into clean, user-friendly, and efficient digital solutions.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Beyond the code, I enjoy exploring new tech trends, contributing to meaningful projects, and guiding fellow developers through mentorship and writing. I'm a firm believer in lifelong learning and always strive to stay ahead in the ever-evolving tech landscape.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              My mission is to build products that not only function flawlessly but also deliver real value and enhance the user experience in meaningful ways.
            </p>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="flex items-start space-x-4 p-6 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex-shrink-0 p-3 bg-primary-100 rounded-lg">
                  {React.createElement(feature.icon, { className: "text-primary-600", size: 24 })}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
