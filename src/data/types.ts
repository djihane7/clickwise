export type Dimension =
  | 'password'
  | 'privacy'
  | 'device'
  | 'socialEngineering'
  | 'phishing'
  | 'socialMedia'
  | 'identity'
  | 'aiAwareness'
  | 'dataProtection'
  | 'safeBrowsing'
  | 'criticalThinking'
  | 'emergencyResponse';

export const DIMENSION_LABELS: Record<Dimension, string> = {
  password: 'Password Security',
  privacy: 'Privacy',
  device: 'Device Protection',
  socialEngineering: 'Social Engineering',
  phishing: 'Phishing',
  socialMedia: 'Social Media',
  identity: 'Digital Identity',
  aiAwareness: 'AI Awareness',
  dataProtection: 'Data Protection',
  safeBrowsing: 'Safe Browsing',
  criticalThinking: 'Critical Thinking',
  emergencyResponse: 'Emergency Response',
};

export interface AssessmentOption {
  text: string;
  scores: Partial<Record<Dimension, number>>;
  trait?: string;
}

export interface AssessmentQuestion {
  id: string;
  scenario: string;
  context?: string;
  options: AssessmentOption[];
  dimension: Dimension;
}

export interface DNATrait {
  id: string;
  title: string;
  description: string;
  type: 'strength' | 'risk' | 'neutral';
  icon: string;
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  dimension: Dimension;
  xp: number;
  steps: string[];
  completed?: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  xp: number;
  unlocked: boolean;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface Game {
  id: string;
  title: string;
  description: string;
  concept: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  xp: number;
  icon: string;
  type: 'phishing' | 'password' | 'website' | 'social' | 'qr' | 'device' | 'wifi' | 'ransomware' | 'detective' | 'escape';
}

export interface EmergencyGuide {
  id: string;
  title: string;
  icon: string;
  urgency: 'critical' | 'high' | 'medium';
  summary: string;
  steps: { title: string; detail: string }[];
  tips: string[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  level: string;
  lessons: number;
  progress: number;
}

export interface UserProfile {
  name: string;
  email: string;
  registered: boolean;
  assessmentComplete: boolean;
  dimensionScores: Record<Dimension, number>;
  overallScore: number;
  traits: DNATrait[];
  xp: number;
  level: number;
  streak: number;
  completedMissions: string[];
  unlockedAchievements: string[];
  completedGames: string[];
  courseProgress: Record<string, number>;
  history: { date: string; score: number }[];
}
