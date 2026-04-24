export default function CaseStudyEditor({ entries, onAdd, onUpdate, onRemove }) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="text-base font-semibold text-ink-primary dark:text-ink-dark-primary">Past Wins & Case Studies</h3>
        <p className="text-sm text-ink-secondary dark:text-ink-dark-secondary mt-0.5">
          These get injected into every proposal so Claude can reference specific results.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {entries.map(entry => (
          <div
            key={entry.id}
            className="bg-surface-50 dark:bg-dark-100 border border-surface-200 dark:border-dark-300 rounded-xl p-4 flex flex-col gap-3 relative"
          >
            <button
              onClick={() => onRemove(entry.id)}
              className="absolute top-3 right-3 text-ink-tertiary hover:text-rose-500 transition-colors text-lg leading-none"
            >
              ×
            </button>

            <input
              value={entry.title}
              onChange={e => onUpdate(entry.id, { title: e.target.value })}
              placeholder="Title — e.g. Candidate Shortlisting System"
              className="text-sm font-medium bg-transparent border-b border-surface-200 dark:border-dark-300 focus:outline-none focus:border-accent w-full pb-1 text-ink-primary dark:text-ink-dark-primary placeholder:text-ink-tertiary dark:placeholder:text-ink-dark-tertiary pr-6"
            />

            <textarea
              value={entry.description}
              onChange={e => onUpdate(entry.id, { description: e.target.value })}
              placeholder="Describe what you built and what result it achieved in 2–3 sentences…"
              rows={3}
              className="text-sm bg-transparent resize-none focus:outline-none w-full text-ink-secondary dark:text-ink-dark-secondary placeholder:text-ink-tertiary dark:placeholder:text-ink-dark-tertiary"
            />
          </div>
        ))}
      </div>

      <button
        onClick={onAdd}
        className="flex items-center gap-1.5 text-sm text-accent hover:text-accent-dark font-medium transition-colors"
      >
        <span className="text-lg leading-none">+</span>
        Add case study
      </button>
    </div>
  )
}