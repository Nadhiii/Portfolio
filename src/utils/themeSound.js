// src/utils/themeSound.js

export const playThemeSound = () => {
  // Only run in browser environment
  if (typeof window === 'undefined' || !window.AudioContext) return;

  try {
    // Create audio context
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Create oscillator for gentle theme change sound
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    // Connect nodes
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Configure subtle, pleasant sound
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(600, audioContext.currentTime + 0.2);
    oscillator.frequency.exponentialRampToValueAtTime(300, audioContext.currentTime + 0.4);
    
    // Volume envelope for smooth fade
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.08, audioContext.currentTime + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    // Play sound
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
    
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
