// Elemento audio global que NUNCA se desmonta
let globalAudio = null;

export function getGlobalAudio() {
  if (!globalAudio && typeof window !== 'undefined') {
    globalAudio = new Audio();
    globalAudio.preload = 'auto';
  }
  return globalAudio;
}