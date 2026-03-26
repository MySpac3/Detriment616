// =======================
// 🔥 CREATE SECTION
// =======================
const section = document.createElement("section");

section.innerHTML = `
<h2 style="color:#ff00ff;text-align:center;text-shadow:0 0 10px #ff00ff;">
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
for (let i = 0; i <= 234; i++) {
  let name = i === 0 ? "1.gif" : `1 (${i}).gif`;

  const img = createBlinkie(name);
  container.appendChild(img);
}

// =======================
// 💀 CHAOS MODE OFF
// =======================
// Nu mai generăm blinkies random