import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import StreamingCursor from './StreamingCursor'

const BADGE_STYLES = {
  'social-proof':  'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  'problem-first': 'bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300',
  'quick-win':     'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
}

export default function ProposalCard({ title, angle, content, isStreaming, done }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-surface-0 dark:bg-dark-100 border border-surface-200 dark:border-dark-300 rounded-2xl p-6 shadow-sm flex flex-col gap-4">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${BADGE_STYLES[angle]}`}>
            {title}
          </span>
        </div>
        {(done || content) && (
          <button
            onClick={handleCopy}
            className="text-xs text-ink-secondary dark:text-ink-dark-secondary hover:text-accent transition-colors"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-h-[120px]">
        {isStreaming && !content && (
          <div className="flex flex-col gap-2 animate-pulse">
            <div className="h-3 bg-surface-200 dark:bg-dark-300 rounded w-full" />
            <div className="h-3 bg-surface-200 dark:bg-dark-300 rounded w-5/6" />
            <div className="h-3 bg-surface-200 dark:bg-dark-300 rounded w-4/6" />
          </div>
        )}
        {content && (
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content}
            </ReactMarkdown>
            {isStreaming && <StreamingCursor />}
          </div>
        )}
      </div>

    </div>
  )
}