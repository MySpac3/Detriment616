// =======================
// 🔥 CREATE SECTION
// =======================
const section = document.createElement("section");

section.innerHTML = `
<h2 id="blinkiesTitle" style="text-align:center; margin-bottom:10px; font-family:inherit;">
  Blinkies
</h2>

<div id="blinkiesContainerWrapper" style="
  max-height: 400px; /* poți ajusta în funcție de nevoie */
  overflow-y: auto;
  border: 2px solid red; /* highlight roșu */
  padding: 5px;
">
  <div id="blinkiesContainer"></div>
</div>
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

/* container normal */
.blinkie {
  width: 100px;
  height: 100px;
  overflow: hidden;
}

/* container wide → ocupă tot rândul */
.blinkie.wide {
  grid-column: span 3;
  width: 100%;
  height: 100px;
}

/* img */
.blinkie img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* FĂRĂ SCROLL ORIZONTAL */
html, body {
  overflow-x: hidden;
}

/* SCROLL SUPER SMOOTH */
body {
  scroll-behavior: smooth;
  overscroll-behavior-y: contain;
}

/* încetinește feeling-ul de scroll */
body {
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
for (let i = 1; i <= 250; i++) addBlinkieIfExists(`1 (${i}).gif`);
for (let i = 1; i <= 200; i++) addBlinkieIfExists(`2 (${i}).gif`);

// =======================
// 🔥 FLASH TEXT RANDOM COLOR
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

// schimbăm culorile random la fiecare 300ms
setInterval(() => {
  spans.forEach(span => span.style.color = randomColor());
}, 300);
