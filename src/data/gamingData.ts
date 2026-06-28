import { GameMode, LeaderboardPlayer, Material, NewsItem, Recipe } from '../types';

export const SERVER_IP = "play.pixelrealms.net";
export const DISCORD_INVITE = "https://discord.gg/pixelrealms";
export const STORE_URL = "https://store.pixelrealms.net";

export const MATERIALS: Material[] = [
  { id: 'wood', name: 'Oak Planks', icon: '🪵', color: '#855d33', rarity: 'common' },
  { id: 'stick', name: 'Wooden Stick', icon: '🦯', color: '#6e4c23', rarity: 'common' },
  { id: 'stone', name: 'Cobblestone', icon: '🪨', color: '#7a7a7a', rarity: 'common' },
  { id: 'iron', name: 'Iron Ingot', icon: '⚪', color: '#d8d8d8', rarity: 'uncommon' },
  { id: 'gold', name: 'Gold Ingot', icon: '🟡', color: '#ffd700', rarity: 'rare' },
  { id: 'diamond', name: 'Diamond', icon: '💎', color: '#4ee2ec', rarity: 'epic' },
  { id: 'redstone', name: 'Redstone Dust', icon: '🔴', color: '#ff2424', rarity: 'uncommon' },
  { id: 'gunpowder', name: 'Gunpowder', icon: '🌑', color: '#404040', rarity: 'uncommon' },
  { id: 'sand', name: 'Sand', icon: '⏳', color: '#e2d39b', rarity: 'common' },
  { id: 'apple', name: 'Red Apple', icon: '🍎', color: '#e53935', rarity: 'common' },
];

export const RECIPES: Recipe[] = [
  {
    id: 'diamond_sword',
    outputName: 'Diamond Sword',
    outputIcon: '🗡️',
    outputCount: 1,
    pattern: [
      null, 'diamond', null,
      null, 'diamond', null,
      null, 'stick', null
    ],
    description: '+14 Attack Damage. Slices through creepers with legendary ease!',
    achievement: 'Advancement Made: Monster Hunter!'
  },
  {
    id: 'diamond_pickaxe',
    outputName: 'Diamond Pickaxe',
    outputIcon: '⛏️',
    outputCount: 1,
    pattern: [
      'diamond', 'diamond', 'diamond',
      null, 'stick', null,
      null, 'stick', null
    ],
    description: 'Can mine Obsidian and Ancient Debris at ultra speed.',
    achievement: 'Advancement Made: Isn\'t It Iron Pick?'
  },
  {
    id: 'golden_apple',
    outputName: 'Enchanted Golden Apple',
    outputIcon: '🍏',
    outputCount: 1,
    pattern: [
      'gold', 'gold', 'gold',
      'gold', 'apple', 'gold',
      'gold', 'gold', 'gold'
    ],
    description: 'Grants Regeneration II, Absorption IV, Resistance, and Fire Resistance!',
    achievement: 'Advancement Made: Overpowered!'
  },
  {
    id: 'tnt',
    outputName: 'TNT Block',
    outputIcon: '🧨',
    outputCount: 1,
    pattern: [
      'gunpowder', 'sand', 'gunpowder',
      'sand', 'gunpowder', 'sand',
      'gunpowder', 'sand', 'gunpowder'
    ],
    description: 'Explosive device. Handle with caution near faction bases.',
    achievement: 'Advancement Made: Demolition Expert!'
  },
  {
    id: 'iron_chestplate',
    outputName: 'Iron Chestplate',
    outputIcon: '🛡️',
    outputCount: 1,
    pattern: [
      'iron', null, 'iron',
      'iron', 'iron', 'iron',
      'iron', 'iron', 'iron'
    ],
    description: '+6 Armor protection. Reliable steel forging.',
    achievement: 'Advancement Made: Suit Up!'
  },
  {
    id: 'stone_axe',
    outputName: 'Cobblestone Axe',
    outputIcon: '🪓',
    outputCount: 1,
    pattern: [
      'stone', 'stone', null,
      'stone', 'stick', null,
      null, 'stick', null
    ],
    description: 'Essential survival tool for chopping timber and fending off spiders.',
    achievement: 'Advancement Made: Timber!'
  }
];

