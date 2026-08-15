import { TimelineStep, TeamMember, ImpactMetric, CommunityTestimonial, ProjectSettings } from '../types';

export const initialProjectSettings: ProjectSettings = {
  projectName: 'CONECTANDO MULHERES',
  impactHeadline: 'CONECTANDO MULHERES: LÓGICA E TECNOLOGIA ALÉM DOS COMPUTADORES',
  subtitle: 'Um projeto de extensão universitária na comunidade para democratizar o pensamento computacional desplugado.',
  institutionName: 'Universidade Federal / Faculdade de Tecnologia',
  communityName: 'Comunidade Novo Horizonte & Entorno',
  description: 'Empoderando mulheres e meninas através do pensamento computacional desplugado. Uma jornada de aprendizado lógico, estruturado e criativo sem necessidade de computadores ou telas.',
  heroBadge: 'Extensão Universitária • Edição 2024/2025',
  contactEmail: 'conectandomulheres.extensao@universidade.edu.br',
  instagramHandle: '@conectandomulheres.ext',
  globalProgressOverride: null, // calculated dynamically from steps
};

export const initialTimelineSteps: TimelineStep[] = [
  {
    id: 'passo-1',
    stepNumber: '01',
    title: 'Entendendo Algoritmos',
    subtitle: 'A dinâmica do Robô Cego e o poder do sequenciamento',
    weekRange: 'Semana 1-2',
    dateRange: '05/Out a 18/Out',
    status: 'concluido',
    logicalConcept: 'Sequenciamento e Algoritmos Passo a Passo',
    activityDescription: 'As participantes trabalham em duplas onde uma fica vendada (o "Robô") e a outra fornece instruções estritamente literais e ordenadas ("dê 2 passos para frente", "gire 90 graus à direita", "pare") para desviar de obstáculos na sala.',
    logicalObjective: 'Compreender que um algoritmo é uma sequência finita e inequívoca de instruções claras, e que a ordem exata das operações altera diretamente o resultado final (sequenciamento lógico).',
    pedagogicalMaterials: [
      'Vendas de tecido confortáveis',
      'Fita adesiva colorida para demarcação de percurso no chão',
      'Cartões de comandos impressos (Frente, Giro, Pegar, Soltar)',
      'Caderno de campo para anotação de "bugs" de instrução'
    ],
    tags: ['Sequenciamento', 'Comunicação Clara', 'Robô Cego', 'Trabalho em Duplas'],
    iconType: 'robot',
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
      caption: 'Oficina prática 01: Participantes guiando o percurso através de algoritmos verbais e cartões de comandos.',
      placeholderDesc: 'Fotografia das participantes da comunidade guiando uma colega vendada usando placas de comando na quadra comunitária.',
      gallery: [
        {
          url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
          caption: 'Duplas alinhando os comandos de sequenciamento antes de iniciar o labirinto.'
        },
        {
          url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
          caption: 'Discussão coletiva sobre a importância da clareza e precisão nas instruções.'
        },
        {
          url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
          caption: 'Registro dos cartões de comandos desenhados pelas próprias participantes.'
        }
      ]
    },
    feedback: {
      quote: 'Eu achava que computação era coisa de máquina cara. Quando fui o robô da minha vizinha, percebi que programar é falar a mesma língua com clareza e calma. Me senti muito capaz!',
      author: 'Dona Maria de Lourdes',
      role: 'Artesã e Líder Comunitária (54 anos)',
      community: 'Comunidade Novo Horizonte'
    }
  },
  {
    id: 'passo-2',
    stepNumber: '02',
    title: 'Padrões e Loops',
    subtitle: 'Fábrica de Pulseiras e Laços de Repetição',
    weekRange: 'Semana 3-4',
    dateRange: '19/Out a 02/Nov',
    status: 'em_andamento',
    logicalConcept: 'Reconhecimento de Padrões e Loops (For / While)',
    activityDescription: 'Criação de colares e pulseiras artesanais seguindo partituras de contas coloridas que codificam laços de repetição (ex: "Repita 4x: [Azul, Amarelo, Roxo]"). As participantes aprendem a otimizar instruções longas usando blocos repetidores.',
    logicalObjective: 'Compreender como os laços de repetição (Loops) economizam energia e linhas de instrução, além de exercitar a identificação de repetições e modularidade em tarefas cotidianas.',
    pedagogicalMaterials: [
      'Miçangas e contas coloridas (4 cores padronizadas)',
      'Fios de silicone e barbantes',
      'Cartelas de laços de repetição ("REPETIR [ ] VEZES")',
      'Tabelas de codificação binária e padrões de repetição'
    ],
    tags: ['Laços de Repetição', 'Loops For/While', 'Artesanato Lógico', 'Otimização'],
    iconType: 'bracelet',
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80',
      caption: 'Oficina 02: Construindo pulseiras com padrões algorítmicos e cartelas de laços de repetição.',
      placeholderDesc: 'Mãos das participantes montando colares com miçangas coloridas seguindo esquemas lógicos de repetição em papel.',
      gallery: [
        {
          url: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80',
          caption: 'Construção da regra do loop: economizando 20 linhas de instrução em um único bloco.'
        },
        {
          url: 'https://images.unsplash.com/photo-1573497491765-dccce02b29df?auto=format&fit=crop&w=800&q=80',
          caption: 'Compartilhando as pulseiras criadas com padrões únicos entre as turmas.'
        }
      ]
    },
    feedback: {
      quote: 'Na costura e no crochê a gente já faz repetição o dia inteiro sem saber que é loop de programador. Esse curso deu nome chique pro que a gente já sabia fazer com as mãos!',
      author: 'Cláudia Regina',
      role: 'Costureira e Estudante da EJA (41 anos)',
      community: 'Comunidade Novo Horizonte'
    }
  },
  {
    id: 'passo-3',
    stepNumber: '03',
    title: 'Tomada de Decisões',
    subtitle: 'Estruturas Condicionais: Se / Senão (If / Else)',
    weekRange: 'Semana 5-6',
    dateRange: '03/Nov a 16/Nov',
    status: 'planejado',
    logicalConcept: 'Estruturas Condicionais e Ramificações Lógicas',
    activityDescription: 'Jogos dinâmicos com baralhos gigantes e cartões de condições ambientais. Exemplo prático: "SE a carta sorteada for vermelha, dê 2 passos à frente; SENÃO SE for de espadas, gire 180°; SENÃO, bata palmas".',
    logicalObjective: 'Desenvolver a habilidade de analisar cenários variados, testar premissas lógicas verdadeiras/falsas (Booleanos) e arquitetar caminhos alternativos de tomada de decisão estruturada.',
    pedagogicalMaterials: [
      'Baralho gigante de tomada de decisão',
      'Painéis em EVA com blocos "SE", "ENTÃO", "SENÃO"',
      'Tapete quadriculado de decisões',
      'Fichas de perguntas e respostas sobre o cotidiano comunitário'
    ],
    tags: ['Condicionais', 'If / Else', 'Booleanos', 'Árvore de Decisão'],
    iconType: 'cards',
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=800&q=80',
      caption: 'Planejamento da oficina de condicionais: dinâmica física com cartas e blocos de decisão.',
      placeholderDesc: 'Cartões ilustrados em formato de blocos de programação com condições SE / ENTÃO / SENÃO.',
      gallery: [
        {
          url: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=800&q=80',
          caption: 'Protótipo dos cartões de desafio lógico que serão utilizados na quadra.'
        }
      ]
    },
    feedback: {
      quote: 'Estamos ansiosas para essa etapa! Já estamos pensando em como aplicar SE/SENÃO para organizar a escala da cooperativa de reciclagem.',
      author: 'Tatiane Cristina',
      role: 'Cooperativista Local (29 anos)',
      community: 'Comunidade Novo Horizonte'
    }
  },
  {
    id: 'passo-4',
    stepNumber: '04',
    title: 'Depuração e Resolução',
    subtitle: 'Projeto Final: Fluxogramas para Problemas Reais da Comunidade',
    weekRange: 'Semana 7-8',
    dateRange: '17/Nov a 30/Nov',
    status: 'planejado',
    logicalConcept: 'Decomposição, Depuração (Debugging) e Abstração',
    activityDescription: 'As participantes se reúnem em grupos temáticos para mapear um desafio concreto da comunidade (ex: coleta seletiva, horta comunitária, agendamento de consultas) e desenham em cartazes um algoritmo visual passo a passo, testando falhas e corrigindo bugs.',
    logicalObjective: 'Aplicar os 4 pilares do pensamento computacional para solucionar problemas reais de forma autônoma, validando o impacto social e a apropriação do raciocínio lógico.',
    pedagogicalMaterials: [
      'Cartolinas e papéis kraft de grande formato',
      'Post-its coloridos para simulação de nós e decisões',
      'Canetas hidrográficas e carimbos de "Bug Encontrado" e "Bug Resolvido"',
      'Certificados de conclusão da jornada de extensão'
    ],
    tags: ['Decomposição', 'Debugging', 'Impacto Comunitário', 'Projeto Final'],
    iconType: 'flowchart',
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
      caption: 'Oficina final de culminância: estruturação de fluxogramas colaborativos e entrega de certificados.',
      placeholderDesc: 'Cartaz coletivo com post-its coloridos e setas desenhadas à mão representando o fluxograma de melhoria do bairro.',
      gallery: [
        {
          url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
          caption: 'Exemplo de mapeamento visual com decomposição em etapas viáveis.'
        }
      ]
    },
    feedback: {
      quote: 'Nosso objetivo final é que cada mulher saia dessa jornada sabendo que a mente dela é capaz de decompor e resolver qualquer desafio da vida com lógica e confiança.',
      author: 'Equipe de Extensão',
      role: 'Docentes e Discentes',
      community: 'Conectando Mulheres'
    }
  }
];

