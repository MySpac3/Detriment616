// =======================
// 🔥 CREATE SECTION
// =======================
const section = document.createElement("section");

section.innerHTML = `
<h2 id="blinkiesTitle" style="text-align:center; margin-bottom:2px; font-family:inherit;">
  Blinkies
</h2>

<div id="scrollText" style="text-align:center; font-size:12px; opacity:0.7; margin-bottom:8px;">
  (scroll inside the red box for blinkies)
</div>

<div id="blinkiesContainerWrapper">
  <div id="blinkiesContainer"></div>
</div>
`;

document.getElementById("socialsSection").insertAdjacentElement("afterend", section);
const container = document.getElementById("blinkiesContainer");

// =======================
// 🔥 STYLE
// =======================
const style = document.createElement("style");
style.textContent = `
html, body {
  overflow-x: hidden;
  overscroll-behavior: none;
}

#mainContent {
  overscroll-behavior: none;
}

#blinkiesContainerWrapper {
  position: relative;
  max-height: 400px;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 10px;
  border: 2px solid #ff0000;
  background: rgba(0,0,0,0.6);
  touch-action: pan-y;
}

#blinkiesContainerWrapper::before {
  content: "";
  position: absolute;
  top: -2px;
  width: 100%;
  height: 30px;
  z-index: 3;
  background:
    radial-gradient(circle at 10% 0, #ff0000 6px, transparent 7px),
    radial-gradient(circle at 50% 0, #ff0000 7px, transparent 8px),
    radial-gradient(circle at 90% 0, #ff0000 6px, transparent 7px);
  animation: dripTop 2s infinite linear;
}

#blinkiesContainerWrapper::after {
  content: "";
  position: absolute;
  bottom: -2px;
  width: 100%;
  height: 25px;
  z-index: 3;
  background:
    radial-gradient(circle at 30% 100%, #ff0000 5px, transparent 6px),
    radial-gradient(circle at 70% 100%, #ff0000 6px, transparent 7px);
  animation: dripBottom 2.5s infinite linear;
}

.bloodLeft, .bloodRight {
  position: absolute;
  top: 0;
  width: 8px;
  height: 100%;
  z-index: 3;
  background: linear-gradient(to bottom, #ff0000, transparent);
}

.bloodLeft { left: -2px; animation: dripSide 3s infinite linear; }
.bloodRight { right: -2px; animation: dripSide 4s infinite linear; }

@keyframes dripTop {
  100% { transform: translateY(20px); opacity: 0; }
}
@keyframes dripBottom {
  100% { transform: translateY(-15px); opacity: 0; }
}
@keyframes dripSide {
  100% { background-position: 0 60px; }
}

#blinkiesContainer {
  display: grid;
  grid-template-columns: repeat(3, 100px);
  justify-content: center;
  gap: 4px;
  margin: 10px 0 20px;
}

.blinkie {
  width: 100px;
  height: 100px;
}

.blinkie.wide {
  grid-column: span 3;
  width: 100%;
}

.blinkie img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.bloodStain {
  position: absolute;
  opacity: 0;
  pointer-events: none;
  z-index: 2; /* 🔥 peste blinkies dar sub sânge edges */
  filter: contrast(1.2) saturate(1.2);
  animation: stainFade 4s ease-out forwards;
}

@keyframes stainFade {
  0% { opacity: 0; }
  20% { opacity: 0.25; }
  100% { opacity: 0; }
}
`;
document.head.appendChild(style);

// =======================
// 🩸 SIDE BLOOD
// =======================
const wrapper = document.getElementById("blinkiesContainerWrapper");

const left = document.createElement("div");
left.className = "bloodLeft";

const right = document.createElement("div");
right.className = "bloodRight";

wrapper.appendChild(left);
wrapper.appendChild(right);

// =======================
// 🔥 BLINKIE FUNC
// =======================
function createBlinkie(src) {
  const el = document.createElement("div");
  el.className = "blinkie";

  const img = document.createElement("img");
  img.src = src;

  img.onload = () => {
    if (img.naturalWidth / img.naturalHeight > 1.4) {
      el.classList.add("wide");
    }
  };

  img.onerror = () => el.remove();

  el.appendChild(img);
  return el;
}

