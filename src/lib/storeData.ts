export type Rank = {
  id: string;
  name: string;
  price: number;
  color: string;
  description: string;
  perks: string[];
};

export type Crate = {
  id: string;
  name: string;
  price: number;
  color: string;
  description: string;
  rewards: { name: string; chance: string }[];
};

export const ranks: Rank[] = [
  {
    id: "novice",
    name: "Novice",
    price: 4.99,
    color: "from-blue-400 to-blue-600",
    description: "Start your journey with essential survival perks.",
    perks: ["/feed command", "1 Home", "White chat color"]
  },
  {
    id: "warrior",
    name: "Warrior",
    price: 14.99,
    color: "from-green-400 to-green-600",
    description: "Stand out in the arena with combat advantages.",
    perks: ["/heal command", "3 Homes", "Green chat color", "Keep Inventory (50% chance)"]
  },
  {
    id: "knight",
    name: "Knight",
    price: 29.99,
    color: "from-yellow-400 to-yellow-600",
    description: "A respected member of the realm.",
    perks: ["/fly in spawn", "5 Homes", "Yellow chat color", "Keep Inventory (100% chance)"]
  },
  {
    id: "elite",
    name: "Elite",
    price: 49.99,
    color: "from-purple-400 to-purple-600",
    description: "For the dedicated players seeking true power.",
    perks: ["/fly everywhere", "10 Homes", "Purple chat color", "Access to Elite Kit"]
  },
  {
    id: "legend",
    name: "Legend",
    price: 79.99,
    color: "from-pink-400 to-pink-600",
    description: "Write your name in the history books.",
    perks: ["Unlimited Homes", "Pink chat color", "Access to Legend Kit", "Custom Nickname"]
  },
  {
    id: "mythic",
    name: "Mythic",
    price: 149.99,
    color: "from-red-500 to-red-700",
    description: "The ultimate God-tier rank. Rule the server.",
    perks: ["All previous perks", "God Kit", "Bypass queue", "Custom Join Message", "Bypass slowmode"]
  }
];

export const crates: Crate[] = [
  {
    id: "basic_crate",
    name: "Basic Crate",
    price: 1.99,
    color: "from-gray-400 to-gray-600",
    description: "A simple crate to get you started with basic resources.",
    rewards: [
      { name: "32x Diamond", chance: "40%" },
      { name: "1x Iron Golem Spawner", chance: "20%" },
      { name: "Novice Rank (1 Day)", chance: "5%" }
    ]
  },
  {
    id: "epic_crate",
    name: "Epic Crate",
    price: 4.99,
    color: "from-purple-500 to-indigo-600",
    description: "Valuable loot that will give you a major advantage.",
    rewards: [
      { name: "64x Diamond Block", chance: "30%" },
      { name: "1x Zombie Pigman Spawner", chance: "15%" },
      { name: "Warrior Rank (1 Week)", chance: "5%" }
    ]
  },
  {
    id: "legendary_crate",
    name: "Legendary Crate",
    price: 9.99,
    color: "from-yellow-400 to-orange-500",
    description: "The highest tier loot available in the realm.",
    rewards: [
      { name: "1x Bedrock", chance: "10%" },
      { name: "Mythic Key", chance: "5%" },
      { name: "Permanent Elite Rank", chance: "1%" }
    ]
  }
];
