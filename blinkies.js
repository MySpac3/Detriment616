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
  img.src = src; // direct load
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

// =======================
// 🔥 PRELOAD ALL GIFS
// =======================
let loadedCount = 0;

function preloadGIFs(names) {
  return new Promise((resolve) => {
    names.forEach(name => {
      const img = new Image();
      img.src = name;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === names.length) {
          resolve();
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === names.length) {
          resolve();
        }
      };
    });
  });
}

// =======================
// 🔥 START SITE AFTER PRELOAD
// =======================
preloadGIFs(fileNames).then(() => {
  // După ce toate GIF-urile s-au preîncărcat, le adăugăm în container
  fileNames.forEach(name => {
    const el = createBlinkie(name);
    container.appendChild(el);
    blinkies.push(el);
  });

  // Start slow auto scroll
  startSlowScroll();
});

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
// 🔥 SLOW AUTO SCROLL
// =======================
function startSlowScroll() {
  let scrollY = 0;
  const speed = 0.2; // px per frame
  function scrollStep() {
    scrollY += speed;
    window.scrollTo(0, scrollY);
    if (scrollY < document.body.scrollHeight - window.innerHeight) {
      requestAnimationFrame(scrollStep);
    }
  }
  requestAnimationFrame(scrollStep);
}

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
