import type { Achievement } from './types';

export const achievements: Achievement[] = [
  { id: 'a1', title: 'DNA Awakened', description: 'Complete your first ClickWise assessment', icon: 'Dna', xp: 50, unlocked: false, rarity: 'common' },
  { id: 'a2', title: 'First Mission', description: 'Complete your first security mission', icon: 'Target', xp: 50, unlocked: false, rarity: 'common' },
  { id: 'a3', title: 'Streak Starter', description: 'Maintain a 3-day learning streak', icon: 'Flame', xp: 75, unlocked: false, rarity: 'common' },
  { id: 'a4', title: 'Phish Finder', description: 'Score 100% in Phishing Hunter', icon: 'Mail', xp: 100, unlocked: false, rarity: 'rare' },
  { id: 'a5', title: 'Password Architect', description: 'Complete Password Forge with a strong score', icon: 'KeyRound', xp: 100, unlocked: false, rarity: 'rare' },
  { id: 'a6', title: 'Privacy Sentinel', description: 'Reach 80+ in Privacy dimension', icon: 'EyeOff', xp: 120, unlocked: false, rarity: 'rare' },
  { id: 'a7', title: 'Mission Marathon', description: 'Complete 5 missions', icon: 'Map', xp: 150, unlocked: false, rarity: 'epic' },
  { id: 'a8', title: 'Week Warrior', description: 'Maintain a 7-day streak', icon: 'Calendar', xp: 150, unlocked: false, rarity: 'epic' },
  { id: 'a9', title: 'Incident Ready', description: 'Complete an Emergency Mode guide', icon: 'Shield', xp: 100, unlocked: false, rarity: 'rare' },
  { id: 'a10', title: 'Cyber Guardian', description: 'Reach overall security score of 85+', icon: 'Award', xp: 250, unlocked: false, rarity: 'legendary' },
  { id: 'a11', title: 'Game Master', description: 'Complete 5 different cyber games', icon: 'Gamepad2', xp: 200, unlocked: false, rarity: 'epic' },
  { id: 'a12', title: 'Hidden: Shadow Analyst', description: 'Discover the secret perfect assessment path', icon: 'Ghost', xp: 300, unlocked: false, rarity: 'legendary' },
];

export function getCyberRank(level: number): string {
  if (level >= 20) return 'Cyber Legend';
  if (level >= 15) return 'Security Architect';
  if (level >= 10) return 'Digital Guardian';
  if (level >= 7) return 'Threat Analyst';
  if (level >= 5) return 'Security Apprentice';
  if (level >= 3) return 'Cyber Novice';
  return 'DNA Initiate';
}

export function xpForLevel(level: number): number {
  return level * 200;
}

export function levelFromXp(xp: number): number {
  let level = 1;
  let remaining = xp;
  while (remaining >= xpForLevel(level)) {
    remaining -= xpForLevel(level);
    level += 1;
    if (level > 50) break;
  }
  return level;
}
