/**
 * POOJA S NAIR | ELECTRONICS & COMPUTER ENGINEERING PORTFOLIO
 * Main Interactive Script (Animations, Hover Effects & Scroll Dynamics)
 */

document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------------------------------
  // 1. Dynamic Typing Effect in Hero Section
  // --------------------------------------------------------------------------
  const typingElement = document.getElementById('typingText');
  const phrases = [
    'Assistive Technology & Ergonomics.',
    'Embedded Systems & IoT Solutions.',
    'Rapid Prototyping in C & Python.',
    'Building Impactful Hardware Projects.',
    'Smart Systems & AI Chatbots.'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function typeEffect() {
    if (!typingElement) return;
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 45; // faster when erasing
    } else {
      typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 90; // normal typing speed
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      typingSpeed = 1800; // pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 400; // pause before next
    }

    setTimeout(typeEffect, typingSpeed);
  }

  typeEffect();

  // --------------------------------------------------------------------------
  // 2. Scroll Progress Bar & Scroll Header Styling
  // --------------------------------------------------------------------------
  const scrollProgress = document.getElementById('scrollProgress');
  const header = document.getElementById('header');

  function handleScrollDynamics() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    // Update progress bar width
    if (scrollProgress && docHeight > 0) {
      const scrollPercent = (scrollTop / docHeight) * 100;
      scrollProgress.style.width = `${scrollPercent}%`;
    }

    // Header blurred background
    if (header) {
      if (scrollTop > 30) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  }

  window.addEventListener('scroll', handleScrollDynamics, { passive: true });
  handleScrollDynamics();

  // --------------------------------------------------------------------------
  // 3. Ambient Cursor Glow Follower (Desktop Pointer)
  // --------------------------------------------------------------------------
  const cursorGlow = document.getElementById('cursorGlow');

  if (cursorGlow && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animateCursor() {
      // Smooth interpolation
      currentX += (mouseX - currentX) * 0.15;
      currentY += (mouseY - currentY) * 0.15;

      cursorGlow.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
      requestAnimationFrame(animateCursor);
    }
    animateCursor();
  }

  // --------------------------------------------------------------------------
  // 4. Interactive 3D Tilt & Card Spotlight Tracking
  // --------------------------------------------------------------------------
  const spotlightCards = document.querySelectorAll(
    '.project-card, .skill-category-card, .pillar-card, .contact-method-card, .timeline-content'
  );

  spotlightCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      // Subtle 3D perspective tilt on project cards
      if (card.classList.contains('project-card') && window.innerWidth > 992) {
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale3d(1.015, 1.015, 1.015)`;
      }
    });

    card.addEventListener('mouseleave', () => {
      if (card.classList.contains('project-card')) {
        card.style.transform = '';
      }
    });
  });

  // --------------------------------------------------------------------------
  // 5. Dark / Light Theme Switcher
  // --------------------------------------------------------------------------
  const themeToggle = document.getElementById('themeToggle');
  const rootElement = document.documentElement;

  const savedTheme = localStorage.getItem('theme') || 'dark';
  rootElement.setAttribute('data-theme', savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = rootElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

      rootElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }

  // --------------------------------------------------------------------------
  // 6. Mobile Navigation
  // --------------------------------------------------------------------------
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      const isExpanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
      hamburgerBtn.setAttribute('aria-expanded', !isExpanded);
      hamburgerBtn.classList.toggle('active');
      navMenu.classList.toggle('open');
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        hamburgerBtn.classList.remove('active');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('open');
      });
    });
  }

  // --------------------------------------------------------------------------
  // 7. ScrollSpy: Active Section Navigation Highlight
  // --------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNavLink() {
    const scrollY = window.pageYOffset + 140;

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });
  updateActiveNavLink();

  // --------------------------------------------------------------------------
  // 8. Project Category Filtering with Smooth Transition
  // --------------------------------------------------------------------------
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach((card, index) => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.classList.remove('hide');
          card.style.opacity = '0';
          card.style.transform = 'translateY(16px)';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, index * 40);
        } else {
          card.classList.add('hide');
        }
      });
    });
  });

  // --------------------------------------------------------------------------
  // 9. Copy Email to Clipboard
  // --------------------------------------------------------------------------
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const emailText = document.getElementById('emailText');

  if (copyEmailBtn && emailText) {
    copyEmailBtn.addEventListener('click', () => {
      const email = emailText.textContent.trim();
      navigator.clipboard.writeText(email).then(() => {
        copyEmailBtn.classList.add('copied');
        setTimeout(() => {
          copyEmailBtn.classList.remove('copied');
        }, 2000);
      }).catch(() => {
        window.prompt('Copy email address:', email);
      });
    });
  }

  // --------------------------------------------------------------------------
  // 10. Interactive Contact Form Handling & Validation
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');
  const submitBtn = document.getElementById('submitBtn');

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;

      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const subjectInput = document.getElementById('subject');
      const messageInput = document.getElementById('message');

      [nameInput, emailInput, subjectInput, messageInput].forEach((input) => {
        input.parentElement.classList.remove('has-error');
      });
      formFeedback.className = 'form-feedback';
      formFeedback.style.display = 'none';

      if (!nameInput.value.trim()) {
        nameInput.parentElement.classList.add('has-error');
        isValid = false;
      }

      if (!validateEmail(emailInput.value.trim())) {
        emailInput.parentElement.classList.add('has-error');
        isValid = false;
      }

      if (!subjectInput.value.trim()) {
        subjectInput.parentElement.classList.add('has-error');
        isValid = false;
      }

      if (messageInput.value.trim().length < 10) {
        messageInput.parentElement.classList.add('has-error');
        isValid = false;
      }

      if (!isValid) {
        formFeedback.textContent = 'Please fill out all required fields correctly.';
        formFeedback.classList.add('error');
        return;
      }

      const originalBtnText = submitBtn.querySelector('.btn-text').textContent;
      submitBtn.disabled = true;
      submitBtn.querySelector('.btn-text').textContent = 'Sending Message...';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.querySelector('.btn-text').textContent = originalBtnText;

        formFeedback.textContent = '✨ Thank you! Your message has been sent to Pooja S Nair. I will get back to you shortly.';
        formFeedback.classList.add('success');

        contactForm.reset();

        setTimeout(() => {
          formFeedback.style.display = 'none';
        }, 6000);
      }, 1000);
    });
  }

  // --------------------------------------------------------------------------
  // 11. Staggered Scroll Reveal System (Intersection Observer)
  // --------------------------------------------------------------------------
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    // Apply reveal class with stagger
    const revealTargets = [
      { selector: '.section-header', class: 'reveal' },
      { selector: '.about-grid', class: 'reveal' },
      { selector: '.pillar-card', class: 'reveal-scale', stagger: true },
      { selector: '.skill-category-card', class: 'reveal-scale', stagger: true },
      { selector: '.project-card', class: 'reveal', stagger: true },
      { selector: '.timeline-item', class: 'reveal-left', stagger: true },
      { selector: '.contact-info-panel', class: 'reveal-left' },
      { selector: '.contact-form-panel', class: 'reveal-right' }
    ];

    revealTargets.forEach(({ selector, class: className, stagger }) => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((el, index) => {
        el.classList.add(className);
        if (stagger) {
          el.style.transitionDelay = `${index * 80}ms`;
        }
        revealObserver.observe(el);
      });
    });
  }
});
