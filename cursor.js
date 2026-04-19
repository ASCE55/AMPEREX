// Custom RGB Resistor Cursor
const cursorResistor = document.createElement('div');
cursorResistor.classList.add('cursor-resistor');
// SVG of a resistor
cursorResistor.innerHTML = `<svg viewBox="0 0 40 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 6H8L10 1L14 11L18 1L22 11L26 1L30 11L32 6H40" stroke="transparent" /></svg>`;
document.body.appendChild(cursorResistor);

let cursorX = window.innerWidth / 2, cursorY = window.innerHeight / 2;
let resistorX = cursorX, resistorY = cursorY;
let isHovering = false;

window.addEventListener('mousemove', (e) => {
  cursorX = e.clientX;
  cursorY = e.clientY;
});

// Smooth follow
function animateCursor() {
  let distX = cursorX - resistorX;
  let distY = cursorY - resistorY;
  
  resistorX += distX * 0.25;
  resistorY += distY * 0.25;
  
  // Base tilt of -45 degrees so it acts like a pointer
  let scale = isHovering ? 1.5 : 1;
  
  cursorResistor.style.transform = `translate(-50%, -50%) rotate(-45deg) scale(${scale})`;
  cursorResistor.style.left = `${resistorX}px`;
  cursorResistor.style.top = `${resistorY}px`;
  
  requestAnimationFrame(animateCursor);
}
animateCursor();

// Hover Effects
const interactiveElements = document.querySelectorAll('a, button, .glass-card, .gallery-item');

interactiveElements.forEach(el => {
  el.addEventListener('mouseenter', () => {
    isHovering = true;
  });
  
  el.addEventListener('mouseleave', () => {
    isHovering = false;
  });
});
