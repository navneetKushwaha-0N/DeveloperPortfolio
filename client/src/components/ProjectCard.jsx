"use client"

import { useState, useEffect } from "react"
import Tilt from "react-parallax-tilt"
import Modal from "react-modal"
import Skeleton from "react-loading-skeleton"
import { motion } from "framer-motion"
import { FaGithub, FaExternalLinkAlt, FaCode, FaExpand, FaLock, FaCheck, FaTimes } from "react-icons/fa"
import api from "../utils/api"  // ✅ ADD

Modal.setAppElement("#root")

// ─── Pay-to-View Modal ────────────────────────────────────────────────────────
const PayToViewModal = ({ isOpen, onClose, projectName, demoUrl }) => {
  const [step, setStep] = useState("idle")
  const [errorMsg, setErrorMsg] = useState("")

  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    script.async = true
    document.body.appendChild(script)
    return () => document.body.removeChild(script)
  }, [])

  const reset = () => { setStep("idle"); setErrorMsg("") }
  const handleClose = () => { reset(); onClose() }

  const handlePayment = async () => {
    setStep("paying")
    try {
      // ✅ fetch की जगह api.post use कर रहे हैं
      const { data: order } = await api.post("/api/razorpay/create-order", { amount: 1, projectName })

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "Navneet Kushwaha",
        description: `Live Demo — ${projectName}`,
        order_id: order.id,
        theme: { color: "#0d9488" },
        handler: async (response) => {
          try {
            // ✅ fetch की जगह api.post use कर रहे हैं
            const { data } = await api.post("/api/razorpay/verify-payment", response)
            if (data.success) {
              setStep("success")
              setTimeout(() => window.open(demoUrl, "_blank"), 1500)
            } else throw new Error("Verification failed")
          } catch {
            setStep("error")
            setErrorMsg("Payment done but verification failed. Contact me directly.")
          }
        },
        modal: { ondismiss: () => { if (step !== "success") setStep("idle") } },
      }

      const rzp = new window.Razorpay(options)
      rzp.on("payment.failed", () => {
        setStep("error")
        setErrorMsg("Payment failed. Please try again.")
      })
      rzp.open()
    } catch {
      setStep("error")
      setErrorMsg("Something went wrong. Please try again.")
    }
  }

  if (!isOpen) return null

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) handleClose() }}
      className="fixed inset-0 flex items-center justify-center bg-black/60 p-4 z-50"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-2xl overflow-hidden shadow-2xl w-full max-w-sm"
      >
        {/* Header */}
        <div className="bg-teal-600 px-6 py-4 flex items-center gap-3">
          <div className="bg-white/20 rounded-lg w-9 h-9 flex items-center justify-center">
            <FaLock className="text-white text-sm" />
          </div>
          <div className="flex-1">
            <p className="text-white font-semibold text-sm">Live Demo Access</p>
            <p className="text-white/70 text-xs truncate">{projectName}</p>
          </div>
          <button onClick={handleClose} className="text-white/70 hover:text-white text-xl leading-none">✕</button>
        </div>

        {/* Body */}
        <div className="p-6">

          {/* IDLE / PAYING */}
          {(step === "idle" || step === "paying") && (
            <>
              <div className="text-center mb-5">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-gray-400 text-sm">₹</span>
                  <span className="text-5xl font-bold text-gray-900">1</span>
                  <span className="text-gray-400 text-sm">one-time</span>
                </div>
                <p className="text-gray-500 text-xs mt-1">A small tip to support the developer ☕</p>
              </div>

              <div className="border border-gray-100 rounded-xl p-3 mb-5 space-y-2">
                {["Full live demo access", "No account needed", "Supports server costs"].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <FaCheck className="text-teal-600 text-xs flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={handlePayment}
                disabled={step === "paying"}
                className="w-full py-3 bg-teal-600 hover:bg-teal-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <FaExternalLinkAlt className="text-xs" />
                {step === "paying" ? "Opening payment..." : "Pay ₹1 & View Demo"}
              </button>

              <p className="text-center text-gray-400 text-xs mt-3">
                Secured by Razorpay · UPI, Cards & NetBanking
              </p>
            </>
          )}

          {/* SUCCESS */}
          {step === "success" && (
            <div className="text-center py-4">
              <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCheck className="text-green-500 text-xl" />
              </div>
              <p className="font-semibold text-gray-900 mb-1">Payment Successful!</p>
              <p className="text-gray-500 text-sm mb-5">Thanks for your support! Opening demo...</p>
              <button
                onClick={() => window.open(demoUrl, "_blank")}
                className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl transition-colors duration-200"
              >
                Open Live Demo →
              </button>
            </div>
          )}

          {/* ERROR */}
          {step === "error" && (
            <div className="text-center py-4">
              <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaTimes className="text-red-500 text-xl" />
              </div>
              <p className="font-semibold text-gray-900 mb-1">Oops!</p>
              <p className="text-gray-500 text-sm mb-5">{errorMsg}</p>
              <button
                onClick={reset}
                className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl transition-colors duration-200"
              >
                Try Again
              </button>
            </div>
          )}

        </div>
      </motion.div>
    </div>
  )
}

// ─── Project Card ─────────────────────────────────────────────────────────────
const ProjectCard = ({ project }) => {
  const [imageModalOpen, setImageModalOpen] = useState(false)
  const [payModalOpen, setPayModalOpen] = useState(false)
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
              onClick={() => setImageModalOpen(true)}
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
                <button
                  onClick={() => setPayModalOpen(true)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-teal-600 transition"
                >
                  <FaExternalLinkAlt />
                  <span>Live Demo</span>
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </Tilt>

      {/* Image Preview Modal */}
      <Modal
        isOpen={imageModalOpen}
        onRequestClose={() => setImageModalOpen(false)}
        contentLabel="Project Image Preview"
        className="fixed inset-0 flex items-center justify-center bg-black/60 p-4 z-50"
        overlayClassName="fixed inset-0 bg-black/40"
      >
        <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-3xl w-full relative">
          <button
            onClick={() => setImageModalOpen(false)}
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

      {/* Pay-to-View Modal */}
      <PayToViewModal
        isOpen={payModalOpen}
        onClose={() => setPayModalOpen(false)}
        projectName={project.title}
        demoUrl={project.liveLink}
      />
    </>
  )
}

export default ProjectCard