export const GAME_MODES: GameMode[] = [
  {
    id: 'survival',
    title: 'Hardcore SMP Survival',
    description: 'Pure vanilla+ economy sandbox. Claim your land, build massive automated farms, and survive the blood moon events.',
    playersOnline: 642,
    version: 'v1.20.4',
    tag: 'MOST POPULAR',
    icon: '🌍',
    accentColor: '#4caf50'
  },
  {
    id: 'bedwars',
    title: 'Pixel Bedwars PvP',
    description: 'Protect your obsidian bed while bridging across floating islands to eliminate rival teams with fireballs and iron golems.',
    playersOnline: 418,
    version: '1.8.9 - 1.20',
    tag: 'FAST PVP',
    icon: '🛏️',
    accentColor: '#e53935'
  },
  {
    id: 'skyblock',
    title: 'Skyblock Realms',
    description: 'Start on a tiny floating grass island with a bucket of lava and ice. Expand into a multi-million dollar industrial sky empire.',
    playersOnline: 295,
    version: 'v1.20.4',
    tag: 'ECONOMY',
    icon: '☁️',
    accentColor: '#03a9f4'
  },
  {
    id: 'factions',
    title: 'Anarchy Factions',
    description: 'Form alliances, construct impregnable obsidian water cannons, and raid enemy faction vaults for spawners.',
    playersOnline: 185,
    version: '1.8.9 Combat',
    tag: 'HARDCORE',
    icon: '⚔️',
    accentColor: '#ff9800'
  }
];

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: 'nether_update',
    title: 'v2.4 Nether Bastion Overhaul & Custom Enchants',
    date: '2 HOURS AGO',
    category: 'UPDATE',
    summary: 'We have completely reset the Nether realm! Explore new Piglin fortress dungeons, discover tier-5 custom enchantments like Lifesteal and Excavator, and battle the Infernal Dragon boss every Saturday.',
    author: 'Admin_Notch',
    likes: 342
  },
  {
    id: 'weekend_xp',
    title: 'Double mcMMO XP Weekend + Crate Giveaway',
    date: 'YESTERDAY',
    category: 'EVENT',
    summary: 'Join us this Friday through Sunday for 2X skill leveling speed across Mining, Herbalism, and Acrobatics! Every 30 minutes online grants 1 free Mystery Vote Key.',
    author: 'Mod_Jeb',
    likes: 519
  },
  {
    id: 'hardware_up',
    title: 'Server Hardware Upgrade: Ryzen 9 7950X3D Deployment',
    date: 'JUNE 22',
    category: 'MAINTENANCE',
    summary: 'Say goodbye to block lag! We migrated all 4 realm nodes to dedicated overclocked hardware with NVMe storage. Server TPS locked solid at 20.00 even with 1,500 active redstone contraptions.',
    author: 'Dev_Dinnerbone',
    likes: 812
  }
];

export const LEADERBOARD_PLAYERS: LeaderboardPlayer[] = [
  { rank: 1, username: 'TechnoBlade_Fan', avatar: '👑', score: '3,482 Kills', badge: 'PvP Warlord' },
  { rank: 2, username: 'RedstoneWizard99', avatar: '🧙‍♂️', score: '$42.8 Million', badge: 'Richest Miner' },
  { rank: 3, username: 'CaptainSparklez_X', avatar: '⚔️', score: '142 Dungeons', badge: 'Nether Slayer' },
  { rank: 4, username: 'Builder_Steve', avatar: '🧱', score: '840,000 Blocks', badge: 'Master Architect' },
  { rank: 5, username: 'Alex_The_Explorer', avatar: '🗺️', score: '99.4% Map', badge: 'Cartographer' },
];
