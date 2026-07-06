import { randomBetween } from "$lib/utils/numbers";

const COLORS = [
  '#ff79c6', // keyword
  '#f1fa8c', // string
  '#bd93f9', // number
  '#50fa7b', // function/variable
  '#8be9fd', // operator
  '#6272a4', // comment
];

const BLOCK_COUNTS = [3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 6, 6, 7, 7, 8, 9];

class CodeEditor {
  lines = $state([]);

  currentLine = 1;
  currentIndent = 0;
  isFirstLine = true;

  lineAccumulator = 0;

  maxVisibleLines = 30;

  generateLine(add = 1) {
    // Atualiza identação
    if (this.isFirstLine) {
      this.currentIndent = 0;
      this.isFirstLine = false;
    } else {
      const change = randomBetween(-1, 1);

      this.currentIndent = Math.max(
        0,
        Math.min(this.currentIndent + change, 3)
      );
    }

    // Quantidade de blocos
    const blockCount =
      BLOCK_COUNTS[randomBetween(0, BLOCK_COUNTS.length - 1)];

    const blocks = [];

    for (let i = 0; i < blockCount; i++) {
      blocks.push({
        width: randomBetween(4, 15),
        color: COLORS[randomBetween(0, COLORS.length - 1)]
      });
    }

    const line = {
      id: crypto.randomUUID(),
      number: this.currentLine,
      indent: this.currentIndent,
      blocks
    };

    this.currentLine += add;

    return line
  }

  addLine(add = 1) {
    this.lines.push(this.generateLine(add));

    if (this.lines.length > this.maxVisibleLines) {
      this.lines.shift();
    }
  }

  addLines(count, add = 1) {
    const newLines = [];

    for (let i = 0; i < count; i++) {
      newLines.push(this.generateLine(add));
    }

    this.lines.push(...newLines);

    if (this.lines.length > this.maxVisibleLines) {
      this.lines.splice(0, this.lines.length - this.maxVisibleLines);
    }
  }

  addProgress(progress) {
    this.lineAccumulator += progress;

    const linesToGenerate = Math.floor(this.lineAccumulator);

    if (linesToGenerate > 0) {
      this.addLines(linesToGenerate);
      this.lineAccumulator -= linesToGenerate;
    }
  }

  reset() {
    this.lines = [];

    this.currentLine = 1;
    this.currentIndent = 0;
    this.isFirstLine = true;
  }
}

export const codeEditor = new CodeEditor();