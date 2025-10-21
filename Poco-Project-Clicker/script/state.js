(function () {
  window.baseCritChance = 0;
  window.critFromUpgrades = +localStorage.getItem("pc:critFromUpgrades") || 0;
  window.critFromItems = +localStorage.getItem("pc:critFromItems") || 0;
  window.critFromBonuses = +localStorage.getItem("pc:critFromBonuses") || 0;
  window.critMultiplier = +localStorage.getItem("pc:critMultiplier") || 2;

  window.pc = +localStorage.getItem(LS.pc) || 0;
  window.usd = +localStorage.getItem(LS.usd) || 0;
  window.cpu = +localStorage.getItem(LS.cpu) || 0;
  window.perClick = +localStorage.getItem(LS.perClick) || 1;
  window.totalClicks = +localStorage.getItem(LS.total) || 0;
  window.brainLvl = +localStorage.getItem(LS.brain) || 0;
  window.shopUnlocked = localStorage.getItem(LS.shop) === "1";
  window.pcps = +localStorage.getItem("pc:pcps") || 0;
  window.theme = localStorage.getItem(LS.theme) || "dark";
  window.logoKey = localStorage.getItem(LS.logo) || "PowerCoders";
  window.curr =
    localStorage.getItem(LS.curr) ||
    (STYLE_PRESETS[window.logoKey]
      ? STYLE_PRESETS[window.logoKey].currency
      : "{P.}");
  window.sfx = localStorage.getItem(LS.sfx) !== "0";
  window.music = localStorage.getItem(LS.music) === "1";
  window.rebirthCount = +localStorage.getItem("pc:rebirths") || 0;
  window.secretUnlocked = localStorage.getItem("pc:secret") === "1";
  window.upgradeLevels = {};
  window.specialOwned = {};
  window.achievementsUnlocked = {};
  window.perClickMult = 1;
  window.buyMode = 1;
})();
