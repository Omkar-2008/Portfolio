import { ScrollLink } from "@/components/motion/ScrollLink";
import { NAV_ITEMS, SiteMenu } from "./SiteMenu";

export { NAV_ITEMS };

export function SiteNav() {
  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <nav
        aria-label="Primary"
        className="flex items-center justify-between px-5 py-5 sm:px-8 lg:px-10 lg:py-7"
      >
        <ScrollLink
          href="#home"
          data-reveal
          className="nav-item font-display text-2xl font-extrabold tracking-tight text-on-canvas"
        >
          Omkar<sup className="ml-0.5 text-[0.55em] font-semibold">®</sup>
        </ScrollLink>

        <ul className="hidden items-center gap-10 md:flex lg:gap-14">
          {NAV_ITEMS.filter((item) => item.inHero).map((item) => (
            <li key={item.label} data-reveal className="nav-item">
              <ScrollLink href={item.href} className="nav-link text-sm font-medium text-on-canvas">
                {item.label}
              </ScrollLink>
            </li>
          ))}
        </ul>

        <SiteMenu triggerClassName="nav-item" />
      </nav>
    </header>
  );
}
