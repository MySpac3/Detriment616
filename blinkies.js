// =======================
// 🔥 CREATE SECTION
// =======================
const section = document.createElement("section");

section.innerHTML = `
<h2 style="color:#ff00ff;text-align:center;z-index:10;position:relative;">
  Blinkies
</h2>

<div id="blinkiesContainer" style="
  display:flex;
  flex-wrap:wrap;
  gap:4px; /* mic gap între GIF-uri */
  justify-content:center;
  align-items:flex-start;
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
  el.style.flex = "0 1 auto"; // permite ajustarea lățimii
  el.style.display = "flex";
  el.style.alignItems = "center";
  el.style.justifyContent = "center";
  el.style.borderRadius = "4px";
  el.style.overflow = "hidden";
  el.style.transition = "0.1s";

  const img = document.createElement("img");
  img.src = src;
  img.style.display = "block";
  img.style.width = "100%";  // lățimea se va adapta rândului
  img.style.height = "auto";
  img.onerror = () => el.remove();

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
// 🔥 PUZZLE FIT: ajustare dimensiuni pe rând
// =======================
function arrangePuzzle() {
  const containerWidth = container.clientWidth;
  let row = [];
  let rowWidth = 0;
  const gap = 4; // gap în px

  blinkies.forEach((el, index) => {
    // dimensiune inițială maximă
    const maxWidth = 150;
    el.style.width = maxWidth + "px";

    row.push(el);
    rowWidth += maxWidth + gap;

    // Dacă depășim containerul sau avem între 5 și 12 GIF-uri, ajustăm dimensiunea
    if (rowWidth > containerWidth || row.length >= 12) {
      // Ajustăm lățimea GIF-urilor ca să umple rândul exact
      const totalGap = gap * (row.length - 1);
      const newWidth = (containerWidth - totalGap) / row.length;

      row.forEach(imgEl => {
        imgEl.style.width = newWidth + "px";
      });

      // Resetăm rândul
      row = [];
      rowWidth = 0;
    }
  });
}

// Rearanjăm după ce toate GIF-urile s-au încărcat
window.addEventListener("load", () => {
  arrangePuzzle();
  window.addEventListener("resize", arrangePuzzle);
});

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
