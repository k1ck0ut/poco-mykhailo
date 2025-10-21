window.mainUpgrades = [
  {
    id: "brainstorm",
    name: "Brainstorm",
    effectType: "perClick",
    increment: 10000,
    costFunc: (lvl) => 10 + 20 * lvl * (lvl + 1),
    icon: ICONS.upgradeIcons.brainstorm,
  },
  {
    id: "brainstorm",
    name: "Brainstorm",
    effectType: "perClick",
    increment: 1,
    costFunc: (lvl) => 10 + 20 * lvl * (lvl + 1),
    icon: ICONS.upgradeIcons.brainstorm,
  },
  {
    id: "focusing",
    name: "Focusing Time",
    effectType: "perClick",
    increment: 0.5,
    costFunc: (lvl) => 150 * (lvl + 1) * (lvl + 1),
    icon: ICONS.upgradeIcons.focusing,
  },
  {
    id: "coffee_break",
    name: "Coffee Break",
    effectType: "perClick",
    increment: 0.2,
    costFunc: (lvl) => 500 * (lvl + 1) * (lvl + 1),
    icon: ICONS.upgradeIcons.coffee_break,
  },
  {
    id: "study_algorithms",
    name: "Study Algorithms",
    effectType: "perSecond",
    increment: 0.05,
    costFunc: (lvl) => 800 * (lvl + 1) * (lvl + 1),
    icon: ICONS.upgradeIcons.study_algorithms,
  },
  {
    id: "refactoring",
    name: "Refactoring",
    effectType: "perClick",
    increment: 0.1,
    costFunc: (lvl) => 1200 * (lvl + 1) * (lvl + 1),
    icon: ICONS.upgradeIcons.refactoring,
  },
  {
    id: "debug_tools",
    name: "Debugging Tools",
    effectType: "perSecond",
    increment: 0.2,
    costFunc: (lvl) => 2000 * (lvl + 1) * (lvl + 1),
    icon: ICONS.upgradeIcons.debug_tools,
  },
  {
    id: "bootcamp",
    name: "Coding Bootcamp",
    effectType: "perClick",
    increment: 1,
    costFunc: (lvl) => 5000 * (lvl + 1) * (lvl + 1),
    icon: ICONS.upgradeIcons.bootcamp,
  },
  {
    id: "hackathon",
    name: "Hackathon",
    effectType: "perSecond",
    increment: 0.5,
    costFunc: (lvl) => 8000 * (lvl + 1) * (lvl + 1),
    icon: ICONS.upgradeIcons.hackathon,
  },
  {
    id: "optimize_code",
    name: "Optimize Code",
    effectType: "perClick",
    increment: 0.3,
    costFunc: (lvl) => 10000 * (lvl + 1) * (lvl + 1),
    icon: ICONS.upgradeIcons.optimize_code,
  },
  {
    id: "ai_assistant",
    name: "AI Assistant",
    effectType: "perSecond",
    increment: 1,
    costFunc: (lvl) => 20000 * (lvl + 1) * (lvl + 1),
    icon: ICONS.upgradeIcons.ai_assistant,
  },
  {
    id: "quantum",
    name: "Quantum Upgrade",
    effectType: "perClick",
    increment: 5,
    costFunc: (lvl) => 100000 * (lvl + 1) * (lvl + 1),
    icon: ICONS.upgradeIcons.quantum,
  },
  {
    id: "deep_learning",
    name: "Deep Learning",
    effectType: "perSecond",
    increment: 2,
    costFunc: (lvl) => 150000 * (lvl + 1) * (lvl + 1),
    icon: ICONS.upgradeIcons.deep_learning,
  },
  {
    id: "brain_machine",
    name: "Brain‑Machine Interface",
    effectType: "perClick",
    increment: 10,
    costFunc: (lvl) => 500000 * (lvl + 1) * (lvl + 1),
    icon: ICONS.upgradeIcons.brain_machine,
  },
  {
    id: "server_room",
    name: "Server Room",
    effectType: "perSecond",
    increment: 5,
    costFunc: (lvl) => 50000 * (lvl + 1) * (lvl + 1),
    icon: ICONS.upgradeIcons.server_room || ICONS.cpu,
  },
  {
    id: "research_lab",
    name: "Research Lab",
    effectType: "perSecond",
    increment: 10,
    costFunc: (lvl) => 100000 * (lvl + 1) * (lvl + 1),
    icon: ICONS.upgradeIcons.research_lab,
  },
  {
    id: "data_center",
    name: "Data Center",
    effectType: "perSecond",
    increment: 25,
    costFunc: (lvl) => 250000 * (lvl + 1) * (lvl + 1),
    icon: ICONS.upgradeIcons.data_center || ICONS.cpu,
  },
];

