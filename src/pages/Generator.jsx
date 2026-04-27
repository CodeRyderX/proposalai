import { useProposalStream } from '../hooks/useProposalStream'
import JobInputPanel from '../components/generator/JobInputPanel'
import ProposalGrid from '../components/generator/ProposalGrid'

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
      <p className="text-sm text-ink-tertiary dark:text-ink-dark-tertiary">
        Generate proposals to see them here.
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full opacity-30 pointer-events-none">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-surface-100 dark:bg-dark-100 border border-surface-200 dark:border-dark-300 rounded-2xl p-6 h-48" />
        ))}
      </div>
    </div>
  )
}

export default function Generator() {
  const { proposals, isGenerating, error, generate, reset } = useProposalStream()

  const hasContent = proposals.some(p => p.content || p.isStreaming)

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-3.5rem)]">
      
      {/* Left panel */}
      <div className="w-full lg:w-[400px] lg:min-w-[400px] p-6 border-b lg:border-b-0 lg:border-r border-surface-200 dark:border-dark-300 flex flex-col gap-3">
        <h2 className="text-xs font-medium text-ink-tertiary dark:text-ink-dark-tertiary uppercase tracking-widest">
          Job Description
        </h2>
        <div className="flex-1">
          <JobInputPanel onGenerate={generate} isGenerating={isGenerating} />
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 p-6 overflow-y-auto">
        {error && (
          <div className="mb-4 flex items-center justify-between bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-sm px-4 py-3 rounded-xl">
            <span>{error}</span>
            <button onClick={reset} className="ml-4 text-rose-500 hover:text-rose-700 transition-colors">✕</button>
          </div>
        )}
        {!hasContent ? <EmptyState /> : <ProposalGrid proposals={proposals} />}
      </div>

    </div>
  )
}