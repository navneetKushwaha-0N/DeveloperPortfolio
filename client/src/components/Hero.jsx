"use client"
import { FaChevronDown, FaGithub, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa"
import { motion } from "framer-motion"

const Hero = () => {

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }

  const socials = [
    {
      icon: FaGithub,
      href: "https://github.com/navneetKushwaha-0N",
      label: "GitHub",
      gradient: "from-gray-700 to-black",
    },
    {
      icon: FaLinkedin,
      href: "https://www.linkedin.com/in/navneet--kushwaha/",
      label: "LinkedIn",
      gradient: "from-blue-500 to-blue-700",
    },
    {
      icon: FaTwitter,
      href: "https://twitter.com",
      label: "X",
      gradient: "from-black to-gray-800",
    },
    {
      icon: FaInstagram,
      href: "https://www.instagram.com/mollen_0_mist/",
      label: "Instagram",
      gradient: "from-pink-500 via-red-500 to-yellow-500",
    },
  ]

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-0"
    >

      {/* background glow (neutral) */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-white/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto text-center z-10 w-full">

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 sm:space-y-8"
        >

          {/* PROFILE IMAGE - GLASSMORPHISM MIRROR */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
            className="relative mx-auto group w-fit"
          >

            {/* neutral glow */}
            <div className="
              absolute inset-0
              rounded-full
              bg-white/30
              blur-2xl opacity-40
              group-hover:opacity-60
              transition duration-500
            " />

            {/* glass ring */}
            <div className="
              relative
              w-28 h-28 
              sm:w-36 sm:h-36 
              md:w-44 md:h-44 
              lg:w-48 lg:h-48
              rounded-full
              p-[3px]
              bg-white/20
              backdrop-blur-xl
              border border-white/40
              shadow-xl
            ">

              {/* mirror reflection */}
              <div className="
                absolute inset-0
                rounded-full
                bg-gradient-to-tr
                from-white/50 via-white/10 to-transparent
                opacity-50
                z-20
                pointer-events-none
              " />

              {/* image */}
              <div className="relative w-full h-full rounded-full overflow-hidden">
                <img
                  src="/NavProf.png"
                  alt="Navneet Kushwaha"
                  className="
                    w-full h-full object-cover object-center
                    transition duration-700
                    group-hover:scale-110
                  "
                />
              </div>

            </div>

            {/* shine sweep */}
            <motion.div
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
              className="
                absolute inset-0
                rounded-full
                bg-gradient-to-r
                from-transparent via-white/40 to-transparent
                blur-sm
                pointer-events-none
              "
            />

          </motion.div>


          {/* NAME */}
          <motion.h1
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.4 }}
  className="hover-underline text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-800"
>
  Navneet Kushwaha
</motion.h1>


          {/* TITLE */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold gradient-text"
          >
            Full Stack Developer
          </motion.p>


          {/* DESCRIPTION */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-sm sm:text-base md:text-lg text-gray-600 max-w-xl sm:max-w-2xl mx-auto"
          >
            Turning concepts into seamless web experiences with MERN stack and a drive for innovation.
          </motion.p>


          {/* SOCIAL LINKS */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex justify-center gap-3 sm:gap-4 md:gap-6 flex-wrap"
          >
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group relative 
                  w-12 h-12 
                  flex items-center justify-center 
                  bg-white/70 backdrop-blur-lg 
                  rounded-full 
                  border border-white/40 
                  shadow-lg 
                  overflow-hidden 
                  transition-all duration-500 
                  hover:scale-110
                "
              >

                <span className={`absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-r ${social.gradient}`} />

                <social.icon className="relative z-10 text-gray-700 group-hover:text-white transition duration-500" />

              </a>
            ))}
          </motion.div>


          {/* SCROLL BUTTON */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            onClick={scrollToProjects}
            className="mt-8 p-4 bg-gradient-to-r from-sky-500 to-indigo-500 text-white rounded-full shadow-md hover:scale-110 transition animate-bounce"
          >
            <FaChevronDown size={20} />
          </motion.button>

        </motion.div>

        

      </div>
    </section>
  )
}

export default Hero
