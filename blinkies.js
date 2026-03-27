// =======================
// 🔥 CREATE SECTION
// =======================
const section = document.createElement("section");

section.innerHTML = `
<h2 id="blinkiesTitle" style="text-align:center; margin-bottom:2px; font-family:inherit;">
  Blinkies
</h2>

<div style="text-align:center; font-size:12px; opacity:0.7; margin-bottom:8px;">
  (scroll inside the red box for blinkies)
</div>

<div id="blinkiesContainerWrapper">
  <div id="blinkiesContainer"></div>
</div>
`;

document.getElementById("socialsSection").insertAdjacentElement("afterend", section);
const container = document.getElementById("blinkiesContainer");

// =======================
// 🔥 GRID + EFFECT STYLE
// =======================
const style = document.createElement("style");
style.textContent = `
#blinkiesContainerWrapper {
  position: relative;
  max-height: 400px;
  overflow-y: auto;
  padding: 10px;
  border: 2px solid #ff0000;
  background: rgba(0,0,0,0.5);
}

/* 🔥 sânge de sus */
#blinkiesContainerWrapper::before {
  content: "";
  position: absolute;
  top: -2px;
  left: 0;
  width: 100%;
  height: 25px;
  pointer-events: none;
  z-index: 2;
  background:
    radial-gradient(circle at 10% 0, #ff0000 6px, transparent 7px),
    radial-gradient(circle at 25% 0, #ff0000 5px, transparent 6px),
    radial-gradient(circle at 40% 0, #ff0000 7px, transparent 8px),
    radial-gradient(circle at 60% 0, #ff0000 5px, transparent 6px),
    radial-gradient(circle at 75% 0, #ff0000 6px, transparent 7px),
    radial-gradient(circle at 90% 0, #ff0000 5px, transparent 6px);
  animation: dripTop 2s infinite linear;
}

/* 🔥 sânge pe laterale */
#blinkiesContainerWrapper::after {
  content: "";
  position: absolute;
  top: 0;
  left: -2px;
  width: 6px;
  height: 100%;
  pointer-events: none;
  z-index: 2;
  background: linear-gradient(to bottom, #ff0000, transparent);
  animation: dripSide 3s infinite linear;
}

/* animații */
@keyframes dripTop {
  0% { transform: translateY(0); opacity: 1; }
  70% { transform: translateY(12px); opacity: 0.9; }
  100% { transform: translateY(20px); opacity: 0; }
}

@keyframes dripSide {
  0% { background-position: 0 0; }
  100% { background-position: 0 40px; }
}

/* GRID */
#blinkiesContainer {
  display: grid;
  grid-template-columns: repeat(3, 100px);
  justify-content: center;
  gap: 4px;
  margin: 10px 0 20px;
  position: relative;
  z-index: 1; /* IMPORTANT: blinkies sub sânge */
}

/* blinkie */
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

/* fără scroll orizontal */
html, body {
  overflow-x: hidden;
}

/* smooth scroll */
body {
  scroll-behavior: smooth;
  overscroll-behavior-y: contain;
  line-height: 1.6;
}
`;
document.head.appendChild(style);

// =======================
// 🔥 CREATE BLINKIE ELEMENT
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
    const el = createBlinkie(src);
    container.appendChild(el);
  };
}

// =======================
// 🔥 POPULARE
// =======================
for (let i = 1; i <= 250; i++) addBlinkieIfExists(`1 (${i}).gif`);
for (let i = 1; i <= 200; i++) addBlinkieIfExists(`2 (${i}).gif`);

// =======================
// 🔥 FLASH TEXT
// =======================
const title = document.getElementById("blinkiesTitle");
const text = title.textContent;
title.textContent = "";

function randomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r},${g},${b})`;
}

const spans = [];
for (let char of text) {
  const span = document.createElement("span");
  span.textContent = char;
  span.style.transition = "color 0.3s";
  title.appendChild(span);
  spans.push(span);
}

setInterval(() => {
  spans.forEach(span => span.style.color = randomColor());
}, 300);
