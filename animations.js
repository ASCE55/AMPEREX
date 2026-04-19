document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('canvas-container');
  if (!container) return;

  const components = [
    // Resistor SVG
    `<svg width="40" height="12" viewBox="0 0 40 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 6H8L10 1L14 11L18 1L22 11L26 1L30 11L32 6H40" stroke="rgba(0, 240, 255, 0.4)" stroke-width="1.5" stroke-linejoin="round"/></svg>`,
    // Chip SVG
    `<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="6" width="18" height="18" rx="2" stroke="rgba(0, 240, 255, 0.5)" stroke-width="1.5"/><path d="M2 10H6M2 15H6M2 20H6M24 10H28M24 15H28M24 20H28M10 2V6M15 2V6M20 2V6M10 24V28M15 24V28M20 24V28" stroke="rgba(0, 240, 255, 0.5)" stroke-width="1.5" stroke-linecap="round"/></svg>`,
    // Capacitor SVG
    `<svg width="20" height="30" viewBox="0 0 20 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 0V12M10 30V18M2 12H18M2 18H18" stroke="rgba(0, 240, 255, 0.4)" stroke-width="2" stroke-linecap="round"/></svg>`,
    // Circuit Node
    `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="4" fill="rgba(0, 240, 255, 0.2)" stroke="rgba(0, 240, 255, 0.6)" stroke-width="1.5"/><path d="M8 0V4M8 12V16M0 8H4M12 8H16" stroke="rgba(0, 240, 255, 0.4)" stroke-width="1.5"/></svg>`
  ];

  const numElements = 35; // Density
  const fragment = document.createDocumentFragment();
  
  for (let i = 0; i < numElements; i++) {
    const el = document.createElement('div');
    el.innerHTML = components[Math.floor(Math.random() * components.length)];
    el.style.position = 'absolute';
    
    // Random positioning
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    el.style.left = `${posX}vw`;
    el.style.top = `${posY}vh`;
    
    // Random depth & scale
    const depth = Math.random();
    const scale = 0.5 + depth * 1.5; 
    const opacity = 0.1 + depth * 0.3;
    
    // Initial rotation
    const rot = Math.random() * 360;
    
    el.style.transform = `scale(${scale}) rotate(${rot}deg)`;
    el.style.opacity = opacity;
    el.style.filter = `drop-shadow(0 0 ${5 * scale}px rgba(0, 240, 255, 0.5)) blur(${depth > 0.6 ? 0 : 1}px)`;
    el.style.willChange = 'transform'; // Performance optimization
    
    // Assign random animation class
    const animType = Math.floor(Math.random() * 3) + 1;
    const duration = 15 + Math.random() * 25; // Slower, premium feel
    const delay = Math.random() * -30; 
    
    el.style.animation = `float${animType} ${duration}s ease-in-out ${delay}s infinite`;
    
    fragment.appendChild(el);
  }

  container.appendChild(fragment);

  // Optimized Energy Streaks
  setInterval(() => {
    if (Math.random() > 0.4 && document.hasFocus()) { // Only generate if tab is active
      const streak = document.createElement('div');
      streak.classList.add('streak');
      streak.style.top = `${Math.random() * 100}vh`;
      document.body.appendChild(streak);
      
      setTimeout(() => streak.remove(), 2500);
    }
  }, 1200);
  
  // High-performance Parallax effect
  let mouseX = 0;
  let mouseY = 0;
  let currentX = 0;
  let currentY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 30; // Max movement
    mouseY = (e.clientY / window.innerHeight - 0.5) * 30;
  });

  function animateParallax() {
    // Smooth easing
    currentX += (mouseX - currentX) * 0.05;
    currentY += (mouseY - currentY) * 0.05;
    
    container.style.transform = `translate(${-currentX}px, ${-currentY}px)`;
    requestAnimationFrame(animateParallax);
  }
  
  animateParallax();
});
