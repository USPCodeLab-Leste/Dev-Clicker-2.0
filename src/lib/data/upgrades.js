export const upgrades = [
  {
    nome: "Mouse gamer",
    custo: 200000,
    descricao: 'Ninguém sabe pra que servem todos esses botões, mas eles estão lá.',
    funcao: 'Aumenta geração de LpS em 5%.',

    icon: 'mouse.webp',
    effect: {
      type: 'lpsMultiplier',
      value: 1.05,
    },
  },
  {
    nome: "Mousepad ergonômico",
    custo: 1000000,
    descricao: 'Previne você de ter uma tendinite (e ainda vem com um LED maneiro).',
    funcao: 'Aumenta geração de LpS em 5%.',
    icon: 'mousepad.webp',
    effect: {
      type: 'lpsMultiplier',
      value: 1.05,
    },
  },
  {
    nome: "Teclado Mecânico RGB",
    custo: 2000000,
    descricao: 'Faz um barulho gostosinho ao teclar e possui mais de 16M de cores para você testar. Uau!',
    funcao: 'Aumenta geração de LpS em 5%.',
    icon: 'teclado.webp',
    effect: {
      type: 'lpsMultiplier',
      value: 1.05,
    },
  },
  {
    nome: "HUB USB",
    custo: 10000000,
    descricao: 'Organiza (ou pelo menos tenta) o teu emaranhado de cabos e fios.',
    funcao: 'Aumenta geração de LpS em 5%.',
    icon: 'usb.webp',
    effect: {
      type: 'lpsMultiplier',
      value: 1.05,
    },
  },
  {
    nome: "Fone Gamer",
    custo: 20000000,
    descricao: 'Abafa tudo: os cachorros latindo, a obra do vizinho e teus familiares te chamando.',
    funcao: 'Aumenta geração de LpS em 5%.',
    icon: 'fone.webp',
    effect: {
      type: 'lpsMultiplier',
      value: 1.05,
    },
  },
  {
    nome: "Cadeira Gamer",
    custo: 100000000,
    descricao: 'Melhora teu conforto e transforma tua coluna lentamente em uma espiral.',
    funcao: 'Aumenta geração de LpS em 5%.',
    icon: 'cadeira.webp',
    effect: {
      type: 'lpsMultiplier',
      value: 1.05,
    },
  },
  {
    nome: "PENDRIVE de 2TB",
    custo: 1000000000,
    descricao: 'Por algum motivo, diz que já está 97% cheio...',
    funcao: 'Aumenta geração de LpS em 5%.',
    icon: 'pendrive.webp',
    effect: {
      type: 'lpsMultiplier',
      value: 1.05,
    },
  },
  {
    nome: "SSD de última geração",
    custo: 2000000000,
    descricao: 'Faz milagres quando tudo que você possui é uma placa integrada.',
    funcao: 'Aumenta geração de LpS em 5%.',
    icon: 'ssd.webp',
    effect: {
      type: 'lpsMultiplier',
      value: 1.05,
    },
  },
  {
    nome: "Placa de vídeo",
    custo: 10000000000,
    descricao: 'Uma RTX 5090 só pra assistir tutoriais em 8K!',
    funcao: 'Aumenta geração de LpS em 5%',
    icon: 'gpu.webp',
    effect: {
      type: 'lpsMultiplier',
      value: 1.05,
    },
  },
  {
    nome: "Fibra óptica",
    custo: 20000000000,
    descricao: 'Chega de ping alto no lolzinho!',
    funcao: 'Aumenta geração de LpS em 5%.',
    icon: 'fibra.webp',
    effect: {
      type: 'lpsMultiplier',
      value: 1.05,
    },
  },
  {
    nome: "Óculos VR",
    custo: 200000000000,
    descricao: 'Te leva para fora dessa realidade cruel, monótona e apática, repleta de violência e ódio gratuito, onde sonhos são sufocados, esmagados, triturados - e tua força de trabalho é sugada até tua última gota de suor. Um ótimo gadget!',
    funcao: 'Aumenta geração de LpS em 5%.',
    icon: 'vr.webp',
    effect: {
      type: 'lpsMultiplier',
      value: 1.05,
    },
  },
  {
    nome: "Energético",
    custo: 88888,
    descricao: 'Junte com café e veja os poderes incríveis da cafeína.',
    funcao: 'Aumenta as chances de se aparecer um cafézinho (lide com as consequências).',
    icon: 'monster.webp',
    effect: {
      type: 'coffeeProb',
      value: 1.5
    }
  },
  {
    nome: "Cafeteira elétrica",
    custo: 8888888,
    descricao: 'Teus cafés mais rápidos e mais gostosos!',
    funcao: 'Aumenta as chances de se aparecer um cafézinho.',
    icon: 'cafeteira.webp',
    effect: {
      type: 'coffeeProb',
      value: 1.5
    }
  },
  {
    nome: "Frigobar",
    custo: 888888888,
    descricao: 'Menos idas à cozinha, mais linhas de código.',
    funcao: 'Aumenta as chances de se aparecer um cafézinho.',
    icon: 'frigobar.webp',
    effect: {
      type: 'coffeeProb',
      value: 1.5
    }
  },
  {
    nome: "Certificado Online",
    custo: 100,
    descricao: 'Aumenta exponencialmente suas chances de arranjar um emprego - Obrigado, Guanabara!',
    funcao: 'Cada clique gera o dobro de linhas.',
    icon: 'certificado.webp',
    effect: {
      type: 'clickMultiplier',
      value: 2
    }
  },
  {
    nome: "Calculadora científica",
    custo: 500,
    descricao: 'Te ajuda com os cálculos que o professor jura que são triviais.',
    funcao: 'Cada clique gera o dobro de linhas.',
    icon: 'calculadora.webp',
    effect: {
      type: 'clickMultiplier',
      value: 2
    }
  },
  {
    nome: "Livro de Cálculo",
    custo: 10000,
    descricao: 'Previne você de zerar quatro provas seguidas de Cálculo I (acredite, é possível).',
    funcao: 'Cada clique gera o dobro de linhas.',
    icon: 'livro.webp',
    effect: {
      type: 'clickMultiplier',
      value: 2
    }
  },
  {
    nome: "Placa gamer",
    custo: 50000,
    descricao: 'Impede teu irmão caçula de perturbar teu foco sagrado.',
    funcao: '+1% das suas LpS por clique.',
    icon: 'placa.webp',
    effect: {
      type: 'clickLpsPercent',
      value: 0.01
    },
  },
  {
    nome: "Ventilador portátil",
    custo: 5000000,
    descricao: 'Para esfriar tua cabeça (e evitar um burnout).',
    funcao: '+1% das suas LpS por clique.',
    icon: 'ventilador.webp',
    effect: {
      type: 'clickLpsPercent',
      value: 0.01
    },
  },
  {
    nome: "Gatinho fofo",
    custo: 500000000,
    descricao: 'Meoow',
    funcao: '+1% das suas LpS por clique.',
    icon: 'gatinho.webp',
    effect: {
      type: 'clickLpsPercent',
      value: 0.01
    },
  },
  {
    nome: "Bot de Commit",
    custo: 100000,
    descricao: 'feat: lê e commita com base nos teus pensamentos.',
    funcao: 'Cada clique gera +0.5 linha de código para cada construção possuída',
    icon: 'commitbot.webp',
    effect: {
      type: 'clickStructureBonus',
      value: 0.5
    }
  },
  {
    nome: "ChatGPT Licenciado",
    custo: 100000000,
    descricao: 'Agora com 5% menos alucinações.',
    funcao: 'Cada clique gera +0.5 linha de código para cada construção possuída',
    icon: 'chatgpt.webp',
    effect: {
      type: 'clickStructureBonus',
      value: 0.5
    }
  },
  {
    nome: "Cubo mágico",
    custo: 43252003,
    descricao: 'Você sabia que existem mais combinações possíveis em um cubo mágico do que átomos no universo? Pois é, na verdade é mentira...',
    funcao: 'Cada clique passa a ter uma chance mínima de fazer surgir um café',
    icon: 'cubo.webp',
    effect: {
      type: 'clickCoffeeChance',
      chance: 0.001
    },
  },
  {
    nome: "Stalker cibernética",
    custo: 802007,
    descricao: 'Receba instantaneamente o follow de uma garota que usa foto de dinossauro, luta boxe, desenha extremamente bem, ama patos e é terrivelmente boa em tudo (e se apaixone perdidamente por ela).',
    funcao: 'Clicar consecutivamente aumenta o multiplicador de cliques',
    icon: 'carta.webp',
    effect: {
      type: 'combo',
    }
  },
  {
    nome: "Extensão Caça-Cupom",
    custo: 999999,
    descricao: 'Mergulha nos cantos mais obscuros da internet em busca dos melhores cupons de desconto.',
    funcao: 'Reduz o preço de todas as estruturas em 10%',
    icon: 'preco.webp',
    effect: {
      type: 'buildDiscount',
      value: 0.9,
    }
  },
].map((up, i) => ({...up, id: `up${i+1}`, unlocked: false, purchased: false})).sort((a, b) => a.custo - b.custo)