import type { AnchorHTMLAttributes, MouseEvent } from "react";
import { useSmoothScroll } from "./SmoothScroll";

type ScrollLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: `#${string}`;
  /** Runs before scrolling, e.g. to close a menu. Return a delay in ms to wait. */
  beforeScroll?: () => number | void;
};

/** In-page anchor that scrolls smoothly instead of jumping. */
export function ScrollLink({ href, beforeScroll, onClick, ...rest }: ScrollLinkProps) {
  const { scrollTo } = useSmoothScroll();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    const delay = beforeScroll?.() ?? 0;
    if (delay > 0) window.setTimeout(() => scrollTo(href), delay);
    else scrollTo(href);
  };

  return <a href={href} onClick={handleClick} {...rest} />;
}
