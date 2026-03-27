// =======================
// 🔥 CREATE SECTION
// =======================
const section = document.createElement("section");

section.innerHTML = `
<h2 id="blinkiesTitle" style="text-align:center; margin-bottom:2px; font-family:inherit;">
  Blinkies
</h2>

<div style="text-align:center; font-size:12px; opacity:0.6; margin-bottom:8px;">
  (scroll inside the red box for blinkies)
</div>

<div id="blinkiesContainerWrapper">
  <div id="bloodOverlay"></div>
  <div id="blinkiesContainer"></div>
</div>
`;

document.getElementById("socialsSection").insertAdjacentElement("afterend", section);
const container = document.getElementById("blinkiesContainer");
const bloodOverlay = document.getElementById("bloodOverlay");

// =======================
// 🔥 STYLE
// =======================
const style = document.createElement("style");
style.textContent = `
html, body {
  overflow-x: hidden;
  overscroll-behavior: none; /* 🔥 NO BOUNCE */
  height: 100%;
}

/* wrapper */
#blinkiesContainerWrapper {
  position: relative;
  max-height: 400px;
  overflow-y: auto;
  padding: 10px;
  border: 2px solid #ff0000;
  background: rgba(0,0,0,0.6);
  overscroll-behavior: contain;
}

/* overlay pete */
#bloodOverlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 2;
}

/* 🔥 DRIP TOP */
#blinkiesContainerWrapper::before {
  content: "";
  position: absolute;
  top: -2px;
  left: 0;
  width: 100%;
  height: 30px;
  z-index: 3;
  pointer-events: none;
  background:
    radial-gradient(circle at 10% 0, #ff0000 6px, transparent 7px),
    radial-gradient(circle at 30% 0, #ff0000 5px, transparent 6px),
    radial-gradient(circle at 50% 0, #ff0000 7px, transparent 8px),
    radial-gradient(circle at 70% 0, #ff0000 5px, transparent 6px),
    radial-gradient(circle at 90% 0, #ff0000 6px, transparent 7px);
  animation: dripTop 2.2s infinite linear;
}

/* 🔥 DRIP LEFT */
#blinkiesContainerWrapper::after {
  content: "";
  position: absolute;
  top: 0;
  left: -2px;
  width: 8px;
  height: 100%;
  z-index: 3;
  pointer-events: none;
  background: linear-gradient(to bottom, rgba(255,0,0,0.8), transparent);
  animation: dripSide 3s infinite linear;
}

/* 🔥 RIGHT SIDE BLOOD */
#blinkiesContainerWrapper .rightBlood {
  position: absolute;
  top: 0;
  right: -2px;
  width: 8px;
  height: 100%;
  background: linear-gradient(to bottom, rgba(255,0,0,0.8), transparent);
  animation: dripSide 2.5s infinite linear;
  pointer-events: none;
  z-index: 3;
}

/* animații */
@keyframes dripTop {
  0% { transform: translateY(0); opacity: 1; }
  70% { transform: translateY(12px); opacity: 0.9; }
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

/* body */
body {
  scroll-behavior: auto; /* 🔥 elimină bounce feel */
  line-height: 1.6;
}
`;
document.head.appendChild(style);

// 🔥 adăugăm și partea dreaptă blood
const rightBlood = document.createElement("div");
rightBlood.className = "rightBlood";
document.getElementById("blinkiesContainerWrapper").appendChild(rightBlood);

// =======================
// 🔥 BLOOD STAINS RANDOM
// =======================
const bloodImages = ["strop.jpg", "stropp.jpg", "stroppp.jpg"];

function spawnBlood() {
  if (Math.random() > 0.3) return; // 🔥 rar

  const img = document.createElement("img");
  img.src = bloodImages[Math.floor(Math.random() * bloodImages.length)];

  img.style.position = "absolute";
  img.style.width = Math.random() * 60 + 30 + "px"; // mici
  img.style.opacity = "0";
  img.style.pointerEvents = "none";

  const x = Math.random() * 90;
  const y = Math.random() * 90;

  img.style.left = x + "%";
  img.style.top = y + "%";
  img.style.transform = "translate(-50%, -50%)";

  img.style.transition = "opacity 1.5s ease";

  bloodOverlay.appendChild(img);

  // fade in
  setTimeout(() => {
    img.style.opacity = "0.25";
  }, 50);

  // fade out + remove
  setTimeout(() => {
    img.style.opacity = "0";
  }, 4000);

  setTimeout(() => {
    img.remove();
  }, 5500);
}

// spawn loop
setInterval(spawnBlood, 1200);

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
