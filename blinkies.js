// =======================
// 🔥 CREATE SECTION
// =======================
const section = document.createElement("section");

section.innerHTML = `
<h2 style="text-align:center; margin-bottom:10px; font-family:inherit;">
  Blinkies
</h2>

<div id="blinkiesContainer"></div>
`;

document.getElementById("socialsSection").insertAdjacentElement("afterend", section);
const container = document.getElementById("blinkiesContainer");

// =======================
// 🔥 GRID STYLE (GLOBAL)
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
  position: relative;
  width: 100px;
  height: 100px;
  overflow: hidden;
  background: #000;
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

/* Overlay text cu litere random */
.blinkie .overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: bold;
  mix-blend-mode: difference;
  text-align: center;
  flex-wrap: wrap;
}

html, body {
  overflow: hidden;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

body {
  scroll-behavior: smooth;
}
`;
document.head.appendChild(style);

// =======================
// 🔥 HELPER: RANDOM COLOR
// =======================
function randomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// =======================
// 🔥 CREATE BLINKIE ELEMENT
// =======================
function createBlinkie(src) {
  const el = document.createElement("div");
  el.className = "blinkie";

  const img = document.createElement("img");
  img.src = src;

  // Overlay text cu litere random
  const overlay = document.createElement("div");
  overlay.className = "overlay";

  const letters = "EMOSCENE123!@#";
  for (let i = 0; i < 5; i++) {
    const span = document.createElement("span");
    span.textContent = letters[Math.floor(Math.random() * letters.length)];
    span.style.color = randomColor();
    overlay.appendChild(span);
  }

  img.onload = () => {
    const aspect = img.naturalWidth / img.naturalHeight;
    if (aspect > 1.4) el.classList.add("wide");
  };
  img.onerror = () => el.remove();

  el.appendChild(img);
  el.appendChild(overlay);
  return el;
}

// =======================
// 🔥 ADD BLINKIES (DOAR EXISTENTE)
// =======================
function addBlinkieIfExists(src) {
  const test = new Image();
  test.src = src;
  test.onload = () => container.appendChild(createBlinkie(src));
}

// =======================
// 🔥 POPULARE
// =======================
for (let i = 1; i <= 250; i++) addBlinkieIfExists(`1 (${i}).gif`);
for (let i = 1; i <= 200; i++) addBlinkieIfExists(`2 (${i}).gif`);

// =======================
// 🔥 FLASH TEXT (RANDOM COLORS)
// =======================
const title = section.querySelector("h2");
const text = title.textContent;
title.textContent = "";

for (let char of text) {
  const span = document.createElement("span");
  span.textContent = char;
  span.style.color = randomColor();
  title.appendChild(span);
}

// =======================
// 🔥 SCROLL LENT AUTOMAT
// =======================
let scrollPos = 0;
function autoScroll() {
  scrollPos += 0.2; // viteza scroll-ului, mai mic = mai lent
  if (scrollPos > document.body.scrollHeight - window.innerHeight) scrollPos = 0;
  window.scrollTo(0, scrollPos);
  requestAnimationFrame(autoScroll);
}
autoScroll();
