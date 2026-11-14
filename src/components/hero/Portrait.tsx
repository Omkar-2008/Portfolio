type PortraitProps = {
  /** Transparent cut-out of Omkar. Leave empty to show the placeholder slot. */
  src?: string | undefined;
  className?: string;
};

/**
 * Chest-up portrait with a white sticker outline.
 * Until the real photo is supplied, a neutral silhouette marks its slot —
 * never swap in a generated person.
 */
export function Portrait({ src, className = "" }: PortraitProps) {
  if (src) {
    return (
      <img
        src={src}
        alt="Omkar Potnuru"
        className={`sticker-outline h-full w-auto max-w-none object-contain object-bottom ${className}`}
      />
    );
  }

  return (
    <div className={`relative h-full aspect-[4/5] ${className}`}>
      <svg
        viewBox="0 0 400 500"
        className="sticker-outline h-full w-full"
        role="img"
        aria-label="Portrait placeholder for Omkar Potnuru"
      >
        <defs>
          <linearGradient id="portrait-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--ink)" stopOpacity="0.28" />
            <stop offset="100%" stopColor="var(--ink)" stopOpacity="0.5" />
          </linearGradient>
        </defs>
        <path
          fill="url(#portrait-fill)"
          d="M200 60c52 0 88 40 88 96 0 38-16 70-40 88v22c0 10 6 18 16 22l64 26c42 17 72 58 72 104v82H0v-82c0-46 30-87 72-104l64-26c10-4 16-12 16-22v-22c-24-18-40-50-40-88 0-56 36-96 88-96z"
        />
      </svg>
      <div className="absolute inset-x-0 top-[38%] flex justify-center">
        <span className="type-eyebrow rounded-full border border-on-canvas/40 px-3 py-1.5 text-on-canvas/80">
          Portrait coming soon
        </span>
      </div>
    </div>
  );
}
