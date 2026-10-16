import React from "react";
import { Icon } from "./Icon.jsx";
import { techStages } from "../content.js";
export const Technology = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const pausedRef = React.useRef(false);
  const motionsRef = React.useRef([]);
  const togglePlayback = () => {
    const next = !paused;
    pausedRef.current = next;
    setPaused(next);
    motionsRef.current.forEach((motion) =>
      next ? motion.pause() : motion.play(),
    );
  };
  const glowRef = React.useRef(null);
  const progressRef = React.useRef(null);
  const [mobile, setMobile] = React.useState(() => window.innerWidth < 768);
  React.useEffect(() => {
    const media = window.matchMedia("(max-width:767px)");
    const update = () => setMobile(media.matches);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  React.useEffect(() => {
    const glow = glowRef.current;
    const line = progressRef.current;
    if (!glow || !line) return;
    const last = techStages.length - 1;
    const from = activeStep / last;
    const next = activeStep === last ? 0 : activeStep + 1;
    const to = next / last;
    const duration = 1800;
    const glowFrames =
      activeStep === last
        ? [
            { transform: "translateX(100%)", opacity: 1, offset: 0 },
            { transform: "translateX(100%)", opacity: 1, offset: 0.7 },
            { transform: "translateX(100%)", opacity: 0, offset: 0.85 },
            { transform: "translateX(0%)", opacity: 0, offset: 0.86 },
            { transform: "translateX(0%)", opacity: 1, offset: 1 },
          ]
        : [
            { transform: `translateX(${from * 100}%)`, opacity: 1 },
            { transform: `translateX(${to * 100}%)`, opacity: 1 },
          ];
    const lineFrames =
      activeStep === last
        ? [
            { transform: "scaleX(1)", opacity: 1, offset: 0 },
            { transform: "scaleX(1)", opacity: 1, offset: 0.7 },
            { transform: "scaleX(1)", opacity: 0, offset: 0.85 },
            { transform: "scaleX(0)", opacity: 0, offset: 0.86 },
            { transform: "scaleX(0)", opacity: 1, offset: 1 },
          ]
        : [{ transform: `scaleX(${from})` }, { transform: `scaleX(${to})` }];
    const orient = (frames) =>
      mobile
        ? frames.map((frame) => ({
            ...frame,
            transform: frame.transform
              .replaceAll("translateX", "translateY")
              .replaceAll("scaleX", "scaleY"),
          }))
        : frames;
    const glowMotion = glow.animate(orient(glowFrames), {
      duration,
      easing: "linear",
      fill: "forwards",
    });
    const lineMotion = line.animate(orient(lineFrames), {
      duration,
      easing: "linear",
      fill: "forwards",
    });
    glowMotion.onfinish = () => setActiveStep(next);
    motionsRef.current = [glowMotion, lineMotion];
    if (pausedRef.current)
      motionsRef.current.forEach((motion) => motion.pause());
    return () => {
      glowMotion.onfinish = null;
      glowMotion.cancel();
      lineMotion.cancel();
    };
  }, [activeStep, mobile]);
  let progress = (activeStep / (techStages.length - 1)) * 100;
  return (
    <section
      id={`tech`}
      className={`relative overflow-hidden px-5 md:px-[60px] py-24 md:py-40 border-t border-border`}
    >
      <div
        className={`pointer-events-none absolute inset-0 grid-lines opacity-60 [mask-image:linear-gradient(to_bottom,transparent,black_30%,black_70%,transparent)]`}
      />
      <div
        className={`relative flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-muted-foreground reveal`}
      >
        <span className={`text-primary`}>{`05`}</span>
        <span className={`h-px w-12 bg-border`} />
        {`Технология`}
      </div>
      <div
        className={`relative mt-10 grid gap-8 md:grid-cols-[2fr_1fr] md:items-end reveal`}
      >
        <h2
          className={`font-head text-[clamp(32px,5.2vw,80px)] font-extrabold leading-[1] tracking-[-0.03em]`}
        >
          {`От пикселя`}
          <br />
          <span
            className={`font-light text-muted-foreground`}
          >{`до решения`}</span>
        </h2>
        <p
          className={`max-w-sm text-muted-foreground leading-relaxed`}
        >{`Конвейер обработки работает автоматически: снимок проходит пять этапов и превращается в данные, с которыми можно работать`}</p>
      </div>
      <div className={`relative mt-20 md:mt-28 reveal`}>
        <button
          type="button"
          className="autoplay-control tech-autoplay-control"
          aria-pressed={paused}
          onClick={togglePlayback}
        >
          {paused ? "Продолжить анимацию" : "Приостановить анимацию"}
        </button>
        <div className="tech-stages">
          <div className="tech-rail">
            <div className={`h-px w-full bg-border`} />
            <div
              ref={progressRef}
              className={`absolute left-0 top-0 h-px bg-gradient-to-r from-primary via-glow to-primary tech-progress `}
              style={{
                transform: `scale${mobile ? "Y" : "X"}(${progress / 100})`,
              }}
            />
            <span
              ref={glowRef}
              className="tech-step-glow"
              style={{
                transform: `translate${mobile ? "Y" : "X"}(${progress}%)`,
              }}
            />
          </div>
          <ol className={`relative grid gap-0 md:grid-cols-5`}>
            {techStages.map((n2, r2) => {
              let i2 = r2 === activeStep;
              return (
                <li className={`relative`} key={n2.title}>
                  <button
                    onClick={() => setActiveStep(r2)}
                    aria-current={i2 ? "step" : undefined}
                    className={`group flex w-full items-center gap-5 md:flex-col md:items-start md:gap-0 border-l border-border md:border-l-0 pl-6 md:pl-0 py-4 md:py-0 text-left`}
                  >
                    <span
                      className={`relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full border tech-step-icon ${i2 ? `border-primary bg-primary text-primary-foreground shadow-[0_0_16px_hsl(var(--primary)/0.35)] scale-110` : r2 < activeStep ? `border-primary/60 bg-background text-primary` : `border-border bg-background text-muted-foreground group-hover:border-foreground/50 group-hover:text-foreground`}`}
                    >
                      <Icon name={n2.icon} size={22} />
                    </span>
                    <span className={`md:mt-8`}>
                      <span
                        className={`block font-head text-xs text-muted-foreground`}
                      >
                        {`0`}
                        {r2 + 1}
                      </span>
                      <span
                        className={`mt-1 block font-head text-lg md:text-xl font-extrabold tracking-tight transition-colors ${i2 ? `text-foreground` : `text-foreground/40 group-hover:text-foreground/70`}`}
                      >
                        {n2.title}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
        <div className="tech-detail-panels mt-14 md:mt-20 border-t border-border pt-10">
          {techStages.map((stage, index) => (
            <div
              key={stage.title}
              className="tech-detail"
              data-active={index === activeStep}
              aria-hidden={index !== activeStep}
            >
              <div className="tech-detail-number title-glow">0{index + 1}</div>
              <p className="text-lg md:text-xl leading-relaxed text-foreground/90">
                {stage.text.replace(/[.]$/, "")}
              </p>
              <div className="tech-meta">{stage.meta}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
