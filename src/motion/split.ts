/**
 * SplitText por `import()`.
 *
 * O plugin pesa ~5 KB gzip e só serve a dois headlines (o do hero e o do
 * dossiê), sempre depois de `document.fonts.ready` — que já é uma espera.
 * Carregar junto com ela tira o plugin do bundle de rota sem atrasar nada
 * que a pessoa veja.
 */
import gsap from 'gsap';

export type SplitTextClass = typeof import('gsap/SplitText').SplitText;

let loading: Promise<SplitTextClass | null> | null = null;

export function loadSplitText(): Promise<SplitTextClass | null> {
  if (!loading) {
    loading = import('gsap/SplitText')
      .then((module) => {
        gsap.registerPlugin(module.SplitText);
        return module.SplitText;
      })
      .catch((error) => {
        // Sem o plugin o headline entra inteiro — é o mesmo caminho de erro
        // que a divisão falhando no meio.
        console.warn('[motion] SplitText indisponível; o headline entra inteiro.', error);
        return null;
      });
  }
  return loading;
}
