import type { Achievement } from "@/components/AchievementSystem";

const ACHIEVEMENTS_DATA: Achievement[] = [
  {
    id: "player_entered",
    title: "PLAYER 1 HAS ENTERED",
    desc: "Welcome to PORTFOLIO.EXE",
  },
  {
    id: "about",
    title: "WHO IS THIS GUY?",
    desc: "Investigated the About section",
  },
  {
    id: "skills",
    title: "SKILL CHECK",
    desc: "Reviewed the skill tree",
  },
  {
    id: "timeline",
    title: "VETERAN SPOTTED",
    desc: "Checked the journey log",
  },
  {
    id: "projects",
    title: "PROJECT UNLOCKED",
    desc: "Explored the project vault",
  },
  {
    id: "contact",
    title: "READY TO CONNECT",
    desc: "Reached the contact terminal",
  },
  {
    id: "cv",
    title: "SPY MODE ACTIVATED",
    desc: "Accessed the classified CV",
  },
  {
    id: "footer",
    title: "YOU REACHED THE END",
    desc: "Completed the full run",
  },
  {
    id: "deep_reader",
    title: "DEEP READER",
    desc: "Spent 60 seconds on this page",
  },
  {
    id: "secret_combo",
    title: "SECRET COMBO",
    desc: "You clicked AIRU 9 times. True gamer instincts.",
  },
  {
    id: "photography",
    title: "PHOTOGRAPHER MODE",
    desc: "Visited the photography portfolio. Nice eye.",
  },
  {
    id: "devtools_open",
    title: "HACKING ACTIVITY",
    desc: "So you think you can hack me? CUTE. 👀",
  },
  {
    id: "konami",
    title: "CHEATER",
    desc: "↑↑↓↓←→←→BA. You absolute menace.",
    revealed: true,
  },
  {
    id: "pay_to_win",
    title: "PAY TO WIN",
    desc: "Unlocked all achievements at once. Absolute legend.",
    revealed: true,
    lockedDesc: "Requires: 1x job offer. You have: 0. Skill issue.",
  },
];

export default ACHIEVEMENTS_DATA;
