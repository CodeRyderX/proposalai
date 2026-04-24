import { useState, useCallback } from 'react';
import { getKnowledgeBank, setKnowledgeBank, generateId } from '../lib/storage';

export function useKnowledgeBank() {
  const [kb, setKb] = useState(getKnowledgeBank);

  const persist = useCallback((next) => {
    setKb(next);
    setKnowledgeBank(next);
  }, []);

  const updateSkills = useCallback((skills) => {
    persist({ ...kb, skills });
  }, [kb, persist]);

  const updateTools = useCallback((tools) => {
    persist({ ...kb, tools });
  }, [kb, persist]);

  const addCaseStudy = useCallback(() => {
    persist({
      ...kb,
      caseStudies: [...kb.caseStudies, { id: generateId(), title: '', description: '' }],
    });
  }, [kb, persist]);

  const updateCaseStudy = useCallback((id, fields) => {
    persist({
      ...kb,
      caseStudies: kb.caseStudies.map(cs => cs.id === id ? { ...cs, ...fields } : cs),
    });
  }, [kb, persist]);

  const removeCaseStudy = useCallback((id) => {
    persist({ ...kb, caseStudies: kb.caseStudies.filter(cs => cs.id !== id) });
  }, [kb, persist]);

  return { kb, updateSkills, updateTools, addCaseStudy, updateCaseStudy, removeCaseStudy };
}