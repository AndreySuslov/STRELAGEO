import React from "react";
import { Header } from "./components/Header.jsx";
import { SideNavigation } from "./components/SideNavigation.jsx";
import { Hero } from "./components/Hero.jsx";
import { About } from "./components/About.jsx";
import { Services } from "./components/Services.jsx";
import Directions from "./components/Directions.jsx";
import { Technology } from "./components/Technology.jsx";
import { Blog } from "./components/Blog.jsx";
import { Contacts } from "./components/Contacts.jsx";
import { Footer } from "./components/Footer.jsx";
function useReveal() {
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    document
      .querySelectorAll(".reveal")
      .forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}
export const App = () => {
  useReveal();
  return (
    <div
      className={`relative min-h-screen overflow-x-hidden bg-background text-foreground grain`}
    >
      <a className="skip-link" href="#main-content">
        Перейти к содержимому
      </a>
      <Header />
      <SideNavigation />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <div className={`lg:pl-16`}>
          <About />
          <Services />
          <Directions />
          <Technology />
          <Blog />
          <Contacts />
        </div>
      </main>
      <div className={`lg:pl-16`}>
        <Footer />
      </div>
    </div>
  );
};
