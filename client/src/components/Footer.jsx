import { FaGithub, FaLinkedin, FaTwitter, FaHeart } from "react-icons/fa"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: FaGithub, href: "https://github.com/navneetKushwaha-0N", label: "GitHub" },
    { icon: FaLinkedin, href: "https://www.linkedin.com/in/navneet--kushwaha/", label: "LinkedIn" },
    { icon: FaTwitter, href: "https://twitter.com", label: "Twitter" },
  ]

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Logo/Name */}
          <div>
            <h3 className="text-2xl font-bold gradient-text mb-2">Navneet kushwaha</h3>
            <p className="text-gray-400">Full Stack Developer ☕</p>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300 hover:scale-110 transform"
                aria-label={social.label}
              >
                <social.icon size={24} />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right">
            <p className="text-gray-400 flex items-center justify-center md:justify-end">
             { /* 
              Made with <FaHeart className="text-red-500 mx-1" /> © {currentYear} 
              */}
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">© {currentYear} Navneet Kushwaha. All rights reserved.
 </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
