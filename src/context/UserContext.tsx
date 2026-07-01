import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Dimension, DNATrait, UserProfile } from '../data/types';
import { DIMENSION_LABELS } from '../data/types';
import { levelFromXp } from '../data/achievements';

const STORAGE_KEY = 'clickwise-user-v1';

const emptyScores = (): Record<Dimension, number> => ({
  password: 0,
  privacy: 0,
  device: 0,
  socialEngineering: 0,
  phishing: 0,
  socialMedia: 0,
  identity: 0,
  aiAwareness: 0,
  dataProtection: 0,
  safeBrowsing: 0,
  criticalThinking: 0,
  emergencyResponse: 0,
});

const defaultProfile = (): UserProfile => ({
  name: '',
  email: '',
  registered: false,
  assessmentComplete: false,
  dimensionScores: emptyScores(),
  overallScore: 0,
  traits: [],
  xp: 0,
  level: 1,
  streak: 0,
  completedMissions: [],
  unlockedAchievements: [],
  completedGames: [],
  courseProgress: {},
  history: [],
});

interface UserContextValue {
  user: UserProfile;
  register: (name: string, email: string) => void;
  logout: () => void;
  submitAssessment: (scores: Record<Dimension, number>, traits: DNATrait[]) => void;
  completeMission: (missionId: string, xp: number) => void;
  completeGame: (gameId: string, xp: number, perfect?: boolean) => void;
  unlockAchievement: (id: string, xp?: number) => void;
  addXp: (amount: number) => void;
  updateCourseProgress: (courseId: string, progress: number) => void;
  markEmergencyViewed: () => void;
  incrementStreak: () => void;
}

const UserContext = createContext<UserContextValue | null>(null);

function deriveTraits(scores: Record<Dimension, number>, collected: string[]): DNATrait[] {
  const traits: DNATrait[] = [];
  const pushUnique = (trait: DNATrait) => {
    if (!traits.find((t) => t.id === trait.id)) traits.push(trait);
  };

  collected.forEach((title, i) => {
    const isRisk = /Risk|Recycler|Avoider|Giver|Oversharer|Follower|Explorer|Opener|Connector|Impulse|Open Book/i.test(title);
    pushUnique({
      id: `collected-${i}`,
      title,
      description: isRisk
        ? 'A behavioral pattern that increases exposure. Missions will help reshape this habit.'
        : 'A protective behavioral pattern reflected in your assessment choices.',
      type: isRisk ? 'risk' : 'strength',
      icon: isRisk ? 'AlertTriangle' : 'Shield',
    });
  });

  (Object.keys(scores) as Dimension[]).forEach((dim) => {
    const score = scores[dim];
    if (score >= 85) {
      pushUnique({
        id: `strong-${dim}`,
        title: `${DIMENSION_LABELS[dim]} Specialist`,
        description: `Consistently strong decisions in ${DIMENSION_LABELS[dim].toLowerCase()}.`,
        type: 'strength',
        icon: 'Award',
      });
    } else if (score > 0 && score < 50) {
      pushUnique({
        id: `risk-${dim}`,
        title: `${DIMENSION_LABELS[dim]} Growth Zone`,
        description: `Priority improvement area in ${DIMENSION_LABELS[dim].toLowerCase()}.`,
        type: 'risk',
        icon: 'Target',
      });
    }
  });

  return traits.slice(0, 8);
}

