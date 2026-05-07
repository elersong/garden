import { DroppedBranch as DroppedBranchType } from '@/lib/types'

interface Props {
  branches: DroppedBranchType[]
}

export default function DroppedBranches({ branches }: Props) {
  if (!branches?.length) return null

  return (
    <div className="space-y-3 mt-6">
      {branches.map((branch, i) => (
        <div
          key={i}
          className="border border-black/10 rounded-lg p-3 opacity-55 max-w-xl"
        >
          <p className="font-mono text-[10px] uppercase tracking-widest text-secondary mb-1.5">
            dropped branch
          </p>
          <p className="text-[13px] text-secondary italic leading-relaxed mb-2">
            {branch.q}
          </p>
          <div className="border-t border-black/10 pt-2">
            <span className="font-mono text-[10px] uppercase tracking-widest text-secondary opacity-50 mr-1.5">
              why dropped
            </span>
            <span className="text-[12px] text-secondary leading-relaxed">
              {branch.why}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
