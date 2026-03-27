// Guided decision tree for police equipment rights verification

export interface FlowOption {
  label: string;
  nextStep?: string;
  result?: string;
}

export interface FlowStep {
  id: string;
  question: string;
  options: FlowOption[];
}

export const guidedFlow: FlowStep[] = [
  {
    id: 'start',
    question: 'Bun venit! Sunt aici să te ajut să verifici drepturile de echipament. Ce dorești să verifici?',
    options: [
      { label: '📋 Alocarea la drepturi de echipament', nextStep: 'alocare_tip' },
      { label: '⬆️ Drepturi la înaintare/avansare în grad', nextStep: 'grad_corp' },
      { label: '🔄 Drepturi la mutare/detașare', nextStep: 'mutare_tip' },
      { label: '💰 Plata drepturilor în bani', nextStep: 'plata_info' },
      { label: '📦 Restanțe sau anticipații', nextStep: 'restante_info' },
      { label: '⏸️ Suspendare / Concedii', nextStep: 'suspendare_tip' },
      { label: '🚪 Încetarea raporturilor de serviciu', nextStep: 'incetare_info' },
      { label: '❓ Am altă întrebare (căutare liberă)', nextStep: 'free_search' },
    ],
  },

  // ALOCARE
  {
    id: 'alocare_tip',
    question: 'La ce categorie ești alocat (sau dorești să fii alocat)?',
    options: [
      { label: 'Numai echipament', result: 'Conform **Art. 13 alin. (3) lit. a)**, polițiștii alocați la „numai echipament" solicită echipamentul necesar până la **echivalentul integral** al valorii cotei-părți anuale.\n\n✅ Trebuie să completezi fișa de evidență până la **15 octombrie** pentru anul următor.\n✅ Poți solicita echipament și pe parcursul anului, în limita echivalentului.' },
      { label: 'Echipament + diferența în bani', result: 'Conform **Art. 13 alin. (3) lit. b)**, soliciti echipament necesar pentru completarea uniformei, iar **diferențele valorice** rezultate prin nesolicitarea unor articole se acordă **în bani**.\n\n💰 Plata banilor se face **lunar (1/12)** din valoarea rămasă (Art. 14).' },
      { label: 'Numai bani', result: 'Conform **Art. 13 alin. (3) lit. c)**, completezi fișa **fără a solicita echipament**, cu condiția de a deține uniformă completă și regulamentară pentru **ambele sezoane** (cald și rece).\n\n💰 Primești **lunar 1/12** din valoarea cotei-părți anuale (Art. 14).' },
      { label: 'Nu știu la ce sunt alocat', result: 'Alocarea se face la **începutul fiecărui an** prin dispoziție de zi pe unitate (Art. 11). Contactează **structura logistică** a unității tale pentru a verifica la ce categorie ești alocat.\n\n📌 Poți verifica și în **fișa de evidență a drepturilor de echipament** din aplicația informatică.' },
    ],
  },

  // GRAD
  {
    id: 'grad_corp',
    question: 'Din ce corp faci parte?',
    options: [
      { label: 'Corp ofițeri', nextStep: 'grad_ofiter' },
      { label: 'Corp agenți', nextStep: 'grad_agent' },
    ],
  },
  {
    id: 'grad_ofiter',
    question: 'La ce grad ai fost avansat/înaintat?',
    options: [
      { label: 'Chestor de poliție', result: 'Conform **Art. 17**, pe lângă cota-parte anuală, ai dreptul la echivalentul valoric integral al:\n\n🎖️ 1 șapcă din stofă\n👔 1 costum din stofă (sacou + 2 pantaloni)\n🧥 1 pardesiu\n📌 3 perechi suporți de grad + 2 perechi epoleți\n\n👩 **Femei:** pălărie în loc de șapcă, fustă în loc de pantalon.\nEchipamentul se distribuie **în natură** la avansare.' },
      { label: 'Comisar-șef', result: 'Conform **Art. 18**, pe lângă cota-parte pentru ofițeri, primești și echivalentul valoric al cotei-părți aferente:\n\n🧣 1 **căciulă din blană naturală** (astrahan/caracul)\n🧥 1 **guler din blană naturală** (astrahan/caracul)\n\nAcestea se acordă **începând cu anul avansării**.' },
      { label: 'Subcomisar (de la inspector principal)', result: 'Conform **Art. 20 lit. a)**, pe lângă cota-parte anuală, primești **în natură**:\n\n📌 3 perechi suporți de grad + 2 perechi epoleți\n🎖️ 1 șapcă din stofă\n👔 1 costum din stofă (sacou + 2 pantaloni)\n🧢 1 șapcă cu 2 coafe impermeabilă\n\n👩 **Femei:** pălărie în loc de șapcă, fustă în loc de pantalon.' },
      { label: 'Alt grad de ofițer', result: 'Conform **Art. 20 lit. a)**, la avansarea în gradul următor de ofițer, primești **în natură** la data avansării:\n\n📌 3 perechi suporți de grad profesional\n📌 2 perechi epoleți cu grad profesional' },
    ],
  },
  {
    id: 'grad_agent',
    question: 'Care este situația ta?',
    options: [
      { label: 'Am fost înaintat la grad de ofițer', result: 'Conform **Art. 19**, pe lângă cota-parte anuală, ai dreptul la echivalentul valoric integral al:\n\n🎖️ 1 șapcă din stofă\n👔 1 costum din stofă (sacou + 2 pantaloni)\n🧥 1 pardesiu\n📌 3 perechi suporți de grad + 2 perechi epoleți\n\n👩 **Femei:** pălărie în loc de șapcă, fustă în loc de pantalon.\nEchipamentul se distribuie **în natură** cu ocazia avansării.' },
      { label: 'Am fost avansat la gradul următor de agent', result: 'Conform **Art. 20 lit. b)**, la avansarea în gradul următor de agent, primești **în natură** la data avansării:\n\n📌 3 perechi suporți de grad profesional\n📌 2 perechi epoleți cu grad profesional' },
    ],
  },

  // MUTARE / DETASARE
  {
    id: 'mutare_tip',
    question: 'Care este situația ta?',
    options: [
      { label: 'Mutat din poliție în altă structură (militară/alt sistem)', result: 'Conform **Art. 22**, beneficiezi de echivalentul valoric calculat pentru **numărul de luni lucrate** (inclusiv luna mutării, dacă ai lucrat cel puțin o zi).\n\n⚠️ Dacă ai primit drepturi în plus față de lunile lucrate, diferența se **recuperează** de unitatea din care te muți.' },
      { label: 'Mutat din altă structură în poliție', result: 'Conform **Art. 23**, ai dreptul la echivalentul valoric calculat pentru **lunile efectiv lucrate**, mai puțin articolele distribuite o singură dată la încadrare.\n\nDrepturile se acordă din **prima zi a lunii următoare** mutării. Dacă trebuie uniformă completă, echipamentul necesar în plus se consideră **anticipație**.' },
      { label: 'Mutat din unitate în alta (în cadrul poliției)', result: 'Conform **Art. 32**, unitatea veche comunică drepturile distribuite în **15 zile**.\n\n💰 Drepturile în **bani** (lunile lucrate) → unitatea veche\n📦 Drepturile în **natură** nesolicitate → unitatea nouă' },
      { label: 'Detașat/Împuternicit', result: 'Conform **Art. 31**:\n\n📌 Detașare la **altă structură MAI** → primești drepturi de la unitatea de care aparții\n📌 Detașare **peste 1 an** → poți fi alocat la drepturi la unitatea unde ești detașat\n📌 Detașare la **altă instituție publică** → beneficiezi de echivalentul de care ai beneficiat anterior' },
    ],
  },

  // PLATA
  {
    id: 'plata_info',
    question: 'Ce anume dorești să verifici despre plata drepturilor?',
    options: [
      { label: 'Cum se calculează suma lunară', result: 'Conform **Art. 14**, drepturile de echipament în bani se acordă **lunar**, în cuantum de **1/12 din valoarea anuală** a echivalentului valoric al cotei-părți.\n\n📌 Echivalentul valoric se recalculează anual (Art. 8) și se aplică 1 ianuarie - 31 decembrie.\n📌 Prețurile folosite sunt **prețuri medii ponderate** din procedurile de achiziție.' },
      { label: 'Nu am primit drepturile în bani', result: 'Verifică:\n\n1. ✅ Ești alocat la categorie cu bani? (echipament+bani sau numai bani)\n2. ✅ A fost completată fișa de evidență?\n3. ✅ Ai lucrat cel puțin o zi în luna respectivă?\n\nDacă toate sunt OK, contactează **structura financiară** a unității.\n\n📌 Sumele neprimite constituie **restanțe** (Art. 28) și trebuie acordate cu prioritate.' },
    ],
  },

  // RESTANTE
  {
    id: 'restante_info',
    question: 'Ce dorești să afli?',
    options: [
      { label: 'Am restanțe de echipament', result: 'Conform **Art. 28**:\n\n📦 Restanțele se preiau în fișa anului următor cu **prioritate**\n💰 După **31.12.2025**, restanțele se pot acorda și sub formă bănească\n⚠️ Restanțele acumulate până la 31.12.2025 se acordă **numai în natură**\n🚫 Articolele neridicate **3 ani consecutivi** fără solicitare scrisă **nu se mai acordă**\n\nValoarea restanțelor se calculează la prețurile folosite la calculul cotei-părți la data acordării.' },
      { label: 'Am anticipații (am primit mai mult)', result: 'Conform **Art. 29-30**, anticipațiile = valoarea echipamentului peste cota-parte anuală.\n\n⚠️ Acordarea cu anticipație a **contravalorii** este **strict interzisă** (doar articole)\n✅ Se pot acorda cu anticipație pentru: uzare prematură sau conformație fizică specială\n📝 Necesită **raport personal** cu angajament de plată la încetarea raporturilor\n📋 Se înscriu în fișă la rubrica „anticipații" și se recuperează din drepturile anului următor' },
    ],
  },

  // SUSPENDARE
  {
    id: 'suspendare_tip',
    question: 'Care este situația ta?',
    options: [
      { label: 'Concediu medical / maternitate / creștere copil', result: 'Conform **Art. 39 alin. (7)**, pe timpul concediului de incapacitate, maternitate, creștere copil, îngrijire copil cu dizabilitate, sau concediu de acomodare, primești **integral** valoarea financiară neimpozabilă, actualizată.\n\n✅ **Nu pierzi niciun drept** de echipament pe această perioadă.' },
      { label: 'Pus la dispoziție (cu sarcini de serviciu)', result: 'Conform **Art. 39 alin. (1)**, beneficiezi **în continuare** de drepturile de echipament conform normelor.\n\n✅ Drepturile tale rămân neafectate atâta timp cât îndeplinești sarcini de serviciu.' },
      { label: 'Suspendat (arest preventiv)', result: 'Conform **Art. 39 alin. (2)**, **nu mai beneficiezi** de drepturi de la data suspendării.\n\n✅ La clasare/achitare (Art. 39 alin. 3): beneficiezi de **toate drepturile** avute la data suspendării, inclusiv compensarea celor de care ai fost privat.' },
      { label: 'Suspendare din inițiativă proprie', result: 'Conform **Art. 39 alin. (5)**:\n\n🚫 Nu mai beneficiezi de drepturi din **prima zi a lunii următoare** suspendării\n✅ La reluare, primești drepturile din **luna următoare** încetării suspendării.' },
      { label: 'Ales în conducerea sindicatului', result: 'Conform **Art. 39 alin. (6)**, beneficiezi de echivalentul valoric de care ai beneficiat **anterior alegerii**.\n\n✅ Drepturile rămân la nivelul de dinainte de alegere.' },
    ],
  },

  // INCETARE
  {
    id: 'incetare_info',
    question: 'Care este motivul încetării?',
    options: [
      { label: 'Trecere în rezervă (pensionare)', result: 'Conform **Art. 34-35**:\n\n📦 Echipament distribuit → **legal acordat**, nu se recuperează\n💰 Echipament nedistribuit → echivalent în bani pentru lunile lucrate\n⚠️ Anticipații → se **recuperează integral**\n💰 Bani în plus față de lunile lucrate → se **recuperează**\n\nSe ține cont de: drepturile cuvenite pentru lunile lucrate + restanțele din ultimii 3 ani - valoarea deja distribuită - anticipații.' },
      { label: 'Demisie', result: 'Se aplică aceleași reguli ca la trecerea în rezervă (Art. 34-35).\n\n⚠️ **Atenție:** Conform Art. 38, polițiștilor trecuți în rezervă prin demisie le este **interzis** portul uniformei primite anterior.' },
      { label: 'Reîncadrare în același an', result: 'Conform **Art. 26**:\n\n📌 Dacă la trecerea în rezervă au primit drepturi pe **întregul an** → primesc drepturi de la **1 ianuarie anul următor**\n📌 Dacă au primit doar pentru lunile lucrate → primesc echivalentul calculat pentru lunile efectiv lucrate de la data reîncadrării.' },
    ],
  },

  // FREE SEARCH
  {
    id: 'free_search',
    question: 'Scrie întrebarea ta mai jos și voi căuta răspunsul în regulament:',
    options: [],
  },
];

export function getFlowStep(id: string): FlowStep | undefined {
  return guidedFlow.find(step => step.id === id);
}
