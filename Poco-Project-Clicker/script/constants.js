window.LS = {
  pc: "pc:pc",
  usd: "pc:usd",
  cpu: "pc:cpu",
  perClick: "pc:perClick",
  total: "pc:total",
  brain: "pc:brain",
  shop: "pc:shop",
  theme: "pc:theme",
  logo: "pc:logo",
  curr: "pc:curr",
  sfx: "pc:sfx",
  music: "pc:music",
};

window.formatCompact = function (n) {
  const abs = Math.abs(n);
  const units = [
    { s: "T", v: 1e12 },
    { s: "B", v: 1e9 },
    { s: "M", v: 1e6 },
    { s: "k", v: 1e3 },
  ];
  for (const u of units) {
    if (abs >= u.v) {
      const v = n / u.v;
      const d = v < 10 ? 2 : v < 100 ? 1 : 0;
      const str = v.toFixed(d).replace(/\.0+$|(\.\d*[1-9])0+$/, "$1");
      return str + u.s;
    }
  }
  if (Number.isInteger(n)) return String(n);
  return n.toFixed(2).replace(/\.0+$|(\.\d*[1-9])0+$/, "$1");
};

window.ICONS = {
  logoPresets: {
    PowerCoders: "assets/logo.png",
    HTML: "assets/logo_bolt.png",
    Understanding: "assets/logo_cube.png",
  },
  upgrades: "assets/upgrades.png",
  shop: "assets/shop.png",
  stats: "assets/stats.png",
  map: "assets/map.png",
  inventory: "assets/inventory.png",
  cpu: "assets/cpu.png",

  upgradeIcons: {
    brainstorm: "assets/brainstorm.png",
    focusing: "assets/focusing.png",
    coffee_break: "assets/coffee_break.png",
    study_algorithms: "assets/study_algorithms.png",
    refactoring: "assets/refactoring.png",
    debug_tools: "assets/debug_tools.png",
    bootcamp: "assets/bootcamp.png",
    hackathon: "assets/hackathon.png",
    optimize_code: "assets/optimize_code.png",
    ai_assistant: "assets/ai_assistant.png",
    quantum: "assets/quantum.png",
    deep_learning: "assets/deep_learning.png",
    brain_machine: "assets/brain_machine.png",
    crit_boost: "assets/crit_boost.png",
    double_click: "assets/double_click.png",
    triple_click: "assets/triple_click.png",
    passive_boost1: "assets/passive_boost1.png",
    passive_boost2: "assets/passive_boost2.png",
    crit_charm: "assets/crit_charm.png",
    golden_click: "assets/golden_click.png",
    cash_infusion: "assets/cash_infusion.png",
    cpu_overclock: "assets/cpu_overclock.png",
    usd_boost: "assets/usd_boost.png",
    outsource: "assets/outsource.png",
    network_boost: "assets/network_boost.png",
    tools: "assets/tools.png",
    new_computer: "assets/new_computer.png",
    mentor: "assets/mentor.png",
    time_machine: "assets/time_machine.png",
    design_skin: "assets/design_skin.png",
    music_pack: "assets/music_pack.png",
    usd_billionaire: "assets/usd_billionaire.png",
    cpu_factory: "assets/cpu_factory.png",
    resource_pack: "assets/resource_pack.png",
    unlock_shop: "assets/unlock_shop.png",
    server_room: "assets/server_room.png",
    research_lab: "assets/research_lab.png",
    data_center: "assets/data_center.png",
  },
};

window.STYLE_PRESETS = {
  PowerCoders: { logoKey: "PowerCoders", currency: "{P.}" },
  HTML: { logoKey: "HTML", currency: "</>" },
  Understanding: { logoKey: "Understanding", currency: "._." },
};
