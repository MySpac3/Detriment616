<!DOCTYPE html>
<html lang="ro">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Blinkies cu Efecte</title>
<style>
  /* ======================= */
  /* 🌹 SCROLL PRINCIPAL & BODY */
  /* ======================= */
  body {
    margin: 0;
    padding: 0;
    background: #000;
    color: #fff;
    font-family: Arial, sans-serif;
    overflow-x: hidden;
    position: relative;
  }

  /* ======================= */
  /* 🔴 DUNGI ROSII MARGINI */
  /* ======================= */
  .red-stripe {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 10px;
    background: red;
    z-index: 1000;
  }
  .red-stripe.left { left: 0; }
  .red-stripe.right { right: 0; }

  /* ======================= */
  /* 💉 PICURARE SANGE */
  /* ======================= */
  .blood-drop {
    position: fixed;
    top: -10px;
    width: 6px;
    height: 20px;
    background: darkred;
    border-radius: 50%;
    z-index: 999;
    animation: drop 2s linear infinite;
  }
  @keyframes drop {
    0% { top: -20px; opacity: 1; transform: translateX(0) scaleY(1); }
    80% { opacity: 1; }
    100% { top: 100vh; opacity: 0; transform: translateX(0) scaleY(2); }
  }

  /* ======================= */
  /* 🔥 GRID BLINKIES */
  /* ======================= */
  #blinkiesContainer {
    display: grid;
    grid-template-columns: repeat(auto-fill, 100px);
    justify-content: center;
    gap: 4px;
    margin: 20px auto;
  }

  .blinkie {
    width: 100px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 20px;
    overflow: hidden;
  }

  .blinkie.wide {
    grid-column: span 3;
    width: 100%;
    height: 100px;
  }

  /* ======================= */
  /* 🔥 TITLU CU LITERE COLORATE */
  /* ======================= */
  h2 {
    text-align: center;
    margin-bottom: 10px;
  }
  h2 span {
    font-weight: bold;
    transition: color 0.5s;
  }
</style>
</head>
<body>

<!-- Dungi Rosii -->
<div class="red-stripe left"></div>
<div class="red-stripe right"></div>

<!-- Sectiune Blinkies -->
<section id="blinkiesSection">
  <h2 id="blinkiesTitle">Blinkies</h2>
  <div id="blinkiesContainer"></div>
</section>

<script>
  const container = document.getElementById("blinkiesContainer");

  // =======================
  // 🌈 FUNCTII CULORI RANDOM
  // =======================
  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function randomLetterColorEffect(element) {
    const chars = element.textContent.split("");
    element.innerHTML = "";
    chars.forEach(char => {
      const span = document.createElement("span");
      span.textContent = char;
      span.style.color = getRandomColor();
      element.appendChild(span);
    });

    // Schimbare continua
    setInterval(() => {
      const spans = element.querySelectorAll("span");
      spans.forEach(span => {
        span.style.color = getRandomColor();
      });
    }, 500);
  }

  const title = document.getElementById("blinkiesTitle");
  randomLetterColorEffect(title);

  // =======================
  // 🌟 CREATE BLINKIE
  // =======================
  function createBlinkie(letter) {
    const el = document.createElement("div");
    el.className = "blinkie";
    el.textContent = letter;
    el.style.color = getRandomColor();
    el.style.fontSize = "24px";

    // Schimbare continua culoare
    setInterval(() => {
      el.style.color = getRandomColor();
    }, 500);

    return el;
  }

  // =======================
  // 🔥 POPULARE BLINKIES
  // =======================
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
  for (let i = 0; i < 50; i++) {
    const randomChar = letters[Math.floor(Math.random() * letters.length)];
    container.appendChild(createBlinkie(randomChar));
  }

  // =======================
  // 💧 PICURARE SANGE
  // =======================
  function createBloodDrop() {
    const drop = document.createElement("div");
    drop.className = "blood-drop";
    drop.style.left = Math.random() * window.innerWidth + "px";
    drop.style.animationDuration = 1 + Math.random() * 2 + "s";
    document.body.appendChild(drop);

    setTimeout(() => drop.remove(), 3000);
  }

  // Creeaza picaturi la interval random
  setInterval(createBloodDrop, 200);
</script>

</body>
</html>
