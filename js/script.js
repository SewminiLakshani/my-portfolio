// =============================================================
// DATA
// =============================================================
const PROJECTS = [
  {
    id: "smartcart",
    name: "SmartCart",
    type: "E-Commerce Management System",
    icon: "fa-solid fa-cart-shopping",
    image: "assets/images/projects/smartcart.png",
    shortDesc: "A multi-role online store with dynamic checkout, stock alerts, and sales analytics.",
    fullDesc: "SmartCart is a responsive e-commerce management system with separate Customer, Admin, and Staff roles. It handles dynamic checkout, automated low-stock detection, and sales reporting through a secure, session-based PHP backend.",
    tech: ["HTML5", "CSS3", "Bootstrap 5", "JavaScript", "PHP", "MySQL", "AJAX", "Chart.js"],
    features: [
      "Customer / Admin / Staff role management",
      "Dynamic checkout flow",
      "Admin dashboard with sales analytics (Chart.js)",
      "Automated low-stock detection",
      "Role-based access control & session management",
      "Secure backend with prepared statements"
    ],
    github: "https://github.com/SewminiLakshani/smart-cart.git"
  },
  {
    id: "edulms",
    name: "EduLMS",
    type: "Learning Management System",
    icon: "fa-solid fa-graduation-cap",
    image: "assets/images/projects/lms.png",
    shortDesc: "A role-based LMS with course enrollment, resource sharing, and timed MCQ quizzes.",
    fullDesc: "EduLMS gives Admins, Lecturers, and Students their own dashboards. Students enroll in courses, access shared resources, and sit timed MCQ quizzes that are evaluated automatically.",
    tech: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL"],
    features: [
      "Admin, Lecturer, and Student dashboards",
      "Course enrollment & resource sharing",
      "Timed MCQ quizzes with automated evaluation",
      "Session management",
      "MySQLi prepared statements",
      "Password hashing"
    ],
    github: "https://github.com/SewminiLakshani/lms-project.git"
  },
  {
    id: "javapos",
    name: "Java POS",
    type: "Desktop Point of Sale Application",
    icon: "fa-solid fa-cash-register",
    image: "assets/images/projects/javapos.png",
    shortDesc: "A desktop POS system for real-time checkout, stock, and return processing.",
    fullDesc: "A Java Swing desktop application built for real-time checkout, stock management, and return processing, with a modular DAO-based backend for clean database transactions.",
    tech: ["Java", "Swing", "MySQL", "JDBC", "DAO Pattern"],
    features: [
      "Real-time checkout",
      "Stock management & return processing",
      "Customer management",
      "Sales analytics & report generation",
      "CRUD operations",
      "Modular DAO architecture"
    ],
    github: "https://github.com/SewminiLakshani/POS_System.git"
  }
];

const CERTIFICATIONS = [
  { title: "Web Design for Beginners", org: "University of Moratuwa (CODL)", year: "2026", link: "assets/images/certificates/web-design-for-beginners.pdf" },
  { title: "Python Essentials 1", org: "Cisco Networking Academy & OpenEDG", year: "2026", link: "assets/images/certificates/python-essentials-1.pdf" },
  { title: "Linux for Absolute Beginners", org: "Alison", year: "2026", link: "assets/images/certificates/linux-for-absolute-beginners.pdf" },
  { title: "JavaScript for Beginners", org: "Simplilearn", year: "2026", link: "assets/images/certificates/javascript-for-beginners.pdf" },
  { title: "Introduction to Data Science", org: "Cisco Networking Academy", year: "2026", link: "assets/images/certificates/intro-to-data-science.pdf" },
  { title: "Introduction to IoT and Digital Transformation", org: "Cisco Networking Academy", year: "2026", link: "assets/images/certificates/intro-to-iot.pdf" },
  { title: "Critical Thinking in the AI Era", org: "HP LIFE", year: "2026", link: "assets/images/certificates/critical-thinking-ai-era.pdf" },
  { title: "HTML Essentials", org: "Cisco Networking Academy", year: "2026", link: "assets/images/certificates/html-essentials.pdf" },
  { title: "Introduction to Database Concepts", org: "Alison", year: "2026", link: "assets/images/certificates/intro-to-database-concepts.pdf" },
  { title: "CSS & Responsive Web Design", org: "DP Education IT Campus", year: "2026", link: "assets/images/certificates/dp-education-css.pdf" }
];

const PROJECTS_PER_PAGE = 3;
const CERTS_INITIAL = 6;

