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
  grid-template-columns: repeat(10, 100px); /* 10 coloane fixe */
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
function createBlinkie(src) {
  const el = document.createElement("div");
  el.style.width = "100px";
  el.style.height = "100px";
  el.style.overflow = "hidden";

  const img = document.createElement("img");
  img.dataset.src = src;
  img.style.width = "100%";
  img.style.height = "100%";
  img.style.objectFit = "contain";
  img.onerror = () => el.remove();

  el.appendChild(img);
  return el;
}

// =======================
// 🔥 GENERATE FILE NAMES (FIX ORDER, FĂRĂ RANDOM)
// =======================
const blinkies = [];
const fileNames = [];

for (let base = 1; base <= 6; base++) {
  for (let i = 1; i <= 1000; i++) {
    fileNames.push(`${base} (${i}).gif`);
  }
}

// Add blinkies in order
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
}, { rootMargin: "5px" });

blinkies.forEach(el => observer.observe(el.querySelector('img')));

// =======================
// 🔥 FLASHING TEXT
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
    if (Math.random() < 0.3) span.style.color = `rgb(${Math.random()*255|0},${Math.random()*255|0},${Math.random()*255|0})`;
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
    grid-template-columns: repeat(5, 80px);
    gap: 1px;
  }
}
`;
document.head.appendChild(style);  
