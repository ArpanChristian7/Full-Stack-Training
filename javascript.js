document.addEventListener("DOMContentLoaded", () => {

  
  const root = document.documentElement;
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");

  const applyTheme = (theme) => {
    if (theme === "light") {
      root.setAttribute("data-theme", "light");
      themeIcon.classList.remove("fa-moon");
      themeIcon.classList.add("fa-sun");
    } else {
      root.removeAttribute("data-theme");
      themeIcon.classList.remove("fa-sun");
      themeIcon.classList.add("fa-moon");
    }
  };

  const savedTheme = localStorage.getItem("portfolio-theme") || "dark";
  applyTheme(savedTheme);

  themeToggle.addEventListener("click", () => {
    const isLight = root.getAttribute("data-theme") === "light";
    const next = isLight ? "dark" : "light";
    applyTheme(next);
    localStorage.setItem("portfolio-theme", next);
  });

  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.classList.toggle("open", isOpen);
    navToggle.setAttribute("aria-expanded", isOpen);
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  
  const siteHeader = document.getElementById("siteHeader");
  const scrollProgress = document.getElementById("scrollProgress");
  const scrollTopBtn = document.getElementById("scrollTopBtn");

  const onScroll = () => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;

    scrollProgress.style.width = progress + "%";
    siteHeader.classList.toggle("scrolled", scrollY > 10);
    scrollTopBtn.classList.toggle("visible", scrollY > 480);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });


  const roles = [
    "Aspiring Software Developer",
    "Web Developer",
    "SQL Enthusiast"
  ];
  const typedEl = document.getElementById("typedRole");

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const TYPE_SPEED = 65;
  const DELETE_SPEED = 35;
  const PAUSE_AFTER_TYPE = 1400;
  const PAUSE_AFTER_DELETE = 400;

  function typeLoop() {
    const currentRole = roles[roleIndex];

    if (!isDeleting) {
      charIndex++;
      typedEl.textContent = currentRole.slice(0, charIndex);
      if (charIndex === currentRole.length) {
        isDeleting = true;
        setTimeout(typeLoop, PAUSE_AFTER_TYPE);
        return;
      }
      setTimeout(typeLoop, TYPE_SPEED);
    } else {
      charIndex--;
      typedEl.textContent = currentRole.slice(0, charIndex);
      if (charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeLoop, PAUSE_AFTER_DELETE);
        return;
      }
      setTimeout(typeLoop, DELETE_SPEED);
    }
  }

  if (typedEl) typeLoop();

  

  
  document.querySelectorAll(
    ".about-text, .about-stats, .skill-card, .project-card, .timeline-item, .cert-card, .achieve-card, .contact-info, .contact-form"
  ).forEach((el) => el.classList.add("reveal"));

  const animateSkillBars = (card) => {
    card.querySelectorAll(".skill-bar-fill").forEach((bar) => {
      const percent = bar.getAttribute("data-percent") || 0;
      requestAnimationFrame(() => {
        bar.style.width = percent + "%";
      });
    });
  };

  const animateCounters = (container) => {
    container.querySelectorAll(".stat-number").forEach((el) => {
      const target = parseInt(el.getAttribute("data-count"), 10) || 0;
      const duration = 1200;
      const start = performance.now();

      const step = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        el.textContent = Math.floor(progress * target);
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = target;
        }
      };
      requestAnimationFrame(step);
    });
  };

  const revealObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in-view");

        if (entry.target.classList.contains("skill-card")) {
          animateSkillBars(entry.target);
        }
        if (entry.target.classList.contains("about-stats")) {
          animateCounters(entry.target);
        }
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.2, rootMargin: "0px 0px -60px 0px" }
  );

  document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

  
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");

      projectCards.forEach((card) => {
        const categories = card.getAttribute("data-category").split(" ");
        const show = filter === "all" || categories.includes(filter);
        card.classList.toggle("hidden", !show);
      });
    });
  });

 
  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");

  contactForm.addEventListener("submit", (e) => {
    if (!contactForm.checkValidity()) {
      e.preventDefault();
      formStatus.textContent = "Please fill in all fields before sending.";
      formStatus.style.color = "#ff6b6b";
      return;
    }

    formStatus.style.color = "";
    formStatus.textContent = "Sending your message...";
  });

 
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get("success") === "true") {
    formStatus.style.color = "#51cf66";
    formStatus.textContent   = "Message sent successfully! I'll get back to you soon.";
    setTimeout(() => {
      formStatus.textContent = "";
    }, 5000);
  }

  document.getElementById("year").textContent = new Date().getFullYear();

});
