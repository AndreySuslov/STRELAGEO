export const Hero = () => {
  return (
    <section id="top" className="figma-hero">
      <img
        className="figma-hero-image"
        src="/assets/hero.webp"
        alt=""
        width="4096"
        height="2305"
        fetchPriority="high"
      />
      <div className="figma-hero-copy">
        <p className="figma-hero-eyebrow">Геопространственная аналитика</p>
        <h1 className="title-glow">СТРЕЛА</h1>
        <p className="figma-hero-description">
          Анализ спутниковых снимков и мониторинг территорий
        </p>
      </div>
    </section>
  );
};
