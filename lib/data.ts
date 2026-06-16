export type Project = {
  id: string;
  youtubeId: string;
  title: string;
  category: { en: string; pt: string };
  thumbnail: string;
  format: 'horizontal' | 'vertical';
  youtubeUrl: string;
};

const rawLinks = [
  "https://youtube.com/shorts/Vz3MUMM3NKs?feature=share",
  "https://youtube.com/shorts/Vfmh5s_mwzA?feature=share",
  "https://youtube.com/shorts/sJQPG48qRCk?feature=share",
  "https://youtu.be/FBtYVPiwnCM",
  "https://youtu.be/P1LBYYgu_CA",
  "https://youtu.be/Q_XBBzPrS_s",
  "https://youtu.be/XPwxktWzR10",
  "https://youtube.com/shorts/liBg891SOeM?feature=share",
  "https://youtube.com/shorts/FWU6eZ0eTso?feature=share",
  "https://youtube.com/shorts/YKMxud6jms0?feature=share",
  "https://youtube.com/shorts/hvqYYRTaln0?feature=share",
  "https://youtube.com/shorts/O5CFrVMvOPk?feature=share",
  "https://youtube.com/shorts/X1C_sJB9nJA?feature=share",
  "https://youtube.com/shorts/dFleG7xfH3g?feature=share",
  "https://youtube.com/shorts/WtzgQ-bm7Aw?feature=share",
  "https://youtube.com/shorts/u3FmSKpUqAo?feature=share",
  "https://youtube.com/shorts/Ak3hUmdW6X8?feature=share",
  "https://youtube.com/shorts/EAd_XawIMi4?feature=share",
  "https://youtube.com/shorts/aeF_HQCBA8I?feature=share",
  "https://youtube.com/shorts/THnIbKd7j9k?feature=share",
  "https://youtube.com/shorts/P3oV6pwlvbQ?feature=share",
  "https://youtube.com/shorts/PNi6WkymT00?feature=share",
  "https://youtube.com/shorts/WJfe8XAq6BI?feature=share",
  "https://youtube.com/shorts/gV9dkbGfIKQ?feature=share",
  "https://youtube.com/shorts/xMZ3v2kOyjA?feature=share",
  "https://youtube.com/shorts/xFHObHTEl2g?feature=share",
  "https://youtube.com/shorts/Z_VKT4VH50o?feature=share",
  "https://youtu.be/0J7jIAEmg6I",
  "https://youtu.be/VVKP6Wc7hyU",
  "https://youtu.be/-U5vNY9spgQ",
  "https://youtu.be/vJ7rwLY-qTs",
  "https://youtube.com/shorts/fiwTxU1-j9c?feature=share",
  "https://youtube.com/shorts/p1JH3YLQD1Q?feature=share",
  "https://youtube.com/shorts/Zz6dTU9k3lQ?feature=share",
  "https://youtube.com/shorts/Wn-5TzOQ5R4?feature=share",
  "https://youtube.com/shorts/jfVY3Sbb5fU?feature=share",
  "https://youtube.com/shorts/a50bhmtt9NU?feature=share",
  "https://youtube.com/shorts/wHlLr55A_FI?feature=share",
  "https://youtube.com/shorts/LtUDJ6xV6Gg?feature=share",
  "https://youtube.com/shorts/XuhlxMdYVSA?feature=share",
  "https://youtube.com/shorts/j613hf_XKWw?feature=share",
  "https://youtube.com/shorts/Lx1kIVq9VII?feature=share",
  "https://youtube.com/shorts/bONPnZ5P5zs?feature=share",
  "https://youtube.com/shorts/fgT5D28a8rs?feature=share",
  "https://youtube.com/shorts/f_dyO-CAlgs?feature=share"
];

function extractYouTubeId(url: string) {
  const shortMatch = url.match(/\/shorts\/([^?]+)/);
  if (shortMatch) return shortMatch[1];
  const standardMatch = url.match(/youtu\.be\/([^?]+)/);
  if (standardMatch) return standardMatch[1];
  return 'dQw4w9WgXcQ';
}

export const projects: Project[] = rawLinks.map((url, index) => {
  const isVertical = url.includes('/shorts/');
  const id = extractYouTubeId(url);
  return {
    id: String(index + 1),
    youtubeId: id,
    title: isVertical ? `Project ${index + 1}` : `Video ${index + 1}`,
    category: isVertical 
      ? { en: 'Shorts / TikTok', pt: 'Shorts / TikTok' }
      : { en: 'YouTube Video', pt: 'Vídeo para YouTube' },
    // Use maxresdefault for best quality, especially for vertical shorts
    thumbnail: `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
    format: isVertical ? 'vertical' : 'horizontal',
    youtubeUrl: url,
  };
});