export const initialTeamMembers: TeamMember[] = [
  {
    id: 'docente-1',
    name: 'Profa. Dra. Helena Medeiros',
    category: 'docente',
    titleOrCourse: 'Profa. Titular do Depto. de Informática',
    roleInProject: 'Coordenadora Geral & Orientadora',
    bio: 'Doutora em Ciência da Computação com 15 anos de pesquisa em Educação Tecnológica, Inclusão de Gênero nas Ciências Exatas e Computação Desplugada.',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    lattesUrl: 'http://lattes.cnpq.br/0000000000000000',
    email: 'helena.medeiros@universidade.edu.br'
  },
  {
    id: 'docente-2',
    name: 'Profa. Ma. Beatriz Alencar',
    category: 'docente',
    titleOrCourse: 'Profa. Assistente em Pedagogia & Educação',
    roleInProject: 'Supervisora Metodológica e Pedagógica',
    bio: 'Mestre em Educação e Tecnologias Sociais, especialista na criação de jogos tangíveis e metodologias ativas para comunidades populares.',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
    lattesUrl: 'http://lattes.cnpq.br/0000000000000000',
    email: 'beatriz.alencar@universidade.edu.br'
  },
  {
    id: 'discente-1',
    name: 'Camila Duarte',
    category: 'discente',
    titleOrCourse: 'Bacharelado em Ciência da Computação (6º Período)',
    roleInProject: 'Líder de Oficinas & Pesquisadora Extensionista',
    bio: 'Bolsista de extensão universitária, apaixonada por lógica matemática e facilitação de dinâmicas para grupos de mulheres.',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    githubUrl: 'https://github.com',
    linkedinUrl: 'https://linkedin.com'
  },
  {
    id: 'discente-2',
    name: 'Luísa Freitas',
    category: 'discente',
    titleOrCourse: 'Engenharia de Software (4º Período)',
    roleInProject: 'Responsável pelo Portal Web & Documentação',
    bio: 'Desenvolvedora front-end e extensionista focada em acessibilidade web, design de interfaces e registro histórico do projeto.',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
    githubUrl: 'https://github.com',
    linkedinUrl: 'https://linkedin.com'
  },
  {
    id: 'discente-3',
    name: 'Mariana Souza',
    category: 'discente',
    titleOrCourse: 'Sistemas de Informação (5º Período)',
    roleInProject: 'Articulação Comunitária & Registro de Mídia',
    bio: 'Responsável pelo contato direto com as lideranças do bairro, coleta de depoimentos e suporte logístico dos encontros desplugados.',
    avatarUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80',
    linkedinUrl: 'https://linkedin.com'
  }
];

