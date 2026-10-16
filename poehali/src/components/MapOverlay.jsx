import { LAYERS, FRAMES, DOTS } from "./map-layers.js";
// Geometry, colours and timings preserved from the captured Poehali About.tsx.
export function MapOverlay({ activeKey }) {
  const layer = LAYERS.find((item) => item.key === activeKey) || LAYERS[0];
  return (
    <div className="map-overlay" aria-hidden="true">
      <div className="map-grid" />
      {DOTS.map((dot, i) => (
        <div
          key={i}
          className="map-dots"
          style={{
            left: dot.l,
            top: dot.t,
            gridTemplateColumns: `repeat(${dot.c},3px)`,
            animationDelay: `${i * 0.7}s`,
          }}
        >
          {Array.from({ length: dot.c * dot.r }, (_, j) => (
            <span
              key={j}
              style={{ opacity: (((j * 37) % 10) / 10) * 0.7 + 0.1 }}
            />
          ))}
        </div>
      ))}
      {FRAMES.map((frame, i) => {
        const on = frame.layer === activeKey;
        return (
          <div
            key={i}
            className="map-frame"
            data-active={on}
            style={{
              left: frame.l,
              top: frame.t,
              width: frame.w,
              height: frame.h,
              color: on ? `hsl(${layer.color})` : "#c6d3e0",
              opacity: on ? 1 : 0.35,
              transform: on ? "scale(1)" : "scale(.94)",
            }}
          >
            <div
              className="map-frame-box"
              style={{
                background: on ? `hsl(${layer.color} / .12)` : "transparent",
              }}
            />
            <span className="map-cross" />
            <i className="map-tick left" />
            <i className="map-tick right" />
            <i className="map-tick top" />
            <i className="map-tick bottom" />
            {on && (
              <span
                className="map-caption"
                style={{ background: `hsl(${layer.color})` }}
              >
                {layer.label}
              </span>
            )}
          </div>
        );
      })}
      <div className="map-scan-line" />
    </div>
  );
}
