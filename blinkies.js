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
// 🔥 STYLE EXTREME
// =======================
const style = document.createElement("style");
style.textContent = `

/* ❌ REMOVE BOUNCE COMPLET */
html, body {
  overflow-x: hidden;
  overscroll-behavior: none;
}

#mainContent {
  overscroll-behavior: none;
}

/* WRAPPER */
#blinkiesContainerWrapper {
  position: relative;
  max-height: 400px;
  overflow-y: auto;
  padding: 10px;
  border: 2px solid #ff0000;
  background: rgba(0,0,0,0.6);
}

/* =======================
   🩸 BLOOD EDGES COMPLEX
======================= */

/* TOP */
#blinkiesContainerWrapper::before {
  content: "";
  position: absolute;
  top: -2px;
  left: 0;
  width: 100%;
  height: 30px;
  pointer-events: none;
  z-index: 3;
  background:
    radial-gradient(circle at 10% 0, #ff0000 6px, transparent 7px),
    radial-gradient(circle at 30% 0, #ff0000 5px, transparent 6px),
    radial-gradient(circle at 50% 0, #ff0000 7px, transparent 8px),
    radial-gradient(circle at 70% 0, #ff0000 5px, transparent 6px),
    radial-gradient(circle at 90% 0, #ff0000 6px, transparent 7px);
  animation: dripTop 2.2s infinite linear;
}

/* BOTTOM */
#blinkiesContainerWrapper::after {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 25px;
  pointer-events: none;
  z-index: 3;
  background:
    radial-gradient(circle at 20% 100%, #ff0000 5px, transparent 6px),
    radial-gradient(circle at 60% 100%, #ff0000 6px, transparent 7px),
    radial-gradient(circle at 85% 100%, #ff0000 4px, transparent 5px);
  animation: dripBottom 2.5s infinite linear;
}

/* LEFT SIDE */
#blinkiesContainerWrapper .bloodLeft {
  position: absolute;
  top: 0;
  left: -2px;
  width: 8px;
  height: 100%;
  background: linear-gradient(to bottom, #ff0000, transparent);
  animation: dripSide 3s infinite linear;
  z-index: 3;
  pointer-events: none;
}

/* RIGHT SIDE */
#blinkiesContainerWrapper .bloodRight {
  position: absolute;
  top: 0;
  right: -2px;
  width: 8px;
  height: 100%;
  background: linear-gradient(to bottom, #ff0000, transparent);
  animation: dripSide 4s infinite linear;
  z-index: 3;
  pointer-events: none;
}

/* ANIMATIONS */
@keyframes dripTop {
  0% { transform: translateY(0); opacity: 1; }
  100% { transform: translateY(20px); opacity: 0; }
}

@keyframes dripBottom {
  0% { transform: translateY(0); opacity: 1; }
  100% { transform: translateY(-15px); opacity: 0; }
}

@keyframes dripSide {
  0% { background-position: 0 0; }
  100% { background-position: 0 60px; }
}

/* GRID */
#blinkiesContainer {
  display: grid;
  grid-template-columns: repeat(3, 100px);
  justify-content: center;
  gap: 4px;
  margin: 10px 0 20px;
  position: relative;
  z-index: 1;
}

.blinkie {
  width: 100px;
  height: 100px;
}

.blinkie.wide {
  grid-column: span 3;
  width: 100%;
}

.blinkie img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* =======================
   🩸 BLOOD STAINS (FADE)
======================= */

.bloodStain {
  position: absolute;
  width: 60px;
  height: 60px;
  opacity: 0;
  pointer-events: none;
  z-index: 0;
  filter: blur(0.5px);
  animation: stainFade 6s ease-in-out forwards;
}

@keyframes stainFade {
  0% { opacity: 0; transform: scale(0.7); }
  20% { opacity: 0.25; }
  80% { opacity: 0.2; }
  100% { opacity: 0; transform: scale(1.1); }
}
`;
document.head.appendChild(style);

// add side blood elements
const wrapper = document.getElementById("blinkiesContainerWrapper");
const left = document.createElement("div");
left.className = "bloodLeft";

const right = document.createElement("div");
right.className = "bloodRight";

wrapper.appendChild(left);
wrapper.appendChild(right);

// =======================
// 🔥 BLINKIES
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

function addBlinkieIfExists(src) {
  const test = new Image();
  test.src = src;

  test.onload = () => {
    const el = createBlinkie(src);
    container.appendChild(el);
  };
}

// populate
for (let i = 1; i <= 250; i++) addBlinkieIfExists(`1 (${i}).gif`);
for (let i = 1; i <= 200; i++) addBlinkieIfExists(`2 (${i}).gif`);

// =======================
// 🩸 RANDOM BLOOD STAINS
// =======================
const stains = ["strop.jpg", "stropp.jpg", "stroppp.jpg"];

function spawnStain() {
  const stain = document.createElement("img");
  stain.src = stains[Math.floor(Math.random() * stains.length)];
  stain.className = "bloodStain";

  stain.style.left = Math.random() * 80 + "%";
  stain.style.top = Math.random() * 80 + "%";
  stain.style.width = (40 + Math.random() * 40) + "px";

  wrapper.appendChild(stain);

  setTimeout(() => stain.remove(), 6000);
}

// spawn rar (nu constant)
setInterval(() => {
  if (Math.random() > 0.6) spawnStain();
}, 2000);

// =======================
// 🌈 FLASH TEXT
// =======================
const title = document.getElementById("blinkiesTitle");
const text = title.textContent;
title.textContent = "";

function randomColor() {
  return `rgb(${Math.random()*255},${Math.random()*255},${Math.random()*255})`;
}

const spans = [];
for (let char of text) {
  const span = document.createElement("span");
  span.textContent = char;
  title.appendChild(span);
  spans.push(span);
}

setInterval(() => {
  spans.forEach(s => s.style.color = randomColor());
}, 300);
