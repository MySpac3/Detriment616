<script>
(function(){
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
    align-items:center;
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
    el.style.height = "33px";
    el.style.width = "33px";
    el.style.margin = "2px";
    el.style.display = "flex";
    el.style.alignItems = "center";
    el.style.justifyContent = "center";
    el.style.borderRadius = "4px";
    el.style.transition = "0.1s";

    const img = document.createElement("img");
    img.src = src;
    img.style.height = "33px";
    img.style.width = "33px";
    img.style.objectFit = "cover";
    img.onerror = () => el.remove();

    el.appendChild(img);
    return el;
  }

  // =======================
  // 🔥 INFINITE BLINKIES GENERATION
  // =======================
  const blinkies = [];
  const bases = [1,2,3,4,5,6];

  function addRandomBlinkies() {
    const base = bases[Math.floor(Math.random()*bases.length)];
    const i = 1 + Math.floor(Math.random()*1000);
    const name = `${base} (${i}).gif`;
    const el = createBlinkie(name);
    container.appendChild(el);
    blinkies.push(el);
  }

  setInterval(()=>{
    const count = 1 + Math.floor(Math.random()*3);
    for(let j=0;j<count;j++) addRandomBlinkies();
  }, 200);

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

  // =======================
  // 🔥 BLOOD CANVAS
  // =======================
  const bloodCanvas = document.createElement('canvas');
  Object.assign(bloodCanvas.style,{
    position:'fixed',
    top:'0', left:'0',
    width:'100vw',
    height:'100vh',
    pointerEvents:'none',
    zIndex:'1'
  });
  document.body.appendChild(bloodCanvas);
  const bCtx = bloodCanvas.getContext('2d');

  function resizeCanvas(){
    bloodCanvas.width = window.innerWidth;
    bloodCanvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const bloodDrops = [];
  const bloodCount = 20;
  for(let i=0;i<bloodCount;i++){
    bloodDrops.push({
      x: Math.random()*bloodCanvas.width,
      y: Math.random()*bloodCanvas.height,
      length: 50 + Math.random()*100,
      speed: 1 + Math.random()*2,
      wave: Math.random()*Math.PI*2
    });
  }

  function drawBlood(){
    bCtx.clearRect(0,0,bloodCanvas.width,bloodCanvas.height);
    bloodDrops.forEach(drop=>{
      drop.y += drop.speed;
      drop.wave += 0.05;
      if(drop.y > bloodCanvas.height) drop.y = -drop.length;

      const gradient = bCtx.createLinearGradient(drop.x, drop.y, drop.x, drop.y + drop.length);
      gradient.addColorStop(0,'rgba(139,0,0,0.6)');
      gradient.addColorStop(1,'rgba(255,0,0,0.2)');

      bCtx.strokeStyle = gradient;
      bCtx.lineWidth = 3;
      bCtx.beginPath();
      bCtx.moveTo(drop.x + Math.sin(drop.wave)*10, drop.y);
      bCtx.lineTo(drop.x + Math.sin(drop.wave+1)*10, drop.y + drop.length);
      bCtx.stroke();
    });
    requestAnimationFrame(drawBlood);
  }
  drawBlood();

})();
</script>
