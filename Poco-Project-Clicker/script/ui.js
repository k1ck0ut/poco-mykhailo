(function () {
  window.logoSrc = function () {
    return ICONS.logoPresets[logoKey] || ICONS.logoPresets.powercoders;
  };

  window.applyIcons = function () {
    if (clickLogo) clickLogo.src = logoSrc();
    if (icoUpg) icoUpg.src = ICONS.upgrades;
    if (icoShop) icoShop.src = ICONS.shop;
    if (icoStats) icoStats.src = ICONS.stats;
    if (icoMap) icoMap.src = ICONS.map;
    if (icoInventory) icoInventory.src = ICONS.inventory;
    if (miniBrainIco) miniBrainIco.src = ICONS.upgradeIcons.brainstorm;
    if (icoCPU) icoCPU.src = ICONS.cpu;
  };

  window.applyTheme = function () {
    document.documentElement.classList.remove(
      "theme-light",
      "theme-neon",
      "theme-green"
    );
    if (theme === "light")
      document.documentElement.classList.add("theme-light");
    if (theme === "neon") document.documentElement.classList.add("theme-neon");
    if (theme === "green")
      document.documentElement.classList.add("theme-green");
  };

  window.applyCurrency = function () {
    if (pSym) pSym.textContent = curr;
    if (pSymInline3) pSymInline3.textContent = curr;
    if (pSymInline4) pSymInline4.textContent = curr;
    document.querySelectorAll(".pSym").forEach((n) => (n.textContent = curr));
    if (centerSymbol) centerSymbol.textContent = curr;
    if (typeof renderUpgrades === "function") {
      renderUpgrades();
    }
  };
  let map3d = {
    inited: false,
    running: false,
    scene: null,
    camera: null,
    renderer: null,
    rafId: null,
    mount: null,
    animateHook: null,
  };

  function initMap3D() {
    if (map3d.inited) return;
    map3d.mount = document.getElementById("map3d");
    if (!map3d.mount || !window.THREE) return;
    const rect = map3d.mount.getBoundingClientRect();
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0e0e10);
    const camera = new THREE.PerspectiveCamera(
      55,
      rect.width / rect.height,
      0.1,
      100
    );
    camera.position.set(2.2, 1.8, 3.2);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(rect.width, rect.height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    map3d.mount.appendChild(renderer.domElement);
    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    const dir = new THREE.DirectionalLight(0xffffff, 1.0);
    dir.position.set(3, 5, 2);
    scene.add(ambient, dir);

    const loader = new THREE.GLTFLoader();
    loader.load(
      "assets/models/earth.glb",
      (gltf) => {
        const model = gltf.scene;
        model.scale.set(1, 1, 1);
        model.position.set(0, 0, 0);
        model.rotation.set(0, 0, 0);

        model.traverse((o) => {
          if (!o.isMesh) return;
          const oldMat = o.material;
          const tex = oldMat && oldMat.map ? oldMat.map : null;
          if (tex) tex.colorSpace = THREE.SRGBColorSpace;

          o.material = new THREE.MeshBasicMaterial({
            map: tex || null,
            color: 0xffffff,
            side: THREE.DoubleSide,
          });

          if (o.geometry && o.geometry.computeVertexNormals) {
            o.geometry.computeVertexNormals();
          }
        });

        model.traverse((o) => {
          if (o.isMesh) {
            const box = new THREE.Box3().setFromObject(o);
            const size = box.getSize(new THREE.Vector3());
            if (Math.max(size.x, size.y, size.z) > 100) o.visible = false;
          }
        });

        scene.add(model);

        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z) || 1;
        const fov = THREE.MathUtils.degToRad(camera.fov);
        const dist = (maxDim / 2 / Math.tan(fov / 2)) * 1.25;
        const dirVec = new THREE.Vector3(0, 0.25, 1).normalize();
        camera.position.copy(center.clone().add(dirVec.multiplyScalar(dist)));
        camera.near = dist / 100;
        camera.far = dist * 100;
        camera.updateProjectionMatrix();
        camera.lookAt(center);

        map3d.animateHook = () => {
          model.rotation.y += 0.0007;
        };

        console.log("Earth model loaded successfully");
      },
      undefined,
      (err) => {
        console.error("Earth model failed to load:", err);
      }
    );

    map3d.scene = scene;
    map3d.camera = camera;
    map3d.renderer = renderer;
    map3d.inited = true;

    window.addEventListener("resize", () => {
      if (!map3d.inited) return;
      const r = map3d.mount.getBoundingClientRect();
      camera.aspect = r.width / r.height;
      camera.updateProjectionMatrix();
      renderer.setSize(r.width, r.height);
    });
  }

  function startMap3D() {
    if (!map3d.inited || map3d.running) return;
    map3d.running = true;
    const animate = () => {
      if (!map3d.running) return;
      if (typeof map3d.animateHook === "function") map3d.animateHook();
      map3d.renderer.render(map3d.scene, map3d.camera);
      map3d.rafId = requestAnimationFrame(animate);
    };
    map3d.rafId = requestAnimationFrame(animate);
  }

  function stopMap3D() {
    map3d.running = false;
    if (map3d.rafId) cancelAnimationFrame(map3d.rafId);
    map3d.rafId = null;
  }

  window.populateSettings = function () {
    if (themeSel) themeSel.value = theme;
    if (styleSel) {
      styleSel.innerHTML = "";
      Object.keys(STYLE_PRESETS).forEach((k) => {
        const o = document.createElement("option");
        o.value = k;
        o.textContent = k;
        styleSel.appendChild(o);
      });
      styleSel.value = getStyleKeyFromState();
    }
  };

  window.getStyleKeyFromState = function () {
    const match = Object.keys(STYLE_PRESETS).find((k) => {
      const s = STYLE_PRESETS[k];
      return s.logoKey === logoKey && s.currency === curr;
    });
    return match || "powercoders";
  };

  window.closeAllPanels = function () {
    Object.values(panels).forEach((p) => p && p.classList.remove("active"));
  };

  window.openPanel = function (name) {
    Object.values(panels).forEach((p) => p && p.classList.remove("active"));
    if (panels[name]) panels[name].classList.add("active");
    if (centerSymbol) {
      if (name) {
        centerSymbol.style.opacity = "0.06";
      }
    }
    if (name === "map") {
      initMap3D();
      startMap3D();
    } else {
      stopMap3D();
    }
  };

  window.showPlus = function (amount, isCrit, evt) {
    const el = document.createElement("div");
    el.className = "plus-text";
    if (isCrit) el.classList.add("crit");
    el.textContent = "+" + formatCompact(amount);
    el.style.left = evt.clientX + "px";
    el.style.top = evt.clientY - 20 + "px";
    document.body.appendChild(el);
    el.addEventListener("animationend", () => el.remove());
  };

  window.spawnRain = function (n = 1) {
    const rect = playfield.getBoundingClientRect();
    for (let i = 0; i < n; i++) {
      const s = document.createElement("div");
      s.className = "fall";
      const img = document.createElement("img");
      img.src = logoSrc();
      s.appendChild(img);
      const x = Math.random() * (rect.width - 40) - rect.width / 2;
      s.style.setProperty("--x", `${x}px`);
      s.style.setProperty("--dur", 5.6 + Math.random() * 3.6 + "s");
      s.style.left = rect.width / 2 + "px";
      s.style.top = "0px";
      playfield.appendChild(s);
      s.addEventListener("animationend", () => s.remove());
    }
  };

  window.bump = function (el) {
    el.animate(
      [
        { transform: "scale(1)" },
        { transform: "scale(1.06)" },
        { transform: "scale(1)" },
      ],
      { duration: 220, easing: "ease-out" }
    );
  };

  window.render = function () {
    const critEl = document.getElementById("critChanceStat");
    const multEl = document.getElementById("critMultStat");
    if (critEl) critEl.textContent = Math.round(totalCritChance() * 100) + "%";
    if (multEl) multEl.textContent = "x" + critMultiplier;
    if (elPC) elPC.textContent = formatCompact(Math.floor(pc));
    if (elUSD) elUSD.textContent = formatCompact(Math.floor(usd));
    if (elCPU) elCPU.textContent = formatCompact(Math.floor(cpu));
    if (elPerClick) elPerClick.textContent = formatCompact(getPerClick());
    if (elTotal) elTotal.textContent = formatCompact(totalClicks);

    if (miniBrainX) miniBrainX.textContent = "x" + formatCompact(brainLvl);
    if (typeof elPerSecond !== "undefined" && elPerSecond) {
      elPerSecond.textContent = formatCompact(pcps);
    }
    renderUpgrades();
    const bCost = brainCost();
    if (spanBrainCost) spanBrainCost.textContent = formatCompact(bCost);
    if (btnBrain) btnBrain.disabled = pc < bCost;
    if (brainLvl >= 10 && !shopUnlocked) {
      if (unlockShopCard) unlockShopCard.classList.remove("hidden");
      const cost = shopCost();
      if (spanShopCost) spanShopCost.textContent = formatCompact(cost);
      if (btnShop) btnShop.disabled = pc < cost;
    } else {
      if (unlockShopCard) unlockShopCard.classList.add("hidden");
    }
    if (tabShopBtn) tabShopBtn.disabled = !shopUnlocked;
    if (rebirthBtn) rebirthBtn.disabled = pc < 1000;
    checkAchievements();
  };

  window.checkAchievements = function () {
    achievements.forEach((a) => {
      if (
        !achievementsUnlocked[a.id] &&
        typeof a.condition === "function" &&
        a.condition()
      ) {
        achievementsUnlocked[a.id] = true;
        localStorage.setItem("pc:ach:" + a.id, "1");
        if (typeof a.reward === "function") a.reward();
      }
    });
    renderAchievements();
  };

  window.renderUpgrades = function () {
    if (upgradeListMain) {
      upgradeListMain.innerHTML = "";
      mainUpgrades.forEach((u) => {
        const lvl = upgradeLevels[u.id] || 0;
        const cost = u.costFunc ? u.costFunc(lvl) : u.cost || 0;
        const card = document.createElement("div");
        card.className = "card upgrade-card";
        const row = document.createElement("div");
        row.className = "row";
        const infoRow = document.createElement("div");
        infoRow.className = "row gap";
        const img = document.createElement("img");
        img.className = "inline-ico";
        img.alt = u.name;
        img.src = u.icon;
        infoRow.appendChild(img);
        const info = document.createElement("div");
        const title = document.createElement("div");
        title.className = "title";
        title.textContent = u.name;
        const lvlSpan = document.createElement("span");
        lvlSpan.className = "level";
        lvlSpan.textContent = "Lvl " + lvl;
        title.appendChild(lvlSpan);
        info.appendChild(title);
        const sub = document.createElement("div");
        sub.className = "sub";
        const incStr = u.increment.toString().replace(/\.0+$/, "");
        if (u.effectType === "perClick") {
          sub.textContent = "+" + incStr + " " + curr + " per click";
        } else if (u.effectType === "perSecond") {
          sub.textContent = "+" + incStr + " " + curr + " per second";
        } else {
          sub.textContent = u.desc || "";
        }
        info.appendChild(sub);
        infoRow.appendChild(info);
        row.appendChild(infoRow);
        const wanted =
          buyMode === "max" ? maxAffordable(u, lvl, pc) : Number(buyMode) || 1;
        const total = totalCostFor(u, lvl, wanted > 0 ? wanted : 1);
        const buyLabel =
          (wanted > 1 ? "Buy x" + wanted + " " : "Buy ") +
          formatCompact(total) +
          " " +
          curr;
        const buyBtn = document.createElement("button");
        buyBtn.className = "btn primary";
        buyBtn.setAttribute("data-buy", u.id);
        buyBtn.textContent = buyLabel;
        if (pc < total || wanted <= 0) buyBtn.disabled = true;
        row.appendChild(buyBtn);
        card.appendChild(row);
        upgradeListMain.appendChild(card);
      });
    }
    if (upgradeListSpecial) {
      upgradeListSpecial.innerHTML = "";
      const list = specialUpgrades
        .filter((s) =>
          typeof s.condition === "function" ? s.condition() : true
        )
        .slice();
      list.sort((a, b) => {
        const oa = specialOwned[a.id] || false;
        const ob = specialOwned[b.id] || false;
        return oa === ob ? 0 : oa ? 1 : -1;
      });
      list.forEach((s) => {
        const owned = specialOwned[s.id];
        const cost = s.costFunc ? s.costFunc() : s.cost || 0;
        const card = document.createElement("div");
        card.className = "card upgrade-card" + (owned ? " owned" : "");
        const row = document.createElement("div");
        row.className = "row";
        const infoRow = document.createElement("div");
        infoRow.className = "row gap";
        const img = document.createElement("img");
        img.className = "inline-ico";
        img.alt = s.name;
        img.src = s.icon;
        infoRow.appendChild(img);
        const info = document.createElement("div");
        const title = document.createElement("div");
        title.className = "title";
        title.textContent = s.name;
        info.appendChild(title);
        const sub = document.createElement("div");
        sub.className = "sub";
        sub.textContent = s.desc;
        info.appendChild(sub);
        infoRow.appendChild(info);
        row.appendChild(infoRow);
        const btnContainer = document.createElement("div");
        btnContainer.className = "row";
        if (owned) {
          const ownedBtn = document.createElement("button");
          ownedBtn.className = "btn disabled";
          ownedBtn.textContent = "Owned";
          ownedBtn.disabled = true;
          btnContainer.appendChild(ownedBtn);
          if (s.sellable) {
            const refund = Math.floor(cost * 0.75);
            const sellBtn = document.createElement("button");
            sellBtn.className = "btn";
            sellBtn.setAttribute("data-sell", s.id);
            sellBtn.textContent = "Sell +" + formatCompact(refund) + " " + curr;
            btnContainer.appendChild(sellBtn);
          }
        } else {
          const buyBtn = document.createElement("button");
          buyBtn.className = "btn primary";
          buyBtn.setAttribute("data-buy", s.id);
          buyBtn.textContent = "Buy " + formatCompact(cost) + " " + curr;
          if (pc < cost) buyBtn.disabled = true;
          btnContainer.appendChild(buyBtn);
        }
        row.appendChild(btnContainer);
        card.appendChild(row);
        upgradeListSpecial.appendChild(card);
      });
    }
  };

  window.renderAchievements = function () {
    const listEl = document.getElementById("achievementsList");
    if (!listEl) return;
    listEl.innerHTML = "";
    achievements.forEach((a) => {
      const unlocked = achievementsUnlocked[a.id];
      const item = document.createElement("div");
      item.className = "achievement" + (unlocked ? "" : " locked");
      const info = document.createElement("div");
      const title = document.createElement("div");
      title.textContent = a.name;
      title.className = "title";
      const desc = document.createElement("div");
      desc.className = "desc";
      if (unlocked) {
        const text = a.desc.replace(/\{P\.\}/g, curr);
        desc.textContent = text;
      } else {
        desc.textContent = "???";
      }
      info.appendChild(title);
      info.appendChild(desc);
      item.appendChild(info);
      const status = document.createElement("div");
      status.textContent = unlocked ? "Unlocked" : "";
      status.style.fontWeight = "700";
      status.style.fontSize = "11px";
      item.appendChild(status);
      listEl.appendChild(item);
    });
  };
})();
