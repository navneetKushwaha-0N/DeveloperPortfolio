"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  FaBars,
  FaTimes,
  FaHome,
  FaUser,
  FaProjectDiagram,
  FaCogs,
  FaFileAlt,
  FaEnvelope,
  FaCode,
} from "react-icons/fa"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState("Home")

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Home", href: "#home", icon: FaHome },
    { name: "About", href: "#about", icon: FaUser },
    { name: "Projects", href: "#projects", icon: FaProjectDiagram },
    { name: "Skills", href: "#skills", icon: FaCogs },
    { name: "Resume", href: "#resume", icon: FaFileAlt },
    { name: "Contact", href: "#contact", icon: FaEnvelope },
  ]

  return (
    <>
      {/* NAVBAR */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/10 backdrop-blur-xl border-b border-white/20 shadow-lg shadow-black/5"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">

            {/* LOGO - HACKER EFFECT */}
            <motion.div
              className="flex items-center cursor-pointer relative"
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* glow pulse */}
              <motion.div
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 rounded-full bg-teal-400 blur-xl"
              />

              {/* icon */}
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1],
                  filter: [
                    "drop-shadow(0 0 5px #14b8a6)",
                    "drop-shadow(0 0 20px #06b6d4)",
                    "drop-shadow(0 0 5px #10b981)",
                  ],
                }}
                transition={{
                  rotate: {
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 4,
                  },
                  scale: {
                    duration: 2,
                    repeat: Infinity,
                  },
                  filter: {
                    duration: 1.5,
                    repeat: Infinity,
                  },
                }}
                className="text-4xl text-teal-400 relative z-10"
              >
                <FaCode />
              </motion.div>

              {/* shine sweep */}
              <motion.div
                animate={{
                  x: ["-100%", "200%"],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-30 blur-sm"
              />
            </motion.div>

            {/* DESKTOP MENU */}
            <div className="hidden md:flex items-center gap-2 bg-white/5 backdrop-blur-lg px-3 py-2 rounded-full border border-white/10">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = active === item.name

                return (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    onClick={() => setActive(item.name)}
                    className="relative px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          layoutId="active-pill"
                          className="absolute inset-0 bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </AnimatePresence>

                    <span
                      className={`relative z-10 flex items-center gap-2 ${
                        isActive ? "text-black font-semibold" : "text-gray-700"
                      }`}
                    >
                      <Icon className="text-xs" />
                      {item.name}
                    </span>
                  </motion.a>
                )
              })}
            </div>

            {/* MOBILE BUTTON */}
            <div className="md:hidden">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg bg-white/10 backdrop-blur-lg border border-white/20"
              >
                {isOpen ? <FaTimes /> : <FaBars />}
              </motion.button>
            </div>

          </div>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mx-4 mt-2 p-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl"
            >
              <div className="flex flex-col gap-2">
                {navItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      whileHover={{ x: 10 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setActive(item.name)
                        setIsOpen(false)
                      }}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition"
                    >
                      <Icon />
                      {item.name}
                    </motion.a>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </motion.nav>

      {/* SCROLL PROGRESS BAR */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-teal-400 via-cyan-400 to-emerald-400 origin-left z-50"
        style={{ scaleX: scrolled ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      />

    </>
  )
}
