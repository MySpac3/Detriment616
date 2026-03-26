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

/* FĂRĂ SCROLL ORIZONTAL SAU VERTICAL */
html, body {
  overflow: hidden;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

/* SCROLL SUPER LENT */
body {
  line-height: 1.6;
}

/* FLASH TEXT */
h2 span {
  transition: color 0.5s;
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

// Folder 1 → 1–250
for (let i = 1; i <= 250; i++) addBlinkieIfExists(`1 (${i}).gif`);

// Folder 2 → 1–200
for (let i = 1; i <= 200; i++) addBlinkieIfExists(`2 (${i}).gif`);

// =======================
// 🔥 FLASH TEXT RANDOM COLOR
// =======================
const title = section.querySelector("h2");
const text = title.textContent;
title.textContent = "";

// transformăm textul în span-uri individuale
for (let char of text) {
  const span = document.createElement("span");
  span.textContent = char;
  title.appendChild(span);
}

// funcție pentru culoare aleatorie
function randomColor() {
  const colors = ["#ff00ff", "#00ffff", "#ffff00", "#ff6600", "#00ff00", "#ff0066"];
  return colors[Math.floor(Math.random() * colors.length)];
}

// schimbăm culoarea aleator pentru fiecare literă la interval
setInterval(() => {
  const spans = title.querySelectorAll("span");
  spans.forEach(span => {
    span.style.color = randomColor();
  });
}, 500);

// =======================
// 🔥 SCROLL SLOW MOTION
// =======================
let scrollY = 0;
function slowScroll() {
  scrollY += 0.2; // viteza scroll-ului (mai mic = mai lent)
  if (scrollY > document.body.scrollHeight - window.innerHeight) scrollY = 0;
  window.scrollTo(0, scrollY);
  requestAnimationFrame(slowScroll);
}
requestAnimationFrame(slowScroll);
