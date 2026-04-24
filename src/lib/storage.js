const KEY = 'proposalai_knowledge_bank';

const DEFAULT = {
  skills: [],
  tools: [],
  caseStudies: [],
};

export function getKnowledgeBank() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : structuredClone(DEFAULT);
  } catch {
    return structuredClone(DEFAULT);
  }
}

export function setKnowledgeBank(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}