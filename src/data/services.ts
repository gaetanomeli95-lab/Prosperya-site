export interface Service {
  slug: string;
  title: string;
  promise: string;
  bullets: string[];
  full: string[];
}

export const services: Service[] = [
  {
    slug: 'governance-e-controllo',
    title: 'Governance e controllo',
    promise:
      'Costruiamo strumenti di governo chiari, misurabili e integrati con la strategia dell’impresa.',
    bullets: [
      'Governance amministrativa e finanziaria',
      'Tesoreria e cash flow',
      'Pianificazione degli investimenti',
    ],
    full: [
      'Governance amministrativa',
      'Governance finanziaria',
      'Tesoreria e cash flow',
      'Pianificazione degli investimenti',
      'Governance commerciale',
      'Ottimizzazione delle reti di vendita',
    ],
  },
  {
    slug: 'strategia-e-crescita',
    title: 'Strategia e crescita',
    promise:
      'Diamo forma a percorsi di sviluppo concreti, partendo dalla struttura organizzativa e dal posizionamento.',
    bullets: [
      'Sviluppo organizzativo e posizionamento',
      'Pianificazione strategica e digitalizzazione',
      'Formazione e executive mentoring',
    ],
    full: [
      'Sviluppo organizzativo',
      'Posizionamento',
      'Pianificazione strategica',
      'Digitalizzazione',
      'Formazione',
      'Executive mentoring',
    ],
  },
  {
    slug: 'startup',
    title: 'Startup e nuove imprese',
    promise:
      'Affianchiamo neo-imprenditori dalla costituzione alla crescita scalabile del progetto.',
    bullets: [
      'Creazione società e adempimenti iniziali',
      'Business model e struttura operativa',
      'Percorsi di crescita scalabili',
    ],
    full: [
      'Creazione di nuove società',
      'Adempimenti iniziali',
      'Business model',
      'Struttura operativa',
      'Percorsi di crescita scalabili',
    ],
  },
  {
    slug: 'internazionalizzazione',
    title: 'Internazionalizzazione',
    promise:
      'Apriamo canali operativi tra Italia, Europa e area magrebina, per investitori e aziende in movimento.',
    bullets: [
      'Ingresso nei mercati esteri',
      'Invest in Italy e supporto agli investitori stranieri',
      'Europa e area magrebina',
    ],
    full: [
      'Ingresso nei mercati esteri',
      'Market entry',
      'Supporto operativo internazionale',
      'Invest in Italy',
      'Assistenza agli investitori stranieri',
      'Europa e area magrebina',
    ],
  },
  {
    slug: 'crisi-e-risanamento',
    title: 'Crisi e risanamento',
    promise:
      'Gestiamo tensioni finanziarie e situazioni complesse con un piano di continuità e rilancio.',
    bullets: [
      'Crisis management e piani di rilancio',
      'Continuità aziendale',
      'Rinegoziazione bancaria e ottimizzazione crediti',
    ],
    full: [
      'Crisis management',
      'Piani di rilancio',
      'Continuità aziendale',
      'Rateizzazioni e transazioni fiscali',
      'Rinegoziazione bancaria',
      'Ottimizzazione delle linee di credito',
    ],
  },
  {
    slug: 'finanza-agevolata',
    title: 'Finanza agevolata',
    promise:
      'Seguiamo le opportunità di finanziamento pubblico dalla ricerca alla rendicontazione.',
    bullets: [
      'Bandi regionali, nazionali ed europei',
      'Progettazione e rendicontazione',
      'Ricerca e sviluppo',
    ],
    full: [
      'Bandi regionali',
      'Bandi nazionali ed europei',
      'Monitoraggio delle opportunità',
      'Progettazione',
      'Rendicontazione',
      'Ricerca e sviluppo',
    ],
  },
];

export const operations = [
  'Affitto di ramo d’azienda',
  'Associazione in partecipazione',
  'Joint venture',
  'Patti parasociali',
  'Statuti e atti costitutivi',
  'NDA e patti di non concorrenza',
  'Marchi e brevetti',
  'Contratti di vendita e per il web',
  'Cessione del credito',
  'Gestione di immobili e locazioni',
];

export const methodSteps = [
  { title: 'Ascolto e analisi', description: 'Raccogliamo dati, bisogni e vincoli per inquadrare la reale situazione dell’impresa.' },
  { title: 'Strategia', description: 'Definiamo obiettivi, priorità e le scelte che orientano il futuro.' },
  { title: 'Affiancamento operativo', description: 'Mettiamo in campo le persone, gli strumenti e i processi necessari.' },
  { title: 'Controllo e sviluppo', description: 'Misuriamo i risultati e alimentiamo un miglioramento continuo.' },
];
