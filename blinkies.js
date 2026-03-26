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
  grid-template-columns: repeat(4, 1fr); /* desktop */
  gap:2px; /* minim spațiu intre GIF-uri */
  justify-items:center;
  align-items:start;
  margin-top:10px;
  margin-bottom:20px;
  overflow-y:auto;
  max-height:80vh; /* scroll vertical */
  grid-auto-rows: min-content; /* fiecare GIF isi ia inaltimea proprie */
"></div>
`;

// Inseram sectiunea dupa socials
const socials = document.getElementById("socialsSection");
socials.insertAdjacentElement("afterend", section);

const container = document.getElementById("blinkiesContainer");

// =======================
// 🔥 CREATE BLINKIE ELEMENT
// =======================
function createBlinkie(src) {
  const el = document.createElement("div");
  el.style.display = "flex";
  el.style.alignItems = "center";
  el.style.justifyContent = "center";
  el.style.transition = "0.1s";
  el.style.width = "100%";

  const img = document.createElement("img");
  img.src = src;
  img.style.width = "100%"; 
  img.style.height = "auto";
  img.style.objectFit = "contain";
  img.style.maxWidth = "180px"; 
  img.style.maxHeight = "180px"; 
  img.onerror = () => el.remove();

  img.onload = () => {
    const aspect = img.naturalWidth / img.naturalHeight;
    if (aspect > 1.5) { // foarte orizontal
      el.style.gridColumn = "span 4"; // ocupă tot rândul
    } else if (aspect > 1.2) { // orizontal
      el.style.gridColumn = "span 2"; // ocupă 2 coloane
    } else { // vertical sau pătrat
      el.style.gridColumn = "span 1";
    }
  };

  el.appendChild(img);
  return el;
}

// =======================
// 🔥 GENERATE BLINKIES 1-6 NUMEROTATE
// =======================
const blinkies = [];

for (let base = 1; base <= 6; base++) {
  for (let i = 1; i <= 1000; i++) {
    const name = `${base} (${i}).gif`;
    const el = createBlinkie(name);
    container.appendChild(el);
    blinkies.push(el);
  }
}

// =======================
// 🔥 FLASH EFFECT FOR BLINKIES
// =======================
function flashBlinkies() {
  blinkies.forEach(el => {
    if (Math.random() < 0.05) {
      el.style.opacity = "0.2";
      setTimeout(() => { el.style.opacity = "1"; }, 100 + Math.random() * 200);
    }
  });
  requestAnimationFrame(flashBlinkies);
}

flashBlinkies();

// =======================
// 🔥 MULTICOLOR FLASHING TEXT "Blinkies"
// =======================
const title = section.querySelector("h2");
const text = title.textContent;
title.textContent = "";
const lettersArray = [];

for (let char of text) {
  const span = document.createElement("span");
  span.textContent = char;
  title.appendChild(span);
  lettersArray.push(span);
}

function randomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r},${g},${b})`;
}

function flashText() {
  lettersArray.forEach(span => {
    if (Math.random() < 0.3) {
      span.style.color = randomColor();
      span.style.opacity = Math.random() < 0.5 ? "0.2" : "1";
    }
  });
  requestAnimationFrame(flashText);
}

flashText();

// =======================
// 🔥 MEDIA QUERY PENTRU TELEFON
// =======================
const style = document.createElement("style");
style.textContent = `
@media (max-width: 600px) {
  #blinkiesContainer {
    grid-template-columns: repeat(2, 1fr); /* 2 GIF-uri pe rând pe telefon */
    gap: 1px; /* spatiu minim */
  }
}
`;
document.head.appendChild(style);
