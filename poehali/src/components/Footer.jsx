import { navLinks } from "../content.js";
export const Footer = () => (
  <footer
    id={`footer`}
    className={`relative overflow-hidden border-t border-border px-5 md:px-[60px] pt-16 md:pt-24`}
  >
    <div className={`grid gap-12 md:grid-cols-4 text-sm`}>
      <div className={`md:col-span-2 max-w-sm`}>
        <p
          className={`font-head text-lg font-light leading-snug`}
        >{`Спутниковая аналитика и ИИ для тех, кому важно видеть больше`}</p>
      </div>
      <ul className={`space-y-3`}>
        {navLinks.map((e) => (
          <li key={e.id}>
            <a
              href={`#${e.id}`}
              className={`story-link text-muted-foreground hover:text-foreground transition-colors`}
            >
              {e.label}
            </a>
          </li>
        ))}
      </ul>
      <div className="footer-contact-links">
        <a
          href={`mailto:strela.team@yandex.com`}
          className={`story-link block w-fit`}
        >{`strela.team@yandex.com`}</a>
        <a
          href={`#top`}
          className={`story-link block w-fit text-muted-foreground hover:text-foreground`}
        >{`Наверх ↑`}</a>
      </div>
    </div>
    <div className="footer-wordmark-stage">
      <div aria-hidden={true} className="footer-wordmark">
        СТРЕЛА
      </div>
    </div>
    <div
      className={`flex flex-col gap-2 border-t border-border py-6 text-xs text-muted-foreground md:flex-row md:justify-between`}
    >
      <span>{`© 2026 СТРЕЛА`}</span>
      <a className="story-link" href="/privacy/">
        Информация о сайте и конфиденциальности
      </a>
      <span>Разработка Suslov</span>
    </div>
  </footer>
);
