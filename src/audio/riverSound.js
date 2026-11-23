// A small river, made in the browser with the Web Audio API.
// Nothing is downloaded: the sound is filtered noise (the body of the water)
// plus a few soft, random "bubbles" (the babble). It only starts after the
// visitor presses the sound button, because browsers block autoplay audio.

function noiseBuffer(ctx, seconds, kind) {
  const length = Math.floor(ctx.sampleRate * seconds);
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  let last = 0;
  for (let i = 0; i < length; i++) {
    const white = Math.random() * 2 - 1;
    if (kind === 'brown') {
      last = (last + 0.02 * white) / 1.02;
      data[i] = last * 3.5;
    } else {
      data[i] = white;
    }
  }
  return buffer;
}

function loopNoise(ctx, buffer) {
  const src = ctx.createBufferSource();
  src.buffer = buffer;
  src.loop = true;
  return src;
}

function lfo(ctx, rate, depth, target) {
  const osc = ctx.createOscillator();
  const amount = ctx.createGain();
  osc.frequency.value = rate;
  amount.gain.value = depth;
  osc.connect(amount).connect(target);
  return osc;
}

export function createRiverSound() {
  const AudioCtx = typeof window !== 'undefined' && (window.AudioContext || window.webkitAudioContext);
  if (!AudioCtx) return null;

  let ctx = null;
  let master = null;
  let bubbleTimer = null;
  let sources = [];
  let playing = false;

  function build() {
    ctx = new AudioCtx();
    master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);

    // Low, steady rush of water.
    const rush = loopNoise(ctx, noiseBuffer(ctx, 3, 'brown'));
    const rushFilter = ctx.createBiquadFilter();
    rushFilter.type = 'lowpass';
    rushFilter.frequency.value = 520;
    const rushGain = ctx.createGain();
    rushGain.gain.value = 0.55;
    rush.connect(rushFilter).connect(rushGain).connect(master);

    // Brighter hiss whose colour and level drift, so it sounds like moving water.
    const hiss = loopNoise(ctx, noiseBuffer(ctx, 2, 'white'));
    const hissFilter = ctx.createBiquadFilter();
    hissFilter.type = 'bandpass';
    hissFilter.frequency.value = 1400;
    hissFilter.Q.value = 0.9;
    const hissGain = ctx.createGain();
    hissGain.gain.value = 0.05;
    hiss.connect(hissFilter).connect(hissGain).connect(master);
    const drift1 = lfo(ctx, 0.13, 500, hissFilter.frequency);
    const drift2 = lfo(ctx, 0.31, 0.025, hissGain.gain);

    sources = [rush, hiss, drift1, drift2];
    sources.forEach((s) => s.start());
  }

  function bubble() {
    if (!ctx || !playing) return;
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const start = 300 + Math.random() * 500;
    osc.type = 'sine';
    osc.frequency.setValueAtTime(start, t);
    osc.frequency.exponentialRampToValueAtTime(start * (1.6 + Math.random()), t + 0.07);
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.025 + Math.random() * 0.03, t + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.09);
    osc.connect(gain).connect(master);
    osc.start(t);
    osc.stop(t + 0.1);
    bubbleTimer = setTimeout(bubble, 90 + Math.random() * 420);
  }

  return {
    async play() {
      if (!ctx) build();
      if (ctx.state === 'suspended') await ctx.resume();
      playing = true;
      const t = ctx.currentTime;
      master.gain.cancelScheduledValues(t);
      master.gain.setValueAtTime(master.gain.value, t);
      master.gain.linearRampToValueAtTime(0.32, t + 1.2);
      clearTimeout(bubbleTimer);
      bubble();
    },
    pause(fadeSeconds = 0.4) {
      if (!ctx) return;
      playing = false;
      clearTimeout(bubbleTimer);
      const t = ctx.currentTime;
      master.gain.cancelScheduledValues(t);
      master.gain.setValueAtTime(master.gain.value, t);
      master.gain.linearRampToValueAtTime(0, t + fadeSeconds);
    },
    // Fade out, then release the audio hardware.
    close(fadeSeconds = 0.8) {
      if (!ctx) return;
      this.pause(fadeSeconds);
      const closing = ctx;
      ctx = null;
      setTimeout(() => {
        sources.forEach((s) => {
          try {
            s.stop();
          } catch {
            /* already stopped */
          }
        });
        closing.close();
      }, fadeSeconds * 1000 + 100);
    },
  };
}
