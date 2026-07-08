import { visualThemes } from '$lib/utils/visuals.js';
import { audioManager } from './audioManager.svelte';

class MatrixManager {
  opacity = 0;
  targetOpacity = 0;

  currentBackground;
  targetBackground;

  currentForeground;
  targetForeground;

  setCanvas(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    this.fontSize = 16;
    this.texts = '0123456789'.split('');

    this.columns = 0;
    this.drops = [];

    this.elapsed = 0;
    this.frameTime = 1 / 30; // 30 FPS

    this.running = false;

    this.resize();

    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.columns = Math.floor(this.canvas.width / this.fontSize);
    this.drops = Array.from({ length: this.columns }, () => 1 );
  }

  start(type) {
    const theme = visualThemes[type];

    this.running = true;
    this.targetOpacity = 1;
    this.targetBackground = theme.background;
    this.targetForeground = theme.foreground;

    if (this.currentBackground === undefined) {
      this.currentBackground = theme.background;
    }
    
    if (this.currentForeground === undefined) {
      this.currentForeground = theme.foreground;
    }

    document.body.classList.remove('matrix', 'evil');
    document.body.classList.add(type);
  }

  clear() {
    this.targetOpacity = 0;
    document.body.classList.remove('matrix', 'evil');
    audioManager.stopMusic();
  }

  update(delta) {
    this.opacity = this.lerp(this.opacity, this.targetOpacity, delta * 15);
    this.canvas.style.opacity = this.opacity;

    if (this.opacity < 0.00001 && this.targetOpacity === 0) {
      this.opacity = 0;
      this.running = false;
      this.resize();
      return;
    }

    if (this.currentBackground && this.currentBackground !== this.targetBackground) {
      this.currentBackground = this.lerpColor(this.currentBackground, this.targetBackground, delta * 6);
    }

    if (this.currentForeground && this.currentForeground !== this.targetForeground) {
      this.currentForeground = this.lerpColor(this.currentForeground, this.targetForeground, delta * 6);
    }

    if (!this.running) return;

    this.elapsed += delta;

    if (this.elapsed < this.frameTime) return;

    this.elapsed -= this.frameTime;

    this.draw();
  }

  lerp(current, target, speed) {
    return current + (target - current) * Math.min(speed, 1);
  }

  lerpColor(color1, color2, t) {
    const c1 = color1.replace('#', '');
    const c2 = color2.replace('#', '');

    const hex1 = c1.length === 6 ? c1 + 'ff' : c1;
    const hex2 = c2.length === 6 ? c2 + 'ff' : c2;

    const v1 = parseInt(hex1, 16);
    const v2 = parseInt(hex2, 16);

    const r1 = (v1 >> 24) & 0xff;
    const g1 = (v1 >> 16) & 0xff;
    const b1 = (v1 >> 8) & 0xff;
    const a1 = v1 & 0xff;

    const r2 = (v2 >> 24) & 0xff;
    const g2 = (v2 >> 16) & 0xff;
    const b2 = (v2 >> 8) & 0xff;
    const a2 = v2 & 0xff;

    const r = Math.round(r1 + (r2 - r1) * t);
    const g = Math.round(g1 + (g2 - g1) * t);
    const b = Math.round(b1 + (b2 - b1) * t);
    const a = Math.round(a1 + (a2 - a1) * t);

    return '#' + [r, g, b, a].map(x => x.toString(16).padStart(2, '0')).join('');
  }

  draw() {
    const ctx = this.ctx;

    ctx.fillStyle = this.currentBackground;
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    ctx.fillStyle = this.currentForeground;
    ctx.font = `${this.fontSize}px Doto`;

    for (let i = 0; i < this.drops.length; i++) {
      const text = this.texts[Math.floor(Math.random() * this.texts.length)];

      ctx.fillText(text, i * this.fontSize, this.drops[i] * this.fontSize);

      if (this.drops[i] * this.fontSize > this.canvas.height || Math.random() > 0.95) {
          this.drops[i] = 0;
      }

      this.drops[i]++;
    }
  }

}

export const matrixManager = new MatrixManager();