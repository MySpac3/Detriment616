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
// 🔥 GRID STYLE (GLOBAL)
// =======================
const style = document.createElement("style");
style.textContent = `
#blinkiesContainer {
  display: grid;
  grid-template-columns: repeat(3, 100px); /* MAX 3 pe rând */
  justify-content: center;
  gap: 4px;
  margin: 10px 0 20px;
}

.blinkie {
  position: relative; /* pentru litere random */
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

/* litere random */
.blinkie span {
  position: absolute;
  font-size: 14px;
  font-weight: bold;
  pointer-events: none;
  user-select: none;
}

/* FĂRĂ SCROLL ORIZONTAL SAU VERTICAL */
html, body {
  overflow: hidden;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

/* SCROLL SUPER LENT – 3X mai lent pe mobil */
body {
  scroll-behavior: smooth;
  overscroll-behavior: contain;
  scroll-snap-type: y mandatory;
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

    // ADĂUGARE LITERE RANDOM COLORATE
    for (let i = 0; i < 5; i++) { // 5 litere per blinkie
      const span = document.createElement("span");
      span.textContent = String.fromCharCode(65 + Math.floor(Math.random() * 26)); // A-Z
      span.style.color = `hsl(${Math.random() * 360}, 80%, 60%)`;
      span.style.top = `${Math.random() * 80}%`;
      span.style.left = `${Math.random() * 80}%`;
      el.appendChild(span);
    }
  };

  img.onerror = () => el.remove();
  el.appendChild(img);
  return el;
}

// =======================
// 🔥 ADD BLINKIES (DOAR EXISTENTE)
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

// Folder 1 → 1–250
for (let i = 1; i <= 250; i++) addBlinkieIfExists(`1 (${i}).gif`);

// Folder 2 → 1–200
for (let i = 1; i <= 200; i++) addBlinkieIfExists(`2 (${i}).gif`);

// =======================
// 🔥 FLASH TEXT (FIX)
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
// 🔥 SCROLL AJUSTAT PE MOBIL
// =======================
let isScrolling;
window.addEventListener('wheel', (e) => {
  e.preventDefault();
  window.scrollBy(0, e.deltaY / 3); // 3x mai lent
}, { passive: false });

window.addEventListener('touchmove', (e) => {
  e.preventDefault();
}, { passive: false });
