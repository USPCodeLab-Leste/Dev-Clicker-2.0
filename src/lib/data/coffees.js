export const coffees = [
  {
    id: 'bn1',
    nome: "Cafézinho",
    descricao: "Um dose de cafeína pra começar o seu dia!",
    peso: 100,
    effect: {
      type: 'gain_percent_points',
      percent: 0.15,
      bonus: 13
    }
  },
  {
    id: 'bn2',
    nome: "Café Docinho",
    descricao: "Uma colher de açúcar + uma pitada de amor materno",
    type: 'matrix',
    peso: 30,
    icon: 'cafe_docinho.webp',
    effect: {
      type: 'buff',
      stat: 'lpsMultiplier',
      value: 7,
      duration: 30
    }
  },
  {
    id: 'bn3',
    nome: "Café Perfeito",
    descricao: "Temperatura ideal, sabor equilibrado e um aroma leve e perfumado. Perfeito!",
    type: 'matrix',
    peso: 4,
    icon: 'cafe_perfeito.webp',
    effect: {
      type: 'buff',
      stat: 'lpsMultiplier',
      value: 777,
      duration: 15
    }
  },
  {
    id: 'bn4',
    nome: "Café Divino",
    descricao: "Preparado diretamente pelos deuses olimpianos. O néctar supremo, o elixir celestial, o suprassumo do prazer!",
    type: 'matrix',
    duracao: 10,
    peso: 1,
    icon: 'cafe_divino.webp',
    effect: {
      type: 'buff',
      stat: 'lpsMultiplier',
      value: 1111,
      duration: 10
    }
  },
  {
    id: 'bn5',
    nome: "Tempestade de Café",
    peso: 4,
    effect: {
      type: 'coffee_storm',
      duration: 7,
      interval: 0.4
    }
  },
  {
    id: 'bn6',
    nome: "Café Expresso",
    descricao: "1 min das LpS!",
    effect: {
      type: 'gain_lps',
      minutes: 1
    }
  },
  {
    id: 'bn7',
    nome: 'Café Vencido',
    descricao: '',
    type: 'evil',
    descricao: 'Não faz nada...',
    peso: 2,
    effect: {
      type: 'nothing'
    }
  },
  {
    id: 'bn8',
    nome: 'Café Estragado',
    descricao: '',
    type: 'evil',
    icon: 'cafe_estragado.webp',
    peso: 10,
    effect: {
      type: 'buff',
      stat: 'lpsMultiplier',
      value: 0.5,
      duration: 30
    }
  },
  {
    id: 'bn9',
    nome: 'Café Demoníaco',
    type: 'evil',
    icon: 'cafe_demoniaco.webp',
    peso: 2,
    effect: {
      type: 'buff',
      stat: 'lpsMultiplier',
      value: 666,
      duration: 6
    }
  }
]