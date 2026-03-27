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

  // detectăm dacă e wide DUPĂ ce se încarcă
  img.onload = () => {
    const aspect = img.naturalWidth / img.naturalHeight;

    // dacă e wide → ocupă tot rândul
    if (aspect > 1.4) {
      el.classList.add("wide");
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
for (let i = 1; i <= 250; i++) {
  addBlinkieIfExists(`1 (${i}).gif`);
}

// Folder 2 → 1–200
for (let i = 1; i <= 200; i++) {
  addBlinkieIfExists(`2 (${i}).gif`);
}

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
