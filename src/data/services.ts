import { consultationConfig } from './consultations';

export interface Service {
  slug: string;
  title: string;
  promise: string;
  bullets: string[];
  full: string[];
}

export interface CatalogService {
  title: string;
  href: string;
  area: string;
  consultationPrice?: number;
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
      'Controllo di gestione',
    ],
    full: [
      'Governance amministrativa',
      'Governance finanziaria',
      'Tesoreria e cash flow',
      'Controllo di gestione',
      'Pianificazione degli investimenti',
      'Governance commerciale',
      'Ottimizzazione delle reti di vendita',
    ],
  },
  {
    slug: 'strategia-e-crescita',
    title: 'Sviluppo e risorse',
    promise:
      'Affianchiamo l’impresa nello sviluppo organizzativo, nelle risorse e nei percorsi di crescita strutturata.',
    bullets: [
      'Growth Factors',
      'Formazione e executive mentoring',
      'Bandi e contributi (Europei, Nazionali, Regionali e Camerali)',
    ],
    full: [
      'Growth Factors',
      'Sviluppo organizzativo',
      'Pianificazione strategica',
      'Digitalizzazione',
      'Formazione e executive mentoring',
      'Bandi e contributi (Europei, Nazionali, Regionali e Camerali)',
    ],
  },
  {
    slug: 'startup',
    title: 'Start Up',
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
      'Come finanziare la tua Start Up',
      'Percorsi di crescita scalabili',
    ],
  },
  {
    slug: 'creazione-newco',
    title: 'Creazione NewCo',
    promise:
      'Affianchiamo la creazione di nuove società dalla definizione dell’assetto fino alla costituzione operativa.',
    bullets: [
      'Definizione dell’assetto societario',
      'Statuto e atto costitutivo',
      'Adempimenti di avvio',
    ],
    full: [
      'Creazione NewCo',
      'Definizione dell’assetto societario',
      'Statuto e atto costitutivo',
      'Organizzazione della struttura iniziale',
      'Adempimenti di avvio',
      'Controllo della governance',
    ],
  },
  {
    slug: 'internazionalizzazione',
    title: 'Internazionalizzazione',
    promise:
      'Apriamo canali operativi tra Italia, Europa e area magrebina, per investitori e aziende in movimento.',
    bullets: [
      'Market Entry',
      'Invest in Italy',
      'Europa e area magrebina',
    ],
    full: [
      'Market Entry',
      'Supporto operativo internazionale',
      'Invest in Italy',
      'Assistenza agli investitori stranieri',
      'Europa e area magrebina',
    ],
  },
  {
    slug: 'crisi-e-risanamento',
    title: 'Ristrutturazione debiti',
    promise:
      'Ci occupiamo attivamente della gestione di complessi piani di rateizzazione e transazioni fiscali, giudiziari ed extragiudiziari.',
    bullets: [
      'Rinegoziazione bancaria',
      'Continuità aziendale',
      'Piani di rilancio',
    ],
    full: [
      'Ristrutturazione debiti Agenzia delle Entrate',
      'Piani di rateizzazione e transazioni fiscali',
      'Interventi giudiziari ed extragiudiziari',
      'Rinegoziazione bancaria',
      'Continuità aziendale',
      'Piani di rilancio',
    ],
  },
  {
    slug: 'finanza-agevolata',
    title: 'Finanza agevolata',
    promise:
      'Seguiamo le opportunità di finanziamento pubblico dalla ricerca alla rendicontazione.',
    bullets: [
      'Contributi a fondo perduto',
      'Ricerca e sviluppo',
      'Bandi e progettazione',
    ],
    full: [
      'Contributi a fondo perduto',
      'Ricerca e sviluppo',
      'Monitoraggio delle opportunità',
      'Progettazione',
      'Rendicontazione',
    ],
  },
];

export const serviceCatalog: CatalogService[] = [
  { title: 'Start Up', href: '/servizi/startup/', area: 'Nuove imprese' },
  { title: 'Market Entry', href: '/servizi/internazionalizzazione/', area: 'Internazionalizzazione' },
  { title: 'Invest in Italy', href: '/servizi/internazionalizzazione/', area: 'Internazionalizzazione' },
  { title: 'Ristrutturazione debiti banche / Agenzia delle Entrate', href: '/servizi/crisi-e-risanamento/', area: 'Ristrutturazione debiti' },
  { title: 'Growth Factors', href: '/servizi/strategia-e-crescita/', area: 'Sviluppo e risorse' },
  { title: 'Controllo di gestione', href: '/servizi/governance-e-controllo/', area: 'Governance e controllo' },
  { title: 'Finanza agevolata', href: '/servizi/finanza-agevolata/', area: 'Finanza agevolata', consultationPrice: consultationConfig.price },
  { title: 'Formazione e Executive Mentoring', href: '/servizi/strategia-e-crescita/', area: 'Sviluppo e risorse' },
  { title: 'Contributi a fondo perduto', href: '/servizi/finanza-agevolata/', area: 'Finanza agevolata' },
  { title: 'Marchi e brevetti', href: '/contatti/', area: 'Tutela e sviluppo' },
  { title: 'Ricerca e sviluppo', href: '/servizi/finanza-agevolata/', area: 'Finanza agevolata' },
  { title: 'Rete d’impresa', href: '/servizi/strategia-e-crescita/', area: 'Sviluppo e risorse' },
  { title: 'Gestioni immobiliari', href: '/contatti/', area: 'Soluzioni su misura' },
  { title: 'Creazione NewCo', href: '/servizi/creazione-newco/', area: 'Nuove imprese' },
];

export const homeServices = serviceCatalog.map((service) => service.title.toUpperCase());

export const operations = [
  'NewCo (start-up)',
  'Affitto di ramo d’azienda',
  'Spin-off',
  'Joint venture',
  'Capitale e agreement',
  'Patti parasociali',
  'Statuti e atti costitutivi',
];

export const methodSteps = [
  { title: 'Ascolto e analisi', description: 'Raccogliamo dati, bisogni e vincoli per inquadrare la reale situazione dell’impresa.' },
  { title: 'Strategia', description: 'Definiamo obiettivi, priorità e le scelte che orientano il futuro.' },
  { title: 'Affiancamento operativo', description: 'Mettiamo in campo le persone, gli strumenti e i processi necessari.' },
  { title: 'Controllo e sviluppo', description: 'Misuriamo i risultati e alimentiamo un miglioramento continuo.' },
];
