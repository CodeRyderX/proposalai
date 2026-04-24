import { useState, useCallback } from 'react';
import { anthropic } from '../lib/anthropic';
import { buildSystemPrompt } from '../lib/prompts';
import { getKnowledgeBank } from '../lib/storage';

const ANGLES = [
  { angle: 'social-proof',  title: 'Social Proof',  instruction: 'Write this proposal using the SOCIAL-PROOF angle.' },
  { angle: 'problem-first', title: 'Problem-First', instruction: 'Write this proposal using the PROBLEM-FIRST angle.' },
  { angle: 'quick-win',     title: 'Quick Win',     instruction: 'Write this proposal using the QUICK-WIN angle.' },
];

const emptyProposals = () =>
  ANGLES.map(a => ({ ...a, content: '', isStreaming: false, done: false }));

export function useProposalStream() {
  const [proposals, setProposals]       = useState(emptyProposals());
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError]               = useState(null);

  const reset = useCallback(() => {
    setProposals(emptyProposals());
    setIsGenerating(false);
    setError(null);
  }, []);

  const streamOne = useCallback(async (jobDescription, angleIndex, systemPrompt) => {
    const { instruction } = ANGLES[angleIndex];

    setProposals(prev =>
      prev.map((p, i) => i === angleIndex ? { ...p, content: '', isStreaming: true } : p)
    );

    const stream = await anthropic.messages.stream({
      model:      'claude-sonnet-4-6',
      max_tokens: 500,
      system:     systemPrompt,
      messages: [{
        role:    'user',
        content: `Job description:\n\n${jobDescription}\n\n---\n\n${instruction}`,
      }],
    });

    for await (const chunk of stream) {
      if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
        setProposals(prev =>
          prev.map((p, i) =>
            i === angleIndex ? { ...p, content: p.content + chunk.delta.text } : p
          )
        );
      }
    }

    setProposals(prev =>
      prev.map((p, i) =>
        i === angleIndex ? { ...p, isStreaming: false, done: true } : p
      )
    );
  }, []);

  const generate = useCallback(async (jobDescription) => {
    if (!jobDescription.trim()) return;
    reset();
    setIsGenerating(true);
    const knowledgeBank = getKnowledgeBank();
    const systemPrompt  = buildSystemPrompt(knowledgeBank);
    try {
      await Promise.all([0, 1, 2].map(i => streamOne(jobDescription, i, systemPrompt)));
    } catch (err) {
      setError(err.message || 'Generation failed. Check your API key.');
    } finally {
      setIsGenerating(false);
    }
  }, [reset, streamOne]);

  return { proposals, isGenerating, error, generate, reset };
}