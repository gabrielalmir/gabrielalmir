document.querySelectorAll<HTMLElement>('[data-architecture]').forEach((explorer) => {
  const buttons = Array.from(explorer.querySelectorAll<HTMLButtonElement>('[data-stage]'));
  const panels = Array.from(explorer.querySelectorAll<HTMLElement>('[data-panel]'));
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  function select(stage: string, announce = true) {
    buttons.forEach((button) =>
      button.setAttribute('aria-pressed', String(button.dataset.stage === stage)),
    );
    panels.forEach((panel) => {
      panel.getAnimations().forEach((animation) => animation.cancel());
      panel.hidden = panel.dataset.panel !== stage;
      if (!panel.hidden && announce && !reducedMotion.matches) {
        panel.animate(
          [
            { opacity: 0, transform: 'translateY(4px)' },
            { opacity: 1, transform: 'translateY(0)' },
          ],
          { duration: 180 },
        );
      }
    });
    explorer.querySelectorAll<SVGGElement>('[data-node]').forEach((node) => {
      node.classList.toggle('is-selected', node.dataset.node === stage);
      node.querySelectorAll<SVGPathElement>('path').forEach((path) => {
        path.getAnimations().forEach((animation) => animation.cancel());
        const related = node.dataset.node === stage || path.dataset.connectionTo === stage;
        path.classList.toggle('is-related', related);
        if (announce && !reducedMotion.matches && related) {
          path.animate(
            [
              { strokeDasharray: '6 4', strokeDashoffset: 24 },
              { strokeDasharray: '6 4', strokeDashoffset: 0 },
            ],
            { duration: 360 },
          );
        }
      });
    });
    if (announce)
      explorer.querySelector<HTMLElement>('[data-stage-status]')!.textContent =
        `Etapa selecionada: ${buttons.find((button) => button.dataset.stage === stage)!.textContent!.trim()}`;
  }
  explorer.dataset.enhanced = '';
  select('agent', false);
  explorer.querySelector<HTMLElement>('.architecture-controls')!.hidden = false;
  buttons.forEach((button) =>
    button.addEventListener('click', () => select(button.dataset.stage!)),
  );
});
