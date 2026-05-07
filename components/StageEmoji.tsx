import { Stage } from '@/lib/types'

const stageMap: Record<Stage, { emoji: string; label: string; desc: string }> = {
  seedling: { emoji: '🌱', label: 'seedling', desc: 'early, unverified' },
  growing:  { emoji: '🌿', label: 'growing',  desc: 'ideas developing, thread active' },
  evergreen:{ emoji: '🌲', label: 'evergreen', desc: 'stable, well-sourced' },
}

interface StageEmojiProps {
  stage: Stage
  // 'full' shows emoji + label + description
  // 'label' shows emoji + label only
  // 'icon' shows emoji only
  variant?: 'full' | 'label' | 'icon'
  className?: string
}

export default function StageEmoji({
  stage,
  variant = 'icon',
  className = '',
}: StageEmojiProps) {
  const { emoji, label, desc } = stageMap[stage] ?? stageMap.seedling

  if (variant === 'icon') {
    return (
      <span className={`text-[12px] leading-none ${className}`} title={label}>
        {emoji}
      </span>
    )
  }

  if (variant === 'label') {
    return (
      <span className={`flex items-center gap-1.5 ${className}`}>
        <span className="text-[14px] leading-none">{emoji}</span>
        <span className="font-mono text-[11px] text-secondary">{label}</span>
      </span>
    )
  }

  // full
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-[14px] leading-none">{emoji}</span>
      <span className="font-mono text-[11px] text-secondary">{label}</span>
      <span className="text-secondary opacity-40 text-[12px]">·</span>
      <span className="font-mono text-[11px] text-secondary opacity-60">{desc}</span>
    </div>
  )
}

// Compact legend — used on the about page sidebar and garden index
export function StageLegend({ className = '' }: { className?: string }) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {(Object.entries(stageMap) as [Stage, typeof stageMap[Stage]][]).map(
        ([key, { emoji, label }]) => (
          <span key={key} className="font-mono text-[10px] text-secondary opacity-60 flex items-center gap-1.5">
            <span className="text-[11px]">{emoji}</span>
            {label}
          </span>
        )
      )}
    </div>
  )
}