function addBlinkieIfExists(src) {
  const test = new Image();
  test.src = src;
  test.onload = () => container.appendChild(createBlinkie(src));
}

// =======================
// 🔥 20 FOR-URI
// =======================
for (let i=1;i<=300;i++) addBlinkieIfExists(`1 (${i}).gif`);
for (let i=1;i<=300;i++) addBlinkieIfExists(`2 (${i}).gif`);
for (let i=1;i<=300;i++) addBlinkieIfExists(`3 (${i}).gif`);
for (let i=1;i<=300;i++) addBlinkieIfExists(`4 (${i}).gif`);
for (let i=1;i<=300;i++) addBlinkieIfExists(`5 (${i}).gif`);
for (let i=1;i<=300;i++) addBlinkieIfExists(`6 (${i}).gif`);
for (let i=1;i<=300;i++) addBlinkieIfExists(`7 (${i}).gif`);
for (let i=1;i<=300;i++) addBlinkieIfExists(`8 (${i}).gif`);
for (let i=1;i<=300;i++) addBlinkieIfExists(`9 (${i}).gif`);
for (let i=1;i<=300;i++) addBlinkieIfExists(`10 (${i}).gif`);
for (let i=1;i<=300;i++) addBlinkieIfExists(`11 (${i}).gif`);
for (let i=1;i<=300;i++) addBlinkieIfExists(`12 (${i}).gif`);
for (let i=1;i<=300;i++) addBlinkieIfExists(`13 (${i}).gif`);
for (let i=1;i<=300;i++) addBlinkieIfExists(`14 (${i}).gif`);
for (let i=1;i<=300;i++) addBlinkieIfExists(`15 (${i}).gif`);
for (let i=1;i<=300;i++) addBlinkieIfExists(`16 (${i}).gif`);
for (let i=1;i<=300;i++) addBlinkieIfExists(`17 (${i}).gif`);
for (let i=1;i<=300;i++) addBlinkieIfExists(`18 (${i}).gif`);
for (let i=1;i<=300;i++) addBlinkieIfExists(`19 (${i}).gif`);
for (let i=1;i<=300;i++) addBlinkieIfExists(`20 (${i}).gif`);

// =======================
// 🩸 STAINS (vizibili + fade-out 1.3s)
// =======================
const stains = ["strop.jpg", "stropp.jpg", "stroppp.jpg"];

setInterval(() => {
  if (Math.random() > 0.65) {
    const s = document.createElement("img");
    s.src = stains[Math.floor(Math.random() * stains.length)];
    s.className = "bloodStain";

    // poziție random pe wrapper
    s.style.left = Math.random() * 80 + "%";
    s.style.top = Math.random() * 80 + "%";

    // dimensiune random, de două ori mai mare
    s.style.width = (60 + Math.random() * 80) + "px"; // 30-70 px -> 60-140 px

    // fade-out vizibil
    s.style.opacity = 1;
    s.style.transition = "opacity 1.3s ease-in-out";

    wrapper.appendChild(s);

    // start fade-out
    setTimeout(() => {
      s.style.opacity = 0;
    }, 50); // mic delay ca să se aplice tranziția

    // elimină din DOM după 1,3 secunde
    setTimeout(() => s.remove(), 1300);
  }
}, 2000);

// CLICK DESKTOP
wrapper.addEventListener("click", (e) => {
  createClickStain(e.clientX, e.clientY);
});

// TAP MOBILE
wrapper.addEventListener("touchstart", (e) => {
  const touch = e.touches[0];
  createClickStain(touch.clientX, touch.clientY);
});

// =======================
// 🌈 FLASH TEXT
// =======================
function flash(el){
  const t=el.textContent;
  el.textContent="";
  const spans=[];
  for(let c of t){
    const s=document.createElement("span");
    s.textContent=c;
    el.appendChild(s);
    spans.push(s);
  }
  setInterval(()=>{
    spans.forEach(s=>{
      s.style.color=`rgb(${Math.random()*255},${Math.random()*255},${Math.random()*255})`;
    });
  },300);
}

flash(document.getElementById("blinkiesTitle"));
flash(document.getElementById("scrollText"));  
