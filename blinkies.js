// =======================
// 🔥 DISABLE BOUNCE COMPLET
// =======================
document.documentElement.style.overflow = "hidden";
document.body.style.overflow = "hidden";

// wrapper pentru scroll real (fără bounce)
const mainScroll = document.createElement("div");
mainScroll.id = "mainScroll";
document.body.appendChild(mainScroll);

// mută tot conținutul existent în wrapper
while (document.body.firstChild !== mainScroll) {
  mainScroll.appendChild(document.body.firstChild);
}

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
// 🔥 STYLE SUPER COMPLEX
// =======================
const style = document.createElement("style");
style.textContent = `
#mainScroll {
  height: 100vh;
  overflow-y: auto;
  overscroll-behavior: none;
  -webkit-overflow-scrolling: auto;
}

/* container principal */
#blinkiesContainerWrapper {
  position: relative;
  max-height: 400px;
  overflow-y: auto;
  padding: 10px;
  border: 2px solid #ff0000;
  background: rgba(0,0,0,0.5);
}

/* 🔥 sânge TOP */
#blinkiesContainerWrapper::before {
  content: "";
  position: absolute;
  top: -2px;
  left: 0;
  width: 100%;
  height: 35px;
  pointer-events: none;
  z-index: 3;

  background:
    radial-gradient(circle at 10% 0, #ff0000 6px, transparent 7px),
    radial-gradient(circle at 25% 0, #ff0000 5px, transparent 6px),
    radial-gradient(circle at 40% 0, #ff0000 7px, transparent 8px),
    radial-gradient(circle at 60% 0, #ff0000 5px, transparent 6px),
    radial-gradient(circle at 75% 0, #ff0000 6px, transparent 7px),
    radial-gradient(circle at 90% 0, #ff0000 5px, transparent 6px);

  animation: dripTop 2.5s infinite linear;
}

/* 🔥 sânge LEFT */
#blinkiesContainerWrapper::after {
  content: "";
  position: absolute;
  top: 0;
  left: -2px;
  width: 8px;
  height: 100%;
  pointer-events: none;
  z-index: 3;

  background: linear-gradient(to bottom, #ff0000, transparent);
  animation: dripSide 3s infinite linear;
}

/* 🔥 sânge RIGHT (extra layer) */
#blinkiesContainerWrapper .blood-right {
  position: absolute;
  top: 0;
  right: -2px;
  width: 8px;
  height: 100%;
  pointer-events: none;
  z-index: 3;
  background: linear-gradient(to bottom, #ff0000, transparent);
  animation: dripSide 2.5s infinite linear reverse;
}

/* animații */
@keyframes dripTop {
  0% { transform: translateY(0); opacity: 1; }
  70% { transform: translateY(14px); opacity: 0.9; }
  100% { transform: translateY(22px); opacity: 0; }
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

/* 🔥 PETE DE SÂNGE (SUBTILE) */
.blood-stain {
  position: absolute;
  width: 60px;
  opacity: 0;
  pointer-events: none;
  z-index: 2;
  filter: blur(0.5px);
  transition: opacity 1.5s ease;
}

/* fără scroll orizontal */
html, body {
  overflow-x: hidden;
}
`;
document.head.appendChild(style);

// adaugă layer dreapta
const rightBlood = document.createElement("div");
rightBlood.className = "blood-right";
document.getElementById("blinkiesContainerWrapper").appendChild(rightBlood);

// =======================
// 🔥 BLINKIE
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
    container.appendChild(createBlinkie(src));
  };
}

// =======================
// 🔥 POPULARE
// =======================
for (let i = 1; i <= 250; i++) addBlinkieIfExists(`1 (${i}).gif`);
for (let i = 1; i <= 200; i++) addBlinkieIfExists(`2 (${i}).gif`);

// =======================
// 🔥 PETE RANDOM (ADVANCED)
// =======================
const stains = ["strop.jpg", "stropp.jpg", "stroppp.jpg"];

function spawnStain() {
  const stain = document.createElement("img");
  stain.src = stains[Math.floor(Math.random() * stains.length)];
  stain.className = "blood-stain";

  const wrapper = document.getElementById("blinkiesContainerWrapper");

  stain.style.left = Math.random() * 80 + "%";
  stain.style.top = Math.random() * 80 + "%";
  stain.style.transform = `scale(${0.5 + Math.random() * 0.5}) rotate(${Math.random()*360}deg)`;

  wrapper.appendChild(stain);

  // fade in
  setTimeout(() => stain.style.opacity = 0.25, 50);

  // fade out + remove
  setTimeout(() => {
    stain.style.opacity = 0;
    setTimeout(() => stain.remove(), 1500);
  }, 4000);
}

// spawn random, dar rar
setInterval(() => {
  if (Math.random() < 0.4) spawnStain();
}, 2000);

// =======================
// 🔥 FLASH TEXT
// =======================
const title = document.getElementById("blinkiesTitle");
const text = title.textContent;
title.textContent = "";

function randomColor() {
  return \`rgb(\${Math.random()*255},\${Math.random()*255},\${Math.random()*255})\`;
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
