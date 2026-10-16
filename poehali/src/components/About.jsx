import React from "react";
import { MapOverlay } from "./MapOverlay.jsx";
import { LAYERS } from "./map-layers.js";
const topics = [
  "Леса",
  "Водные объекты",
  "Инфраструктура",
  "Изменения объектов",
];
export const About = () => {
  const [active, setActive] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  React.useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(
      () => setActive((value) => (value + 1) % LAYERS.length),
      1000,
    );
    return () => window.clearInterval(timer);
  }, [paused]);
  return (
    <section id="about" className="figma-about">
      <div className="figma-about-copy">
        <div className="section-label">
          <span>02</span>
          <i />О нас
        </div>
        <h2 className="title-glow">
          Превращаем
          <br />
          спутниковые данные
          <br />в решения
        </h2>
        <p>
          <strong>«СТРЕЛА»</strong> — молодой проект в области спутниковой
          аналитики и искусственного интеллекта
          <br />
          Мы <strong>разрабатываем решения</strong>, которые помогают
          государственным и коммерческим организациям{" "}
          <strong>
            получать актуальную, точную и понятную информацию о территориях
          </strong>
        </p>
      </div>
      <div className="figma-about-visual" data-layer={active}>
        <div className="about-map-window">
          <img
            className="figma-about-image"
            src="/assets/about-map.jpg"
            alt="Спутниковый снимок территории"
          />
        </div>
        <MapOverlay activeKey={LAYERS[active].key} />
        <ul
          className="figma-topics"
          aria-label="Слои спутникового снимка"
          onMouseLeave={() => setPaused(false)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget))
              setPaused(false);
          }}
        >
          {topics.map((topic, i) => (
            <li key={topic}>
              <button
                type="button"
                aria-pressed={active === i}
                onFocus={() => {
                  setPaused(true);
                  setActive(i);
                }}
                onClick={() => {
                  setPaused(true);
                  setActive(i);
                }}
                onMouseEnter={() => {
                  if (
                    window.matchMedia("(hover: hover) and (pointer: fine)")
                      .matches
                  ) {
                    setPaused(true);
                    setActive(i);
                  }
                }}
              >
                <span
                  className={active === i ? "is-active" : ""}
                  style={
                    active === i
                      ? {
                          borderColor: `hsl(${LAYERS[i].color})`,
                          background: `hsl(${LAYERS[i].color} / .15)`,
                        }
                      : undefined
                  }
                >
                  <img src={`/assets/figma-topic-${i}.svg`} alt="" />
                </span>
                {topic}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
