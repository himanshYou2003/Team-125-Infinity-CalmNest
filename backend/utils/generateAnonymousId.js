export const generateAnonymousId = () => {
    const adjectives = ['Brave', 'Calm', 'Wise', 'Swift', 'Gentle'];
    const nouns = ['Phoenix', 'Owl', 'Lion', 'Dolphin', 'Tree'];
    const randomNum = Math.floor(100 + Math.random() * 900);
    return `${adjectives[Math.floor(Math.random() * adjectives.length)]}-${
      nouns[Math.floor(Math.random() * nouns.length)]
    }-${randomNum}`;
  };