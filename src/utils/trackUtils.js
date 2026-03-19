export const getTrackSource = (track) => {
  if (track.isLocal) {
    return `local-audio://${encodeURIComponent(track.url)}`;
  }
  return track.url;
};

export const loadTracksFromStorage = (storageKey) => {
  try {
    const stored = localStorage.getItem(storageKey);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const saveTracksToStorage = (storageKey, tracks) => {
  try {
    localStorage.setItem(storageKey, JSON.stringify(tracks));
  } catch (e) {
    console.error('Failed to save tracks:', e);
  }
};
