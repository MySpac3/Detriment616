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
  margin-top:15px;
  margin-bottom:20px;
"></div>
`;

// pune sub socials
const socials = document.getElementById("socialsSection");
socials.insertAdjacentElement("afterend", section);

const container = document.getElementById("blinkiesContainer");

// =======================
// 🔥 LOAD FILES (GIF + HTML)
// =======================
function createBlinkie(src) {
  const ext = src.split(".").pop().toLowerCase();

  const el = document.createElement("div");
  el.style.height = "31px";
  el.style.width = "31px";
  el.style.margin = "2px";
  el.style.display = "flex";
  el.style.alignItems = "center";
  el.style.justifyContent = "center";
  el.style.borderRadius = "4px";
  el.style.transition = "0.1s";

  if (ext === "gif") {
    const img = document.createElement("img");
    img.src = src;
    img.style.height = "31px";
    img.style.width = "31px";
    img.onerror = () => el.remove();
    el.appendChild(img);
  } else if (ext === "html") {
    el.style.backgroundColor = "#222";
    el.style.color = "#ff00ff";
    el.style.fontSize = "10px";
    el.style.textAlign = "center";
    el.style.lineHeight = "12px";
    el.style.fontWeight = "bold";
    el.textContent = "HTML";
  }

  return el;
}

// =======================
// 🔥 GENERATE FILES
// =======================
const files = [];

// GIF-uri
for (let i = 0; i <= 234; i++) {
  const name = i === 0 ? "1.gif" : `1 (${i}).gif`;
  files.push(name);
}

// HTML-uri (exemplu: 1.html - 5.html)
for (let i = 1; i <= 5; i++) {
  files.push(`${i}.html`);
}

// creează blinkies
const blinkies = files.map(file => {
  const el = createBlinkie(file);
  container.appendChild(el);
  return el;
});

// =======================
// 🔥 FLASH EFFECT
// =======================
function flashBlinkies() {
  blinkies.forEach(el => {
    if (Math.random() < 0.05) { // 5% șansă să „clipescă” fiecare tick
      el.style.opacity = "0.2";
      setTimeout(() => {
        el.style.opacity = "1";
      }, 100 + Math.random() * 200); // flash scurt aleatoriu
    }
  });
  requestAnimationFrame(flashBlinkies);
}

flashBlinkies();