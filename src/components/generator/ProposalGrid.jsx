import ProposalCard from './ProposalCard'

export default function ProposalGrid({ proposals }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full">
      {proposals.map(p => (
        <ProposalCard key={p.angle} {...p} />
      ))}
    </div>
  )
}