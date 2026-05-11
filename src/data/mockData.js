// src/data/mockData.js
const MOCK = {
  user: { name: 'Sarah', avatar: '🌿', cycleDay: 14, phase: 'Ovulation', trustScore: 4.2, tipsPosted: 11, resonances: 87, streak: 12 },
  meals: [
    { emoji: '🥣', name: 'Spinach oat bowl', cal: 312, tags: ['iron-rich', 'gut health'], time: 'Breakfast' },
    { emoji: '🫘', name: 'Warm lentil salad', cal: 480, tags: ['protein', 'iron-rich'], time: 'Lunch' },
    { emoji: '🐟', name: 'Salmon + roasted veg', cal: 540, tags: ['omega-3', 'anti-inflam.'], time: 'Dinner' },
    { emoji: '🫐', name: 'Blueberry smoothie', cal: 210, tags: ['antioxidant'], time: 'Snack' },
  ],
  insights: [
    { icon: '🫐', title: 'Why blueberries support hormonal balance during ovulation', author: 'Dr. Amara W.', badge: 'purple', badgeText: 'Researcher', resonances: 14, tried: 5 },
    { icon: '😴', title: 'Sleep & cortisol — what your afternoon crash is signalling', author: 'Community', badge: 'sage', badgeText: 'Verified tip', resonances: 8, tried: 3 },
    { icon: '🥑', title: 'Magnesium foods that actually absorb (not just spinach)', author: 'Woolworths Health', badge: 'gold', badgeText: 'Partner pick', resonances: 21, tried: 9 },
  ],
  connectedApps: [
    { icon: '⌚', name: 'Apple Health', bg: '#f0f0f0', status: 'Synced', last: '2 min ago', data: '8,420 steps · 6.8h sleep' },
    { icon: '🌸', name: 'Flo Period Tracker', bg: '#fce4ec', status: 'Synced', last: 'Today', data: 'Cycle Day 14 · Ovulation' },
    { icon: '🍎', name: 'MyFitnessPal', bg: '#e8f5e9', status: 'Synced', last: '1h ago', data: '1,240 kcal logged' },
    { icon: '🏃', name: 'Samsung Health', bg: '#e3f2fd', status: 'Connected', last: '3h ago', data: '32 min activity' },
  ],
  villagers: [
    { emoji: '👩🏽', name: 'Priya', bg: '#f9c6a0', status: 'online', bubble: '🧘 Just finished yoga!', notif: '💡 new tip', x: 70, y: 72, walk: 'v-walk' },
    { emoji: '👨🏻', name: 'Joel', bg: '#c7e5f7', status: 'busy', bubble: '🥗 Iron-rich recipe posted', notif: null, x: 175, y: 68, walk: null },
    { emoji: '👩🏾', name: 'Amara', bg: '#d4c4f0', status: 'online', bubble: '📓 Logged a mood entry', notif: '📓 journal', x: 260, y: 72, walk: 'v-walk2' },
    { emoji: '🧑🏼', name: 'Chris', bg: '#b5e8c8', status: 'offline', bubble: '😴 Rest day today', notif: null, x: 330, y: 68, walk: null },
  ],
  tips: [
    {
      id: 1, avatar: '👩🏽', avatarBg: '#f9c6a0', username: 'Priya S.', rating: 4.2, totalTips: 34, verified: true,
      category: 'Energy · Hormonal', body: 'I realised my afternoon energy crash was linked to blood sugar spikes from "healthy" muesli bars. Switching to a handful of almonds + dark chocolate completely fixed it — took me 3 weeks to notice.',
      discovery: '💡 Felt like I found it myself, not advice someone gave me', resonances: 21, tried: 7, myRating: 0,
    },
    {
      id: 2, avatar: '🧑🏼', avatarBg: '#b5e8c8', username: 'Chris A.', rating: 3.8, totalTips: 12, verified: false,
      category: 'Gut health · Sleep', body: 'Eating my biggest meal at lunch instead of dinner was a single change that improved my sleep within a week. Sounds obvious in hindsight — I only figured it out tracking it in the journal.',
      discovery: '💡 The journal helped me see the pattern myself', resonances: 15, tried: 9, myRating: 0,
    },
    {
      id: 3, avatar: '👩🏾', avatarBg: '#d4c4f0', username: 'Amara T.', rating: 4.6, totalTips: 41, verified: true,
      category: 'Hormonal health', body: 'Turmeric golden milk before bed changed the way I sleep during my luteal phase. Three ingredients. I shared the recipe on here and 20 people tried it.',
      discovery: '💡 A small experiment that became my ritual', resonances: 38, tried: 20, myRating: 0,
    },
  ],
  journalEntries: [
    {
      date: 'Today · 9:14 am', source: '✦ via Nouri chat', sourceClass: 'je-source',
      body: 'Mentioned to Nouri I\'ve been feeling foggy and unmotivated this week. It gently noted this could be linked to iron levels during ovulation — hadn\'t connected that myself.',
      mood: '😶‍🌫️ Low energy · foggy',
      data: ['⌚ 5.9h sleep', '🚶 6,200 steps', '🌸 Cycle day 14'],
    },
    {
      date: 'Yesterday · 7:30 pm', source: null,
      body: 'Felt genuinely good after today\'s meals. Had the lentil bowl for lunch and for the first time in ages had no 3pm crash. Going to keep tracking this.',
      mood: '😊 Energised · clear-headed',
      data: ['⌚ 7.2h sleep', '🚶 9,100 steps', '🍽 1,450 kcal'],
    },
    {
      date: 'Sunday · 8:00 am', source: null,
      body: 'Rest day. Feeling a bit anxious about the week ahead but grounded. Did 10 min of morning stretching.',
      mood: '😌 Calm · slightly anxious',
      data: ['⌚ 8.1h sleep'],
    },
  ],
  chatMessages: [
    { role: 'ai', text: 'Hi Sarah 🌿 Based on your cycle phase and connected data, I\'d suggest focusing on iron-rich foods today. Your sleep was a bit lower last night — want some tips on recovery foods?' },
  ],
};
