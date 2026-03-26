// =======================
// 🔥 CREATE SECTION
// =======================
const section = document.createElement("section");

section.innerHTML = `
<h2 style="color:#ff00ff;text-align:center; margin-bottom:10px; font-family:inherit;">
  Blinkies
</h2>

<div id="blinkiesContainer"></div>
`;

document.getElementById("socialsSection").insertAdjacentElement("afterend", section);
const container = document.getElementById("blinkiesContainer");

// =======================
// 🔥 GRID STYLE
// =======================
const style = document.createElement("style");
style.textContent = `
#blinkiesContainer {
  display: grid;
  grid-template-columns: repeat(3, 100px);
  justify-content: center;
  gap: 4px;
  margin: 10px 0 20px;
}

.blinkie {
  width: 100px;
  height: 100px;
  overflow: hidden;
}

.blinkie.wide {
  grid-column: span 3;
  width: 100%;
  height: 100px;
}

.blinkie img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

html, body {
  overflow-x: hidden;
  touch-action: none; /* IMPORTANT pentru control total touch */
}
`;
document.head.appendChild(style);

// =======================
// 🔥 CREATE BLINKIE
// =======================
function createBlinkie(src) {
  const el = document.createElement("div");
  el.className = "blinkie";

  const img = document.createElement("img");
  img.src = src;

  img.onload = () => {
    const aspect = img.naturalWidth / img.naturalHeight;
    if (aspect > 1.4) el.classList.add("wide");
  };

  img.onerror = () => el.remove();

  el.appendChild(img);
  return el;
}

// =======================
// 🔥 ADD BLINKIES
// =======================
function addBlinkieIfExists(src) {
  const test = new Image();
  test.src = src;

  test.onload = () => {
    container.appendChild(createBlinkie(src));
  };
}

// Folder 1
for (let i = 1; i <= 250; i++) {
  addBlinkieIfExists(`1 (${i}).gif`);
}

// Folder 2
for (let i = 1; i <= 200; i++) {
  addBlinkieIfExists(`2 (${i}).gif`);
}

// =======================
// 🔥 FLASH TEXT
// =======================
const title = section.querySelector("h2");
const text = title.textContent;
title.textContent = "";

for (let char of text) {
  const span = document.createElement("span");
  span.textContent = char;
  span.style.color = "#ff00ff";
  title.appendChild(span);
}

// =======================
// 🔥 TOUCH SCROLL CONTROL (ULTRA SLOW)
// =======================
let lastY = 0;
let currentY = window.scrollY;

const SCROLL_FACTOR = 0.2; // 🔥 mai mic = mai lent (poți pune 0.1 pentru EXTREM lent)

window.addEventListener("touchstart", (e) => {
  lastY = e.touches[0].clientY;
});

window.addEventListener("touchmove", (e) => {
  e.preventDefault(); // oprim scroll-ul default

  const currentTouchY = e.touches[0].clientY;
  const delta = lastY - currentTouchY;

  // aplicăm damping (încetinire)
  currentY += delta * SCROLL_FACTOR;

  // limitări (nu ieșim din pagină)
  currentY = Math.max(0, Math.min(currentY, document.body.scrollHeight - window.innerHeight));

  window.scrollTo(0, currentY);

  lastY = currentTouchY;
}, { passive: false });
