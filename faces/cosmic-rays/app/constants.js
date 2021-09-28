export const DB_KEY_THEME = 'theme';

export const deviceWidths = {
  Ionic: 348,
  Versa: 300,
  'Versa 2': 300,
  'Versa 3': 336,
  'Sense': 336,
};

const pastelRainbowColors = [
  '#fea3aa',
  '#f8b88b',
  '#faf884',
  '#baed91',
  '#b2cefe',
  '#f2a2e8',
];

export const Themes = {
  classic: {
    foreground: () => '#ffffff',
  },
  electricblue: {
    foreground: () => '#0096FF',
  },
  steelgrey: {
    foreground: () => '#999999',
  },
  jazzberryjam: {
    foreground: () => '#aa0055',
  },
  bloodred: {
    foreground: () => '#8e0000',
  },
  cyan: {
    foreground: () => '#5b979a',
  },
  orange: {
    foreground: () => '#ff8c00',
  },
  royalblue: {
    foreground: () => '#1d00c4',
  },
  pastelrainbow: {
    foreground: () => {
      const index = Math.round(Math.random() * (pastelRainbowColors.length - 1));
      return pastelRainbowColors[index];
    },
  },
};
