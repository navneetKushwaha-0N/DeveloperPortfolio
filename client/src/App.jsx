import { useEffect } from "react"

import Lenis from "@studio-freight/lenis"

import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import About from "./components/About"
import Projects from "./components/Projects"
import Skills from "./components/Skills"
import Resume from "./components/Resume"
import Contact from "./components/Contact"
import Footer from "./components/Footer"
import ThreeBackground from "./components/ThreeBackground"

function App() {

  useEffect(() => {

    // Smooth Scroll Setup
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      smoothTouch: false,
    })

    // Animation Frame
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Cleanup
    return () => {
      lenis.destroy()
    }

  }, [])

  return (
    <div className="relative min-h-screen bg-gray-50 overflow-x-hidden">

      {/* Background */}
      <ThreeBackground />

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Resume />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

    </div>
  )
}

export default App