export function computeAssessment(
  answers: { scores: Partial<Record<Dimension, number>>; trait?: string }[]
): { scores: Record<Dimension, number>; traits: DNATrait[] } {
  const totals: Record<Dimension, { sum: number; count: number }> = {
    password: { sum: 0, count: 0 },
    privacy: { sum: 0, count: 0 },
    device: { sum: 0, count: 0 },
    socialEngineering: { sum: 0, count: 0 },
    phishing: { sum: 0, count: 0 },
    socialMedia: { sum: 0, count: 0 },
    identity: { sum: 0, count: 0 },
    aiAwareness: { sum: 0, count: 0 },
    dataProtection: { sum: 0, count: 0 },
    safeBrowsing: { sum: 0, count: 0 },
    criticalThinking: { sum: 0, count: 0 },
    emergencyResponse: { sum: 0, count: 0 },
  };

  const collectedTraits: string[] = [];

  answers.forEach((answer) => {
    if (answer.trait) collectedTraits.push(answer.trait);
    (Object.keys(answer.scores) as Dimension[]).forEach((dim) => {
      const val = answer.scores[dim];
      if (typeof val === 'number') {
        totals[dim].sum += val;
        totals[dim].count += 1;
      }
    });
  });

  const scores = emptyScores();
  (Object.keys(totals) as Dimension[]).forEach((dim) => {
    scores[dim] = totals[dim].count ? Math.round(totals[dim].sum / totals[dim].count) : 50;
  });

  return { scores, traits: deriveTraits(scores, collectedTraits) };
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return { ...defaultProfile(), ...JSON.parse(raw) };
    } catch {
      /* ignore */
    }
    return defaultProfile();
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  }, [user]);

  const api = useMemo<UserContextValue>(() => ({
    user,
    register: (name, email) => {
      setUser((u) => ({ ...u, name, email, registered: true, streak: Math.max(u.streak, 1) }));
    },
    logout: () => setUser(defaultProfile()),
    submitAssessment: (scores, traits) => {
      const values = Object.values(scores);
      const overallScore = Math.round(values.reduce((a, b) => a + b, 0) / values.length);
      setUser((u) => ({
        ...u,
        assessmentComplete: true,
        dimensionScores: scores,
        traits,
        overallScore,
        xp: u.xp + 100,
        level: levelFromXp(u.xp + 100),
        unlockedAchievements: u.unlockedAchievements.includes('a1')
          ? u.unlockedAchievements
          : [...u.unlockedAchievements, 'a1'],
        history: [...u.history, { date: new Date().toISOString(), score: overallScore }],
      }));
    },
    completeMission: (missionId, xp) => {
      setUser((u) => {
        if (u.completedMissions.includes(missionId)) return u;
        const completedMissions = [...u.completedMissions, missionId];
        const unlocked = [...u.unlockedAchievements];
        if (!unlocked.includes('a2')) unlocked.push('a2');
        if (completedMissions.length >= 5 && !unlocked.includes('a7')) unlocked.push('a7');
        const newXp = u.xp + xp;
        return {
          ...u,
          completedMissions,
          unlockedAchievements: unlocked,
          xp: newXp,
          level: levelFromXp(newXp),
          streak: u.streak + 1,
        };
      });
    },
    completeGame: (gameId, xp, perfect) => {
      setUser((u) => {
        const completedGames = u.completedGames.includes(gameId)
          ? u.completedGames
          : [...u.completedGames, gameId];
        const unlocked = [...u.unlockedAchievements];
        if (perfect && gameId === 'g1' && !unlocked.includes('a4')) unlocked.push('a4');
        if (perfect && gameId === 'g3' && !unlocked.includes('a5')) unlocked.push('a5');
        if (completedGames.length >= 5 && !unlocked.includes('a11')) unlocked.push('a11');
        const gained = u.completedGames.includes(gameId) ? Math.round(xp / 4) : xp;
        const newXp = u.xp + gained;
        return {
          ...u,
          completedGames,
          unlockedAchievements: unlocked,
          xp: newXp,
          level: levelFromXp(newXp),
        };
      });
    },
    unlockAchievement: (id, xp = 0) => {
      setUser((u) => {
        if (u.unlockedAchievements.includes(id)) return u;
        const newXp = u.xp + xp;
        return {
          ...u,
          unlockedAchievements: [...u.unlockedAchievements, id],
          xp: newXp,
          level: levelFromXp(newXp),
        };
      });
    },
    addXp: (amount) => {
      setUser((u) => ({ ...u, xp: u.xp + amount, level: levelFromXp(u.xp + amount) }));
    },
    updateCourseProgress: (courseId, progress) => {
      setUser((u) => ({
        ...u,
        courseProgress: { ...u.courseProgress, [courseId]: progress },
        xp: u.xp + 10,
        level: levelFromXp(u.xp + 10),
      }));
    },
    markEmergencyViewed: () => {
      setUser((u) => ({
        ...u,
        unlockedAchievements: u.unlockedAchievements.includes('a9')
          ? u.unlockedAchievements
          : [...u.unlockedAchievements, 'a9'],
        xp: u.unlockedAchievements.includes('a9') ? u.xp : u.xp + 100,
        level: levelFromXp(u.unlockedAchievements.includes('a9') ? u.xp : u.xp + 100),
      }));
    },
    incrementStreak: () => {
      setUser((u) => {
        const streak = u.streak + 1;
        const unlocked = [...u.unlockedAchievements];
        if (streak >= 3 && !unlocked.includes('a3')) unlocked.push('a3');
        if (streak >= 7 && !unlocked.includes('a8')) unlocked.push('a8');
        return { ...u, streak, unlockedAchievements: unlocked };
      });
    },
  }), [user]);

  return <UserContext.Provider value={api}>{children}</UserContext.Provider>;
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used within UserProvider');
  return ctx;
}
