"use client"
import { motion } from "framer-motion"
import { FaReact, FaNodeJs, FaJs, FaHtml5, FaCss3Alt, FaGitAlt, FaDocker, FaAws } from "react-icons/fa"
import {
  SiMongodb,
  SiExpress,
  SiTailwindcss,
  SiTypescript,
  SiNextdotjs,
  SiPostgresql,
  SiRedis,
  SiGraphql,
} from "react-icons/si"

export default function Skills() {

  const skillCategories = [
    {
      title: "Frontend",
      skills: [
        { name: "React", icon: FaReact, color: "text-blue-500" },
        { name: "Next.js", icon: SiNextdotjs, color: "text-black" },
        { name: "JavaScript", icon: FaJs, color: "text-yellow-400" },
        { name: "TypeScript", icon: SiTypescript, color: "text-blue-600" },
        { name: "HTML5", icon: FaHtml5, color: "text-orange-500" },
        { name: "CSS3", icon: FaCss3Alt, color: "text-blue-500" },
        { name: "Tailwind", icon: SiTailwindcss, color: "text-cyan-400" },
      ],
    },
    {
      title: "Backend",
      skills: [
        { name: "Node.js", icon: FaNodeJs, color: "text-green-500" },
        { name: "Express", icon: SiExpress, color: "text-gray-700" },
        { name: "MongoDB", icon: SiMongodb, color: "text-green-600" },
        { name: "PostgreSQL", icon: SiPostgresql, color: "text-blue-600" },
        { name: "GraphQL", icon: SiGraphql, color: "text-pink-500" },
        { name: "Redis", icon: SiRedis, color: "text-red-500" },
      ],
    },
    {
      title: "DevOps & Tools",
      skills: [
        { name: "Git", icon: FaGitAlt, color: "text-orange-500" },
        { name: "Docker", icon: FaDocker, color: "text-blue-500" },
        { name: "AWS", icon: FaAws, color: "text-orange-400" },
      ],
    },
  ]

  return (
    <section
      id="skills"
      className="relative py-24 overflow-hidden bg-gradient-to-b from-white via-teal-50/30 to-emerald-50/30"
    >

      {/* Background glow (lighter blur) */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-teal-400/20 rounded-full blur-2xl"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-emerald-400/20 rounded-full blur-2xl"></div>

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-20 transform-gpu"
        >

          {/* Black heading */}
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-4 text-black"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Skills & Technologies
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="w-32 h-1 mx-auto rounded-full bg-gradient-to-r from-teal-400 via-cyan-400 to-emerald-400 origin-left"
          />

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-gray-600 mt-6 max-w-2xl mx-auto text-lg"
          >
            Technologies I use to design, build, and scale modern web applications.
          </motion.p>

        </motion.div>


        {/* Categories */}
        <div className="grid md:grid-cols-3 gap-8">

          {skillCategories.map((category, categoryIndex) => (

            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: categoryIndex * 0.1,
                ease: "easeOut"
              }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -8 }}
              className="relative group transform-gpu will-change-transform"
            >

              {/* glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-teal-400/20 to-emerald-400/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-300"></div>

              {/* card */}
              <div className="relative bg-white/40 backdrop-blur-md border border-white/30 rounded-2xl p-6 shadow-lg">

                <h3 className="text-2xl font-semibold text-center mb-6 bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
                  {category.title}
                </h3>

                <div className="grid grid-cols-2 gap-4">

                  {category.skills.map((skill, skillIndex) => {

                    const Icon = skill.icon

                    return (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 0.4,
                          delay: skillIndex * 0.05,
                          ease: "easeOut"
                        }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.08 }}
                        className="group/skill relative flex flex-col items-center justify-center p-4 rounded-xl bg-white/50 backdrop-blur-md border border-white/30 shadow-md cursor-pointer transform-gpu"
                      >

                        <div className="absolute inset-0 opacity-0 group-hover/skill:opacity-100 transition duration-300 bg-gradient-to-r from-teal-400/10 to-emerald-400/10 rounded-xl"></div>

                        <motion.div
                          whileHover={{ rotate: 180 }}
                          transition={{ duration: 0.4 }}
                        >
                          <Icon className={`text-4xl mb-2 ${skill.color}`} />
                        </motion.div>

                        <span className="text-sm font-medium text-gray-700 text-center">
                          {skill.name}
                        </span>

                      </motion.div>
                    )
                  })}

                </div>

              </div>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  )
}
