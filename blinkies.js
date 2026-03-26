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
  grid-auto-rows: 180px;
"></div>
`;

document.getElementById("socialsSection").insertAdjacentElement("afterend", section);
const container = document.getElementById("blinkiesContainer");

// =======================
// 🔥 CREATE BLINKIE ELEMENT (FIXED, LAZY)
// =======================
function createBlinkie(src) {
  const el = document.createElement("div");
  el.style.display = "flex";
  el.style.alignItems = "center";
  el.style.justifyContent = "center";
  el.style.width = "100%";
  el.style.height = "100%";

  const img = document.createElement("img");
  img.dataset.src = src;
  img.style.maxWidth = "100%";
  img.style.maxHeight = "100%";
  img.style.objectFit = "contain";

  // Dacă GIF-ul nu există, eliminăm containerul
  img.onerror = () => el.remove();

  el.appendChild(img);
  return el;
}

// =======================
// 🔥 FIXED LIST OF GIFS
// =======================
const blinkies = [];
const fileNames = [];

// 1 (1-250).gif
for (let i = 1; i <= 250; i++) {
  fileNames.push(`1 (${i}).gif`);
}

// 2 (1-200).gif
for (let i = 1; i <= 200; i++) {
  fileNames.push(`2 (${i}).gif`);
}

// Poți adăuga alte seturi dacă vrei:
// for (let i = 1; i <= 150; i++) fileNames.push(`3 (${i}).gif`);

// =======================
// 🔥 CREATE CELLS FIXED ORDER
// =======================
fileNames.forEach(name => {
  const el = createBlinkie(name);
  container.appendChild(el);
  blinkies.push(el);
});

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
}, { rootMargin: "5px" }); // încărcare rapidă

blinkies.forEach(el => observer.observe(el.querySelector('img')));

// =======================
// 🔥 FLASHING TEXT MINIM
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
