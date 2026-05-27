export const historyData = [
  {
    id: 1,
    numericYear: 1701,
    date: "1701-1713",
    title: "War of the Spanish Succession",
    summary:
      "The King of Spain bequeathed his crown to the French King's grandson, threatening a unified Bourbon superpower across Europe.",
  },
  {
    id: 2,
    numericYear: 1713,
    date: "1713",
    title: "Treaty of Utrecht",
    summary:
      "Concluded the war. France surrendered sovereign claims over Acadia, Hudson Bay, and Newfoundland to the British Crown.",
  },
  {
    id: 3,
    numericYear: 1754,
    date: "1754",
    title: "The Ohio Valley Skirmish (The spark of the Seven Years' War)",
    summary:
      "A young George Washington demanded French withdrawal from the Ohio Valley, igniting the global Seven Years' War.",
  },
  {
    id: 4,
    numericYear: 1755,
    date: "1755-1764",
    title: "Expulsion of the Acadians",
    summary:
      "Having refused the mandatory British Oath of Allegiance, thousands of Acadians were forcefully deported from their homesteads.",
  },
  {
    id: 5,
    numericYear: 1759,
    date: "Sept 13, 1759",
    title: "Battle of the Plains of Abraham",
    summary:
      "General Wolfe's redcoats ascended the cliffs of Anse-au-Foulon at dawn, defeating Montcalm's garrison in 15 minutes.",
  },
  {
    id: 6,
    numericYear: 1765,
    date: "1765-1783",
    title: "The American Revolution",
    summary:
      "Saddled with staggering war debts from colonial defense, Britain imposed heavy taxes, driving the Thirteen Colonies to revolt.",
  },
  {
    id: 7,
    numericYear: 1783,
    date: "Sept 3, 1783",
    title: "Treaty of Paris",
    summary:
      "Formally concluded the Revolutionary War and delineated the international boundary between the United States and British North America.",
  },
];

export const quizPool = [
  {
    q: "What diplomatic crisis sparked the outbreak of the War of the Spanish Succession in 1701?",
    a: "The King of Spain bequeathed his crown to the French King's grandson.",
    options: [
      "The King of Spain bequeathed his crown to the French King's grandson.",
      "British privateers launched a surprise amphibious raid on Quebec City.",
      "Acadians seized mercantile colonial trade channels.",
    ],
  },
  {
    q: "Which territories did the French Crown yield to Great Britain under the 1713 Treaty of Utrecht?",
    a: "Acadia, Hudson Bay, and Newfoundland.",
    options: [
      "The entire Ohio River valley territory.",
      "Acadia, Hudson Bay, and Newfoundland.",
      "The immediate stone fortifications of Quebec and Montreal.",
    ],
  },
  {
    q: "Which event served as the flashpoint for the global Seven Years' War in 1754?",
    a: "George Washington clashed over French outposts in the Ohio Valley.",
    options: [
      "The execution of French diplomats at Versailles.",
      "George Washington clashed over French outposts in the Ohio Valley.",
      "An armed assembly across the Plains of Abraham.",
    ],
  },
  {
    q: "What act of political resistance directly prompted the British deportation of the Acadians?",
    a: "The Acadians refused to swear the unconditional Oath of Allegiance.",
    options: [
      "The Acadians raised artillery defenses at Anse-au-Foulon.",
      "The Acadians refused to swear the unconditional Oath of Allegiance.",
      "They signed a direct offensive alliance with George Washington.",
    ],
  },
  {
    q: "How did General Wolfe catch the French garrison off guard at the Plains of Abraham?",
    a: "His forces silently scaled the steep cliffs at dawn under cover of darkness.",
    options: [
      "His forces silently scaled the steep cliffs at dawn under cover of darkness.",
      "They executed a 14-month continuous maritime mortar bombardment.",
      "They negotiated a sudden tactical truce via Spanish emissaries.",
    ],
  },
  {
    q: "Why did the British Parliament enforce aggressive taxation acts on the Thirteen Colonies after 1765?",
    a: "To liquidate massive state debts accumulated during the Seven Years' War.",
    options: [
      "To fund deep exploratory voyages into the Pacific Ocean.",
      "To liquidate massive state debts accumulated during the Seven Years' War.",
      "To directly subsidize King Louis XIV's royal treasury demands.",
    ],
  },
];

