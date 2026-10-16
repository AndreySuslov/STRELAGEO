import { useState, useEffect, useRef } from "react";
import { directions as DIRECTIONS } from "../content.js";
const Directions = () => {
  const [active, setActive] = useState(0);
  const section = useRef(null);
  useEffect(() => {
    const about = document.getElementById("about");
    if (!about) return;
    const syncHeight = () =>
      section.current?.style.setProperty(
        "--directions-height",
        `${Math.round(about.getBoundingClientRect().height)}px`,
      );
    syncHeight();
    const observer = new ResizeObserver(syncHeight);
    observer.observe(about);
    return () => observer.disconnect();
  }, []);
  return (
    <section
      id="directions"
      ref={section}
      className="relative border-t border-border py-24 md:py-32"
    >
      <div className="px-5 md:px-[60px] grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <div className="flex items-center gap-6 text-xs uppercase tracking-[0.3em] text-muted-foreground reveal">
            <span className="text-primary tabular-nums">04</span>
            <span className="h-4 w-px bg-foreground/25" />
            Направления
          </div>
          <h2
            className="title-glow mt-10 font-head font-normal uppercase leading-[1.1] reveal"
            style={{ fontSize: "clamp(28px, 3.4vw, 56px)" }}
          >
            Направления
            <br />
            применения
          </h2>
        </div>
        <p className="max-w-xs text-sm leading-relaxed text-muted-foreground reveal">
          Области, в которых спутниковые данные и ИИ дают наибольший эффект уже
          сегодня
        </p>
      </div>
      <div className="relative mt-14 md:mt-20 flex flex-col lg:flex-row lg:h-[min(86vh,780px)] lg:min-h-[620px] border-y border-foreground/10 reveal">
        {DIRECTIONS.map((d, i) => {
          const on = i === active;
          return (
            <article
              key={d.key}
              data-active={on}
              tabIndex={0}
              role="button"
              aria-expanded={on}
              aria-label={d.title.join(" ")}
              onFocus={() => setActive(i)}
              onKeyDown={(event) => {
                if (event.target !== event.currentTarget) return;
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setActive(i);
                }
              }}
              onMouseEnter={() => {
                if (
                  window.matchMedia("(hover: hover) and (pointer: fine)")
                    .matches
                )
                  setActive(i);
              }}
              onClick={() => setActive(i)}
              className="group relative min-h-[520px] lg:min-h-0 overflow-hidden cursor-pointer border-b lg:border-b-0 lg:border-l first:border-l-0 border-foreground/10 lg:transition-[flex-grow] lg:duration-[900ms] lg:ease-[cubic-bezier(.7,0,.2,1)]"
              style={{ flexGrow: on ? 2.6 : 1, flexBasis: 0 }}
            >
              <img
                src={d.img}
                alt=""
                className={`absolute inset-0 h-full w-full object-cover transition-all duration-[1400ms] ease-out ${
                  on ? "scale-100 opacity-100" : "scale-110 opacity-85"
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/55 to-background/10" />
              <div className="relative flex h-full flex-col justify-between p-6 md:p-10 xl:p-12">
                <div className="flex items-center justify-end">
                  <span
                    className={`h-px bg-primary transition-all duration-700 ${on ? "w-16 opacity-100" : "w-0 opacity-0"}`}
                  />
                </div>
                <div>
                  <h3
                    className={`font-head font-normal uppercase leading-[1.12] transition-all duration-700 ${
                      on ? "text-foreground/90" : "text-foreground/90"
                    }`}
                    style={{
                      fontSize: on
                        ? "clamp(24px, 2.4vw, 40px)"
                        : "clamp(18px, 1.4vw, 22px)",
                    }}
                  >
                    {d.title[0]}
                    <br />
                    {d.title[1]}
                  </h3>
                  <div
                    className={`grid transition-all duration-700 ease-out ${
                      on
                        ? "grid-rows-[1fr] opacity-100 mt-8"
                        : "grid-rows-[0fr] opacity-0 mt-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div
                        className={`max-w-[520px] transition-transform duration-700 ${on ? "translate-y-0 delay-200" : "translate-y-4"}`}
                      >
                        <p className="text-[0.95rem] leading-relaxed text-foreground/90">
                          {d.lead}
                        </p>
                        <ul className="mt-6 border-t border-foreground/10">
                          {d.items.map((it) => (
                            <li
                              key={it}
                              className="flex items-center gap-4 border-b border-foreground/10 py-3 text-sm text-foreground/90"
                            >
                              <span className="h-1 w-1 shrink-0 rounded-full bg-primary" />
                              {it}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
export default Directions;
