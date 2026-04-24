import { useState } from 'react'

export default function TagEditor({ label, description, items, onAdd, onRemove, placeholder }) {
  const [input, setInput] = useState('')

  const handleAdd = () => {
    const trimmed = input.trim()
    if (!trimmed || items.includes(trimmed)) return
    onAdd(trimmed)
    setInput('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleAdd()
  }

  return (
    <div className="flex flex-col gap-3">
      <div>
        <h3 className="text-base font-semibold text-ink-primary dark:text-ink-dark-primary">{label}</h3>
        {description && (
          <p className="text-sm text-ink-secondary dark:text-ink-dark-secondary mt-0.5">{description}</p>
        )}
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        {items.map(item => (
          <span
            key={item}
            className="inline-flex items-center gap-1.5 bg-surface-100 dark:bg-dark-200 text-ink-primary dark:text-ink-dark-primary text-sm px-3 py-1 rounded-full border border-surface-200 dark:border-dark-300"
          >
            {item}
            <button
              onClick={() => onRemove(item)}
              className="text-ink-tertiary hover:text-rose-500 transition-colors leading-none"
            >
              ×
            </button>
          </span>
        ))}

        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="bg-transparent focus:outline-none text-sm placeholder:text-ink-tertiary dark:placeholder:text-ink-dark-tertiary text-ink-primary dark:text-ink-dark-primary min-w-[140px]"
        />

        {input.trim() && (
          <button
            onClick={handleAdd}
            className="text-xs text-accent hover:text-accent-dark font-medium transition-colors"
          >
            Add
          </button>
        )}
      </div>
    </div>
  )
}