export const initialImpactMetrics: ImpactMetric[] = [
  {
    id: 'metric-1',
    value: '150+',
    label: 'MULHERES IMPACTADAS',
    description: 'Moradoras de diversas faixas etárias capacitadas nas oficinas presenciais.',
    iconName: 'users'
  },
  {
    id: 'metric-2',
    value: '24',
    label: 'OFICINAS REALIZADAS',
    description: 'Encontros dinâmicos em centros comunitários e escolas públicas parceiras.',
    iconName: 'sparkles'
  },
  {
    id: 'metric-3',
    value: '100%',
    label: 'DESPLUGADO',
    description: 'Metodologia sem telas ou computadores, usando materiais táteis e criativos.',
    iconName: 'zap'
  },
  {
    id: 'metric-4',
    value: '8',
    label: 'SEMANAS DE JORNADA',
    description: 'Módulos evolutivos desde sequenciamento simples até depuração complexa.',
    iconName: 'calendar'
  }
];

export const initialTestimonials: CommunityTestimonial[] = [
  {
    id: 'test-1',
    name: 'Dona Maria de Lourdes',
    role: 'Líder Comunitária e Artesã (54 anos)',
    community: 'Comunidade Novo Horizonte',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    quote: 'Eu achava que tecnologia era coisa só para jovens com computadores caros. Quando aprendi a lógica com jogos e miçangas, vi que a minha cabeça já pensa como um programa há muito tempo!',
    activityName: 'Oficina 01: O Robô Cego',
    date: 'Outubro de 2024'
  },
  {
    id: 'test-2',
    name: 'Letícia Ramos',
    role: 'Estudante do Ensino Médio Público (17 anos)',
    community: 'Bairro Santa Tereza',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    quote: 'As oficinas me deram a certeza de prestar vestibular para Ciência da Computação. Ver mulheres na liderança do projeto mudou completamente minha perspectiva de futuro!',
    activityName: 'Oficina 02: Padrões e Loops',
    date: 'Novembro de 2024'
  },
  {
    id: 'test-3',
    name: 'Cláudia Regina',
    role: 'Empreendedora e Aluna da EJA (41 anos)',
    community: 'Comunidade Novo Horizonte',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=200&q=80',
    quote: 'Descobrir que o raciocínio que uso para organizar minhas encomendas é puro pensamento computacional foi uma injeção de autoestima gigantesca.',
    activityName: 'Oficina 03: Tomada de Decisões',
    date: 'Novembro de 2024'
  }
];

