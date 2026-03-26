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
// 🔥 GRID STYLE (CURAT)
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

/* container normal */
.blinkie {
  width: 100px;
  height: 100px;
  overflow: hidden;
}

/* wide → 1 pe rând */
.blinkie.wide {
  grid-column: span 3;
  width: 100%;
  height: 100px;
}

/* imagine */
.blinkie img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* ❗ IMPORTANT: fără scroll orizontal */
html, body {
  overflow-x: hidden;
}

/* scroll natural, fără modificări */
body {
  overscroll-behavior-y: auto;
}
`;
document.head.appendChild(style);

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

    if (aspect > 1.4) {
      el.classList.add("wide"); // stacked dacă e wide
    }
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
    container.appendChild(createBlinkie(src));
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
// 🔥 FLASH TEXT FIX
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
