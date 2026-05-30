/* ================================================
   LAWRENCE FRANCISCO — PORTFOLIO JS
   ================================================ */

/* ---------- Typewriter Effect (Hero Role) ---------- */
(function () {
  const el = document.getElementById('hero-role-typed');
  if (!el) return;

  const roles = [
    'IT Student & Aspiring Developer',
    'Front-End Developer',
    'UI/UX Designer',
    'Video Editor',
    'Creative Problem Solver'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typeSpeed = 75;
  const deleteSpeed = 40;
  const pauseAfterType = 2000;
  const pauseAfterDelete = 400;

  function type() {
    const current = roles[roleIndex];
    if (isDeleting) {
      el.textContent = current.substring(0, charIndex - 1);
      charIndex--;
    } else {
      el.textContent = current.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? deleteSpeed : typeSpeed;

    if (!isDeleting && charIndex === current.length) {
      delay = pauseAfterType;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = pauseAfterDelete;
    }

    setTimeout(type, delay);
  }

  setTimeout(type, 800);
})();


/* ---------- Navbar scroll effect ---------- */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateActiveNav();
});

/* ---------- Hamburger Menu ---------- */
const hamburger = document.getElementById('hamburger');
const navLinksMenu = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinksMenu.classList.toggle('open');
});

// Close menu when a nav link is clicked
navLinksMenu.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinksMenu.classList.remove('open');
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target)) {
    hamburger.classList.remove('open');
    navLinksMenu.classList.remove('open');
  }
});

/* ---------- Active nav link on scroll ---------- */
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
  const scrollY = window.scrollY + 120;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if (link) {
      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
}

/* ---------- Scroll Animations (AOS-like) ---------- */
const animatedEls = document.querySelectorAll('[data-aos]');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const delay = entry.target.getAttribute('data-aos-delay') || 0;
      setTimeout(() => {
        entry.target.classList.add('aos-animate');
      }, parseInt(delay));
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

animatedEls.forEach(el => observer.observe(el));

/* ---------- Gallery Switcher (VrakeIT) ---------- */
function changeMain(thumbEl, src) {
  const mainImg = document.getElementById('gallery-main-img');
  if (!mainImg) return;

  // Fade effect
  mainImg.style.opacity = '0';
  mainImg.style.transform = 'scale(0.97)';
  mainImg.style.transition = 'opacity 0.25s ease, transform 0.25s ease';

  setTimeout(() => {
    mainImg.src = src;
    mainImg.style.opacity = '1';
    mainImg.style.transform = 'scale(1)';
  }, 250);

  // Update active thumb
  document.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
  thumbEl.classList.add('active');
}

/* ---------- Lightbox ---------- */
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');

// Attach lightbox to project preview images
document.querySelectorAll('.project-preview-img, .gallery-main-img').forEach(img => {
  img.style.cursor = 'zoom-in';
  img.addEventListener('click', (e) => {
    lightboxImg.src = e.target.src;
    lightboxImg.alt = e.target.alt;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

lightboxClose.addEventListener('click', closeLightbox);

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

/* ---------- Contact Form ---------- */
async function handleSubmit(e) {
  e.preventDefault();
  const btn    = document.getElementById('submit-btn');
  const success = document.getElementById('form-success');
  const form   = document.getElementById('contact-form');

  // Show loading state
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(data)
    });

    const json = await res.json();

    if (res.ok && json.success) {
      // ✅ Success
      btn.innerHTML = '<i class="fas fa-check"></i> Sent!';
      success.classList.add('show');
      form.reset();
    } else {
      // ❌ API returned an error
      btn.disabled = false;
      btn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
      alert('Failed to send: ' + (json.message || 'Unknown error. Please try again.'));
    }
  } catch (err) {
    // ❌ Network error
    btn.disabled = false;
    btn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
    alert('Network error. Please check your connection and try again.');
  }

  // Reset button after 4 seconds on success
  setTimeout(() => {
    btn.disabled = false;
    btn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
    success.classList.remove('show');
  }, 4000);
}


/* ---------- Smooth scroll for anchor links ---------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ---------- Navbar overlay for mobile ---------- */
const overlay = document.createElement('div');
overlay.style.cssText = `
  position: fixed; inset: 0; background: rgba(0,0,0,0.5);
  z-index: 99; opacity: 0; pointer-events: none;
  transition: opacity 0.3s ease;
  backdrop-filter: blur(2px);
`;
document.body.appendChild(overlay);

function updateOverlay() {
  if (navLinksMenu.classList.contains('open')) {
    overlay.style.opacity = '1';
    overlay.style.pointerEvents = 'all';
  } else {
    overlay.style.opacity = '0';
    overlay.style.pointerEvents = 'none';
  }
}

hamburger.addEventListener('click', updateOverlay);
overlay.addEventListener('click', () => {
  hamburger.classList.remove('open');
  navLinksMenu.classList.remove('open');
  updateOverlay();
});

navLinksMenu.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', updateOverlay);
});

/* ---------- Initial call ---------- */
updateActiveNav();

/* ---------- Theme Toggle ---------- */
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Apply saved theme preference immediately
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  body.classList.add('light');
}

themeToggle.addEventListener('click', () => {
  body.classList.toggle('light');
  const isLight = body.classList.contains('light');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');

  // Ripple feedback
  themeToggle.style.transform = 'scale(0.9)';
  setTimeout(() => { themeToggle.style.transform = ''; }, 150);
});
