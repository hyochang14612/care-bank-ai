interface Step {
  label: string
  icon: string
}

export function Stepper({ steps, current }: { steps: Step[]; current: number }) {
  return (
    <div className="flex items-center">
      {steps.map((step, index) => {
        const stepNumber = index + 1
        const isDone = stepNumber < current
        const isActive = stepNumber === current

        return (
          <div key={step.label} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full text-base font-semibold transition ${
                  isDone
                    ? 'bg-brand text-white'
                    : isActive
                      ? 'bg-mint text-brand-dark ring-2 ring-brand'
                      : 'bg-bg text-subtle'
                }`}
              >
                {isDone ? '✓' : step.icon}
              </div>
              <span
                className={`whitespace-nowrap text-xs font-medium ${
                  isActive || isDone ? 'text-ink' : 'text-subtle'
                }`}
              >
                {step.label}
              </span>
            </div>
            {stepNumber !== steps.length && (
              <div
                className={`mx-2 h-0.5 flex-1 rounded-full transition ${
                  isDone ? 'bg-brand' : 'bg-line'
                }`}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
