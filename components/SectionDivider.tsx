interface SectionDividerProps {
  className?: string
  variant?: 'default' | 'subtle' | 'accent'
}

export default function SectionDivider({ className = '', variant = 'default' }: SectionDividerProps) {
  const variants = {
    default: 'bg-gradient-to-r from-transparent via-gray-700/60 to-transparent',
    subtle:  'bg-gradient-to-r from-transparent via-gray-800/60 to-transparent',
    accent:  'bg-gradient-to-r from-transparent via-pink-500/40 to-transparent',
  }

  return (
    <div className={`w-full h-px ${variants[variant]} ${className}`} />
  )
}
