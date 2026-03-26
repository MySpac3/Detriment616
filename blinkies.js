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
  grid-template-columns: repeat(4, 1fr);
  gap:2px;
  justify-items:center;
  align-items:start;
  margin-top:10px;
  margin-bottom:20px;
  grid-auto-rows: 180px; /* fixăm înălțimea celulelor */
"></div>
`;

document.getElementById("socialsSection").insertAdjacentElement("afterend", section);
const container = document.getElementById("blinkiesContainer");

// =======================
// 🔥 CREATE BLINKIE ELEMENT (FIXED POSITION, LAZY)
// =======================
function createBlinkie(src) {
  const el = document.createElement("div");
  el.style.display = "flex";
  el.style.alignItems = "center";
  el.style.justifyContent = "center";
  el.style.width = "100%";
  el.style.height = "100%"; // forțăm să ocupe întreaga celulă

  const img = document.createElement("img");
  img.dataset.src = src;
  img.style.maxWidth = "100%";
  img.style.maxHeight = "100%";
  img.style.objectFit = "contain";
  img.onerror = () => el.remove();

  el.appendChild(img);
  return el;
}

// =======================
// 🔥 GENERATE FILE NAMES + SHUFFLE
// =======================
const blinkies = [];
const fileNames = [];

// 6 seturi x 1000 GIF-uri
for (let base = 1; base <= 6; base++) {
  for (let i = 1; i <= 1000; i++) {
    fileNames.push(`${base} (${i}).gif`);
  }
}

// Shuffle array-ul complet, astfel încât ordinea să nu fie de la 1 la 1000
for (let i = fileNames.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [fileNames[i], fileNames[j]] = [fileNames[j], fileNames[i]];
}

// =======================
// 🔥 FIXED CELLS (NUMĂR FIX DE CELULE)
// =======================
const totalCells = 24; // câte celule dorim să afișăm
for (let i = 0; i < totalCells; i++) {
  const el = createBlinkie(fileNames[i]); // folosim GIF-urile amestecate în ordine fixă
  container.appendChild(el);
  blinkies.push(el);
}

// =======================
// 🔥 LAZY LOADING OBSERVER
// =======================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      if (img.dataset.src) {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      }
      observer.unobserve(img);
    }
  });
}, { rootMargin: "10px" }); // scroll mai puțin sensibil

blinkies.forEach(el => observer.observe(el.querySelector('img')));

// =======================
// 🔥 FLASHING TEXT (MINIM)
// =======================
const title = section.querySelector("h2");
const text = title.textContent;
title.textContent = "";

for (let char of text) {
  const span = document.createElement("span");
  span.textContent = char;
  title.appendChild(span);
}

function flashText() {
  title.querySelectorAll('span').forEach(span => {
    if (Math.random() < 0.3)
      span.style.color = `rgb(${Math.random()*255|0},${Math.random()*255|0},${Math.random()*255|0})`;
  });
  requestAnimationFrame(flashText);
}
flashText();

// =======================
// 🔥 MEDIA QUERY MOBILE
// =======================
const style = document.createElement("style");
style.textContent = `
@media (max-width: 600px) {
  #blinkiesContainer {
    grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
    gap: 1px;
  }
}
`;
document.head.appendChild(style);