// =============================================================
// THEME TOGGLE
// =============================================================
(function initTheme(){
  const root = document.documentElement;
  const saved = localStorage.getItem("theme");
  const preferred = saved || "dark";
  root.setAttribute("data-theme", preferred);

  document.getElementById("themeToggle").addEventListener("click", () => {
    const current = root.getAttribute("data-theme") === "light" ? "light" : "dark";
    const next = current === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });
})();

// =============================================================
// MOBILE NAV
// =============================================================
(function initMobileNav(){
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  hamburger.addEventListener("click", () => {
    const isActive = navLinks.classList.toggle("active");
    hamburger.classList.toggle("active", isActive);
    hamburger.setAttribute("aria-expanded", String(isActive));
  });

  navLinks.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      hamburger.classList.remove("active");
      hamburger.setAttribute("aria-expanded", "false");
    });
  });
})();

// =============================================================
// PROJECTS: RENDER + PAGINATION
// =============================================================
let currentPage = 1;

function renderProjectCard(project){
  const thumb = project.image
    ? `<img src="${project.image}" alt="${project.name} screenshot" class="project-thumb-img">`
    : `<i class="${project.icon}"></i>`;

  return `
    <div class="col">
      <div class="project-card h-100" data-id="${project.id}">
        <div class="project-thumb">${thumb}</div>
        <div class="project-body">
          <h3>${project.name}</h3>
          <p class="project-type">${project.type}</p>
          <div class="chip-row">${project.tech.slice(0,4).map(t => `<span class="chip">${t}</span>`).join("")}</div>
          <p class="project-desc">${project.shortDesc}</p>
          <div class="project-actions">
            <a href="${project.github}" target="_blank" rel="noopener" class="btn btn-outline"><i class="fa-brands fa-github"></i> GitHub</a>
            <button class="btn btn-primary details-btn" data-id="${project.id}">Details</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderProjectsPage(page){
  const grid = document.getElementById("projectsGrid");
  const totalPages = Math.ceil(PROJECTS.length / PROJECTS_PER_PAGE);
  currentPage = Math.min(Math.max(page, 1), totalPages);

  const start = (currentPage - 1) * PROJECTS_PER_PAGE;
  const pageItems = PROJECTS.slice(start, start + PROJECTS_PER_PAGE);

  grid.style.opacity = 0;
  setTimeout(() => {
    grid.innerHTML = pageItems.map(renderProjectCard).join("");
    grid.style.opacity = 1;
    grid.querySelectorAll(".details-btn").forEach(btn => {
      btn.addEventListener("click", () => openProjectModal(btn.dataset.id));
    });
  }, 150);

  renderPagination(totalPages);
}

function renderPagination(totalPages){
  const el = document.getElementById("pagination");
  if (totalPages <= 1){ el.innerHTML = ""; return; }

  let html = `<button class="page-btn" id="prevPage" ${currentPage === 1 ? "disabled" : ""}><i class="fa-solid fa-arrow-left"></i> Previous</button>`;
  for (let i = 1; i <= totalPages; i++){
    html += `<button class="page-btn ${i === currentPage ? "active" : ""}" data-page="${i}">${i}</button>`;
  }
  html += `<button class="page-btn" id="nextPage" ${currentPage === totalPages ? "disabled" : ""}>Next <i class="fa-solid fa-arrow-right"></i></button>`;
  el.innerHTML = html;

  el.querySelectorAll("[data-page]").forEach(btn => {
    btn.addEventListener("click", () => renderProjectsPage(Number(btn.dataset.page)));
  });
  const prev = document.getElementById("prevPage");
  const next = document.getElementById("nextPage");
  if (prev) prev.addEventListener("click", () => renderProjectsPage(currentPage - 1));
  if (next) next.addEventListener("click", () => renderProjectsPage(currentPage + 1));
}


// PROJECT MODAL

const modalOverlay = document.getElementById("modalOverlay");

function openProjectModal(id){
  const project = PROJECTS.find(p => p.id === id);
  if (!project) return;

  document.getElementById("modalType").textContent = project.type;
  document.getElementById("modalTitle").textContent = project.name;
  document.getElementById("modalDesc").textContent = project.fullDesc;
  document.getElementById("modalTech").innerHTML = project.tech.map(t => `<span class="chip">${t}</span>`).join("");
  document.getElementById("modalFeatures").innerHTML = project.features.map(f => `<li>${f}</li>`).join("");
  document.getElementById("modalGithub").href = project.github;

  modalOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeProjectModal(){
  modalOverlay.classList.remove("active");
  document.body.style.overflow = "";
}

document.getElementById("modalClose").addEventListener("click", closeProjectModal);
document.getElementById("modalCloseBtn").addEventListener("click", closeProjectModal);
modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) closeProjectModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modalOverlay.classList.contains("active")) closeProjectModal();
});


// CERTIFICATIONS: RENDER + VIEW MORE

function renderCertCard(cert, index){
  return `
    <div class="col cert-col ${index >= CERTS_INITIAL ? "hidden-cert" : ""}">
      <div class="cert-card h-100">
        <div class="cert-icon"><i class="fa-solid fa-certificate"></i></div>
        <h4>${cert.title}</h4>
        <p class="cert-org">${cert.org}</p>
        <span class="cert-year">${cert.year}</span>
        <a href="${cert.link}" target="_blank" rel="noopener" class="btn btn-outline">View Certificate</a>
      </div>
    </div>
  `;
}

function initCertifications(){
  const grid = document.getElementById("certsGrid");
  grid.innerHTML = CERTIFICATIONS.map(renderCertCard).join("");

  const viewMoreBtn = document.getElementById("viewMoreCerts");
  if (CERTIFICATIONS.length <= CERTS_INITIAL){
    viewMoreBtn.classList.add("done");
    return;
  }

  viewMoreBtn.addEventListener("click", () => {
    grid.querySelectorAll(".hidden-cert").forEach(card => card.classList.remove("hidden-cert"));
    viewMoreBtn.classList.add("done");
  });
}


// SCROLL REVEAL

function initScrollReveal(){
  const items = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  items.forEach(item => observer.observe(item));
}


// CONTACT FORM VALIDATION

function initContactForm(){
  const form = document.getElementById("contactForm");
  const successMsg = document.getElementById("formSuccess");

  const fields = {
    name: { el: document.getElementById("name"), error: document.getElementById("nameError") },
    email: { el: document.getElementById("email"), error: document.getElementById("emailError") },
    subject: { el: document.getElementById("subject"), error: document.getElementById("subjectError") },
    message: { el: document.getElementById("message"), error: document.getElementById("messageError") }
  };

  function validateField(key){
    const { el, error } = fields[key];
    const value = el.value.trim();
    let message = "";

    if (!value){
      message = "This field is required.";
    } else if (key === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)){
      message = "Enter a valid email address.";
    } else if (key === "message" && value.length < 10){
      message = "Message should be at least 10 characters.";
    }

    error.textContent = message;
    el.closest(".form-row").classList.toggle("error", Boolean(message));
    return !message;
  }

  Object.keys(fields).forEach(key => {
    fields[key].el.addEventListener("blur", () => validateField(key));
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    successMsg.classList.remove("show");

    const validations = Object.keys(fields).map(validateField);
    if (!validations.every(Boolean)) return;

    const subject = encodeURIComponent(fields.subject.el.value.trim());
    const body = encodeURIComponent(
      `Name: ${fields.name.el.value.trim()}\nEmail: ${fields.email.el.value.trim()}\n\n${fields.message.el.value.trim()}`
    );
    window.location.href = `mailto:sewminilakshani1010@gmail.com?subject=${subject}&body=${body}`;

    successMsg.classList.add("show");
    form.reset();
  });
}

// =============================================================
// HERO ROLE TYPEWRITER
// =============================================================
const ROLES = [
  "Web Developer Intern",
  "Software Developer Intern",
  "Full-Stack Developer Intern",
  "IT Intern",
  "Backend Developer Intern"
];

function initRoleTypewriter(){
  const el = document.getElementById("typedRole");
  if (!el) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion){
    el.textContent = ROLES[0];
    return;
  }

  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const TYPE_SPEED = 70;
  const DELETE_SPEED = 40;
  const HOLD_TIME = 1600;
  const GAP_TIME = 400;

  function tick(){
    const currentRole = ROLES[roleIndex];

    if (!deleting){
      charIndex++;
      el.textContent = currentRole.slice(0, charIndex);
      if (charIndex === currentRole.length){
        deleting = true;
        setTimeout(tick, HOLD_TIME);
        return;
      }
      setTimeout(tick, TYPE_SPEED);
    } else {
      charIndex--;
      el.textContent = currentRole.slice(0, charIndex);
      if (charIndex === 0){
        deleting = false;
        roleIndex = (roleIndex + 1) % ROLES.length;
        setTimeout(tick, GAP_TIME);
        return;
      }
      setTimeout(tick, DELETE_SPEED);
    }
  }

  tick();
}

// =============================================================
// INIT
// =============================================================
document.addEventListener("DOMContentLoaded", () => {
  renderProjectsPage(1);
  initCertifications();
  initScrollReveal();
  initContactForm();
  initRoleTypewriter();
});
