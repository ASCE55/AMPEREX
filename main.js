// Inject Preloader Dynamically
const preloader = document.createElement('div');
preloader.id = 'preloader';
preloader.innerHTML = '<div class="loader-circuit"></div>';
document.documentElement.appendChild(preloader); // Append early to prevent flash

document.addEventListener('DOMContentLoaded', () => {
  // Sticky Navbar & Active Highlighting
  const navbar = document.querySelector('.navbar');
  const sections = document.querySelectorAll('section, header');
  const navLinksList = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    // Navbar visual change
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active link highlighting
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= (sectionTop - sectionHeight / 3)) {
        current = section.getAttribute('id') || '';
      }
    });

    if (current) {
      navLinksList.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href').includes(current)) {
          a.classList.add('active');
        }
      });
    }
  });

  // Mobile Menu Toggle
  const menuBtn = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // Optimized Scroll Reveal via Intersection Observer
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add a slight delay based on the element's order in the DOM if needed, or use CSS classes
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Only reveal once for premium feel
      }
    });
  }, {
    root: null,
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px"
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // Mindblowing Spotlight Tracking Effect for Cards
  const cards = document.querySelectorAll('.glass-card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // Smooth Page Transitions on Link Click
  const internalLinks = document.querySelectorAll('a[href^="a"], a[href^="i"], a[href^="f"], a[href^="t"], a[href^="e"], a[href^="g"], a[href^="c"]');
  
  internalLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const target = link.getAttribute('href');
      // Only intercept if it's an internal HTML page and not a hash link
      if (target && target.endsWith('.html') && target !== window.location.pathname.split('/').pop()) {
        e.preventDefault();
        document.body.classList.remove('loaded');
        
        setTimeout(() => {
          window.location.href = target;
        }, 500); // Wait for fade out
      }
    });
  });
});

// Remove Preloader and Fade in Page
window.addEventListener('load', () => {
  const preloaderEl = document.getElementById('preloader');
  if (preloaderEl) {
    preloaderEl.style.opacity = '0';
    setTimeout(() => {
      preloaderEl.remove();
      document.body.classList.add('loaded'); // Triggers CSS transition
    }, 500);
  } else {
    document.body.classList.add('loaded');
  }
});
