class FloatingTexts {
  texts = $state([]);

  add(text) {
    this.texts.push({
      id: crypto.randomUUID(),
      ...text
    });
  }

  remove(id) {
    this.texts = this.texts.filter(t => t.id !== id);
  }
}

export const floatingTexts = new FloatingTexts();