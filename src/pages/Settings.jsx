import { useKnowledgeBank } from '../hooks/useKnowledgeBank'
import TagEditor from '../components/settings/TagEditor'
import CaseStudyEditor from '../components/settings/CaseStudyEditor'

export default function Settings() {
  const { kb, updateSkills, updateTools, addCaseStudy, updateCaseStudy, removeCaseStudy } = useKnowledgeBank()

  const handleAddSkill = (skill) => updateSkills([...kb.skills, skill])
  const handleRemoveSkill = (skill) => updateSkills(kb.skills.filter(s => s !== skill))

  const handleAddTool = (tool) => updateTools([...kb.tools, tool])
  const handleRemoveTool = (tool) => updateTools(kb.tools.filter(t => t !== tool))

  return (
    <div className="max-w-2xl mx-auto py-10 px-6 flex flex-col gap-10">
      
      <div>
        <h1 className="text-xl font-semibold text-ink-primary dark:text-ink-dark-primary">Knowledge Bank</h1>
        <p className="text-sm text-ink-secondary dark:text-ink-dark-secondary mt-1">
          Everything here gets injected into your proposals so they feel personal and specific.
        </p>
      </div>

      <div className="h-px bg-surface-200 dark:bg-dark-300" />

      <TagEditor
        label="Skills"
        description="What you're good at — automation, integrations, lead gen, etc."
        items={kb.skills}
        onAdd={handleAddSkill}
        onRemove={handleRemoveSkill}
        placeholder="e.g. API integrations"
      />

      <div className="h-px bg-surface-200 dark:bg-dark-300" />

      <TagEditor
        label="Tools & Platforms"
        description="The tools you work with day to day."
        items={kb.tools}
        onAdd={handleAddTool}
        onRemove={handleRemoveTool}
        placeholder="e.g. n8n"
      />

      <div className="h-px bg-surface-200 dark:bg-dark-300" />

      <CaseStudyEditor
        entries={kb.caseStudies}
        onAdd={addCaseStudy}
        onUpdate={updateCaseStudy}
        onRemove={removeCaseStudy}
      />

    </div>
  )
}