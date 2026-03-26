// =======================
// 🔥 CREATE SECTION
// =======================
const section = document.createElement("section");

section.innerHTML = `
<h2 style="color:#ff00ff;text-align:center;">
  Blinkies
</h2>

<div id="blinkiesContainer" style="
  display:flex;
  flex-wrap:wrap;
  gap:8px;
  justify-content:center;
  align-items:center;
  margin-top:15px;
  margin-bottom:20px;
"></div>
`;

const socials = document.getElementById("socialsSection");
socials.insertAdjacentElement("afterend", section);

const container = document.getElementById("blinkiesContainer");

// =======================
// 🔥 CREATE BLINKIE ELEMENT (DIMENSIUNE AUTOMATĂ)
// =======================
function createBlinkie(src) {
  const el = document.createElement("div");
  el.style.margin = "2px";
  el.style.display = "flex";
  el.style.alignItems = "center";
  el.style.justifyContent = "center";
  el.style.borderRadius = "4px";
  el.style.transition = "0.1s";
  el.style.overflow = "hidden";

  const img = document.createElement("img");
  img.src = src;
  img.style.display = "block";      // elimină spațiile albe
  img.style.height = "auto";        // păstrează proporțiile originale
  img.style.width = "auto";         // păstrează proporțiile originale
  img.style.maxWidth = "200px";     // opțional, să nu fie uriașe
  img.style.maxHeight = "200px";    // opțional

  img.onerror = () => el.remove();

  // Ajustăm containerul după dimensiunea reală a GIF-ului
  img.onload = () => {
    el.style.width = img.naturalWidth + "px";
    el.style.height = img.naturalHeight + "px";
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
