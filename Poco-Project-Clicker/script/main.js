(function () {
  window.initGame = function () {
    applyTheme();
    applyIcons();
    applyCurrency();
    populateSettings();
    recomputeDerived();
    render();
    closeAllPanels();
    setInterval(() => {
      if (pcps > 0) {
        pc += pcps;
        render();
        save();
      }
    }, 1000);
    renderAchievements();
    checkAchievements();
  };
  if (document.readyState !== "loading") {
    initGame();
  } else {
    document.addEventListener("DOMContentLoaded", initGame);
  }
})();
