(function () {
  window.recomputeDerived = function () {
    critFromUpgrades = 0;
    perClickMult = 1;
    if (specialOwned.crit_boost) critFromUpgrades += 0.05;
    if (specialOwned.crit_charm) critFromUpgrades += 0.1;
    if (specialOwned.double_click) perClickMult *= 2;
    if (specialOwned.triple_click) perClickMult *= 3;
  };

  window.getPerClick = function () {
    return perClick * perClickMult;
  };

  window.brainCost = function (n = brainLvl) {
    return 10 + 20 * n * (n + 1);
  };

  window.shopCost = function () {
    return brainCost(10) * 2;
  };

  window.totalCritChance = function () {
    return Math.min(
      baseCritChance + critFromUpgrades + critFromItems + critFromBonuses,
      1
    );
  };
  window.totalCostFor = function (u, lvl, n) {
    let sum = 0;
    for (let i = 0; i < n; i++) {
      sum += u.costFunc ? u.costFunc(lvl + i) : u.cost || 0;
    }
    return sum;
  };

  window.maxAffordable = function (u, lvl, budget) {
    let n = 0;
    while (true) {
      const c = u.costFunc ? u.costFunc(lvl + n) : u.cost || 0;
      if (budget >= c) {
        budget -= c;
        n++;
      } else break;
    }
    return n;
  };

  window.purchaseMain = function (id, qty) {
    const u = mainUpgrades.find((it) => it.id === id);
    if (!u) return;
    const lvl0 = upgradeLevels[id] || 0;
    let n;
    const mode = typeof qty !== "undefined" ? qty : buyMode;
    if (mode === "max") {
      n = maxAffordable(u, lvl0, pc);
    } else {
      n = Number(mode) || 1;
      n = Math.max(1, Math.floor(n));
      const maxN = maxAffordable(u, lvl0, pc);
      if (n > maxN) n = maxN;
    }
    if (n <= 0) {
      const btn = document.querySelector('button[data-buy="' + id + '"]');
      if (btn && typeof bump === "function") bump(btn);
      return;
    }
    const cost = totalCostFor(u, lvl0, n);
    if (pc < cost) {
      const btn = document.querySelector('button[data-buy="' + id + '"]');
      if (btn && typeof bump === "function") bump(btn);
      return;
    }
    pc -= cost;
    for (let i = 0; i < n; i++) {
      const newLvl = (upgradeLevels[id] || 0) + 1;
      upgradeLevels[id] = newLvl;
      if (u.effectType === "perClick") perClick += u.increment;
      else if (u.effectType === "perSecond") pcps += u.increment;
      if (id === "brainstorm") {
        brainLvl = newLvl;
        if (brainLvl % 5 === 0) usd += brainLvl;
        if (brainLvl % 7 === 0) cpu += Math.ceil(brainLvl / 10);
      }
    }
    if (typeof render === "function") render();
    if (typeof save === "function") save();
  };
  window.totalCostFor = function (u, lvl, n) {
    let sum = 0;
    for (let i = 0; i < n; i++) {
      sum += u.costFunc ? u.costFunc(lvl + i) : u.cost || 0;
    }
    return sum;
  };

  window.maxAffordable = function (u, lvl, budget) {
    let n = 0;
    while (true) {
      const c = u.costFunc ? u.costFunc(lvl + n) : u.cost || 0;
      if (budget >= c) {
        budget -= c;
        n++;
      } else break;
    }
    return n;
  };

  window.purchaseMain = function (id, qty) {
    const u = mainUpgrades.find((it) => it.id === id);
    if (!u) return;
    const lvl0 = upgradeLevels[id] || 0;
    let n;
    const mode = typeof qty !== "undefined" ? qty : buyMode;
    if (mode === "max") {
      n = maxAffordable(u, lvl0, pc);
    } else {
      n = Number(mode) || 1;
      n = Math.max(1, Math.floor(n));
      const maxN = maxAffordable(u, lvl0, pc);
      if (n > maxN) n = maxN;
    }
    if (n <= 0) {
      const btn = document.querySelector('button[data-buy="' + id + '"]');
      if (btn && typeof bump === "function") bump(btn);
      return;
    }
    const cost = totalCostFor(u, lvl0, n);
    if (pc < cost) {
      const btn = document.querySelector('button[data-buy="' + id + '"]');
      if (btn && typeof bump === "function") bump(btn);
      return;
    }
    pc -= cost;
    for (let i = 0; i < n; i++) {
      const newLvl = (upgradeLevels[id] || 0) + 1;
      upgradeLevels[id] = newLvl;
      if (u.effectType === "perClick") perClick += u.increment;
      else if (u.effectType === "perSecond") pcps += u.increment;
      if (id === "brainstorm") {
        brainLvl = newLvl;
        if (brainLvl % 5 === 0) usd += brainLvl;
        if (brainLvl % 7 === 0) cpu += Math.ceil(brainLvl / 10);
      }
    }
    if (typeof render === "function") render();
    if (typeof save === "function") save();
  };

  window.purchaseSpecial = function (id) {
    const s = specialUpgrades.find((it) => it.id === id);
    if (!s || specialOwned[id]) return;
    const cost = s.costFunc ? s.costFunc() : s.cost || 0;
    if (pc >= cost) {
      pc -= cost;
      specialOwned[id] = true;
      if (
        !["crit_boost", "crit_charm", "double_click", "triple_click"].includes(
          id
        )
      ) {
        if (typeof s.effect === "function") s.effect();
      }
      localStorage.setItem("pc:sp:" + id, "1");
      recomputeDerived();
      if (typeof render === "function") render();
      if (typeof save === "function") save();
    } else {
      const btn = document.querySelector(`button[data-buy="${id}"]`);
      if (btn && typeof bump === "function") bump(btn);
    }
  };

  window.sellSpecial = function (id) {
    const s = specialUpgrades.find((it) => it.id === id);
    if (!s) return;
    if (!specialOwned[id]) return;
    if (!s.sellable) return;
    const cost = s.costFunc ? s.costFunc() : s.cost || 0;
    const refund = Math.floor(cost * 0.75);
    if (typeof reverseSpecialEffect === "function") reverseSpecialEffect(id);
    specialOwned[id] = false;
    pc += refund;
    if (typeof render === "function") render();
    if (typeof save === "function") save();
  };

  window.reverseSpecialEffect = function (id) {
    switch (id) {
      case "crit_boost":
        critFromUpgrades -= 0.05;
        break;
      case "crit_charm":
        critFromUpgrades -= 0.1;
        break;
      case "double_click":
        perClick /= 2;
        break;
      case "triple_click":
        perClick /= 3;
        break;
      case "passive_boost1":
        pcps -= 5;
        break;
      case "passive_boost2":
        pcps -= 50;
        break;
      case "golden_click":
        perClick -= 100;
        break;
      case "outsource":
        pcps -= 2;
        break;
      case "network_boost":
        pcps /= 2;
        break;
      case "tools":
        perClick -= 0.5;
        break;
      case "new_computer":
        perClick -= 5;
        break;
      case "mentor":
        pcps -= 10;
        break;
      default:
        break;
    }
    if (perClick < 0) perClick = 0;
    if (pcps < 0) pcps = 0;
    if (critFromUpgrades < 0) critFromUpgrades = 0;
  };

  window.save = function () {
    localStorage.setItem(LS.pc, pc);
    localStorage.setItem(LS.usd, usd);
    localStorage.setItem(LS.cpu, cpu);
    localStorage.setItem(LS.perClick, perClick);
    localStorage.setItem(LS.total, totalClicks);
    localStorage.setItem(LS.brain, brainLvl);
    localStorage.setItem(LS.shop, shopUnlocked ? "1" : "0");
    localStorage.setItem(LS.theme, theme);
    localStorage.setItem(LS.logo, logoKey);
    localStorage.setItem(LS.curr, curr);
    localStorage.setItem(LS.sfx, sfx ? "1" : "0");
    localStorage.setItem(LS.music, music ? "1" : "0");
    localStorage.setItem("pc:critFromItems", critFromItems);
    localStorage.setItem("pc:critFromBonuses", critFromBonuses);
    localStorage.setItem("pc:critMultiplier", critMultiplier);
    localStorage.setItem("pc:rebirths", rebirthCount);
    localStorage.setItem("pc:secret", secretUnlocked ? "1" : "0");
    Object.keys(achievementsUnlocked).forEach((id) => {
      localStorage.setItem(
        "pc:ach:" + id,
        achievementsUnlocked[id] ? "1" : "0"
      );
    });
    localStorage.setItem("pc:pcps", pcps);
    mainUpgrades.forEach((u) => {
      const lvl = upgradeLevels[u.id] || 0;
      localStorage.setItem("pc:up:" + u.id, lvl);
    });
    specialUpgrades.forEach((s) => {
      const owned = specialOwned[s.id] ? "1" : "0";
      localStorage.setItem("pc:sp:" + s.id, owned);
    });
  };

  window.resetGame = function () {
    if (pc >= 1000) {
      rebirthCount += 1;
      localStorage.setItem("pc:rebirths", rebirthCount);
      if (!secretUnlocked && rebirthCount >= 10) {
        secretUnlocked = true;
        localStorage.setItem("pc:secret", "1");
        perClick += 5;
      }
    }
    pc = 0;
    usd = 0;
    cpu = 0;
    brainLvl = 0;
    Object.keys(upgradeLevels).forEach((k) => (upgradeLevels[k] = 0));
    Object.keys(specialOwned).forEach((k) => (specialOwned[k] = false));
    pcps = 0;
    critFromUpgrades = 0;
    critFromItems = 0;
    critFromBonuses = 0;
    critMultiplier = 2;
    perClickMult = 1;
    totalClicks = 0;
    perClick = 1 + (secretUnlocked ? 5 : 0);
    recomputeDerived();
    if (typeof save === "function") save();
    if (typeof render === "function") render();
    if (typeof checkAchievements === "function") checkAchievements();
  };
})();