export const computationalThinkingPillars = [
  {
    id: 'decomposicao',
    title: 'Decomposição',
    shortDesc: 'Dividir um problema complexo em partes menores e mais fáceis de resolver.',
    color: '#D2F832', // lime
    icon: 'Split',
    inPractice: 'Dividir a tarefa de organizar uma feira comunitária em passos individuais: compras, montagem, precificação e divulgação.'
  },
  {
    id: 'padroes',
    title: 'Reconhecimento de Padrões',
    shortDesc: 'Identificar semelhanças, repetições e regularidades para antecipar soluções.',
    color: '#E8DEFF', // lilac
    icon: 'Repeat',
    inPractice: 'Identificar pontos repetitivos na criação de artesanato ou na rotina de agendamento para aplicar laços de repetição.'
  },
  {
    id: 'abstracao',
    title: 'Abstração',
    shortDesc: 'Focar no que é essencial para a solução e ignorar detalhes irrelevantes no momento.',
    color: '#D2F832', // lime
    icon: 'Filter',
    inPractice: 'Ao criar um mapa da comunidade, focar apenas nas ruas e pontos de encontro, sem se preocupar com as cores das casas.'
  },
  {
    id: 'algoritmos',
    title: 'Algoritmos',
    shortDesc: 'Criar uma lista ordenada e clara de passos para executar uma tarefa do início ao fim.',
    color: '#E8DEFF', // lilac
    icon: 'ListOrdered',
    inPractice: 'Escrever a receita ou passo a passo exato para que qualquer pessoa consiga guiar o robô sem bater em obstáculos.'
  }
];
