/**
 * The Lathe mark, inlined so it costs no request and can invert with context.
 *
 * Geometry matches `public/images/brand/lathe-mark.svg`: the workpiece profile,
 * the tool arc sweeping over it in lime, and the spindle point in teal.
 */
export default function BrandMark({
  className = '',
  /** Body fill. Bone on dark bands, ink on bone. */
  tone = 'bone',
}: {
  className?: string
  tone?: 'bone' | 'ink'
}) {
  return (
    <svg
      viewBox="46 30 124 124"
      className={className}
      role="img"
      aria-label="The Lathe Studio"
      focusable="false"
    >
      <path
        d="M58 58 H98 A42 42 0 0 1 140 100 L140 142 H58 Z"
        fill={tone === 'bone' ? '#F4F2EC' : '#1A1A16'}
      />
      <path
        d="M98 44 A56 56 0 0 1 154 100"
        fill="none"
        stroke="#D8FF3E"
        strokeWidth="11"
        strokeLinecap="round"
      />
      <circle cx="98" cy="100" r="6" fill="#0F9E8E" />
    </svg>
  )
}
