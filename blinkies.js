// =======================
// 🔥 CREATE SECTION
// =======================
const section = document.createElement("section");

section.innerHTML = `
<h2 style="color:#ff00ff;text-align:center;">
  Blinkies
</h2>

<div id="blinkiesContainer" style="
  display:grid;
  grid-template-columns: repeat(auto-fit, minmax(30px, 1fr));
  gap:4px;
  justify-items:center;
  align-items:center;
  margin-top:15px;
  margin-bottom:20px;
"></div>
`;

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

  const img = document.createElement("img");
  img.src = src;
  img.style.height = "auto";
  img.style.width = "100%";
  img.style.maxWidth = "60px"; // poate fi ajustat
  img.style.maxHeight = "60px"; // poate fi ajustat
  img.style.objectFit = "contain";
  img.onerror = () => el.remove(); // elimină fișierele inexistente

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
