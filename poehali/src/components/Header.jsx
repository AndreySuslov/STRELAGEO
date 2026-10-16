import React from "react";
import { Icon } from "./Icon.jsx";
import { navLinks } from "../content.js";
export const Header = () => {
  const menuRef = React.useRef(null);
  let [menuOpen, setMenuOpen] = React.useState(false),
    [scrolled, setScrolled] = React.useState(false);
  return (
    React.useEffect(() => {
      let e2 = () => setScrolled(window.scrollY > 40);
      return (
        e2(),
        window.addEventListener(`scroll`, e2, {
          passive: true,
        }),
        () => window.removeEventListener(`scroll`, e2)
      );
    }, []),
    React.useEffect(() => {
      if (!menuOpen) return;
      const dialog = menuRef.current;
      const previousOverflow = document.body.style.overflow;
      dialog.showModal();
      document.body.style.overflow = "hidden";
      const onResize = () => {
        if (window.innerWidth >= 1024) setMenuOpen(false);
      };
      window.addEventListener("resize", onResize);
      return () => {
        dialog.close();
        document.body.style.overflow = previousOverflow;
        window.removeEventListener("resize", onResize);
      };
    }, [menuOpen]),
    (
      <React.Fragment>
        <header
          className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? `bg-background/70 backdrop-blur-xl border-b border-border/60` : `bg-transparent border-b border-transparent`}`}
        >
          <nav
            className={`mx-auto flex h-[72px] md:h-[84px] items-center justify-between px-5 md:px-[60px]`}
          >
            <a
              href={`#top`}
              className={`font-head font-extrabold tracking-[0.2em] text-foreground`}
            >{`СТРЕЛА`}</a>
            <ul
              className={`hidden lg:flex gap-7 text-[0.88rem] text-foreground/90`}
            >
              {navLinks.map((e2) => (
                <li key={e2.id}>
                  <a
                    href={`#${e2.id}`}
                    className={`story-link hover:text-foreground transition-colors`}
                  >
                    {e2.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={`mailto:strela.team@yandex.com`}
              className={`hidden lg:inline-block rounded-full border border-foreground px-[18px] py-[7px] text-[0.88rem] transition-colors hover:bg-foreground hover:text-background`}
            >{`strela.team@yandex.com`}</a>
            <button
              aria-label={`Меню`}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen(true)}
              className={`lg:hidden flex h-11 w-11 items-center justify-center rounded-full border border-foreground/40`}
            >
              <Icon name={`Menu`} size={20} />
            </button>
          </nav>
        </header>
        <dialog
          ref={menuRef}
          id="mobile-menu"
          aria-label="Навигация по сайту"
          onCancel={() => setMenuOpen(false)}
          className="mobile-menu fixed inset-0 z-[60] bg-background"
        >
          <div className={`beam-glow top-[30%] opacity-60`} />
          <div
            className={`relative flex h-[72px] items-center justify-between px-5`}
          >
            <span
              className={`font-head font-extrabold tracking-[0.2em]`}
            >{`СТРЕЛА`}</span>
            <button
              aria-label={`Закрыть`}
              onClick={() => setMenuOpen(false)}
              className={`flex h-11 w-11 items-center justify-center rounded-full border border-foreground/40`}
            >
              <Icon name={`X`} size={20} />
            </button>
          </div>
          <ul className={`relative mt-10 px-5 space-y-2`}>
            {navLinks.map((n2, r2) => (
              <li
                style={{
                  transitionDelay: `${r2 * 60}ms`,
                }}
                className={`transition-all duration-500 ${menuOpen ? `opacity-100 translate-y-0` : `opacity-0 translate-y-4`}`}
                key={n2.id}
              >
                <a
                  href={`#${n2.id}`}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-baseline gap-4 py-2 font-head text-4xl font-extrabold tracking-tight`}
                >
                  <span
                    className={`text-xs font-body font-medium text-primary`}
                  >
                    {`0`}
                    {r2 + 1}
                  </span>
                  {n2.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={`mailto:strela.team@yandex.com`}
            className={`absolute bottom-10 left-5 right-5 rounded-full border border-foreground py-4 text-center text-sm`}
          >{`strela.team@yandex.com`}</a>
        </dialog>
      </React.Fragment>
    )
  );
};
