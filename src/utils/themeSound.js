// src/utils/themeSound.js

// Reuse a single AudioContext to avoid browser throttling
let audioContext = null;

const getAudioContext = () => {
  if (!audioContext && typeof window !== 'undefined' && (window.AudioContext || window.webkitAudioContext)) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioContext;
};

export const playThemeSound = () => {
  if (typeof window === 'undefined') return;

  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    
    // Resume if suspended (browsers require user gesture)
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    
    // Create oscillator for gentle theme change sound
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    // Connect nodes
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    // Configure subtle, pleasant sound
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(400, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.2);
    oscillator.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.4);
    
    // Volume envelope for smooth fade
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
    
    // Play sound
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.5);
    
    // Cleanup
    oscillator.onended = () => {
      gainNode.disconnect();
      oscillator.disconnect();
    };
  } catch (error) {
    // Silently fail if audio context isn't available
    console.debug('Audio context not available:', error);
  }
};
