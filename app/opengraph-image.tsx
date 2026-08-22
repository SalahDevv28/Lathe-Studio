import { ImageResponse } from 'next/og'
import { BRAND } from '@/lib/brand'

/**
 * Social share card, generated at build rather than shipped as a binary.
 *
 * Nothing to keep in sync in /public, and it inherits the brand string, so a
 * rename updates the card too. Satori (which renders this) supports flexbox
 * only — no grid, and every element needs an explicit display.
 */
/* next/og cannot resolve its default font under the Node runtime in this
   Next version — it throws "Invalid URL" from fileURLToPath at prerender.
   The edge runtime bundles the font, which is the supported path. */
export const runtime = 'edge'

export const alt = `${BRAND.name} — ${BRAND.tagline}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#1A1A16',
          padding: 72,
          fontFamily: 'sans-serif',
        }}
      >
        {/* mark + wordmark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <svg width="64" height="64" viewBox="46 30 124 124">
            <path d="M58 58 H98 A42 42 0 0 1 140 100 L140 142 H58 Z" fill="#F4F2EC" />
            <path
              d="M98 44 A56 56 0 0 1 154 100"
              fill="none"
              stroke="#D8FF3E"
              strokeWidth="13"
              strokeLinecap="round"
            />
            <circle cx="98" cy="100" r="8" fill="#0F9E8E" />
          </svg>
          <div
            style={{
              display: 'flex',
              fontSize: 34,
              fontWeight: 800,
              color: '#F5F1E7',
              letterSpacing: -1,
            }}
          >
            THE LATHE STUDIO
          </div>
        </div>

        {/* headline */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              fontSize: 82,
              fontWeight: 800,
              color: '#F5F1E7',
              letterSpacing: -3,
              lineHeight: 1.02,
            }}
          >
            We build the systems
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 8 }}>
            <div
              style={{
                display: 'flex',
                fontSize: 82,
                fontWeight: 800,
                letterSpacing: -3,
                lineHeight: 1.02,
                background: '#D8FF3E',
                color: '#1A1A16',
                padding: '0 16px',
              }}
            >
              that run themselves
            </div>
          </div>
        </div>

        {/* footer strip */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid #34342C',
            paddingTop: 28,
            fontSize: 24,
            color: '#A8A499',
          }}
        >
          <div style={{ display: 'flex' }}>Websites · Notion systems · AI automation</div>
          <div style={{ display: 'flex', color: '#0F9E8E' }}>{BRAND.domain}</div>
        </div>
      </div>
    ),
    size
  )
}
