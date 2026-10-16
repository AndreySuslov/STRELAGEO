import React from "react";
import { Icon } from "./Icon.jsx";
import { contactDetails } from "../content.js";
export const Contacts = () => {
  const timerRef = React.useRef(null);
  React.useEffect(() => () => window.clearTimeout(timerRef.current), []);
  let [copiedValue, setCopiedValue] = React.useState(null),
    copyContact = async (e2) => {
      try {
        (await navigator.clipboard.writeText(e2),
          setCopiedValue(e2),
          window.clearTimeout(timerRef.current),
          (timerRef.current = window.setTimeout(
            () => setCopiedValue(null),
            1800,
          )));
      } catch {}
    };
  return (
    <section
      id={`contacts`}
      className={`relative overflow-hidden px-5 md:px-[60px] py-24 md:py-40`}
    >
      <div className={`pointer-events-none absolute inset-0`}>
        <b className={`beam-glow top-[55%] opacity-25`} />
      </div>
      <div
        className={`relative flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-muted-foreground reveal`}
      >
        <span className={`text-primary`}>{`07`}</span>
        <span className={`h-px w-12 bg-border`} />
        {`Контакты`}
      </div>
      <h2
        className={`relative mt-10 max-w-4xl font-head text-[clamp(32px,5.2vw,80px)] font-extrabold leading-[1] tracking-[-0.03em] reveal`}
      >
        {`Обсудить проект`}
      </h2>
      <div role="status" className="sr-only">
        {copiedValue ? "Адрес почты скопирован" : ""}
      </div>
      <div className={`relative mt-16 md:mt-24 space-y-0 contact-rows`}>
        {contactDetails.map((t2) => (
          <div
            className={`group flex flex-col gap-4 border-t border-border py-8 md:flex-row md:items-center md:justify-between reveal`}
            key={t2.label}
          >
            <span
              className={`text-xs uppercase tracking-[0.3em] text-muted-foreground md:w-40`}
            >
              {t2.label}
            </span>
            <a
              href={t2.href}
              className={`flex-1 font-head text-[clamp(24px,4.6vw,72px)] font-extrabold tracking-[-0.03em] leading-none break-all transition-colors duration-300 group-hover:text-primary`}
            >
              {t2.value}
            </a>
            <button
              onClick={() => copyContact(t2.value)}
              className={`flex items-center gap-2 self-start md:self-auto rounded-full border border-border px-5 py-3 text-sm transition-colors hover:border-foreground`}
            >
              <Icon
                name={copiedValue === t2.value ? `Check` : `Copy`}
                size={16}
              />
              {copiedValue === t2.value ? `Скопировано` : `Скопировать`}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};
