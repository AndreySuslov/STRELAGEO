import React from "react";
import { sectionLinks } from "../content.js";
export const SideNavigation = () => {
  let [activeIndex, setActiveIndex] = React.useState(0);
  return (
    React.useEffect(() => {
      let e2 = () => {
        let e3 = window.innerHeight * 0.45,
          n = 0;
        (sectionLinks.forEach((t2, r) => {
          let i = document.getElementById(t2.id);
          i && i.getBoundingClientRect().top <= e3 && (n = r);
        }),
          window.innerHeight + window.scrollY >=
            document.body.scrollHeight - 4 && (n = sectionLinks.length - 1),
          setActiveIndex(n));
      };
      return (
        e2(),
        window.addEventListener(`scroll`, e2, {
          passive: true,
        }),
        () => window.removeEventListener(`scroll`, e2)
      );
    }, []),
    (
      <>
        <nav
          className={`side-navigation fixed left-6 xl:left-10 top-1/2 z-40 hidden -translate-y-1/2 lg:flex flex-col items-start`}
        >
          <span className={`mb-6 ml-[3px] h-14 w-px bg-foreground/15`} />
          <ul className={`space-y-3`}>
            {sectionLinks.map((t2, n) => {
              let r = n === activeIndex;
              return (
                <li key={t2.id}>
                  <a
                    href={`#${t2.id}`}
                    aria-label={t2.label}
                    aria-current={r ? "location" : undefined}
                    className={`group flex items-center gap-3 font-head text-[0.78rem] tabular-nums`}
                  >
                    <span
                      className={`transition-colors duration-300 ${r ? `text-foreground font-semibold` : `text-foreground/40 group-hover:text-foreground/80`}`}
                    >
                      {`0`}
                      {n + 1}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
          <span className={`mt-6 ml-[3px] h-14 w-px bg-foreground/15`} />
        </nav>
      </>
    )
  );
};
