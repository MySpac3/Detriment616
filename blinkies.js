// =======================
// 🔥 CREATE SECTION
// =======================
const section = document.createElement("section");

section.innerHTML = `
<h2 style="color:#ff00ff;text-align:center;">
  Blinkies
</h2>

<div id="blinkiesContainer" style="
  width:100%;
  display:flex;
  flex-wrap:wrap;
  align-items:flex-start;
  margin-top:10px;
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
  const el = document.createElement("img");
  el.src = src;
  el.style.width = `${30 + Math.random()*40}px`; // lățime variabilă 30-70px
  el.style.height = "auto"; // păstrează proporția GIF-ului
  el.style.margin = "2px";
  el.style.borderRadius = "4px";
  el.style.transition = "0.2s";
  el.style.cursor = "pointer";
  el.style.display = "block";
  el.onerror = () => el.remove();
  return el;
}

// =======================
// 🔥 MASONRY / PUZZLE LAYOUT
// =======================
function layoutMasonry() {
  const columns = Math.floor(container.clientWidth / 50); // aproximativ 50px pe coloană
  const colHeights = Array(columns).fill(0);

  blinkies.forEach(img => {
    const col = colHeights.indexOf(Math.min(...colHeights)); // coloana cea mai scurtă
    img.style.order = col; // folosit de flex-wrap pentru ordine
    colHeights[col] += img.height + 4; // adaugăm margin
  });

  // Ajustăm înălțimea containerului
  container.style.height = Math.max(...colHeights) + "px";
}

// =======================
// 🔥 GENERATE BLINKIES 1-6 NUMEROTATE
// =======================
const blinkies = [];

for (let base = 1; base <= 6; base++) {
  for (let i = 1; i <= 200; i++) {
    const name = `${base} (${i}).gif`;
    const el = createBlinkie(name);
    container.appendChild(el);
    blinkies.push(el);

    // Re-layout când imaginea se încarcă
    el.onload = layoutMasonry;
  }
}

// Re-layout la resize
window.addEventListener("resize", () => {
  layoutMasonry();
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
