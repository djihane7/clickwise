import type { Game } from './types';

export const games: Game[] = [
  {
    id: 'g1',
    title: 'Phishing Hunter',
    description: 'Inspect emails and mark which ones are phishing attempts.',
    concept: 'Learn to identify urgency, spoofed senders, and malicious links.',
    difficulty: 'beginner',
    xp: 120,
    icon: 'Mail',
    type: 'phishing',
  },
  {
    id: 'g2',
    title: 'Fake Website Spotter',
    description: 'Compare lookalike sites and choose the legitimate one.',
    concept: 'Train visual and URL analysis for credential-harvesting pages.',
    difficulty: 'beginner',
    xp: 110,
    icon: 'Globe',
    type: 'website',
  },
  {
    id: 'g3',
    title: 'Password Forge',
    description: 'Build the strongest password under real-world constraints.',
    concept: 'Understand length, uniqueness, and manager-backed security.',
    difficulty: 'beginner',
    xp: 100,
    icon: 'KeyRound',
    type: 'password',
  },
  {
    id: 'g4',
    title: 'Social Engineering Detector',
    description: 'Listen to scenarios and identify manipulation tactics.',
    concept: 'Recognize authority, urgency, scarcity, and reciprocity attacks.',
    difficulty: 'intermediate',
    xp: 150,
    icon: 'Users',
    type: 'social',
  },
  {
    id: 'g5',
    title: 'QR Code Integrity',
    description: 'Decide which QR codes are safe before scanning.',
    concept: 'Prevent quishing — phishing via malicious QR codes.',
    difficulty: 'intermediate',
    xp: 130,
    icon: 'QrCode',
    type: 'qr',
  },
  {
    id: 'g6',
    title: 'Smartphone Lockdown',
    description: 'Configure a virtual phone with the safest settings.',
    concept: 'Practice mobile hardening: locks, updates, permissions, backups.',
    difficulty: 'intermediate',
    xp: 140,
    icon: 'Smartphone',
    type: 'device',
  },
  {
    id: 'g7',
    title: 'Secure Wi-Fi Builder',
    description: 'Design a home network resistant to common attacks.',
    concept: 'Apply segmentation, encryption, and admin hygiene.',
    difficulty: 'advanced',
    xp: 180,
    icon: 'Wifi',
    type: 'wifi',
  },
  {
    id: 'g8',
    title: 'Ransomware Escape',
    description: 'Escape a ransomware scenario with the right containment steps.',
    concept: 'Learn isolation, backups, and why paying attackers fails.',
    difficulty: 'advanced',
    xp: 200,
    icon: 'Skull',
    type: 'ransomware',
  },
  {
    id: 'g9',
    title: 'Cyber Detective',
    description: 'Piece together digital clues to stop an identity theft plot.',
    concept: 'Connect privacy leaks, credential reuse, and social posts.',
    difficulty: 'advanced',
    xp: 190,
    icon: 'Search',
    type: 'detective',
  },
  {
    id: 'g10',
    title: 'Security Escape Room',
    description: 'Solve multi-step security puzzles to unlock the exit.',
    concept: 'Integrate password, phishing, privacy, and incident skills.',
    difficulty: 'expert',
    xp: 300,
    icon: 'DoorOpen',
    type: 'escape',
  },
];

export interface PhishingEmail {
  id: string;
  from: string;
  subject: string;
  body: string;
  isPhishing: boolean;
  explanation: string;
}

export const phishingEmails: PhishingEmail[] = [
  {
    id: 'pe1',
    from: 'security@paypa1-secure.com',
    subject: 'Urgent: Your account will be limited in 24 hours',
    body: 'We detected unusual activity. Click here immediately to verify your identity or your funds will be frozen.',
    isPhishing: true,
    explanation: 'Misspelled domain (paypa1), urgency pressure, and threat of fund freezing are classic phishing signals.',
  },
  {
    id: 'pe2',
    from: 'receipts@amazon.com',
    subject: 'Your order #112-3847291 has shipped',
    body: 'Your package is on the way. Track it in your Amazon account under Orders. No action needed.',
    isPhishing: false,
    explanation: 'No urgent call-to-action, no credential request, and a normal transactional tone.',
  },
  {
    id: 'pe3',
    from: 'IT Support <it-helpdesk@company-support.net>',
    subject: 'Password expiration — reset required today',
    body: 'Your password expires in 2 hours. Reset now using this form to avoid losing access to email and files.',
    isPhishing: true,
    explanation: 'Unexpected password reset demand with short deadline and external-looking domain.',
  },
  {
    id: 'pe4',
    from: 'noreply@github.com',
    subject: 'A new public key was added to your account',
    body: 'If you added this SSH key, no action is needed. If not, review your security settings and revoke it.',
    isPhishing: false,
    explanation: 'Security notification without asking for passwords; encourages checking official settings.',
  },
  {
    id: 'pe5',
    from: 'CEO <ceo@gmai1.com>',
    subject: 'Quick favor — need gift cards for client',
    body: 'I\'m in a meeting. Buy $500 in gift cards and send codes here. I\'ll reimburse you. Confidential.',
    isPhishing: true,
    explanation: 'Executive impersonation, secrecy, and gift-card request are hallmark business email compromise tactics.',
  },
];

export interface WebsitePair {
  id: string;
  optionA: { url: string; label: string };
  optionB: { url: string; label: string };
  correct: 'A' | 'B';
  explanation: string;
}

export const websitePairs: WebsitePair[] = [
  {
    id: 'w1',
    optionA: { url: 'https://www.microsoft.com/login', label: 'Microsoft Login' },
    optionB: { url: 'https://www.micr0soft.com/login', label: 'Microsoft Login' },
    correct: 'A',
    explanation: 'Option B replaces "o" with zero — a common homograph trick.',
  },
  {
    id: 'w2',
    optionA: { url: 'https://secure-appleid.verify-now.com/signin', label: 'Apple ID' },
    optionB: { url: 'https://appleid.apple.com/', label: 'Apple ID' },
    correct: 'B',
    explanation: 'Legitimate Apple ID uses appleid.apple.com, not a lookalike subdomain on another domain.',
  },
  {
    id: 'w3',
    optionA: { url: 'https://accounts.google.com/', label: 'Google Accounts' },
    optionB: { url: 'https://accounts.google.com.security-check.ru/login', label: 'Google Accounts' },
    correct: 'A',
    explanation: 'Option B appends another domain after google.com, which is not Google\'s domain.',
  },
];
