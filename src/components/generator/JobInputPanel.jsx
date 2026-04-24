import { useState } from 'react'

export default function JobInputPanel({ onGenerate, isGenerating }) {
  const [value, setValue] = useState('')

  const handleSubmit = () => {
    if (!value.trim() || isGenerating) return
    onGenerate(value)
  }

  return (
    <div className="flex flex-col h-full gap-4">
      <textarea
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Paste the Upwork job description here…"
        className="flex-1 resize-none bg-surface-50 dark:bg-dark-50 border border-surface-200 dark:border-dark-300 rounded-xl p-4 text-sm text-ink-primary dark:text-ink-dark-primary placeholder:text-ink-tertiary dark:placeholder:text-ink-dark-tertiary focus:outline-none focus:ring-2 focus:ring-accent/40 transition font-sans"
      />

      <div className="flex items-center justify-between">
        <span className="text-xs text-ink-tertiary dark:text-ink-dark-tertiary">
          {value.length} characters
        </span>
        <button
          onClick={handleSubmit}
          disabled={!value.trim() || isGenerating}
          className="flex items-center gap-2 bg-accent hover:bg-accent-dark text-white text-sm font-medium px-4 py-2 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <>
              <svg className="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              Generating…
            </>
          ) : (
            'Generate Proposals'
          )}
        </button>
      </div>
    </div>
  )
}