// audioManager.svelte.js

class AudioManager {
  constructor() {
    this.cache = new Map();
    this.pools = new Map();

    this.masterVolume = $state(1);
    this.musicVolume = $state(1);
    this.sfxVolume = $state(1);

    this.music = null;

    this.musicCurrentVolume = 0;
    this.musicTargetVolume = 0;

    this.fadeSpeed = 2;
  }

  //---------------------------------------
  // REGISTRO
  //---------------------------------------

  register(id, src, poolSize = 8) {
    if (this.cache.has(id)) return;

    const pool = [];

    for (let i = 0; i < poolSize; i++) {
      const audio = new Audio(src);
      audio.preload = "auto";
      pool.push(audio);
    }

    this.cache.set(id, {
      src,
      next: 0,
    });

    this.pools.set(id, pool);
  }

  registerMany(list) {
    for (const sound of list) {
      this.register(
        sound.id,
        sound.src,
        sound.poolSize ?? 8
      );
    }
  }

  //---------------------------------------
  // SFX
  //---------------------------------------

  play(id, volume = 1) {
    const pool = this.pools.get(id);
    const info = this.cache.get(id);

    if (!pool || !info) return;

    const audio = pool[info.next];
    info.next = (info.next + 1) % pool.length;

    audio.pause();
    audio.currentTime = 0;
    audio.volume = volume * this.sfxVolume * this.masterVolume;

    audio.play().catch(() => {});
  }

  playRandom(ids, volume = 1) {
    const id =
      ids[Math.floor(Math.random() * ids.length)];

    this.play(id, volume);
  }

  //---------------------------------------
  // MUSIC
  //---------------------------------------

  playMusic(id, {
    volume = 1,
    loop = true,
    fadeSpeed = 2,
  } = {}) {

    if (this.music?.id === id) return;

    this.stopMusic(false);

    const info = this.cache.get(id);

    if (!info) return;

    const audio = new Audio(info.src);

    audio.loop = loop;
    audio.volume = 0;

    audio.play().catch(() => {});

    this.music = {
      id,
      audio,
    };

    this.musicCurrentVolume = 0;
    this.musicTargetVolume = volume;
    this.fadeSpeed = fadeSpeed;
  }

  stopMusic(fade = true) {
    if (!this.music) return;

    if (!fade) {
      this.music.audio.pause();
      this.music = null;
      return;
    }

    this.musicTargetVolume = 0;
  }

  //---------------------------------------
  // UPDATE
  //---------------------------------------

  update(delta) {
    if (!this.music) return;

    const desired = this.musicTargetVolume * this.masterVolume * this.musicVolume;

    this.musicCurrentVolume += (desired - this.musicCurrentVolume) * Math.min(delta * this.fadeSpeed, 1);

    this.music.audio.volume = this.musicCurrentVolume;

    if (desired === 0 && this.musicCurrentVolume < 0.001) {
      this.music.audio.pause();
      this.music = null;
    }
  }

  //---------------------------------------
  // VOLUME
  //---------------------------------------

  setMasterVolume(v) {
    this.masterVolume = Math.max(0, Math.min(1, v));
  }

  setMusicVolume(v) {
    this.musicVolume = Math.max(0, Math.min(1, v));
  }

  setSfxVolume(v) {
    this.sfxVolume = Math.max(0, Math.min(1, v));
  }
}

export const audioManager = new AudioManager();