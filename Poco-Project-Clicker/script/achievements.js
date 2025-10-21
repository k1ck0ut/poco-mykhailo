window.achievements = [
  {
    id: "first_click",
    name: "First Click",
    desc: "Make your very first click.",
    condition: () => totalClicks >= 1,
  },
  {
    id: "click_master",
    name: "Click Master",
    desc: "Reach 1000 total clicks.",
    condition: () => totalClicks >= 1000,
  },
  {
    id: "wealthy",
    name: "Wealthy",
    desc: "Accumulate 10k {P.}.",
    condition: () => pc >= 10000,
  },
  {
    id: "brainiac",
    name: "Brainiac",
    desc: "Level up Brainstorm 20 times.",
    condition: () => (upgradeLevels.brainstorm || brainLvl) >= 20,
  },
  {
    id: "reset_novice",
    name: "Reset Novice",
    desc: "Reset the game 5 times with 1000 {P.}.",
    condition: () => rebirthCount >= 5,
  },
  {
    id: "secret_reset",
    name: "Secret Rebooter",
    desc: "Reset 10 times with 1000 {P.}. Gain +5 per click!",
    condition: () => secretUnlocked,
    reward: () => {},
  },
];
