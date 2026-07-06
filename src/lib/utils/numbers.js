export const unidades = [
  { limite: 1e93, nome: 'trigintilhão', plural: 'trigintilhões' },
  { limite: 1e90, nome: 'novenvigintilhão', plural: 'novenvigintilhões' },
  { limite: 1e87, nome: 'octovigintilhão', plural: 'octovigintilhões' },
  { limite: 1e84, nome: 'septenvigintilhão', plural: 'septenvigintilhões' },
  { limite: 1e81, nome: 'sexvigintilhão', plural: 'sexvigintilhões' },
  { limite: 1e78, nome: 'quinvigintilhão', plural: 'quinvigintilhões' },
  { limite: 1e75, nome: 'quattuorvigintilhão', plural: 'quattuorvigintilhões' },
  { limite: 1e72, nome: 'trevigintilhão', plural: 'trevigintilhões' },
  { limite: 1e69, nome: 'duovigintilhão', plural: 'duovigintilhões' },
  { limite: 1e66, nome: 'unvigintilhão', plural: 'unvigintilhões' },
  { limite: 1e63, nome: 'vigintilhão', plural: 'vigintilhões' },
  { limite: 1e60, nome: 'novendecilhão', plural: 'novendecilhões' },
  { limite: 1e57, nome: 'octodecilhão', plural: 'octodecilhões' },
  { limite: 1e54, nome: 'septendecilhão', plural: 'septendecilhões' },
  { limite: 1e51, nome: 'sexdecilhão', plural: 'sexdecilhões' },
  { limite: 1e48, nome: 'quindecilhão', plural: 'quindecilhões' },
  { limite: 1e45, nome: 'quattuordecilhão', plural: 'quattuordecilhões' },
  { limite: 1e42, nome: 'tredecilhão', plural: 'tredecilhões' },
  { limite: 1e39, nome: 'duodecilhão', plural: 'duodecilhões' },
  { limite: 1e36, nome: 'undecilhão', plural: 'undecilhões' },
  { limite: 1e33, nome: 'decilhão', plural: 'decilhões' },
  { limite: 1e30, nome: 'nonilhão', plural: 'nonilhões' },
  { limite: 1e27, nome: 'octilhão', plural: 'octilhões' },
  { limite: 1e24, nome: 'septilhão', plural: 'septilhões' },
  { limite: 1e21, nome: 'sextilhão', plural: 'sextilhões' },
  { limite: 1e18, nome: 'quintilhão', plural: 'quintilhões' },
  { limite: 1e15, nome: 'quatrilhão', plural: 'quatrilhões' },
  { limite: 1e12, nome: 'trilhão', plural: 'trilhões' },
  { limite: 1e9, nome: 'bilhão', plural: 'bilhões' },
  { limite: 1e6, nome: 'milhão', plural: 'milhões' },
  { limite: 1e3, nome: 'mil', plural: 'mil' }
  ];

export function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function sumPG(a1, q, n) {
  return (a1 * (Math.pow(q, n) - 1)) / ((q - 1) || 1);
}

export function formatarNumero(valor, de = false) {
  if (valor < 1000000) return Number(valor).toLocaleString('pt-BR');

  const maiorLimite = unidades[0].limite;
  if (valor >= maiorLimite * 1000) {
    return valor.toExponential(1).replace('+', '');
  }

  for (const unidade of unidades) {
    if (valor >= unidade.limite) {
      const valorDividido = valor / unidade.limite;
      const nome = valorDividido >= 2 ? unidade.plural : unidade.nome;
      return `${valorDividido.toFixed(3).replace('.', ',')} ${nome}${de ? ' de' : ''}`;
    }
  }

  return Number(valor).toLocaleString('pt-BR');
}