export const writingPrompts = [
  {
    title: "War of the Spanish Succession (1701)",
    desc: "Record the royal succession crisis that destabilized Europe. Who inherited the throne?",
    keywords: ["spain", "spanish", "throne", "french", "grandson"],
    minKeywords: 3,
    hint: "Focus on the Spanish Monarch passing his crown to the French King's grandson.",
  },
  {
    title: "Treaty of Utrecht (1713)",
    desc: "Log the specific colonial territories ceded by France to Great Britain at Utrecht.",
    keywords: ["acadia", "hudson", "bay", "newfoundland"],
    minKeywords: 3,
    hint: "Specify the big three assets: Acadia, Hudson Bay, and Newfoundland.",
  },
  {
    title: "The Frontier Flashpoint (1754)",
    desc: "Which territory did George Washington enter that sparked immediate combat with French defenders?",
    keywords: ["washington", "ohio", "river", "valley"],
    minKeywords: 3,
    hint: "Identify Commander George Washington and the contested Ohio Valley.",
  },
  {
    title: "Expulsion of the Acadians (1755)",
    desc: "Describe the core oath refused by the Acadians which led to their systemic deportation.",
    keywords: ["oath", "allegiance", "refused", "deny", "british"],
    minKeywords: 3,
    hint: "Detail their refusal to swear the British Oath of Allegiance.",
  },
  {
    title: "Battle of the Plains of Abraham (1759)",
    desc: "Detail the tactical approach used by Wolfe to surprise Montcalm's lines outside Quebec.",
    keywords: ["wolfe", "montcalm", "cliff", "cliffs", "15", "minutes"],
    minKeywords: 3,
    hint: "Mention General Wolfe scaling the cliffs to force a victory in 15 minutes.",
  },
  {
    title: "The Seeds of Revolution (1765)",
    desc: "Explain how Britain's global victory debts led directly to colonial tax unrest.",
    keywords: ["debt", "debts", "tax", "taxed", "taxes", "colonies"],
    minKeywords: 3,
    hint: "Connect massive war debts to the subsequent taxation of the colonies.",
  },
  {
    title: "The Treaty of Paris (1783)",
    desc: "Summarize the outcome of the 1783 treaty on global borders and sovereignty.",
    keywords: ["ended", "revolution", "borders", "border", "british"],
    minKeywords: 3,
    hint: "It concluded the Revolutionary War and drew official colonial borders.",
  },
];

export const decryptPool = [
  {
    word: "UTRECHT",
    hint: "The European city where the historic 1713 treaty partition was signed.",
  },
  {
    word: "WASHINGTON",
    hint: "The colonial militia officer dispatched into the disputed western wilderness in 1754.",
  },
  {
    word: "ABRAHAM",
    hint: "The high pastoral plains outside the walls of Quebec that decided an empire.",
  },
  {
    word: "ALLEGIANCE",
    hint: "The solemn royal covenant denied by Acadian community leaders.",
  },
  {
    word: "REVOLUTION",
    hint: "The sweeping anti-imperial uprising triggered by wartime tax levies.",
  },
];

export const mapTargets = [
  {
    title: "Ohio River Outpost (1754)",
    desc: "Locate hidden French stockades near the river forks.",
  },
  {
    title: "Anse-au-Foulon Ascent (1759)",
    desc: "Find the precipitous path used by Wolfe's advance scouts to scale the cliffs.",
  },
  {
    title: "Louisbourg Citadel Battery (1758)",
    desc: "Pinpoint the heavy French coastal defensive embrasures.",
  },
];
