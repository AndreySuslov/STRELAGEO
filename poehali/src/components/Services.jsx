import React from "react";
import { Icon } from "./Icon.jsx";
import { services } from "../content.js";
export const Services = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  return (
    <section
      id={`services`}
      className={`relative px-5 md:px-[60px] py-24 md:py-40 border-t border-border`}
    >
      <div
        className={`relative flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-muted-foreground reveal`}
      >
        <span className={`text-primary`}>{`03`}</span>
        <span className={`h-px w-12 bg-border`} />
        {`Услуги`}
      </div>
      <div
        className={`relative mt-12 md:mt-20 grid gap-10 lg:grid-cols-[minmax(260px,0.8fr)_2fr] lg:gap-16 xl:gap-24`}
      >
        <div className={`reveal lg:sticky lg:top-28 lg:self-start`}>
          {services.map((n2, r) => {
            let i = r === selectedIndex;
            return (
              <button
                onClick={() => setSelectedIndex(r)}
                onMouseEnter={() => {
                  if (
                    window.matchMedia("(hover: hover) and (pointer: fine)")
                      .matches
                  )
                    setSelectedIndex(r);
                }}
                aria-pressed={i}
                className={`service-tab group relative flex w-full items-start gap-5 border-b border-border py-6 md:py-8 text-left first:border-t`}
                key={n2.key}
              >
                <span
                  className={`absolute left-0 -bottom-px h-px bg-primary transition-all duration-700 ${i ? `w-full` : `w-0`}`}
                />
                <span className={`flex-1`}>
                  <span
                    className={`block font-head font-extrabold tracking-[-0.02em] leading-[1.05] transition-colors duration-500 text-[clamp(26px,2.8vw,44px)] ${i ? `text-foreground` : `text-foreground/25 group-hover:text-foreground/55`}`}
                  >
                    {n2.title}
                  </span>
                  <span
                    className={`mt-3 block text-sm leading-snug text-muted-foreground transition-all duration-500 ${i ? `opacity-100 max-h-20` : `opacity-0 max-h-0 overflow-hidden`}`}
                  >
                    {n2.short}
                  </span>
                </span>
                <span
                  className={`mt-1.5 hidden md:flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${i ? `border-primary bg-primary text-primary-foreground rotate-0` : `border-border -rotate-45`}`}
                >
                  <Icon name={`ArrowRight`} size={18} />
                </span>
              </button>
            );
          })}
        </div>
        <div className="services-panels">
          {services.map((service, index) => (
            <div
              className="service-panel grid gap-10 xl:grid-cols-[1.15fr_1fr]"
              key={service.key}
              data-active={index === selectedIndex}
              aria-hidden={index !== selectedIndex}
              {...(index !== selectedIndex ? { inert: "" } : {})}
            >
              <figure
                className={`service-image glow-shadow relative overflow-hidden rounded-3xl border border-foreground/10 bg-card`}
              >
                <img
                  src={service.img}
                  alt={service.title}
                  className={`absolute inset-0 h-full w-full object-cover scale-105 transition-transform duration-[2s] hover:scale-100`}
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent`}
                />
                {service.boxes.map((e2) => (
                  <div
                    className={`absolute rounded border border-glow/80`}
                    style={{
                      left: e2.l,
                      top: e2.t,
                      width: e2.w,
                      height: e2.h,
                    }}
                    key={e2.tag}
                  >
                    <span
                      className={`absolute -top-[22px] -left-px whitespace-nowrap rounded-[3px] bg-primary px-[7px] py-[2px] text-[0.62rem] text-primary-foreground`}
                    >
                      {e2.tag}
                    </span>
                  </div>
                ))}
              </figure>
              <div className={`flex flex-col`}>
                <p
                  className={`text-base md:text-lg leading-relaxed text-foreground/90`}
                >
                  {service.text}
                </p>
                <div
                  className={`mt-10 text-xs uppercase tracking-[0.3em] text-muted-foreground`}
                >{`Возможности`}</div>
                <ul className={`mt-4`}>
                  {service.features.map((e2) => (
                    <li
                      className={`flex items-center gap-4 border-b border-border/70 py-3.5 text-[0.95rem]`}
                      key={e2}
                    >
                      <span
                        className={`h-1.5 w-1.5 shrink-0 rounded-full bg-primary`}
                      />
                      {e2}
                    </li>
                  ))}
                </ul>
                <div
                  className={`mt-10 text-xs uppercase tracking-[0.3em] text-muted-foreground`}
                >{`Результат`}</div>
                <div className={`mt-5 grid grid-cols-3 gap-4`}>
                  {service.results.map((e2) => (
                    <div key={e2.l}>
                      <div
                        className={`font-head text-2xl md:text-3xl font-extrabold text-foreground`}
                      >
                        {e2.v}
                      </div>
                      <div
                        className={`mt-2 text-sm text-muted-foreground leading-snug`}
                      >
                        {e2.l}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
