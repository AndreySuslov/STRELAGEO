import React from "react";
import { publications } from "../content.js";
export const Blog = () => {
  let trackRef = React.useRef(null),
    dragState = React.useRef({
      down: false,
      x: 0,
      left: 0,
      moved: false,
    });
  let scrollByCard = (t2) => {
    let n2 = trackRef.current;
    if (!n2) return;
    let r2 = n2.querySelector(`[data-card]`);
    n2.scrollBy({
      left: t2 * ((r2?.offsetWidth ?? 400) + 24),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  };
  return (
    <section
      id={`blog`}
      className={`relative py-24 md:py-40 border-t border-border`}
    >
      <div
        className={`px-5 md:px-[60px] flex flex-col gap-10 md:flex-row md:items-end md:justify-between`}
      >
        <div>
          <div
            className={`flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-muted-foreground reveal`}
          >
            <span className={`text-primary`}>{`06`}</span>
            <span className={`h-px w-12 bg-border`} />
            {`Блог`}
          </div>
          <h2
            className={`mt-10 font-head text-[clamp(32px,5.2vw,80px)] font-extrabold leading-[1] tracking-[-0.03em] reveal`}
          >
            {`Наши статьи`}
          </h2>
        </div>
        <div className={`flex gap-3 reveal`}>
          <button
            aria-label={`Назад`}
            onClick={() => scrollByCard(-1)}
            className={`flex h-14 w-14 items-center justify-center rounded-full border border-border transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground`}
          >
            <img src="/assets/blog-left.svg" alt="" width="20" height="20" />
          </button>
          <button
            aria-label={`Вперёд`}
            onClick={() => scrollByCard(1)}
            className={`flex h-14 w-14 items-center justify-center rounded-full border border-border transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground`}
          >
            <img src="/assets/blog-right.svg" alt="" width="20" height="20" />
          </button>
        </div>
      </div>
      <div
        ref={trackRef}
        className={`no-scrollbar mt-14 md:mt-20 flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-px-5 md:scroll-px-[60px] px-5 md:px-[60px] cursor-grab active:cursor-grabbing select-none`}
        onMouseDown={(t2) => {
          let n2 = trackRef.current;
          n2 &&
            ((dragState.current = {
              down: true,
              x: t2.pageX,
              left: n2.scrollLeft,
              moved: false,
            }),
            (n2.style.scrollSnapType = `none`));
        }}
        onMouseMove={(t2) => {
          let n2 = trackRef.current;
          if (!n2 || !dragState.current.down) return;
          let i2 = t2.pageX - dragState.current.x;
          (Math.abs(i2) > 5 && (dragState.current.moved = true),
            (n2.scrollLeft = dragState.current.left - i2));
        }}
        onMouseUp={() => {
          ((dragState.current.down = false),
            trackRef.current && (trackRef.current.style.scrollSnapType = ``));
        }}
        onMouseLeave={() => {
          ((dragState.current.down = false),
            trackRef.current && (trackRef.current.style.scrollSnapType = ``));
        }}
      >
        {publications.map((article) => (
          <a
            data-card
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            draggable={false}
            onClick={(event) => {
              if (dragState.current.moved) event.preventDefault();
            }}
            className="publication-card"
            key={article.url}
          >
            <img
              className="publication-image"
              src={article.img}
              alt=""
              draggable={false}
            />
            <span className="publication-source">
              <span>{article.tag}</span>
              <img
                src="/assets/blog-external.svg"
                alt=""
                width="16"
                height="16"
              />
            </span>
            <h3>{article.title}</h3>
          </a>
        ))}
        <div className={`w-px shrink-0`} />
      </div>
    </section>
  );
};
