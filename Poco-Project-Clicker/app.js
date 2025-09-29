const LOGO_URL = "./powercoders_logo.png";
const LS_KEYS = {
  currency: "clicker:currency",
  perClick: "clicker:perClick",
  total: "clicker:total",
  savedAt: "clicker:savedAt",
};
const BASE_COST = 10;

let currency = Number(localStorage.getItem(LS_KEYS.currency) || 0);
let perClick = Number(localStorage.getItem(LS_KEYS.perClick) || 1);
let totalClicks = Number(localStorage.getItem(LS_KEYS.total) || 0);

const playfield = document.getElementById("playfield");
const clicker = document.getElementById("clicker");
const clickerImg = document.getElementById("clickerImg");
const currencyText = document.getElementById("currencyText");
const perClickText = document.getElementById("perClickText");
const totalClicksText = document.getElementById("totalClicks");
const savedAtEl = document.getElementById("savedAt");
const buyClickPowerBtn = document.getElementById("buyClickPower");
const costClickPowerEl = document.getElementById("costClickPower");
const resetBtn = document.getElementById("reset");

const tabs = document.querySelectorAll(".tab");
const panels = {
  shop: document.getElementById("panel-shop"),
  upgrades: document.getElementById("panel-upgrades"),
  stats: document.getElementById("panel-stats"),
};

function getClickPowerCost() {
  return BASE_COST * perClick;
}
function render() {
  currencyText.textContent = currency;
  perClickText.textContent = perClick;
  totalClicksText.textContent = totalClicks;
  costClickPowerEl.textContent = `(${getClickPowerCost()})`;
  savedAtEl.textContent = localStorage.getItem(LS_KEYS.savedAt) || "—";
}
function save() {
  localStorage.setItem(LS_KEYS.currency, String(currency));
  localStorage.setItem(LS_KEYS.perClick, String(perClick));
  localStorage.setItem(LS_KEYS.total, String(totalClicks));
  localStorage.setItem(LS_KEYS.savedAt, new Date().toLocaleString());
}

clickerImg.src = LOGO_URL;

clicker.addEventListener("click", (e) => {
  currency += perClick;
  totalClicks += 1;
  render(); save();
  spawnRain();
});

playfield.addEventListener("click", (e) => {
    if (!clicker.contains(e.target)) spawnRain();
});

function spawnBurst(x, y) {
  const count = 6;
  for (let i = 0; i < count; i++) {
    spawnLogo(x + rand(-20, 20), y + rand(-20, 20));
  }
}

function spawnRain(count = 8) {
  for (let i = 0; i < count; i++) spawnLogoFromTop();
}

function spawnLogoFromTop() {
  const rect = playfield.getBoundingClientRect();
  const img = document.createElement("img");
  img.src = LOGO_URL;
  img.className = "fall";

  const size = rand(18, 30);
  img.style.width = size + "px";
  img.style.height = size + "px";

  const x = rand(0, Math.max(0, rect.width - size));
  const y = -size - rand(0, 60);
  img.style.left = x + "px";
  img.style.top = y + "px";

  img.style.setProperty("--dx", rand(-80, 80) + "px");
  img.style.setProperty("--dy", rect.height + 200 + "px");
  img.style.setProperty("--dur", (3 + Math.random() * 3) + "s");

  playfield.appendChild(img);
  img.addEventListener("animationend", () => img.remove());
}

function rand(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

buyClickPowerBtn.addEventListener("click", () => {
  const cost = getClickPowerCost();
  if (currency >= cost) {
    currency -= cost;
    perClick += 1;
    render(); save();
  } else {
    buyClickPowerBtn.animate(
      [{ transform: "scale(1)" }, { transform: "scale(1.06)" }, { transform: "scale(1)" }],
      { duration: 220 }
    );
  }
});

tabs.forEach((btn) => {
  btn.addEventListener("click", () => {
    tabs.forEach((b) => b.classList.toggle("active", b === btn));
    Object.values(panels).forEach((p) => p.classList.remove("active"));
    panels[btn.dataset.tab].classList.add("active");
  });
});

resetBtn.addEventListener("click", () => {
  if (confirm("Reset progress?")) {
    currency = 0; perClick = 1; totalClicks = 0; save(); render();
  }
});

render();
