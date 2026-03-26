// =======================
// 🔥 CREATE SECTION
// =======================
const section = document.createElement("section");

section.innerHTML = `
<h2 style="color:#ff00ff;text-align:center;text-shadow:0 0 10px #ff00ff;">
  Blinkies
</h2>

<!-- 🔥 SCROLL BAR -->
<div id="blinkiesScroll" style="
  overflow:hidden;
  white-space:nowrap;
  margin:10px 0;
  border-top:1px dashed #ff00ff;
  border-bottom:1px dashed #ff00ff;
"></div>

<!-- 🔥 NORMAL GRID -->
<div id="blinkiesContainer" style="
  display:flex;
  flex-wrap:wrap;
  gap:8px;
  justify-content:center;
  margin-top:15px;
"></div>
`;

// pune sub socials
const socials = document.getElementById("socialsSection");
socials.insertAdjacentElement("afterend", section);

const container = document.getElementById("blinkiesContainer");
const scroll = document.getElementById("blinkiesScroll");

// =======================
// 🔥 LOAD BLINKIES
// =======================
function createBlinkie(src) {
  const img = document.createElement("img");
  img.src = src;
  img.style.height = "31px";
  img.style.margin = "2px";
  img.style.transition = "0.2s";
  img.style.cursor = "pointer";

  img.onerror = () => img.remove();

  img.onmouseover = () => {
    img.style.transform = "scale(1.3)";
    img.style.filter = "drop-shadow(0 0 6px #ff00ff)";
  };

  img.onmouseout = () => {
    img.style.transform = "scale(1)";
    img.style.filter = "none";
  };

  return img;
}

// =======================
// 🔥 GENERATE 234
// =======================
let allBlinkies = [];

for (let i = 0; i <= 234; i++) {
  let name = i === 0 ? "blinkies/1.gif" : `blinkies/1 (${i}).gif`;

  const img = createBlinkie(name);

  container.appendChild(img);

  // clone pentru scroll
  const clone = createBlinkie(name);
  scroll.appendChild(clone);

  allBlinkies.push(name);
}

// =======================
// 🔥 SCROLL ANIMATION
// =======================
let scrollPos = 0;

function animateScroll() {
  scrollPos -= 0.5;
  scroll.style.transform = `translateX(${scrollPos}px)`;

  if (Math.abs(scrollPos) > scroll.scrollWidth / 2) {
    scrollPos = 0;
  }

  requestAnimationFrame(animateScroll);
}

// duplică conținut pentru loop infinit
scroll.innerHTML += scroll.innerHTML;
animateScroll();

// =======================
// 🔥 CHAOS MODE (random pe ecran)
// =======================
function spawnRandomBlinkie() {
  const src = allBlinkies[Math.floor(Math.random() * allBlinkies.length)];

  const img = document.createElement("img");
  img.src = src;

  img.style.position = "fixed";
  img.style.left = Math.random() * 100 + "vw";
  img.style.top = "-40px";
  img.style.height = "31px";
  img.style.zIndex = "9999";
  img.style.pointerEvents = "none";
  img.style.opacity = "0.8";

  document.body.appendChild(img);

  let pos = -40;

  function fall() {
    pos += 2;
    img.style.top = pos + "px";

    if (pos < window.innerHeight + 50) {
      requestAnimationFrame(fall);
    } else {
      img.remove();
    }
  }

  fall();
}

// spawn continuu
setInterval(spawnRandomBlinkie, 300);

// =======================
// 💀 END CHAOS
// =======================