window.specialUpgrades = [
  {
    id: "crit_boost",
    name: "Critical Thinker",
    desc: "+5% critical chance (one-time unlock)",
    cost: 5799,
    sellable: true,
    icon: ICONS.upgradeIcons?.crit_boost,
    effect: function () {
      critFromUpgrades += 0.05;
    },
    condition: () => true,
  },
  {
    id: "crit_charm",
    name: "Lucky Charm",
    desc: "+10% critical chance",
    cost: 15000,
    sellable: true,
    icon: ICONS.upgradeIcons?.crit_charm,
    effect: function () {
      critFromUpgrades += 0.1;
    },
    condition: () => true,
  },
  {
    id: "double_click",
    name: "Double Clicker",
    desc: "Doubles your per click permanently",
    cost: 10000,
    sellable: true,
    icon: ICONS.upgradeIcons.double_click,
    effect: function () {
      perClick *= 2;
    },
    condition: () => true,
  },
  {
    id: "triple_click",
    name: "Triple Clicker",
    desc: "Triples your per click permanently",
    cost: 50000,
    sellable: true,
    icon: ICONS.upgradeIcons.triple_click,
    effect: function () {
      perClick *= 3;
    },
    condition: () => true,
  },
  {
    id: "passive_boost1",
    name: "Passive Kickstart",
    desc: "+5 per second",
    cost: 8000,
    sellable: true,
    icon: ICONS.upgradeIcons.passive_boost1,
    effect: function () {
      pcps += 5;
    },
    condition: () => true,
  },
  {
    id: "passive_boost2",
    name: "Passive Surge",
    desc: "+50 per second",
    cost: 20000,
    sellable: true,
    icon: ICONS.upgradeIcons.passive_boost2,
    effect: function () {
      pcps += 50;
    },
    condition: () => true,
  },
  {
    id: "golden_click",
    name: "Golden Finger",
    desc: "+100 per click",
    cost: 30000,
    sellable: true,
    icon: ICONS.upgradeIcons.golden_click,
    effect: function () {
      perClick += 100;
    },
    condition: () => true,
  },
  {
    id: "cash_infusion",
    name: "Cash Infusion",
    desc: "+1000 PC instantly",
    cost: 5000,
    sellable: false,
    icon: ICONS.upgradeIcons.cash_infusion,
    effect: function () {
      pc += 1000;
    },
    condition: () => true,
  },
  {
    id: "cpu_overclock",
    name: "CPU Overclock",
    desc: "+10 CPU",
    cost: 20000,
    sellable: false,
    icon: ICONS.upgradeIcons.cpu_overclock,
    effect: function () {
      cpu += 10;
    },
    condition: () => true,
  },
  {
    id: "usd_boost",
    name: "Insider Trading",
    desc: "+100 USD instantly",
    cost: 15000,
    sellable: false,
    icon: ICONS.upgradeIcons.usd_boost,
    effect: function () {
      usd += 100;
    },
    condition: () => true,
  },
  {
    id: "outsource",
    name: "Outsourcing",
    desc: "+2 per second",
    cost: 6000,
    sellable: false,
    icon: ICONS.upgradeIcons.outsource,
    effect: function () {
      pcps += 2;
    },
    condition: () => true,
  },
  {
    id: "network_boost",
    name: "Network Boost",
    desc: "Doubles passive income",
    cost: 30000,
    sellable: false,
    icon: ICONS.upgradeIcons.network_boost,
    effect: function () {
      pcps *= 2;
    },
    condition: () => true,
  },
  {
    id: "tools",
    name: "Automation Tools",
    desc: "+0.5 per click",
    cost: 4000,
    sellable: false,
    icon: ICONS.upgradeIcons.tools,
    effect: function () {
      perClick += 0.5;
    },
    condition: () => true,
  },
  {
    id: "new_computer",
    name: "New Computer",
    desc: "+5 per click",
    cost: 10000,
    sellable: false,
    icon: ICONS.upgradeIcons.new_computer,
    effect: function () {
      perClick += 5;
    },
    condition: () => true,
  },
  {
    id: "mentor",
    name: "Mentorship",
    desc: "+10 per second",
    cost: 25000,
    sellable: false,
    icon: ICONS.upgradeIcons.mentor,
    effect: function () {
      pcps += 10;
    },
    condition: () => true,
  },
  {
    id: "time_machine",
    name: "Time Machine",
    desc: "+100k instantly",
    cost: 70000,
    sellable: false,
    icon: ICONS.upgradeIcons.time_machine,
    effect: function () {
      pc += 100000;
    },
    condition: () => true,
  },
  {
    id: "design_skin",
    name: "Dark Theme Pack",
    desc: "Unlocks neon theme",
    cost: 5000,
    sellable: false,
    icon: ICONS.upgradeIcons.design_skin,
    effect: function () {
      theme = "neon";
      applyTheme();
    },
    condition: () => true,
  },
  {
    id: "music_pack",
    name: "Music Pack",
    desc: "Background music unlocked",
    cost: 5000,
    sellable: false,
    icon: ICONS.upgradeIcons.music_pack,
    effect: function () {
      music = true;
    },
    condition: () => true,
  },
  {
    id: "usd_billionaire",
    name: "Billionaire Gift",
    desc: "+1,000,000 USD instantly",
    cost: 1000000,
    sellable: false,
    icon: ICONS.upgradeIcons.usd_billionaire,
    effect: function () {
      usd += 1000000;
    },
    condition: () => true,
  },
  {
    id: "cpu_factory",
    name: "CPU Factory",
    desc: "+100 CPU",
    cost: 50000,
    sellable: false,
    icon: ICONS.upgradeIcons.cpu_factory,
    effect: function () {
      cpu += 100;
    },
    condition: () => true,
  },
  {
    id: "resource_pack",
    name: "Resource Pack",
    desc: "+100 PC, +10 CPU, +50 USD",
    cost: 25000,
    sellable: false,
    icon: ICONS.upgradeIcons.resource_pack,
    effect: function () {
      pc += 100;
      cpu += 10;
      usd += 50;
    },
    condition: () => true,
  },
  {
    id: "unlock_shop",
    name: "Unlock Shop",
    desc: "Opens the top Shop tab",
    costFunc: () => shopCost(),
    icon: ICONS.upgradeIcons.unlock_shop || ICONS.shop,
    effect: function () {
      shopUnlocked = true;
    },
    condition: () =>
      (upgradeLevels.brainstorm || brainLvl) >= 10 && !shopUnlocked,
  },
];
