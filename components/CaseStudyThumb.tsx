/**
 * Flat editorial cover art for a case study, one variant per position.
 *
 * The real cover images in public/images/case-studies are still in the old
 * purple brand, so they are deliberately not used. These stand in until they
 * are redrawn in the Lathe palette.
 */
export default function CaseStudyThumb({
  variant,
  className = '',
}: {
  variant: number
  className?: string
}) {
  const i = ((variant % 4) + 4) % 4

  const art = [
    <>
      <rect x="24" y="26" width="150" height="12" rx="2" fill="#1A1A16" opacity=".8" />
      <rect x="24" y="50" width="96" height="8" rx="2" fill="#1A1A16" opacity=".3" />
      <rect x="24" y="80" width="352" height="1" fill="#1A1A16" opacity=".2" />
      <rect x="24" y="96" width="120" height="8" rx="2" fill="#1A1A16" opacity=".3" />
      <rect x="24" y="116" width="200" height="8" rx="2" fill="#1A1A16" opacity=".3" />
      <rect x="266" y="92" width="110" height="60" rx="3" fill="#D8FF3E" stroke="#1A1A16" />
      <path d="M282 132l18-22 16 14 20-26" stroke="#1A1A16" strokeWidth="2" fill="none" />
    </>,
    <>
      <rect x="24" y="30" width="76" height="132" rx="3" fill="#1A1A16" opacity=".1" stroke="#1A1A16" />
      <rect x="112" y="30" width="76" height="132" rx="3" fill="#1A1A16" opacity=".1" stroke="#1A1A16" />
      <rect x="200" y="30" width="76" height="132" rx="3" fill="#0F9E8E" stroke="#1A1A16" />
      <rect x="288" y="30" width="76" height="132" rx="3" fill="#1A1A16" opacity=".1" stroke="#1A1A16" />
      <rect x="210" y="44" width="52" height="8" rx="2" fill="#F5F1E7" opacity=".9" />
    </>,
    <>
      <path d="M30 150 L110 110 L190 128 L270 70 L370 44" stroke="#1A1A16" strokeWidth="2.5" fill="none" />
      <circle cx="110" cy="110" r="5" fill="#1A1A16" />
      <circle cx="190" cy="128" r="5" fill="#1A1A16" />
      <circle cx="270" cy="70" r="5" fill="#1A1A16" />
      <circle cx="370" cy="44" r="7" fill="#D8FF3E" stroke="#1A1A16" strokeWidth="2" />
    </>,
    <>
      <rect x="40" y="34" width="130" height="122" rx="3" fill="#1A1A16" opacity=".08" stroke="#1A1A16" />
      <rect x="230" y="34" width="130" height="122" rx="3" fill="#D8FF3E" stroke="#1A1A16" />
      <path d="M178 95h44" stroke="#1A1A16" strokeWidth="2" />
      <path d="M214 87l10 8-10 8" stroke="#1A1A16" strokeWidth="2" fill="none" />
      <rect x="54" y="52" width="90" height="7" rx="2" fill="#1A1A16" opacity=".4" />
      <rect x="244" y="52" width="90" height="7" rx="2" fill="#1A1A16" opacity=".7" />
    </>,
  ][i]

  const tints = ['#E8E4D8', '#DED9CB', '#E3DED0', '#DBD6C7']

  return (
    <div
      className={`relative border-b border-line ${className}`}
      style={{ background: tints[i] }}
    >
      <svg viewBox="0 0 400 190" fill="none" className="absolute inset-0 h-full w-full">
        {art}
      </svg>
    </div>
  )
}
