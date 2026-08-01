import { useCallback, useEffect } from 'react';
import { MotionConfig, useMotionValueEvent, useReducedMotion, useScroll } from 'framer-motion';

const clamp = (value: number) => Math.min(1, Math.max(0, value));

function StorytellingEffects() {
  const { scrollYProgress } = useScroll();
  const shouldReduceMotion = useReducedMotion();

  const updateStory = useCallback(() => {
    if (shouldReduceMotion || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const home = document.querySelector<HTMLElement>('.home-story');
    if (!home) return;

    const viewportHeight = window.innerHeight;
    const reachedPageEnd = scrollYProgress.get() >= 0.99;
    const hero = home.querySelector<HTMLElement>('[data-parallax-hero]');
    if (hero) {
      const rect = hero.getBoundingClientRect();
      const travel = Math.min(Math.max(-rect.top, 0), rect.height);
      hero.querySelectorAll<HTMLElement>('[data-parallax-layer]').forEach((layer) => {
        const speed = Number(layer.dataset.speed) || 0;
        layer.style.setProperty('--layer-y', `${(travel * speed).toFixed(2)}px`);
      });
    }

    home.querySelectorAll<HTMLElement>('[data-build-section]').forEach((section) => {
      const rect = section.getBoundingClientRect();
      const sectionTravel = Math.min(rect.height, viewportHeight * 0.72);
      const contactProgress = clamp(
        (viewportHeight - rect.top) / Math.min(rect.height * 0.8, viewportHeight * 0.58),
      );
      const progress =
        reachedPageEnd || (section.classList.contains('contact') && contactProgress >= 1)
          ? 1
          : section.classList.contains('contact')
            ? contactProgress
            : clamp((viewportHeight * 0.88 - rect.top) / sectionTravel);
      section.style.setProperty('--build-progress', progress.toFixed(4));
      section.dataset.buildProgress = progress.toFixed(2);

      const items = section.querySelectorAll<HTMLElement>(':scope [data-build-item]');
      items.forEach((item, index) => {
        const start = (index / Math.max(6, items.length + 2)) * 0.48;
        const itemProgress = clamp((progress - start) / 0.34);
        const itemRect = item.getBoundingClientRect();
        const parallax =
          (clamp((viewportHeight - itemRect.top) / (viewportHeight + itemRect.height)) - 0.5) * 42;
        item.style.setProperty('--item-progress', itemProgress.toFixed(4));
        item.style.setProperty('--parallax', parallax.toFixed(2));
      });
    });
  }, [shouldReduceMotion]);

  useMotionValueEvent(scrollYProgress, 'change', updateStory);

  useEffect(() => {
    const root = document.documentElement;
    const home = document.querySelector<HTMLElement>('.home-story');
    const reduceMotion =
      shouldReduceMotion || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      root.classList.remove('build-motion');
      root.dataset.storytellingHydrated = 'reduced';
      home?.querySelectorAll<HTMLElement>('[data-parallax-layer]').forEach((layer) => {
        layer.style.removeProperty('--layer-y');
      });
      home?.querySelectorAll<HTMLElement>('[data-build-section]').forEach((section) => {
        section.style.removeProperty('--build-progress');
        delete section.dataset.buildProgress;
        section.querySelectorAll<HTMLElement>(':scope [data-build-item]').forEach((item) => {
          item.style.removeProperty('--item-progress');
          item.style.removeProperty('--parallax');
        });
      });
      return;
    }

    root.classList.add('build-motion');
    root.dataset.storytellingHydrated = 'true';
    updateStory();
    window.addEventListener('resize', updateStory, { passive: true });

    return () => {
      root.classList.remove('build-motion');
      delete root.dataset.storytellingHydrated;
      window.removeEventListener('resize', updateStory);
    };
  }, [shouldReduceMotion, updateStory]);

  return <span data-storytelling-controller aria-hidden="true" hidden />;
}

export default function StorytellingController() {
  return (
    <MotionConfig reducedMotion="user">
      <StorytellingEffects />
    </MotionConfig>
  );
}
