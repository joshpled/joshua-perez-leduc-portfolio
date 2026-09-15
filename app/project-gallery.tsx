"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { Children, useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";

const subscribe = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

export default function ProjectGallery({ names, children }: { names: string[]; children: ReactNode }) {
  const slides = Children.toArray(children);
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  // Keep all content accessible before the navigation controls are hydrated.
  const enhanced = useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot);

  function navigate(index: number) {
    const track = trackRef.current;
    if (!track || index < 0 || index >= slides.length) return;
    const slide = track.children[index] as HTMLElement;
    track.scrollTo({
      left: slide.offsetLeft,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  }

  function updateSelection() {
    const track = trackRef.current;
    if (!track) return;
    const distances = Array.from(track.children, (slide) => Math.abs((slide as HTMLElement).offsetLeft - track.scrollLeft));
    setActive(distances.indexOf(Math.min(...distances)));
  }

  useEffect(() => {
    const track = trackRef.current;
    const slide = track?.children[active] as HTMLElement | undefined;
    if (!track || !slide || !enhanced) return;
    // Images, fonts, and viewport changes can all change a project's natural height.
    const fitHeight = () => { track.style.height = `${slide.offsetHeight}px`; };
    fitHeight();
    const observer = new ResizeObserver(fitHeight);
    observer.observe(slide);
    return () => observer.disconnect();
  }, [active, enhanced]);

  return (
    <div className="project-gallery" role="region" aria-roledescription="carousel" aria-label="Selected projects">
      <div className="gallery-toolbar" hidden={!enhanced}>
        <p className="gallery-hint">Swipe or choose a project</p>
        <div className="gallery-controls">
          <button type="button" aria-label="Previous project" aria-controls="project-slides" aria-disabled={active === 0} onClick={() => navigate(active - 1)}>
            <ArrowLeft aria-hidden="true" />
          </button>
          <p className="gallery-counter" role="status" aria-atomic="true">
            <span aria-hidden="true">{String(active + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</span>
            <span className="sr-only">{names[active]}, {active + 1} of {slides.length}</span>
          </p>
          <button type="button" aria-label="Next project" aria-controls="project-slides" aria-disabled={active === slides.length - 1} onClick={() => navigate(active + 1)}>
            <ArrowRight aria-hidden="true" />
          </button>
        </div>
      </div>
      <div className="gallery-picker" role="group" aria-label="Choose a project" hidden={!enhanced}>
        {names.map((name, index) => (
          <button key={name} type="button" aria-controls="project-slides" aria-disabled={index === active} aria-current={index === active ? "true" : undefined} onClick={() => navigate(index)}>
            <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span> {name}
          </button>
        ))}
      </div>
      <div
        ref={trackRef}
        id="project-slides"
        className="gallery-track"
        tabIndex={0}
        role="group"
        aria-label="Project panels. Use Left and Right arrow keys to browse."
        onScroll={updateSelection}
        onKeyDown={(event) => {
          if (event.target !== event.currentTarget) return;
          const index = { ArrowLeft: active - 1, ArrowRight: active + 1, Home: 0, End: slides.length - 1 }[event.key];
          if (index !== undefined) { event.preventDefault(); navigate(index); }
        }}
      >
        {slides.map((slide, index) => (
          <div className="gallery-slide" key={names[index]} role="group" aria-roledescription="slide" aria-label={`${names[index]}, ${index + 1} of ${slides.length}`} aria-hidden={enhanced && index !== active ? true : undefined} inert={enhanced && index !== active ? true : undefined}>
            {slide}
          </div>
        ))}
      </div>
    </div>
  );
}
