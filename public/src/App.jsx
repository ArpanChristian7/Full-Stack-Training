import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [navOpen, setNavOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [typedText, setTypedText] = useState('')
  const [formStatus, setFormStatus] = useState('')
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'light'
    }
    return 'light'
  })
  
  const roles = [
    "Aspiring Software Developer",
    "Web Developer",
    
  ]
  
  let roleIndex = 0
  let charIndex = 0
  let isDeleting = false

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0
      setScrollProgress(progress)
      setShowScrollTop(scrollY > 480)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    document.documentElement.style.colorScheme = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }


  useEffect(() => {
    const typeLoop = () => {
      const currentRole = roles[roleIndex]

      if (!isDeleting) {
        charIndex++
        setTypedText(currentRole.slice(0, charIndex))
        if (charIndex === currentRole.length) {
          isDeleting = true
          setTimeout(typeLoop, 1400)
          return
        }
        setTimeout(typeLoop, 65)
      } else {
        charIndex--
        setTypedText(currentRole.slice(0, charIndex))
        if (charIndex === 0) {
          isDeleting = false
          roleIndex = (roleIndex + 1) % roles.length
          setTimeout(typeLoop, 400)
          return
        }
        setTimeout(typeLoop, 35)
      }
    }

    const timer = setTimeout(typeLoop, 65)
    return () => clearTimeout(timer)
  }, [])

  const handleContactSubmit = (e) => {
    if (!e.target.checkValidity()) {
      e.preventDefault()
      setFormStatus("Please fill in all fields before sending.")
    } else {
      setFormStatus("Sending your message...")
    }
  }

  return (
    <>
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} aria-hidden="true"></div>

      <header className="site-header" id="siteHeader">
        <nav className="navbar" aria-label="Primary navigation">
          <a href="#hero" className="logo" aria-label="Arpan Christian — Home">
            <span className="logo-bracket">&lt;</span>Arpan<span className="logo-accent"> </span>Christian<span className="logo-bracket">&gt;</span>
          </a>

          <ul className={`nav-links ${navOpen ? 'open' : ''}`} id="navLinks">
            <li><a href="#about" className="nav-link" onClick={() => setNavOpen(false)}>ABOUT</a></li>
            <li><a href="#skills" className="nav-link" onClick={() => setNavOpen(false)}>SKILLS</a></li>
            <li><a href="#projects" className="nav-link" onClick={() => setNavOpen(false)}>PROJECTS</a></li>
            <li><a href="#education" className="nav-link" onClick={() => setNavOpen(false)}>EDUCATION</a></li>
            <li><a href="#certificates" className="nav-link" onClick={() => setNavOpen(false)}>CERTIFICATES</a></li>
            <li><a href="#experience" className="nav-link" onClick={() => setNavOpen(false)}>EXPERIENCE</a></li>
            <li><a href="#contact" className="nav-link" onClick={() => setNavOpen(false)}>CONTACT ME</a></li>
          </ul>

          <div className="nav-actions">
            <button
              className="icon-btn theme-toggle"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              <i className={`fa-solid ${theme === 'light' ? 'fa-moon' : 'fa-sun'}`} aria-hidden="true"></i>
              <span>{theme === 'light' ? 'Dark' : 'Light'}</span>
            </button>
            <button className="hamburger" onClick={() => setNavOpen(!navOpen)} aria-label="Toggle navigation menu" aria-expanded={navOpen}>
              <span></span><span></span><span></span>
            </button>
          </div>
        </nav>
      </header>

      <main>
       
        <section id="hero" className="hero">
          <div className="hero-grid">
            <div className="hero-content">
              <p className="eyebrow"><span className="dot"></span> Available for internships</p>
              <h1 className="hero-name">Arpan Christian</h1>
              <p className="hero-tagline">
                <span id="typedRole" className="typed-role">{typedText}</span><span className="cursor" aria-hidden="true">|</span>
              </p>
              <p className="hero-intro">
                I'm a software development student who enjoys turning real-world problems into clean,
                working code. I build it with Java, JavaScript and SQL, ship practical projects end‑to‑end,
                and I'm always looking for the more new things to learn.
              </p>
              <div className="hero-actions">
                <a href="assets/images/resume.png" className="btn btn-primary" download="Arpan-Christian-Resume.png" target="_blank" rel="noopener noreferrer">
                  <i className="fa-solid fa-download" aria-hidden="true"></i>
                  Download Resume
                </a>
              </div>

              <div className="hero-socials">
                <a href="https://github.com/Arpan2012007" className="social-icon" aria-label="GitHub profile" target="_blank" rel="noopener"><i className="fa-brands fa-github"></i></a>
                <a href="https://www.linkedin.com/in/arpan-christian-7628a32b2" className="social-icon" aria-label="LinkedIn profile" target="_blank" rel="noopener"><i className="fa-brands fa-linkedin-in"></i></a>
                <a href="mail:arpanchristian2020@gmail.com" className="social-icon" aria-label="Send an email"><i className="fa-regular fa-envelope"></i></a>
              </div>
            </div>

            <div className="hero-visual">
              <div className="terminal-card" role="img" aria-label="Terminal window showing a short introduction script">
                <div className="terminal-titlebar">
                  <span className="dot red"></span><span className="dot yellow"></span><span className="dot green"></span>
                  <span className="terminal-title">about-me.js</span>
                </div>
                <div className="terminal-body">
                  <pre><code><span className="tok-key">const</span> <span className="tok-var">developer</span> = {"{"}<br/>&nbsp;&nbsp;<span className="tok-prop">name</span>: <span className="tok-str">"Arpan Christian"</span>,<br/>&nbsp;&nbsp;<span className="tok-prop">role</span>: <span className="tok-str">"Software Developer"</span>,<br/>&nbsp;&nbsp;<span className="tok-prop">Technologies</span>: [<span className="tok-str">"Java"</span>, <span className="tok-str">"JavaScript"</span>, <span className="tok-str">"Python"</span>],<br/>&nbsp;&nbsp;<span className="tok-prop">focus</span>: <span className="tok-str">"building real things"</span><br/>{"};"}
                  </code></pre>
                </div>
              </div>
              <div className="profile-orb">
                <div className="profile-placeholder" aria-label="Profile picture placeholder">
                  <a href="/assets/images/profile-pic.jpeg" target="_blank" rel="noopener noreferrer">
                    <img src="/assets/images/profile-pic.jpeg" alt="Arpan Christian" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <a href="#about" className="scroll-cue" aria-label="Scroll to About section">
            <span></span>
          </a>
        </section>

        <section id="about" className="section">
          <h2 className="section-title">About Me</h2>

          <div className="about-grid">
            <div className="about-text">
              <p>
                I'm a passionate software development student building a strong foundation in
                <strong> Java, JavaScript, HTML and CSS</strong> along with the tools that make
                modern development possible  <strong>Git, GitHub, VS Code</strong>. My goal
                is simple: understand problems deeply and write code that solves them cleanly.
              </p>
              <p>
                I enjoy the process of building practical, real-world projects from database-driven
                applications to responsive web interfaces  because that's where theory turns into
                actual, usable software. Every project is a chance to get more comfortable with the
                full development cycle: planning, building, debugging and refining.
              </p>
              <p>
                I'm continuously improving my skills through hands-on practice, and I'm looking for
                opportunities internships, placements or freelance work  where I can contribute,
                learn from experienced developers, and grow into a well-rounded software engineer.
              </p>

              <div className="about-highlights">
                <div className="highlight">
                  <i className="fa-solid fa-code" aria-hidden="true"></i>
                  <span>Clean, readable code</span>
                </div>
                <div className="highlight">
                  <i className="fa-solid fa-diagram-project" aria-hidden="true"></i>
                  <span>Practical, real-world projects</span>
                </div>
                <div className="highlight">
                  <i className="fa-solid fa-arrow-trend-up" aria-hidden="true"></i>
                  <span>Always learning, always improving</span>
                </div>
              </div>
            </div>

            <div className="about-stats">
              <div className="stat-card">
                <span className="stat-number" data-count="2">2</span>
                <span className="stat-label">Projects Built</span>
              </div>
              <div className="stat-card">
                <span className="stat-number" data-count="9">9</span>
                <span className="stat-label">Technologies</span>
              </div>
              <div className="stat-card">
                <span className="stat-number" data-count="2">2</span>
                <span className="stat-label">Certificates Earned</span>
              </div>
            </div>
          </div>
        </section>

        
        <section id="skills" className="section section-alt">
          <h2 className="section-title">Skills</h2>
          <p className="section-subtitle">Technologies and tools I use to build and ship software.</p>

          <div className="skills-grid">
            <div className="skill-card">
              <h3 className="skill-card-title"><i className="fa-solid fa-terminal" aria-hidden="true"></i> Back End</h3>
              <div className="skill-bar-item">
                <div className="skill-bar-label"><span>Java</span><span className="skill-percent">60%</span></div>
                <div className="skill-bar-track"><div className="skill-bar-fill" style={{ width: '60%' }}></div></div>
              </div>
              <div className="skill-bar-item">
                <div className="skill-bar-label"><span>SQL</span><span className="skill-percent">85%</span></div>
                <div className="skill-bar-track"><div className="skill-bar-fill" style={{ width: '85%' }}></div></div>
              </div>
              <div className="skill-bar-item">
                <div className="skill-bar-label"><span>Python</span><span className="skill-percent">90%</span></div>
                <div className="skill-bar-track"><div className="skill-bar-fill" style={{ width: '90%' }}></div></div>
              </div>
            </div>

            <div className="skill-card">
              <h3 className="skill-card-title"><i className="fa-solid fa-code" aria-hidden="true"></i> Front end</h3>
              <div className="skill-bar-item">
                <div className="skill-bar-label"><span>HTML</span><span className="skill-percent">80%</span></div>
                <div className="skill-bar-track"><div className="skill-bar-fill" style={{ width: '80%' }}></div></div>
              </div>
              <div className="skill-bar-item">
                <div className="skill-bar-label"><span>CSS</span><span className="skill-percent">80%</span></div>
                <div className="skill-bar-track"><div className="skill-bar-fill" style={{ width: '80%' }}></div></div>
              </div>
              <div className="skill-bar-item">
                <div className="skill-bar-label"><span>JavaScript</span><span className="skill-percent">60%</span></div>
                <div className="skill-bar-track"><div className="skill-bar-fill" style={{ width: '60%' }}></div></div>
              </div>
            </div>

            <div className="skill-card">
              <h3 className="skill-card-title"><i className="fa-solid fa-screwdriver-wrench" aria-hidden="true"></i> Tools</h3>
              <div className="skill-bar-item">
                <div className="skill-bar-label"><span>Git</span><span className="skill-percent">80%</span></div>
                <div className="skill-bar-track"><div className="skill-bar-fill" style={{ width: '80%' }}></div></div>
              </div>
              <div className="skill-bar-item">
                <div className="skill-bar-label"><span>GitHub</span><span className="skill-percent">80%</span></div>
                <div className="skill-bar-track"><div className="skill-bar-fill" style={{ width: '80%' }}></div></div>
              </div>
              <div className="skill-bar-item">
                <div className="skill-bar-label"><span>VS Code</span><span className="skill-percent">90%</span></div>
                <div className="skill-bar-track"><div className="skill-bar-fill" style={{ width: '90%' }}></div></div>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="section">
          <h2 className="section-title">Projects</h2>
          <p className="section-subtitle">A selection of things I've built while learning and experimenting.</p>

          <div className="projects-grid">
            <article className="project-card">
              <div className="project-image">
                <i className="fa-solid fa-house-chimney" aria-hidden="true"></i>
              </div>
              <div className="project-body">
                <h3 className="project-title">House Price Prediction</h3>
                <p className="project-desc">
                  A machine learning model that predicts housing prices from kaggle dataset(Banglore price), using linear 
                  regression techniques to uncover the features that influence price the most.
                </p>
                <div className="project-tags">
                  <span className="tag">Python</span>
                  <span className="tag">Pandas</span>
                  <span className="tag">Scikit-learn</span>
                  <span className="tag">Machine Learning</span>
                </div>
                <div className="project-links">
                  <a href="https://github.com/Arpan2012007/python-project-" className="btn btn-sm btn-outline" target="_blank" rel="noopener"><i className="fa-brands fa-github"></i> GitHub</a>
                </div>
              </div>
            </article>

            <article className="project-card">
              <div className="project-image">
                <i className="fa-solid fa-shopping-cart" aria-hidden="true"></i>
              </div>
              <div className="project-body">
                <h3 className="project-title">GalleryX (E-Commerce Platform)</h3>
                <p className="project-desc">
                  Developed a full-stack luxury art e-commerce web application featuring artwork browsing, buying, renting,
                  wishlist management, cart checkout, and a user dashboard.
                </p>
                <div className="project-tags">
                  <span className="tag">HTML5</span>
                  <span className="tag">CSS</span>
                  <span className="tag">JavaScript</span>
                  <span className="tag">Bootstrap</span>
                </div>
                <div className="project-links">
                  <a href="https://github.com/Arpan2012007/galleryx.git" className="btn btn-sm btn-outline" target="_blank" rel="noopener"><i className="fa-brands fa-github"></i> GitHub</a>
                </div>
              </div>
            </article>
          </div>
        </section>

       
        <section id="education" className="section section-alt">
          <h2 className="section-title">Education</h2>

          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <span className="timeline-date">Expected 2028</span>
                <h3>Pursuing B.Tech — Computer Engineering</h3>
                <p>Silver Oak University, Ahmedabad</p>
                <p className="timeline-note">Current CGPA: 8.85</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <span className="timeline-date">Completed</span>
                <h3>Diploma — Computer Engineering</h3>
                <p>R.C Technical Institute, Ahmedabad</p>
                <p className="timeline-note">CGPA: 8.32 - Strong foundation in Python and web development.</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <span className="timeline-date">Completed</span>
                <h3>Secondary Education (10th Grade)</h3>
                <p>St.Xavier's High School, Mirzapur Ahmedabad</p>
                <p className="timeline-note">Strong foundation in science and computer basics.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="certificates" className="section">
          <h2 className="section-title">Certificates</h2>

          <div className="cert-grid">
            <div className="cert-card">
              <div className="cert-image-frame">
                <img src="assets/images/software-developer-cert.jpeg" alt="Certificate of software development" className="cert-image" />
              </div>
              <i className="fa-solid fa-certificate cert-icon" aria-hidden="true"></i>
              <h3>Certificate of software development</h3>
              <span className="cert-date">Issued Date:-22-07-26</span>
            </div>

            <div className="cert-card">
              <div className="cert-image-frame">
                <img src="assets/images/creart-solutions-cert.jpeg" alt="Certificate of completion" className="cert-image" />
              </div>
              <i className="fa-solid fa-award cert-icon" aria-hidden="true"></i>
              <h3>Certificate of Completion</h3>
              <span className="cert-date">Issued Date:-14-08-24</span>
            </div>
            
          </div>
        </section>

       
        <section id="experience" className="section section-alt">
          <h2 className="section-title">Experience</h2>

          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <span className="timeline-date">27 June — 7 August</span>
                <h3>Internship</h3>
                <p>Creart Solutions, Ahmedabad</p>
                <p className="timeline-note">● I used to learn how to build apps it was a 6 weeks internship. I made a text translator app. I learned how to make apps and how to use Android Studio.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="section section-alt">
          <h2 className="section-title">Contact Me</h2>
          <p className="section-subtitle">Have an opportunity or a question? you can send me an email about your thoughts.</p>

          <div className="contact-grid">
            <div className="contact-info">
              <a href="mailto:arpanchristian2020@gmail.com" className="contact-item">
                <i className="fa-regular fa-envelope" aria-hidden="true"></i>
                <div>
                  <span className="contact-label">Email</span>
                  <span className="contact-value">arpanchristian2020@gmail.com</span>
                </div>
              </a>
              <a href="tel:+919313591489" className="contact-item">
                <i className="fa-solid fa-phone" aria-hidden="true"></i>
                <div>
                  <span className="contact-label">Phone</span>
                  <span className="contact-value">+91 9313591489</span>
                </div>
              </a>
              <a href="https://www.linkedin.com/in/arpan-christian-7628a32b2" className="contact-item" target="_blank" rel="noopener">
                <i className="fa-brands fa-linkedin-in" aria-hidden="true"></i>
                <div>
                  <span className="contact-label">LinkedIn</span>
                  <span className="contact-value">linkedin.com/in/arpan-christian</span>
                </div>
              </a>
              <a href="https://github.com/Arpan2012007" className="contact-item" target="_blank" rel="noopener">
                <i className="fa-brands fa-github" aria-hidden="true"></i>
                <div>
                  <span className="contact-label">GitHub</span>
                  <span className="contact-value">github.com/arpan-christian</span>
                </div>
              </a>
              <div className="contact-item contact-item-static">
                <i className="fa-solid fa-location-dot" aria-hidden="true"></i>
                <div>
                  <span className="contact-label">Location</span>
                  <span className="contact-value">India</span>
                </div>
              </div>
            </div>

            <form className="contact-form" id="contactForm" action="https://formspree.io/f/mqpzzpal" method="POST" onSubmit={handleContactSubmit}>
              <div className="form-row">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" placeholder="Your full name" required />
              </div>
              <div className="form-row">
                <label htmlFor="email">My Email</label>
                <input type="email" id="email" name="email" placeholder="My email address" required />
              </div>
              <div className="form-row">
                <label htmlFor="phone">Your Phone Number</label>
                <input type="tel" id="phone" name="phone" placeholder="Your Mobile No." inputMode="tel" />
              </div>
              <div className="form-row">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows="5" placeholder="Write your message here..." required></textarea>
              </div>
              <button type="submit" className="btn btn-primary btn-full">
                <i className="fa-regular fa-paper-plane" aria-hidden="true"></i> Send Message
              </button>
              <p className="form-status" id="formStatus" role="status" aria-live="polite">{formStatus}</p>
            </form>
          </div>
        </section>
      </main>

     
      <footer className="footer">
        <p>&copy; <span id="year">{new Date().getFullYear()}</span> Arpan Christian. All rights reserved.</p>
        <div className="footer-socials">
          <a href="https://github.com/Arpan2012007" aria-label="GitHub" target="_blank" rel="noopener"><i className="fa-brands fa-github"></i></a>
          <a href="https://www.linkedin.com/in/arpan-christian-7628a32b2" aria-label="LinkedIn" target="_blank" rel="noopener"><i className="fa-brands fa-linkedin-in"></i></a>
          <a href="mailto:arpanchristian2020@gmail.com" aria-label="Email"><i className="fa-regular fa-envelope"></i></a>
        </div>
      </footer>

      {showScrollTop && (
        <button className="scroll-top-btn visible" onClick={scrollToTop} aria-label="Scroll to top">
          <i className="fa-solid fa-chevron-up"></i>
        </button>
      )}
    </>
  )
}

export default App
