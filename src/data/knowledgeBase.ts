// Knowledge base extracted from "Regulile pentru aplicarea normelor privind echiparea polițiștilor" - Ordin 183/2021

export type Category = 
  | 'alocare_drepturi'
  | 'inaintare_grad'
  | 'mutare'
  | 'detasare'
  | 'incetare'
  | 'suspendare'
  | 'restante_anticipatii'
  | 'studenti_elevi'
  | 'echipament_specific'
  | 'general';

export interface KnowledgeEntry {
  id: string;
  category: Category;
  keywords: string[];
  question: string;
  answer: string;
  article: string;
}

export const categories: Record<Category, string> = {
  alocare_drepturi: 'Stabilirea și acordarea drepturilor',
  inaintare_grad: 'Drepturi la înaintarea în grad',
  mutare: 'Mutare în altă structură',
  detasare: 'Detașare / Împuternicire',
  incetare: 'Încetarea raporturilor de serviciu',
  suspendare: 'Suspendare / Punere la dispoziție',
  restante_anticipatii: 'Restanțe și anticipații',
  studenti_elevi: 'Studenți și elevi',
  echipament_specific: 'Echipament specific',
  general: 'Informații generale',
};

export const knowledgeBase: KnowledgeEntry[] = [
  // GENERAL
  {
    id: 'gen1',
    category: 'general',
    keywords: ['echipament', 'gratuit', 'drept', 'normă', 'durată serviciu'],
    question: 'Ce presupun drepturile de echipament?',
    answer: 'Normele de echipament prevăd articole care se asigură **gratuit**. Acestea se distribuie pentru folosință sau în consum, pe o perioadă stabilită numită **durată de serviciu**. Articolele din normele nr. 1 și 2 se distribuie în limita **echivalentului valoric al cotei-părți anuale**.',
    article: 'Art. 2',
  },
  {
    id: 'gen2',
    category: 'general',
    keywords: ['durată', 'serviciu', 'calcul', 'ani', 'luni'],
    question: 'Cum se calculează durata de serviciu?',
    answer: 'Durata de serviciu se calculează în **ani (12 luni)** sau în **luni** de la darea în folosință, indiferent dacă sunt utilizate numai în anumite perioade. Cantitățile reprezintă **plafoane maxime**, iar durata de serviciu este **limita minimă** cât trebuie menținute în folosință.',
    article: 'Art. 2 alin. (2)',
  },
  {
    id: 'gen3',
    category: 'general',
    keywords: ['echivalent', 'valoric', 'cota', 'parte', 'anuală', 'recalculare'],
    question: 'Ce este echivalentul valoric al cotei-părți anuale?',
    answer: 'Echivalentul valoric se **recalculează anual** (în trimestrul III al anului în curs, pentru anul următor) de Direcția Generală Logistică, pe baza prețurilor medii ponderate din procedurile de achiziție. Se aplică în perioada **1 ianuarie - 31 decembrie** a anului pentru care a fost stabilit.',
    article: 'Art. 8',
  },
  {
    id: 'gen4',
    category: 'general',
    keywords: ['scoatere', 'serviciu', 'vinovăție', 'pagubă', 'recuperare'],
    question: 'Ce se întâmplă dacă scoți din serviciu un articol înainte de termen?',
    answer: 'Scoaterea din serviciu **cu vinovăție** a articolelor înainte de îndeplinirea duratei de serviciu constituie **pagubă materială** și se recuperează potrivit actelor normative privind răspunderea materială.',
    article: 'Art. 4',
  },

  // ALOCARE DREPTURI
  {
    id: 'aloc1',
    category: 'alocare_drepturi',
    keywords: ['alocare', 'drepturi', 'categorie', 'echipament', 'bani', 'dispoziție'],
    question: 'Cum se face alocarea la drepturi de echipament?',
    answer: 'Polițiștii se alocă la drepturi prin **dispoziție de zi pe unitate**, la începutul fiecărui an, în una din cele 3 categorii:\n\n1. **Numai echipament** - solicită echipament până la valoarea integrală a cotei-părți anuale\n2. **Echipament + diferența în bani** - solicită echipament necesar pentru completarea uniformei, diferențele se acordă în bani\n3. **Numai bani** - cu condiția de a deține uniformă completă pentru ambele sezoane',
    article: 'Art. 11, Art. 13',
  },
  {
    id: 'aloc2',
    category: 'alocare_drepturi',
    keywords: ['fișă', 'evidență', 'completare', 'termen', 'octombrie'],
    question: 'Când și cum se completează fișa de evidență?',
    answer: 'Anual, până la **15 octombrie**, polițiștii completează și transmit **electronic** fișele de evidență, prin aplicația informatică. Solicită articolele pentru anul următor care să le asigure uniformă completă pentru sezonul cald și rece. Fișele se avizează de șeful nemijlocit și se aprobă de șeful unității.',
    article: 'Art. 13',
  },
  {
    id: 'aloc3',
    category: 'alocare_drepturi',
    keywords: ['bani', 'lunar', 'plată', 'echipament bani', '1/12'],
    question: 'Cum se plătesc drepturile de echipament în bani?',
    answer: 'Drepturile de echipament în bani se acordă **lunar**, în cuantum de **1/12 din valoarea anuală**.',
    article: 'Art. 14',
  },
  {
    id: 'aloc4',
    category: 'alocare_drepturi',
    keywords: ['completare', 'uniformă', 'parcurs', 'an'],
    question: 'Pot solicita echipament pe parcursul anului?',
    answer: 'Da. Polițiștii care pe parcursul anului constată necesitatea completării uniformei pot solicita echipamentul necesar, **în limita echivalentului valoric** al cotei-părți anuale.',
    article: 'Art. 14',
  },
  {
    id: 'aloc5',
    category: 'alocare_drepturi',
    keywords: ['verificare', 'uniformă', 'șefi', 'control', 'avizare'],
    question: 'Cine verifică uniforma polițistului?',
    answer: 'Pe timpul perioadei de avizare și aprobare a fișelor, **șefii ierarhici și/sau nemijlociți** sunt obligați să verifice **fizic** uniforma, inclusiv prin consultarea fișelor individuale și documentelor de distribuție pentru cel puțin **ultimii 5 ani**. La constatarea deficiențelor, dispun imediat măsuri de remediere.',
    article: 'Art. 13 alin. (5)',
  },

  // INAINTARE IN GRAD
  {
    id: 'grad1',
    category: 'inaintare_grad',
    keywords: ['chestor', 'înaintare', 'grad', 'avansare'],
    question: 'Ce drepturi suplimentare primesc ofițerii înaintați la chestor?',
    answer: 'Pe lângă cota-parte anuală, primesc **echivalentul valoric integral** al: o șapcă din stofă, un costum din stofă (sacou cu 2 pantaloni), un pardesiu (cu accesorii), 3 perechi de suporți de grad și 2 perechi de epoleți. Pentru femei: pălărie în loc de șapcă și fustă în loc de pantalon.',
    article: 'Art. 17',
  },
  {
    id: 'grad2',
    category: 'inaintare_grad',
    keywords: ['comisar-șef', 'avansare', 'blană', 'căciulă'],
    question: 'Ce primesc ofițerii avansați la comisar-șef?',
    answer: 'Începând cu anul avansării, pe lângă cota-parte pentru ofițeri, primesc și echivalentul valoric al cotei-părți aferente unei **căciuli** și unui **guler din blană naturală** astrahan/caracul.',
    article: 'Art. 18',
  },
  {
    id: 'grad3',
    category: 'inaintare_grad',
    keywords: ['agent', 'ofițer', 'trecere', 'înaintare'],
    question: 'Ce drepturi au agenții înaintați la ofițer?',
    answer: 'Agenții înaintați la grad de ofițer primesc, pe lângă cota-parte anuală, **echivalentul valoric integral** al: o șapcă din stofă, un costum din stofă (sacou cu 2 pantaloni), un pardesiu (cu accesorii), 3 perechi de suporți de grad și 2 perechi de epoleți.',
    article: 'Art. 19',
  },
  {
    id: 'grad4',
    category: 'inaintare_grad',
    keywords: ['grad', 'următor', 'accesorii', 'epoleți', 'suporți'],
    question: 'Ce primesc polițiștii la avansarea în gradul următor?',
    answer: 'Pe lângă cota-parte anuală, primesc **în natură**, la data avansării:\n\n**Ofițeri:** 3 perechi suporți de grad + 2 perechi epoleți. La avansarea de la inspector principal la subcomisar: + o șapcă din stofă, un costum, o șapcă cu 2 coafe impermeabilă.\n\n**Agenți:** 3 perechi suporți de grad + 2 perechi epoleți.',
    article: 'Art. 20',
  },

  // MUTARE
  {
    id: 'mut1',
    category: 'mutare',
    keywords: ['mutare', 'altă', 'structură', 'militară', 'drepturi'],
    question: 'Ce se întâmplă cu drepturile la mutarea în altă structură?',
    answer: 'Polițiștii mutați din structurile de poliție în structurile militare/alt sistem beneficiază de la unitatea din care se mută de echivalentul valoric calculat **pentru numărul de luni lucrate**, inclusiv luna mutării. Dacă au primit mai mult, diferența se recuperează.',
    article: 'Art. 22',
  },
  {
    id: 'mut2',
    category: 'mutare',
    keywords: ['mutare', 'unitate', 'comunicare', 'termen'],
    question: 'Ce obligații are unitatea la mutarea unui polițist?',
    answer: 'Unitatea din care a fost mutat comunică noii unități, în **15 zile calendaristice**, extrasul drepturilor distribuite + copie a Fișei de evidență. Drepturile în bani aferente lunilor lucrate se asigură de unitatea veche. Drepturile în natură nesolicitate se distribuie de unitatea nouă.',
    article: 'Art. 32',
  },

  // DETASARE
  {
    id: 'det1',
    category: 'detasare',
    keywords: ['detașare', 'împuternicire', 'drepturi', 'unitate'],
    question: 'Cum se acordă drepturile la detașare?',
    answer: 'Polițiștii detașați/împuterniciți primesc drepturi de la **unitatea de care aparțin**. Dacă detașarea depășește **1 an**, pot fi alocați la drepturi la unitatea unde sunt detașați. Polițiștii detașați la **alte instituții publice** beneficiază de echivalentul valoric anterior detașării.',
    article: 'Art. 31',
  },

  // INCETARE
  {
    id: 'inc1',
    category: 'incetare',
    keywords: ['încetare', 'raporturi', 'serviciu', 'lichidare', 'drepturi'],
    question: 'Cum se lichidează drepturile la încetarea raporturilor de serviciu?',
    answer: 'Data încetării drepturilor = prima zi a lunii următoare celei în care a survenit încetarea. Lichidarea:\n\n• Echipament distribuit în natură → **legal acordat**, nu se recuperează\n• Echipament nedistribuit → se acordă **echivalentul în bani** pentru lunile lucrate\n• Anticipații → se **recuperează integral**\n• Drepturi în bani peste lunile lucrate → se **recuperează integral**',
    article: 'Art. 34',
  },
  {
    id: 'inc2',
    category: 'incetare',
    keywords: ['deces', 'urmaș', 'drepturi', 'înhumare'],
    question: 'Ce drepturi au urmașii în caz de deces?',
    answer: 'Urmașii primesc: **restanțele pe ultimii 3 ani** + cota-parte anuală inclusiv luna decesului. La solicitare scrisă, se poate asigura gratuit **uniformă pentru înhumare** (de reprezentare și ceremonialuri). Dacă drepturile deja acordate depășesc cele cuvenite, diferențele **nu se mai recuperează**.',
    article: 'Art. 36',
  },
  {
    id: 'inc3',
    category: 'incetare',
    keywords: ['rezervă', 'trecere', 'obligații', 'uniformă'],
    question: 'Ce obligații au polițiștii la trecerea în rezervă?',
    answer: 'La trecerea în rezervă, polițiștilor li se aduce la cunoștință (sub semnătură pe fișa de lichidare):\n\n• Să **nu înstrăineze** uniforma (donare, vânzare sau alte forme)\n• Să **nu modifice** articolele de echipament de care dispun',
    article: 'Art. 37',
  },

  // SUSPENDARE
  {
    id: 'susp1',
    category: 'suspendare',
    keywords: ['suspendare', 'dispoziție', 'arest', 'drepturi'],
    question: 'Ce se întâmplă cu drepturile la suspendare?',
    answer: '**Puși la dispoziție** (cu sarcini de serviciu) → beneficiază în continuare de drepturi.\n\n**Suspendați** (arest preventiv) → **nu mai beneficiază** de drepturi de la data suspendării.\n\nLa **clasare/achitare** → beneficiază de toate drepturile avute la data punerii la dispoziție, inclusiv compensarea celor de care au fost privați.',
    article: 'Art. 39',
  },
  {
    id: 'susp2',
    category: 'suspendare',
    keywords: ['concediu', 'maternitate', 'creștere', 'copil', 'incapacitate'],
    question: 'Ce drepturi au polițiștii în concediu medical/maternitate?',
    answer: 'Pe timpul concediului de incapacitate, **maternitate**, creștere copil (până la 2 ani, sau 3 ani pentru copil cu handicap), îngrijire copil cu dizabilitate (3-7 ani), sau concediu de acomodare, polițiștii primesc **integral** valoarea financiară neimpozabilă, actualizată.',
    article: 'Art. 39 alin. (7)',
  },
  {
    id: 'susp3',
    category: 'suspendare',
    keywords: ['sindicat', 'conducere', 'ales'],
    question: 'Ce drepturi au polițiștii aleși în conducerea sindicatului?',
    answer: 'Polițiștii aleși în organele de conducere ale organizațiilor sindicale beneficiază de echivalentul valoric al cotei-părți anuale de care au beneficiat **anterior alegerii**.',
    article: 'Art. 39 alin. (6)',
  },
  {
    id: 'susp4',
    category: 'suspendare',
    keywords: ['suspendare', 'inițiativă', 'proprie', 'reluare'],
    question: 'Ce se întâmplă cu drepturile la suspendarea din inițiativa polițistului?',
    answer: 'Nu mai beneficiază de drepturi **din prima zi a lunii următoare** celei în care a intervenit suspendarea (dacă au cel puțin o zi lucrată). La reluare, primesc drepturile **din luna următoare** celei în care le-a încetat suspendarea.',
    article: 'Art. 39 alin. (5)',
  },

  // RESTANTE SI ANTICIPATII
  {
    id: 'rest1',
    category: 'restante_anticipatii',
    keywords: ['restanță', 'restante', 'nedistribuit', 'echipament'],
    question: 'Ce sunt restanțele de echipament?',
    answer: 'Restanțele = articole nedistribuite în anul solicitat + sume de bani neprimite. Se preiau în fișa anului următor cu **prioritate**. După **31 decembrie 2025**, restanțele în natură se pot acorda și sub formă bănească (cele acumulate până la 31.12.2025 se acordă numai în natură). **Nu se mai acordă** articolele neridicate pe cel puțin **3 ani consecutivi** fără dovadă de solicitare scrisă.',
    article: 'Art. 28',
  },
  {
    id: 'rest2',
    category: 'restante_anticipatii',
    keywords: ['anticipație', 'anticipatii', 'peste', 'depășire'],
    question: 'Ce sunt anticipațiile?',
    answer: 'Anticipațiile = valoarea articolelor acordate **peste** echivalentul valoric anual. Acordarea cu anticipație a **contravalorii** este **strict interzisă** (doar articole). Se pot acorda cu anticipație în cazuri de: uzare prematură sau conformație fizică specială, cu aprobarea șefului unității (ordonator de credite).',
    article: 'Art. 29, Art. 30',
  },

  // STUDENTI
  {
    id: 'stud1',
    category: 'studenti_elevi',
    keywords: ['student', 'elev', 'școală', 'academia', 'învățământ'],
    question: 'Cum se echipează studenții și elevii?',
    answer: 'Echipamentul se distribuie **pentru folosință**, pe perioada școlarizării, și trebuie **restituit** la absolvire. La intrarea în Academia de Poliție sau alte unități de învățământ, studenților/elevilor din anul I li se distribuie **echipament nou**. Se constituie uniforme de **oraș** și de **instruire**.',
    article: 'Art. 3, Art. 40',
  },
  {
    id: 'stud2',
    category: 'studenti_elevi',
    keywords: ['absolvent', 'încadrare', 'sursă', 'externă', 'grad'],
    question: 'Ce drepturi au absolvenții la acordarea gradului?',
    answer: 'La acordarea gradului de ofițer/agent, absolvenții au dreptul **cumulativ** la:\n\n1. Articole distribuite **o singură dată** la acordarea gradului (din tabelul din anexă: șapcă, căciuli, costum, pulovere, scurte, ghete etc.)\n2. Articole în limita **echivalentului valoric** al cotei-părți anuale\n\nPersoanele care au mai deținut anterior calitatea de ofițer/agent **nu au dreptul** la articolele distribuite o singură dată.',
    article: 'Art. 24, Art. 25',
  },

  // ECHIPAMENT SPECIFIC
  {
    id: 'spec1',
    category: 'echipament_specific',
    keywords: ['pierdere', 'distrugere', 'degradare', 'echipament'],
    question: 'Ce se întâmplă cu echipamentul pierdut/distrus/degradat?',
    answer: 'Este **interzisă** distribuirea gratuită a echipamentului în locul celui pierdut/distrus, **cu excepția** cazurilor neprevăzute, risc normal al serviciului, caz fortuit sau forță majoră (pe bază de raport aprobat de ordonatorul de credite). Altfel, se distribuie **contra cost** sau cu anticipație.',
    article: 'Art. 33',
  },
  {
    id: 'spec2',
    category: 'echipament_specific',
    keywords: ['misiune', 'internațional', 'străinătate'],
    question: 'Ce echipament primesc polițiștii în misiuni internaționale?',
    answer: 'Polițiștii cu misiuni de **cel puțin 6 luni** în străinătate primesc articolele prevăzute la pct. VII al normei nr. 5. Pentru alte misiuni, participă cu uniformele din dotare, asigurate din drepturile cuvenite.',
    article: 'Art. 53',
  },
  {
    id: 'spec3',
    category: 'echipament_specific',
    keywords: ['garderobă', 'unitate', 'reprezentare', 'ceremonii'],
    question: 'Ce înseamnă uniformele de garderobă?',
    answer: 'La nivelul unităților se pot constitui câte **5 uniforme** de reprezentare, 5 de serviciu și 5 rânduri de echipament specific, cu **regim de garderobă**. Utilizarea este aprobată de ordonatorul de credite.',
    article: 'Art. 43',
  },
  {
    id: 'spec4',
    category: 'echipament_specific',
    keywords: ['talie', 'excepțional', 'mărime', 'comandă'],
    question: 'Ce se întâmplă dacă am o talie excepțională?',
    answer: 'Polițiștilor cu **talii excepționale** li se execută articolele pe bază de **comenzi individuale** și măsurători, la operatorii economici aflați în proceduri legale de achiziție ale MAI. Eventualele retușuri se execută **gratuit** prin clauze contractuale.',
    article: 'Art. 46',
  },
];

// Simple keyword-based search
export function searchKnowledge(query: string): KnowledgeEntry[] {
  const normalizedQuery = query
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  const scored = knowledgeBase.map(entry => {
    let score = 0;
    const normalizedKeywords = entry.keywords.map(k =>
      k.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    );
    const normalizedQuestion = entry.question
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    for (const keyword of normalizedKeywords) {
      if (normalizedQuery.includes(keyword)) score += 3;
      // partial match
      const words = keyword.split(' ');
      for (const word of words) {
        if (normalizedQuery.includes(word) && word.length > 2) score += 1;
      }
    }

    // Check question similarity
    const queryWords = normalizedQuery.split(/\s+/);
    for (const word of queryWords) {
      if (word.length > 2 && normalizedQuestion.includes(word)) score += 1;
    }

    return { entry, score };
  });

  return scored
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(s => s.entry);
}

export function getByCategory(category: Category): KnowledgeEntry[] {
  return knowledgeBase.filter(e => e.category === category);
}
