import { generationExample } from '../lib/mcp';

const form = document.querySelector<HTMLFormElement>('[data-argument-builder]');
if (form) {
  const fields = ['prompt', 'width', 'height', 'steps', 'guidance_scale', 'seed'] as const;
  type Field = (typeof fields)[number];
  const inputs = Object.fromEntries(
    fields.map((name) => [name, form.elements.namedItem(name)]),
  ) as Record<Field, HTMLInputElement | HTMLTextAreaElement>;
  const json = form.querySelector<HTMLElement>('[data-arguments-json]')!;
  const status = form.querySelector<HTMLElement>('[data-builder-status]')!;
  const feedback = form.querySelector<HTMLElement>('[data-export-status]')!;
  const checklist = form.querySelector<HTMLUListElement>('[data-checklist]')!;
  const copy = form.querySelector<HTMLButtonElement>('[data-copy-arguments]')!;
  const download = form.querySelector<HTMLButtonElement>('[data-download-arguments]')!;
  let payload: string | null = null;
  let revision = 0;

  function update() {
    revision++;
    feedback.textContent = '';
    const errors: Partial<Record<Field, string>> = {};
    const values: Record<string, string | number> = { prompt: inputs.prompt.value.trim() };
    if (!values.prompt) errors.prompt = 'Erro: informe um prompt com texto ou tags.';
    for (const name of fields.filter((name) => name !== 'prompt')) {
      const input = inputs[name];
      const raw = input.value.trim();
      if (name === 'seed' && !raw && !input.validity.badInput) continue;
      const number = Number(raw);
      if (!raw || !Number.isFinite(number) || input.validity.badInput) {
        errors[name] = 'Erro: informe um número finito.';
      } else if (
        name === 'guidance_scale'
          ? number < 0
          : !Number.isSafeInteger(number) || (name !== 'seed' && number <= 0)
      ) {
        errors[name] =
          name === 'guidance_scale'
            ? 'Erro: guidance deve ser zero ou maior.'
            : name === 'seed'
              ? 'Erro: use um inteiro seguro entre −9007199254740991 e 9007199254740991.'
              : 'Erro: use um inteiro positivo representável com segurança.';
      } else {
        values[name] = number;
      }
    }
    for (const name of fields) {
      const message = form!.querySelector<HTMLElement>(`#${name}-error`)!;
      message.textContent = errors[name] || '';
      message.hidden = !errors[name];
      inputs[name].setAttribute('aria-invalid', String(Boolean(errors[name])));
    }
    const count = Object.keys(errors).length;
    payload = count ? null : JSON.stringify(values, null, 2);
    json.textContent = payload || 'Corrija os erros nos campos para montar os argumentos JSON.';
    copy.disabled = download.disabled = count > 0;
    status.toggleAttribute('data-invalid', count > 0);
    const summary = count
      ? `${count} ${count === 1 ? 'erro estrutural. Corrija o campo indicado' : 'erros estruturais. Corrija os campos indicados'} para exportar.`
      : 'Estrutura válida no navegador. Revise o checklist antes de executar no servidor.';
    if (status.textContent !== summary) status.textContent = summary;

    const tags = inputs.prompt.value
      .toLowerCase()
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean);
    const quality = ['masterpiece', 'best quality', 'very aesthetic', 'absurdres'];
    const ending = tags.slice(-4).join(',') === quality.join(',');
    const recommendedSizes = [
      [832, 1216],
      [1216, 832],
      [1024, 1024],
      [896, 1152],
      [1152, 896],
    ];
    const resolution =
      !errors.width &&
      !errors.height &&
      recommendedSizes.some(
        ([width, height]) => width === values.width && height === values.height,
      );
    const large = Number(values.width) * Number(values.height) > 1024 * 1024 * 1.5;
    const checks = [
      {
        ok: /^\d+(girl|boy|girls|boys|other|others)$/.test(tags[0] || ''),
        text: 'Começar pela contagem de sujeitos, como 1girl ou 1boy.',
      },
      { ok: tags.length >= 8, text: `Usar pelo menos oito tags. Contagem local: ${tags.length}.` },
      {
        ok: ending,
        text: 'Terminar com as tags do exemplo: masterpiece, best quality, very aesthetic, absurdres.',
      },
      {
        ok: resolution,
        text:
          errors.width || errors.height
            ? 'Corrigir as dimensões antes de revisar a resolução.'
            : large
              ? 'Resolução elevada: pode exceder a memória disponível. Considere 832 × 1216, 1216 × 832 ou 1024 × 1024.'
              : 'Usar uma resolução recomendada: 832 × 1216, 1216 × 832, 1024 × 1024, 896 × 1152 ou 1152 × 896.',
      },
    ];
    checklist.replaceChildren(
      ...checks.map((check) => {
        const li = document.createElement('li');
        li.toggleAttribute('data-recommendation', !check.ok);
        const label = document.createElement('strong');
        label.textContent = check.ok ? 'Conferido localmente' : 'Recomendação';
        li.append(label, document.createTextNode(check.text));
        return li;
      }),
    );
  }

  form.addEventListener('submit', (event) => event.preventDefault());
  form.addEventListener('input', update);
  form.querySelector<HTMLButtonElement>('[data-load-example]')!.addEventListener('click', () => {
    for (const name of fields) inputs[name].value = String(generationExample[name]);
    update();
    feedback.textContent = 'Exemplo documentado carregado.';
  });
  copy.addEventListener('click', async () => {
    if (!payload) return;
    const currentRevision = revision;
    try {
      await navigator.clipboard.writeText(payload);
      if (revision === currentRevision) feedback.textContent = 'JSON copiado.';
    } catch {
      if (revision === currentRevision)
        feedback.textContent =
          'Não foi possível copiar. Selecione o JSON acima ou baixe o arquivo e tente novamente.';
    }
  });
  download.addEventListener('click', () => {
    if (!payload) return;
    let url: string | undefined;
    try {
      url = URL.createObjectURL(new Blob([payload + '\n'], { type: 'application/json' }));
      const link = document.createElement('a');
      link.href = url;
      link.download = 'generate-image-arguments.json';
      document.body.append(link);
      link.click();
      link.remove();
      feedback.textContent = 'Download dos argumentos iniciado.';
    } catch {
      feedback.textContent = 'Não foi possível baixar. Copie o JSON ou tente novamente.';
    } finally {
      if (url) setTimeout(() => URL.revokeObjectURL(url!), 1000);
    }
  });
  document.querySelector<HTMLElement>('[data-builder-fallback]')!.hidden = true;
  form.querySelector<HTMLFieldSetElement>('[data-builder-fields]')!.disabled = false;
  update();
}
