// Web Audio API Sound and Ambient Music Engine

class WeddingSoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private isMusicPlaying: boolean = false;
  private ambientInterval: number | null = null;
  private gainNode: GainNode | null = null;

  private initContext() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  // Play luxury golden harp / chime chord when opening envelope
  playOpeningChime() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const freqs = [523.25, 659.25, 783.99, 1046.5, 1318.51]; // C major 9th sparkle
      freqs.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.08);

        gain.gain.setValueAtTime(0.001, this.ctx.currentTime + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.25, this.ctx.currentTime + idx * 0.08 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + idx * 0.08 + 1.6);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(this.ctx.currentTime + idx * 0.08);
        osc.stop(this.ctx.currentTime + idx * 0.08 + 1.7);
      });
    } catch {
      // Audio autoplay may be guarded by browser policy
    }
  }

  // Gentle sparkle sound for scratch reveal
  playSparkleSound() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const freqs = [880, 1108.73, 1318.51, 1760];
      freqs.forEach((f, i) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "triangle";
        osc.frequency.value = f;

        gain.gain.setValueAtTime(0.001, this.ctx.currentTime + i * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.18, this.ctx.currentTime + i * 0.06 + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + i * 0.06 + 1.2);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(this.ctx.currentTime + i * 0.06);
        osc.stop(this.ctx.currentTime + i * 0.06 + 1.3);
      });
    } catch {
      // ignore
    }
  }

  // Soft scratch sound
  playScratchNote() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      // Soft filtered noise burst for scratch
      const bufferSize = this.ctx.sampleRate * 0.05;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.value = 1800 + Math.random() * 400;

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start();
    } catch {
      // ignore
    }
  }

  // Start romantic ambient instrumental melody (warm acoustic harp & sitar harmony)
  startAmbientMusic() {
    if (this.isMusicPlaying) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      this.isMusicPlaying = true;
      const notes = [
        261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 587.33, 659.25, // C Major Pentatonic / Yaman scale
      ];

      // Master gain for ambient music
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(this.isMuted ? 0 : 0.12, this.ctx.currentTime);
      this.gainNode.connect(this.ctx.destination);

      let step = 0;
      const playNextTone = () => {
        if (!this.ctx || !this.gainNode || !this.isMusicPlaying) return;

        const melodySequence = [0, 2, 4, 3, 2, 5, 4, 2, 0, 1, 2, 4, 3, 2, 0, 4];
        const noteIdx = melodySequence[step % melodySequence.length];
        const freq = notes[noteIdx] || 261.63;

        const osc = this.ctx.createOscillator();
        const noteGain = this.ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        // Soft plucked string envelope
        noteGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
        noteGain.gain.exponentialRampToValueAtTime(0.15, this.ctx.currentTime + 0.08);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.8);

        osc.connect(noteGain);
        noteGain.connect(this.gainNode);

        osc.start(this.ctx.currentTime);
        osc.stop(this.ctx.currentTime + 1.9);

        // Add subtle harmonic resonance
        if (step % 2 === 0) {
          const droneOsc = this.ctx.createOscillator();
          const droneGain = this.ctx.createGain();
          droneOsc.type = "triangle";
          droneOsc.frequency.setValueAtTime(freq / 2, this.ctx.currentTime);
          droneGain.gain.setValueAtTime(0.04, this.ctx.currentTime);
          droneGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 2.4);

          droneOsc.connect(droneGain);
          droneGain.connect(this.gainNode);

          droneOsc.start(this.ctx.currentTime);
          droneOsc.stop(this.ctx.currentTime + 2.5);
        }

        step++;
      };

      playNextTone();
      this.ambientInterval = window.setInterval(playNextTone, 750);
    } catch {
      // Audio may need user interaction first
    }
  }

  stopAmbientMusic() {
    this.isMusicPlaying = false;
    if (this.ambientInterval) {
      clearInterval(this.ambientInterval);
      this.ambientInterval = null;
    }
  }

  toggleMusic(): boolean {
    if (this.isMusicPlaying) {
      this.stopAmbientMusic();
      return false;
    } else {
      this.startAmbientMusic();
      return true;
    }
  }

  isCurrentlyPlaying(): boolean {
    return this.isMusicPlaying;
  }
}

export const soundEngine = new WeddingSoundEngine();
