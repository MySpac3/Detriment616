// =======================
// 🔥 CREATE SECTION
// =======================
const section = document.createElement("section");

section.innerHTML = `
<h2 style="color:#ff00ff;text-align:center; margin-bottom:10px; font-family:inherit;">
  Blinkies
</h2>

<div id="blinkiesContainer" style="
  display:grid;
  grid-template-columns: repeat(10, 100px);
  gap:2px;
  justify-content:center;
  margin-top:10px;
  margin-bottom:20px;
"></div>
`;

document.getElementById("socialsSection").insertAdjacentElement("afterend", section);
const container = document.getElementById("blinkiesContainer");

// =======================
// 🔥 CREATE BLINKIE ELEMENT
// =======================
function createBlinkie(src, wide=false) {
  const el = document.createElement("div");
  el.style.width = wide ? "210px" : "100px"; // dacă e GIF lat, fă container mai mare
  el.style.height = "100px";
  el.style.overflow = "hidden";

  const img = document.createElement("img");
  img.src = src;
  img.style.width = "100%";
  img.style.height = "100%";
  img.style.objectFit = "contain";

  el.appendChild(img);
  return el;
}

// =======================
// 🔥 ADD BLINKIES TO DOM (DOAR EXISTENTE)
// =======================
function addBlinkieIfExists(src, wide=false) {
  const testImg = new Image();
  testImg.src = src;

  testImg.onload = () => {
    const el = createBlinkie(src, wide);
    container.appendChild(el);
  };
  testImg.onerror = () => {}; // nu facem nimic dacă nu există
}

// =======================
// 🔥 POPULARE CONTAINERE
// =======================

let totalAdded = 0;

// Folder 1 → 1–250
for (let i = 1; i <= 250 && totalAdded < 450; i++) {
  // Pentru unele GIF-uri “paratoase” le facem wide la întâmplare
  const isWide = Math.random() < 0.15; // 15% șansă să fie wide
  addBlinkieIfExists(`1 (${i}).gif`, isWide);
  totalAdded++;
}

// Folder 2 → 1–200
for (let i = 1; i <= 200 && totalAdded < 450; i++) {
  const isWide = Math.random() < 0.15;
  addBlinkieIfExists(`2 (${i}).gif`, isWide);
  totalAdded++;
}

// =======================
// 🔥 FLASHING TEXT FIX
// =======================
const title = section.querySelector("h2");
const text = title.textContent;
title.textContent = "";

for (let char of text) {
  const span = document.createElement("span");
  span.textContent = char;
  span.style.color = "#ff00ff"; // fix, fără random
  title.appendChild(span);
}

// =======================
// 🔥 MEDIA QUERY MOBILE
// =======================
const style = document.createElement("style");
style.textContent = `
/* Grid mobil: max 3 blinkies pe rând */
@media (max-width: 600px) {
  #blinkiesContainer {
    grid-template-columns: repeat(3, 1fr);
    gap: 1px;
  }
}

/* Scroll foarte sensibil / lin */
body {
  overscroll-behavior: contain; /* previne scroll “haotic” */
  scroll-behavior: smooth;
}
`;
document.head.appendChild(style);

// =======================
// 🔥 SCROLL NORMAL, FOARTE LENT
// =======================
// Dacă vrei, utilizatorul poate să dea scroll manual, fără auto scroll
// Scroll-ul este lin datorită scroll-behavior: smooth
