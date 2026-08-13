'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  WEDDING_LOCATIONS,
  weddingLocationTitle,
  type WeddingLocation,
} from '@/lib/weddingLocations';
import { PRIMARY_REGION, PRIMARY_STATE_ABBR, SERVICE_AREA_PAGE_LABEL } from '@/lib/siteConfig';

/**
 * Antique map marker — inked dot + serif place name.
 */
function MapPin({
  location,
  active,
  onFocus,
}: {
  location: WeddingLocation;
  active: boolean;
  onFocus: (id: string | null) => void;
}) {
  const isLive = location.status === 'live';
  const dotSize = location.featured ? 11 : 8;

  const marker = (
    <span className="relative flex items-center gap-1.5">
      <span
        className={`shrink-0 rounded-full transition duration-200 ${
          isLive
            ? 'bg-gray-900 ring-2 ring-gray-400'
            : 'bg-gray-700 ring-1 ring-gray-400'
        } ${active ? 'scale-125' : ''}`}
        style={{ width: dotSize, height: dotSize }}
      />
      <span
        className={`whitespace-nowrap font-serif text-[0.68rem] italic leading-none tracking-wide transition sm:text-[0.76rem] ${
          isLive || active
            ? 'font-semibold not-italic text-gray-900'
            : 'font-medium text-gray-600'
        } ${active && isLive ? 'text-gray-900 not-italic' : ''}`}
      >
        {location.city}
      </span>
    </span>
  );

  const sharedClass =
    'absolute z-20 -translate-x-1/2 -translate-y-1/2 touch-manipulation rounded-sm px-0.5 py-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900';

  if (isLive) {
    return (
      <Link
        href={location.path}
        className={`${sharedClass} hover:opacity-90`}
        style={{ left: `${location.x}%`, top: `${location.y}%` }}
        aria-label={weddingLocationTitle(location.city, true)}
        onMouseEnter={() => onFocus(location.id)}
        onMouseLeave={() => onFocus(null)}
        onFocus={() => onFocus(location.id)}
        onBlur={() => onFocus(null)}
      >
        {marker}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={sharedClass}
      style={{ left: `${location.x}%`, top: `${location.y}%` }}
      aria-label={`${location.city} ${SERVICE_AREA_PAGE_LABEL.toLowerCase()} — page coming soon`}
      onMouseEnter={() => onFocus(location.id)}
      onMouseLeave={() => onFocus(null)}
      onFocus={() => onFocus(location.id)}
      onBlur={() => onFocus(null)}
    >
      {marker}
    </button>
  );
}

/** Tiny hand-drawn tree cluster (antique map flourish). */
function TreeCluster({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`} opacity="0.45" fill="#374151">
      <ellipse cx="0" cy="2" rx="2.2" ry="1.1" opacity="0.35" />
      <path d="M0 2 L-3.5 -4 L0 -9 L3.5 -4 Z" />
      <path d="M5 3 L2.5 -1 L5 -5 L7.5 -1 Z" opacity="0.7" />
      <path d="M-5 3.5 L-7.2 0 L-5 -3.5 L-2.8 0 Z" opacity="0.65" />
    </g>
  );
}

/**
 * Demo service-area map — stylized regional plate (replace for client geography):
 * neutral regional plate (replace for client geography).
 */
function PeeDeeMapArt() {
  const ink = '#374151';
  const countyStroke = {
    stroke: ink,
    strokeWidth: 0.95,
    strokeDasharray: '4 2.8',
    fill: '#f3f4f6',
  };

  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 520 420"
      fill="none"
      aria-hidden
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id="map-wash" cx="45%" cy="40%" r="70%">
          <stop offset="0%" stopColor="#f9fafb" />
          <stop offset="55%" stopColor="#e5e7eb" />
          <stop offset="100%" stopColor="#d1d5db" />
        </radialGradient>
        <filter id="paper-grain" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="4"
            stitchTiles="stitch"
            result="noise"
          />
          <feColorMatrix
            in="noise"
            type="matrix"
            values="0 0 0 0 0.45
                    0 0 0 0 0.35
                    0 0 0 0 0.22
                    0 0 0 0.12 0"
          />
        </filter>
      </defs>

      {/* Map base */}
      <rect width="520" height="420" fill="url(#map-wash)" />
      <rect
        width="520"
        height="420"
        filter="url(#paper-grain)"
        opacity="0.55"
      />

      {/* Soft washes */}
      <ellipse cx="70" cy="55" rx="55" ry="35" fill="#9ca3af" opacity="0.18" />
      <ellipse cx="460" cy="340" rx="70" ry="45" fill="#9ca3af" opacity="0.16" />
      <ellipse cx="250" cy="390" rx="90" ry="28" fill="#a3a3a3" opacity="0.14" />
      <ellipse cx="400" cy="80" rx="40" ry="25" fill="#737373" opacity="0.1" />

      {/* Soft fold lines */}
      <path
        d="M0 140 Q260 148 520 135"
        stroke="#9ca3af"
        strokeWidth="1"
        opacity="0.18"
      />
      <path
        d="M0 280 Q260 272 520 285"
        stroke="#9ca3af"
        strokeWidth="1"
        opacity="0.14"
      />
      <path
        d="M175 0 Q168 210 182 420"
        stroke="#9ca3af"
        strokeWidth="1"
        opacity="0.12"
      />

      {/* —— Neighboring counties —— */}
      <path
        d="M195 18 L280 12 L310 55 L275 78 L200 70 L175 40 Z"
        {...countyStroke}
        fill="#f3f4f6"
      />
      <path
        d="M310 55 L380 48 L420 95 L400 140 L340 125 L310 90 Z"
        {...countyStroke}
        fill="#f3f4f6"
      />
      <path
        d="M95 70 L175 40 L200 70 L215 130 L180 185 L110 175 L85 120 Z"
        {...countyStroke}
        fill="#e5e7eb"
      />
      <path
        d="M55 140 L85 120 L110 175 L125 230 L90 260 L50 220 Z"
        {...countyStroke}
        opacity="0.9"
        fill="#e5e7eb"
      />
      <path
        d="M340 125 L400 140 L445 175 L440 240 L385 255 L345 210 L330 160 Z"
        {...countyStroke}
        fill="#f3f4f6"
      />
      <path
        d="M445 175 L500 160 L510 250 L470 280 L440 240 Z"
        {...countyStroke}
        opacity="0.55"
        fill="#e5e7eb"
      />
      <path
        d="M125 230 L215 220 L270 250 L265 320 L180 335 L120 300 Z"
        {...countyStroke}
        fill="#e5e7eb"
      />
      <path
        d="M90 260 L125 230 L120 300 L85 320 L60 280 Z"
        {...countyStroke}
        opacity="0.75"
        fill="#e5e7eb"
      />
      <path
        d="M270 250 L345 210 L385 255 L370 320 L300 340 L265 320 Z"
        {...countyStroke}
        opacity="0.8"
        fill="#f3f4f6"
      />

      {/* Regional map — soft olive wash (no hard highlight) */}
      <path
        d="M180 185
           L215 130
           L275 78
           L310 90
           L340 125
           L330 160
           L345 210
           L270 250
           L215 220
           L125 230
           L180 185 Z"
        fill="#d1d5db"
        fillOpacity="0.55"
        stroke={ink}
        strokeWidth="1.15"
        strokeDasharray="4 2.8"
      />

      {/* Soft pink edge wash (antique coast accent) */}
      <path
        d="M445 175 L500 160 L510 250 L470 280 L440 240 Z"
        fill="none"
        stroke="#9ca3af"
        strokeWidth="2.5"
        strokeOpacity="0.28"
        strokeLinejoin="round"
      />
      <path
        d="M340 125 L400 140 L445 175"
        fill="none"
        stroke="#9ca3af"
        strokeWidth="1.8"
        strokeOpacity="0.2"
      />

      {/* —— Rivers —— */}
      <path
        d="M290 20
           C275 70 305 100 292 145
           C278 195 300 230 285 275
           C272 315 290 350 278 400"
        stroke="#9ca3af"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
        opacity="0.55"
      />
      <path
        d="M290 20
           C275 70 305 100 292 145
           C278 195 300 230 285 275
           C272 315 290 350 278 400"
        stroke="#d1d5db"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M70 160
           C120 175 160 190 200 205
           C230 215 255 235 275 265"
        stroke="#9ca3af"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.7"
      />
      <path
        d="M70 160
           C120 175 160 190 200 205
           C230 215 255 235 275 265"
        stroke="#b0c8cc"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />

      <text
        x="308"
        y="100"
        fill="#5a787c"
        fontSize="9.5"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontStyle="italic"
        transform="rotate(72 308 100)"
        opacity="0.85"
      >
        Service area
      </text>

      {/* Small lake */}
      <ellipse
        cx="155"
        cy="145"
        rx="18"
        ry="9"
        fill="#9eb5b0"
        opacity="0.45"
      />
      <ellipse
        cx="155"
        cy="145"
        rx="13"
        ry="6"
        fill="#c5d6d0"
        opacity="0.65"
      />

      {/* Tree flourishes */}
      <TreeCluster x={100} y={95} />
      <TreeCluster x={380} y={200} />
      <TreeCluster x={150} y={300} />
      <TreeCluster x={420} y={290} />

      {/* Gentle hills (west) */}
      <g fill="#374151" opacity="0.2">
        <path d="M48 175 Q55 160 62 175 Q55 168 48 175" />
        <path d="M62 178 Q70 162 78 178 Q70 170 62 178" />
        <path d="M55 188 Q64 172 73 188 Q64 180 55 188" />
      </g>

      {/* Double plate border + tick marks */}
      <rect
        x="10"
        y="10"
        width="500"
        height="400"
        stroke={ink}
        strokeWidth="2.2"
        fill="none"
        opacity="0.55"
      />
      <rect
        x="16"
        y="16"
        width="488"
        height="388"
        stroke={ink}
        strokeWidth="0.7"
        fill="none"
        opacity="0.4"
      />
      {/* Coordinate ticks */}
      {[60, 130, 200, 270, 340, 410].map((x) => (
        <g key={`tx-${x}`} opacity="0.35">
          <line x1={x} y1="10" x2={x} y2="16" stroke={ink} strokeWidth="0.8" />
          <line
            x1={x}
            y1="404"
            x2={x}
            y2="410"
            stroke={ink}
            strokeWidth="0.8"
          />
        </g>
      ))}
      {[70, 140, 210, 280, 350].map((y) => (
        <g key={`ty-${y}`} opacity="0.35">
          <line x1="10" y1={y} x2="16" y2={y} stroke={ink} strokeWidth="0.8" />
          <line
            x1="504"
            y1={y}
            x2="510"
            y2={y}
            stroke={ink}
            strokeWidth="0.8"
          />
        </g>
      ))}

      {/* Title cartouche */}
      <g transform="translate(260, 388)">
        <rect
          x="-72"
          y="-16"
          width="144"
          height="28"
          rx="2"
          fill="#f3f4f6"
          stroke={ink}
          strokeWidth="0.9"
          opacity="0.92"
        />
        <path
          d="M-78 -4 Q-84 -2 -78 2"
          fill="none"
          stroke={ink}
          strokeWidth="0.7"
          opacity="0.5"
        />
        <path
          d="M78 -4 Q84 -2 78 2"
          fill="none"
          stroke={ink}
          strokeWidth="0.7"
          opacity="0.5"
        />
        <text
          x="0"
          y="3"
          textAnchor="middle"
          fill={ink}
          fontSize="11"
          fontFamily="Georgia, 'Times New Roman', serif"
          letterSpacing="3.5"
          fontWeight="600"
          opacity="0.8"
        >
          PEE DEE
        </text>
      </g>

      {/* Compass rose + faint rhumb lines */}
      <g transform="translate(455, 55)" opacity="0.75">
        {[0, 45, 90, 135].map((deg) => (
          <line
            key={deg}
            x1="0"
            y1="0"
            x2={Math.cos(((deg - 90) * Math.PI) / 180) * 48}
            y2={Math.sin(((deg - 90) * Math.PI) / 180) * 48}
            stroke={ink}
            strokeWidth="0.4"
            opacity="0.25"
          />
        ))}
        <circle cx="0" cy="0" r="26" fill="none" stroke={ink} strokeWidth="0.85" />
        <circle cx="0" cy="0" r="18" fill="none" stroke={ink} strokeWidth="0.5" />
        <circle cx="0" cy="0" r="4" fill="#f3f4f6" stroke={ink} strokeWidth="0.5" />
        <path d="M0,-24 L3.2,-5 L0,0 L-3.2,-5 Z" fill={ink} />
        <path d="M0,24 L3.2,5 L0,0 L-3.2,5 Z" fill={ink} opacity="0.4" />
        <path d="M24,0 L5,3.2 L0,0 L5,-3.2 Z" fill={ink} opacity="0.4" />
        <path d="M-24,0 L-5,3.2 L0,0 L-5,-3.2 Z" fill={ink} opacity="0.4" />
        <text
          x="0"
          y="-30"
          textAnchor="middle"
          fill={ink}
          fontSize="10"
          fontFamily="Georgia, 'Times New Roman', serif"
          fontWeight="600"
        >
          N
        </text>
      </g>

      {/* Small sailing ship flourish (east water) */}
      <g transform="translate(485, 210)" opacity="0.35" fill={ink}>
        <path d="M-10 6 L10 6 L6 10 L-6 10 Z" />
        <path d="M0 -10 L0 6" stroke={ink} strokeWidth="0.8" />
        <path d="M0 -8 L8 2 L0 2 Z" opacity="0.7" />
        <path d="M0 -6 L-6 1 L0 1 Z" opacity="0.5" />
      </g>
    </svg>
  );
}

export default function WeddingLocationsMap() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const liveCount = WEDDING_LOCATIONS.filter((l) => l.status === 'live').length;
  const listedLocations = [...WEDDING_LOCATIONS].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return a.city.localeCompare(b.city);
  });

  return (
    <section
      className="border-t border-gray-200 bg-white px-6 py-16 dark:border-gray-700 dark:bg-gray-950 sm:px-10 lg:px-16 lg:py-24"
      aria-labelledby="service-locations-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Where we serve</p>
          <h2
            id="service-locations-heading"
            className="mt-4 font-sans text-2xl font-medium text-gray-900 dark:text-gray-100 md:text-3xl"
          >
            Across {PRIMARY_REGION}
          </h2>
          <p className="mt-4 font-sans text-base font-light leading-[1.8] text-gray-600 dark:text-gray-400">
            These are communities in our core service area—pick one on the map or
            from the list. Location landing pages appear as markers go live. We
            also travel beyond {PRIMARY_REGION}; reach out and we will talk
            through options for your project.
          </p>
        </div>

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="relative lg:col-span-7">
            <div
              className="relative mx-auto aspect-[5/4] w-full max-w-xl overflow-hidden rounded-sm border border-gray-300 bg-gray-100"
              role="img"
              aria-label={`Map of ${SERVICE_AREA_PAGE_LABEL.toLowerCase()} locations across the ${PRIMARY_REGION} region of ${PRIMARY_STATE_ABBR}`}
            >
              <PeeDeeMapArt />

              <div className="absolute inset-0">
                {WEDDING_LOCATIONS.map((location) => (
                  <MapPin
                    key={location.id}
                    location={location}
                    active={activeId === location.id}
                    onFocus={setActiveId}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <ul className="divide-y divide-gray-200 rounded-sm border border-gray-300 bg-white">
              {listedLocations.map((location) => {
                const isLive = location.status === 'live';
                const isActive = activeId === location.id;
                const rowClass = `flex w-full items-center justify-between gap-3 px-5 py-3.5 text-left transition ${
                  isActive ? 'bg-gray-100 dark:bg-white/5' : ''
                }`;

                const content = (
                  <>
                    <span className="flex items-center gap-3">
                      <span
                        className={`h-2 w-2 shrink-0 rounded-full ${
                          isLive ? 'bg-gray-900' : 'bg-gray-700'
                        }`}
                        aria-hidden
                      />
                      <span
                        className={`font-serif text-sm italic ${
                          isLive
                            ? 'font-medium not-italic text-gray-900 dark:text-gray-100'
                            : 'text-gray-600 dark:text-gray-400'
                        }`}
                      >
                        {location.city}
                      </span>
                    </span>
                    <span
                      className={`font-sans text-xs font-light ${
                        isLive
                          ? 'text-gray-900 dark:text-gray-400'
                          : 'text-gray-600 dark:text-gray-400'
                      }`}
                    >
                      {isLive ? 'View page →' : 'Coming soon'}
                    </span>
                  </>
                );

                return (
                  <li key={location.id}>
                    {isLive ? (
                      <Link
                        href={location.path}
                        className={`${rowClass} hover:bg-gray-100 dark:hover:bg-white/5`}
                        onMouseEnter={() => setActiveId(location.id)}
                        onMouseLeave={() => setActiveId(null)}
                        onFocus={() => setActiveId(location.id)}
                        onBlur={() => setActiveId(null)}
                      >
                        {content}
                      </Link>
                    ) : (
                      <div
                        className={rowClass}
                        onMouseEnter={() => setActiveId(location.id)}
                        onMouseLeave={() => setActiveId(null)}
                      >
                        {content}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
            <p className="mt-4 font-sans text-sm font-light leading-relaxed text-gray-600 dark:text-gray-400">
              {liveCount === 0
                ? `Location pages for ${PRIMARY_REGION} will appear here as they go live.`
                : liveCount === 1
                  ? `One ${PRIMARY_REGION} location page is live so far.`
                  : `${liveCount} locations are live so far.`}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
