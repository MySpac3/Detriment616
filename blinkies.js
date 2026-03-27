// =======================
// 🔥 CREATE SECTION
// =======================
const section = document.createElement("section");

section.innerHTML = `
<h2 id="blinkiesTitle" style="text-align:center; margin-bottom:2px; font-family:inherit;">
  Blinkies
</h2>

<div id="scrollText" style="text-align:center; font-size:12px; opacity:0.7; margin-bottom:8px; color:#fff;">
  (scroll inside the red box for blinkies)
</div>

<div id="blinkiesContainerWrapper">
  <div id="blinkiesContainer"></div>
</div>
`;

document.getElementById("socialsSection").insertAdjacentElement("afterend", section);
const container = document.getElementById("blinkiesContainer");

// =======================
// 🔥 STYLE
// =======================
const style = document.createElement("style");
style.textContent = `
html, body {
  overflow-x: hidden;
  overscroll-behavior: none;
  position: relative;
}

#blinkiesContainerWrapper {
  position: relative;
  max-height: 400px;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 10px;
  border: 2px solid #ff0000;
  background: rgba(0,0,0,0.6);
  touch-action: pan-y;
}

#blinkiesContainerWrapper::before {
  content: "";
  position: absolute;
  top: -2px;
  width: 100%;
  height: 30px;
  z-index: 3;
  background:
    radial-gradient(circle at 10% 0, #ff0000 6px, transparent 7px),
    radial-gradient(circle at 50% 0, #ff0000 7px, transparent 8px),
    radial-gradient(circle at 90% 0, #ff0000 6px, transparent 7px);
  animation: dripTop 2s infinite linear;
}

#blinkiesContainerWrapper::after {
  content: "";
  position: absolute;
  bottom: -2px;
  width: 100%;
  height: 25px;
  z-index: 3;
  background:
    radial-gradient(circle at 30% 100%, #ff0000 5px, transparent 6px),
    radial-gradient(circle at 70% 100%, #ff0000 6px, transparent 7px);
  animation: dripBottom 2.5s infinite linear;
}

.bloodLeft, .bloodRight {
  position: absolute;
  top: 0;
  width: 8px;
  height: 100%;
  z-index: 3;
  background: linear-gradient(to bottom, #ff0000, transparent);
}

.bloodLeft { left: -2px; animation: dripSide 3s infinite linear; }
.bloodRight { right: -2px; animation: dripSide 4s infinite linear; }

@keyframes dripTop {
  100% { transform: translateY(20px); opacity: 0; }
}
@keyframes dripBottom {
  100% { transform: translateY(-15px); opacity: 0; }
}
@keyframes dripSide {
  100% { background-position: 0 60px; }
}

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

.bloodStain {
  position: absolute;
  pointer-events: none;
  z-index: 9999;
  filter: contrast(1.2) saturate(1.2);
  opacity: 0;
  transition: opacity 2s ease-in-out;
}
`;
document.head.appendChild(style);

// =======================
// 🩸 SIDE BLOOD (container roșu)
// =======================
const wrapper = document.getElementById("blinkiesContainerWrapper");
const left = document.createElement("div");
left.className = "bloodLeft";
const right = document.createElement("div");
right.className = "bloodRight";
wrapper.appendChild(left);
wrapper.appendChild(right);

// =======================
// 🔥 BLINKIE FUNC
// =======================
function createBlinkie(src) {
  const el = document.createElement("div");
  el.className = "blinkie";

  const img = document.createElement("img");
  img.src = src;

  img.onload = () => {
    if (img.naturalWidth / img.naturalHeight > 1.4) {
      el.classList.add("wide");
    }
  };

  img.onerror = () => el.remove();
  el.appendChild(img);
  return el;
}

function addBlinkieIfExists(src) {
  const test = new Image();
  test.src = src;
  test.onload = () => container.appendChild(createBlinkie(src));
}

// =======================
// 🔥 4 FOR-URI (example)
// =======================
for (let i = 1; i <= 300; i++) addBlinkieIfExists(`1 (${i}).gif`);
for (let i = 1; i <= 300; i++) addBlinkieIfExists(`2 (${i}).gif`);
for (let i = 1; i <= 300; i++) addBlinkieIfExists(`3 (${i}).gif`);
for (let i = 1; i <= 300; i++) addBlinkieIfExists(`4 (${i}).gif`);

// =======================
// 🩸 BLOOD STAIN EXACT
// =======================
const stains = ["strop.jpg", "stropp.jpg", "stroppp.jpg"];

function createStain(x, y, parent=document.body) {
  const s = document.createElement("img");
  s.src = stains[Math.floor(Math.random() * stains.length)];
  s.className = "bloodStain";

  // dacă e în container, coordonatele relative la container
  if (parent !== document.body) {
    const rect = parent.getBoundingClientRect();
    s.style.left = (x - rect.left) + "px";
    s.style.top = (y - rect.top) + "px";
    parent.appendChild(s);
  } else {
    s.style.left = x + "px";
    s.style.top = y + "px";
    document.body.appendChild(s);
  }

  s.style.width = (60 + Math.random() * 80) + "px";
  s.style.opacity = 1;

  setTimeout(() => s.style.opacity = 0, 50);
  setTimeout(() => s.remove(), 2000);
}

// CLICK DESKTOP
document.addEventListener("click", (e) => {
  if (wrapper.contains(e.target)) {
    createStain(e.clientX, e.clientY, wrapper);
  } else {
    createStain(e.clientX, e.clientY);
  }
});

// TAP MOBILE
document.addEventListener("touchstart", (e) => {
  const touch = e.touches[0];
  if (wrapper.contains(touch.target)) {
    createStain(touch.clientX, touch.clientY, wrapper);
  } else {
    createStain(touch.clientX, touch.clientY);
  }
});

// =======================
// 🌈 FLASH TEXT
// =======================
function flash(el, fixedColor=false) {
  const t = el.textContent;
  el.textContent = "";
  const spans = [];
  for (let c of t) {
    const s = document.createElement("span");
    s.textContent = c;
    if (fixedColor) s.style.color = "#fff";
    el.appendChild(s);
    spans.push(s);
  }
  if (!fixedColor) {
    setInterval(() => {
      spans.forEach(s => {
        s.style.color = `rgb(${Math.random()*255},${Math.random()*255},${Math.random()*255})`;
      });
    }, 300);
  }
}

flash(document.getElementById("blinkiesTitle"));
flash(document.getElementById("scrollText"), true);
