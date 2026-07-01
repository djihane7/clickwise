import type { AssessmentQuestion } from './types';

export const assessmentQuestions: AssessmentQuestion[] = [
  {
    id: 'q1',
    scenario: 'Someone sends you an urgent email claiming your bank account will be locked in 2 hours unless you verify your details immediately.',
    context: 'The email looks official and uses your bank\'s logo.',
    dimension: 'phishing',
    options: [
      { text: 'Click the link and verify immediately — better safe than locked out', scores: { phishing: 10, criticalThinking: 15, emergencyResponse: 20 }, trait: 'Impulse Responder' },
      { text: 'Open the link but only enter partial information to test it', scores: { phishing: 30, criticalThinking: 35 }, trait: 'Cautious Tester' },
      { text: 'Ignore it completely and delete without checking anything', scores: { phishing: 55, criticalThinking: 50, emergencyResponse: 40 } },
      { text: 'Close the email, open my bank app or type the official URL myself, and check for alerts', scores: { phishing: 95, criticalThinking: 90, emergencyResponse: 85 }, trait: 'Email Investigator' },
    ],
  },
  {
    id: 'q2',
    scenario: 'A friend messages you on WhatsApp with a strange file and says "You won\'t believe this, open it now!"',
    context: 'The message tone feels slightly off compared to how they usually write.',
    dimension: 'socialEngineering',
    options: [
      { text: 'Open it immediately — it\'s from a friend', scores: { socialEngineering: 10, criticalThinking: 15, device: 20 }, trait: 'Trust-First Opener' },
      { text: 'Ask what it is, then open if they explain', scores: { socialEngineering: 45, criticalThinking: 50 } },
      { text: 'Ignore the message entirely', scores: { socialEngineering: 60, criticalThinking: 55 } },
      { text: 'Message them on a different channel to verify they sent it before interacting', scores: { socialEngineering: 95, criticalThinking: 90, device: 85 }, trait: 'Channel Verifier' },
    ],
  },
  {
    id: 'q3',
    scenario: 'You need a new password for an important account. What approach do you take?',
    dimension: 'password',
    options: [
      { text: 'Reuse a password I already remember from another site', scores: { password: 10, identity: 20 }, trait: 'Password Recycler' },
      { text: 'Create something personal like my pet\'s name plus birth year', scores: { password: 30, identity: 35 } },
      { text: 'Make a long passphrase I invent, and reuse it only for important accounts', scores: { password: 60, identity: 55 } },
      { text: 'Use a password manager to generate and store a unique strong password', scores: { password: 95, identity: 90, dataProtection: 80 }, trait: 'Strong Password Protector' },
    ],
  },
  {
    id: 'q4',
    scenario: 'You\'re at a café and need to check your email. There\'s a free Wi-Fi network called "Cafe_Free_WiFi".',
    dimension: 'safeBrowsing',
    options: [
      { text: 'Connect and log into everything normally', scores: { safeBrowsing: 15, privacy: 20, dataProtection: 15 }, trait: 'Public Wi-Fi Explorer' },
      { text: 'Connect but only browse non-sensitive sites', scores: { safeBrowsing: 45, privacy: 40 } },
      { text: 'Use my phone\'s mobile data instead', scores: { safeBrowsing: 80, privacy: 75, dataProtection: 70 } },
      { text: 'Connect only through a trusted VPN, or use mobile data for sensitive accounts', scores: { safeBrowsing: 95, privacy: 90, dataProtection: 90 }, trait: 'Network Guardian' },
    ],
  },
  {
    id: 'q5',
    scenario: 'A social media app asks for access to your contacts, camera, microphone, and location "to improve your experience".',
    dimension: 'privacy',
    options: [
      { text: 'Allow all permissions — apps need them to work well', scores: { privacy: 10, socialMedia: 15, dataProtection: 15 }, trait: 'Permission Giver' },
      { text: 'Allow most, deny location only', scores: { privacy: 40, socialMedia: 40 } },
      { text: 'Deny everything and try using the app anyway', scores: { privacy: 70, socialMedia: 65 } },
      { text: 'Only grant permissions essential for features I actively use, and review them regularly', scores: { privacy: 95, socialMedia: 90, dataProtection: 85 }, trait: 'Privacy Defender' },
    ],
  },
  {
    id: 'q6',
    scenario: 'Your phone shows a system update has been available for three weeks. You\'ve been postponing it.',
    dimension: 'device',
    options: [
      { text: 'I rarely update — updates can break things', scores: { device: 15, dataProtection: 20 }, trait: 'Update Avoider' },
      { text: 'I update when I remember, maybe once every few months', scores: { device: 40, dataProtection: 40 } },
      { text: 'I update within a week when I have time', scores: { device: 70, dataProtection: 65 } },
      { text: 'I enable automatic updates and install security patches as soon as possible', scores: { device: 95, dataProtection: 90 }, trait: 'Device Sentinel' },
    ],
  },
  {
    id: 'q7',
    scenario: 'You post vacation photos while you\'re still on the trip, including your hotel name and room view.',
    dimension: 'socialMedia',
    options: [
      { text: 'I post in real time — sharing is part of the fun', scores: { socialMedia: 15, privacy: 20, identity: 25 }, trait: 'Social Media Risk Taker' },
      { text: 'I post but hide my location', scores: { socialMedia: 45, privacy: 40 } },
      { text: 'I only share with close friends lists', scores: { socialMedia: 70, privacy: 65 } },
      { text: 'I wait until I\'m home, avoid sensitive details, and review privacy settings first', scores: { socialMedia: 95, privacy: 90, identity: 85 }, trait: 'Mindful Sharer' },
    ],
  },
  {
    id: 'q8',
    scenario: 'An AI chatbot offers to "optimize" your resume. It asks you to paste your full resume including address, phone, and previous employer details.',
    dimension: 'aiAwareness',
    options: [
      { text: 'Paste everything — AI tools are private and helpful', scores: { aiAwareness: 10, privacy: 15, dataProtection: 15 }, trait: 'AI Oversharer' },
      { text: 'Paste it but remove my phone number', scores: { aiAwareness: 40, privacy: 40 } },
      { text: 'Only paste a redacted version without personal identifiers', scores: { aiAwareness: 75, privacy: 70, dataProtection: 70 } },
      { text: 'Avoid pasting sensitive personal data into AI tools; use anonymized content only', scores: { aiAwareness: 95, privacy: 90, dataProtection: 90 }, trait: 'AI-Aware Guardian' },
    ],
  },
  {
    id: 'q9',
    scenario: 'You receive a call from someone claiming to be from tech support saying your computer has been hacked and they need remote access to fix it.',
    dimension: 'socialEngineering',
    options: [
      { text: 'Give them access — they sound professional and urgent', scores: { socialEngineering: 5, criticalThinking: 10, emergencyResponse: 15 }, trait: 'Authority Follower' },
      { text: 'Ask questions but consider letting them help if answers sound right', scores: { socialEngineering: 30, criticalThinking: 35 } },
      { text: 'Hang up and ignore it', scores: { socialEngineering: 70, criticalThinking: 65 } },
      { text: 'Hang up, then contact the real company through official channels if I\'m concerned', scores: { socialEngineering: 95, criticalThinking: 95, emergencyResponse: 90 }, trait: 'Skeptical Analyst' },
    ],
  },
  {
    id: 'q10',
    scenario: 'You\'re creating an online shopping account. The site asks for your date of birth, mother\'s maiden name, and childhood pet as security questions.',
    dimension: 'identity',
    options: [
      { text: 'Answer truthfully — that\'s what security questions are for', scores: { identity: 15, privacy: 20, password: 25 }, trait: 'Open Book' },
      { text: 'Answer truthfully but only on trusted big-brand sites', scores: { identity: 40, privacy: 40 } },
      { text: 'Use slightly altered answers I can remember', scores: { identity: 65, privacy: 60 } },
      { text: 'Treat security answers like passwords — use unique fictional answers stored securely', scores: { identity: 95, privacy: 90, password: 85 }, trait: 'Identity Guardian' },
    ],
  },
  {
    id: 'q11',
    scenario: 'You find a USB drive in the parking lot labeled "Salary Review 2025 — Confidential".',
    dimension: 'device',
    options: [
      { text: 'Plug it into my work computer to see who it belongs to', scores: { device: 5, criticalThinking: 10, dataProtection: 10 }, trait: 'Curious Connector' },
      { text: 'Plug it into my personal computer at home', scores: { device: 15, criticalThinking: 20 } },
      { text: 'Leave it where it is', scores: { device: 60, criticalThinking: 55 } },
      { text: 'Do not plug it in; hand it to security/IT or dispose of it safely', scores: { device: 95, criticalThinking: 90, dataProtection: 85 }, trait: 'Physical Media Skeptic' },
    ],
  },
  {
    id: 'q12',
    scenario: 'Your account login fails repeatedly. You also receive an email about a login from another country, but you\'re at home.',
    dimension: 'emergencyResponse',
    options: [
      { text: 'Keep trying my password — I probably mistyped it', scores: { emergencyResponse: 15, identity: 20, password: 25 } },
      { text: 'Reset my password using the email link I just received', scores: { emergencyResponse: 35, phishing: 30, identity: 35 } },
      { text: 'Change my password from the official site and ignore the foreign login email', scores: { emergencyResponse: 65, identity: 60 } },
      { text: 'Use official site/app to change password, enable 2FA, review sessions, and secure email first', scores: { emergencyResponse: 95, identity: 90, password: 90, phishing: 85 }, trait: 'Incident Responder' },
    ],
  },
];
