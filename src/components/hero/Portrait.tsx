type PortraitProps = {
  src: string;
  srcSet?: string | undefined;
  sizes?: string | undefined;
  width: number;
  height: number;
  className?: string;
};

/**
 * Omkar's real cut-out portrait. The white sticker outline is baked into the
 * image file, so the browser only paints a single soft shadow at runtime.
 */
export function Portrait({ src, srcSet, sizes, width, height, className = "" }: PortraitProps) {
  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      width={width}
      height={height}
      alt="Omkar Potnuru, smiling, in a white patterned shirt"
      fetchPriority="high"
      decoding="async"
      draggable={false}
      className={`h-full w-auto max-w-none select-none object-contain object-bottom ${className}`}
    />
  );
}
