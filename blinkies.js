// =======================
// 🔥 CREATE SECTION
// =======================
const section = document.createElement("section");

section.innerHTML = `
<h2 style="color:#ff00ff;text-align:center;position:relative;z-index:10;text-align:center;">
  Blinkies
</h2>

<div id="blinkiesContainer" style="
  position:relative;
  width:100%;
  height:100vh;
  overflow:hidden;
  margin-top:15px;
  margin-bottom:20px;
"></div>
`;

const socials = document.getElementById("socialsSection");
socials.insertAdjacentElement("afterend", section);

const container = document.getElementById("blinkiesContainer");

// =======================
// 🔥 CREATE BLINKIE ELEMENT (DIMENSIUNE AUTOMATĂ, RANDOM)
// =======================
function createBlinkie(src) {
  const el = document.createElement("div");
  el.style.position = "absolute";
  el.style.transition = "0.3s";
  
  const img = document.createElement("img");
  img.src = src;
  img.style.display = "block";
  img.style.width = "auto";
  img.style.height = "auto";
  img.style.maxWidth = "200px";  // optional
  img.style.maxHeight = "200px"; // optional
  img.onerror = () => el.remove();

  img.onload = () => {
    // Poziție random în container
    const maxX = container.clientWidth - img.naturalWidth;
    const maxY = container.clientHeight - img.naturalHeight;
    el.style.left = Math.random() * (maxX > 0 ? maxX : 0) + "px";
    el.style.top = Math.random() * (maxY > 0 ? maxY : 0) + "px";

    // Redimensionare aleator pentru efect mosaic
    const scale = 0.3 + Math.random() * 0.7; // 30%-100%
    img.style.width = img.naturalWidth * scale + "px";
    img.style.height = img.naturalHeight * scale + "px";
  };

  el.appendChild(img);
  container.appendChild(el);
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
