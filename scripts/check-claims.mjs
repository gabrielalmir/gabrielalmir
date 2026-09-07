#!/usr/bin/env node
/**
 * Gate de claims — forma executável de backup/design/controlled-flow/claim-register.md.
 *
 * Roda sobre o `dist/` já construído e sai com 1 no primeiro achado. É um
 * bloqueador de release, não um aviso: o que ele protege é confidencialidade e
 * atribuição, não estilo.
 *
 * Duas lições que estão codificadas aqui e não devem ser perdidas:
 *
 * 1. Um gate cujas regras não falam a língua da copy passa verde protegendo
 *    nada. As regras existem em PT **e** EN de propósito, mesmo com o site
 *    inteiramente em PT-BR: o dia em que uma frase em inglês entrar (um título,
 *    um alt, um slug), a regra precisa já estar lá.
 * 2. As regras de número são ancoradas em substantivos de volume. Sem essa
 *    âncora, "PHP 7.4", "3 provas" e "7 sistemas" disparariam e alguém
 *    desligaria o gate inteiro — que é o pior desfecho possível.
 *
 * Uso:  node scripts/check-claims.mjs [dir=dist]
 *       node scripts/check-claims.mjs --self-test
 */

import { readdir, readFile } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';
import { argv, exit } from 'node:process';

/** @typedef {{ id: string, why: string, pattern: RegExp }} Rule */

/** @type {Rule[]} */
const RULES = [
  // ---- Atribuição do PhotoGIMP -------------------------------------------
  // O site pode dizer que Gabriel contribuiu e hoje organiza e revisa. Nunca
  // que criou, é dono, ou é o mantenedor. O LinkedIn diz "principal
  // mantenedor"; subir para isso é uma decisão do Gabriel, não do build.
  {
    id: 'photogimp-authorship-pt',
    why: 'PhotoGIMP é um projeto comunitário da Diolinux; a formulação publicável é "contribuí na evolução e hoje participo da organização e revisão".',
    pattern:
      /\b(criador|criou|autor|dono|propriet[áa]rio)\b[^.<>]{0,60}\bphotogimp\b|\bphotogimp\b[^.<>]{0,60}\b(criado|desenvolvido|mantido)\s+por\s+gabriel\b/i,
  },
  {
    id: 'photogimp-maintainer-pt',
    why: 'A copy aprovada nunca usa "mantenedor": diz "contribuí na evolução e hoje participo da organização e revisão". "O mantenedor do PhotoGIMP" implica responsabilidade única, que o claim-register proíbe.',
    // Duas âncoras. A primeira pega o qualificador solto ("principal
    // mantenedor"), a segunda pega o substantivo perto de PhotoGIMP em
    // qualquer ordem — porque bastava apagar uma palavra da frase do LinkedIn
    // para a regra antiga passar verde.
    pattern:
      /\b(?:principal\s+mantenedor|mantenedor\s+principal|[úu]nico\s+mantenedor)\b|\bmantenedor(?:a|es)?\b[^.<>]{0,40}\bphotogimp\b|\bphotogimp\b[^.<>]{0,40}\bmantenedor(?:a|es)?\b|\bmantenho\s+(?:o\s+)?photogimp\b|\bphotogimp\b[^.<>]{0,30}\b[ée]\s+mantido\s+por\s+mim\b/i,
  },
  {
    id: 'photogimp-authorship-en',
    why: 'Mesma regra em inglês — o gate não pode ficar cego se uma frase em EN entrar.',
    // Inclui a possessiva ("PhotoGIMP's creator") e o par substantivo+projeto
    // em qualquer ordem, pelo mesmo motivo da regra PT.
    pattern:
      /\b(creator|owner|founder|maintainer)\s+of\s+photogimp\b|\bphotogimp['’]s\s+(creator|owner|founder|maintainer)\b|\bphotogimp\b[^.<>]{0,60}\b(created|founded)\s+by\s+gabriel\b|\b(sole|lead|main|primary)\s+maintainer\b|\bmaintainer\b[^.<>]{0,40}\bphotogimp\b|\bphotogimp\b[^.<>]{0,40}\bmaintainer\b|\bgabriel\s+maintains\s+photogimp\b/i,
  },

  // ---- Números absolutos --------------------------------------------------
  // O único número público sobre trabalho profissional é o −90%. Volume,
  // throughput, contagem de registros, tempo de execução, disponibilidade e
  // headcount ficam de fora, em qualquer língua.
  {
    id: 'absolute-volume',
    why: 'Volume absoluto de eventos/registros/requisições/usuários não é publicável.',
    // `(?:\s+de)?` é o ponto todo: em português a forma natural é "12 milhões
    // DE registros", e sem a preposição a regra só pegava o anglicismo
    // "12 milhões registros", que ninguém escreve. `milh[ãa]o` idem.
    pattern:
      /\b\d[\d.,]*\s*(?:mil|milh[õoã]es?|milh[ãa]o|bilh[õoã]es?|bilh[ãa]o|[kmb]\+?)?\s*(?:\+\s*)?(?:de\s+)?(?:eventos?|registros?|requisi[çc][õo]es?|transa[çc][õo]es?|documentos?|usu[áa]rios?|clientes?|pedidos?|mensagens?|linhas de c[óo]digo|events?|records?|requests?|transactions?|rows?|users?|customers?|orders?|messages?)\b/i,
  },
  {
    id: 'absolute-throughput',
    why: 'Vazão absoluta (por segundo/minuto/hora/dia/mês) não é publicável.',
    pattern:
      /\b\d[\d.,]*\s*(?:mil|milh[õoã]es?|milh[ãa]o|[kmb])?\s*(?:de\s+)?(?:eventos?|registros?|requisi[çc][õo]es?|transa[çc][õo]es?|mensagens?|events?|records?|requests?|transactions?|messages?|rps|qps|tps|req)\s*(?:\/|\s+por\s+|\s+per\s+)\s*(?:s|seg|segundo|min|minuto|h|hora|dia|m[êe]s|second|minute|hour|day|month)\b/i,
  },
  {
    id: 'absolute-availability',
    why: 'Disponibilidade/SLA em número não foi aprovada para divulgação.',
    pattern:
      /\b(?:99[.,]\d+|9[5-9])\s*%\s*(?:de\s+)?(?:disponibilidade|uptime|sla|availability)\b|\b(?:disponibilidade|uptime|sla|availability)\s*(?:de\s+|of\s+)?\d[\d.,]*\s*%/i,
  },
  {
    id: 'absolute-latency',
    why: 'Tempo de execução absoluto do trabalho profissional é justamente o que o relato anonimizado não expõe — só a redução percentual é pública.',
    // O par "de X para Y" era a única forma coberta. "levava 40 segundos" e
    // "caiu para menos de 1 s" dizem a mesma coisa e passavam.
    pattern:
      /\b(?:de|from)\s+\d[\d.,]*\s*(?:ms|s|segundos?|seconds?|minutos?|minutes?)\s+(?:para|to)\s+\d[\d.,]*\s*(?:ms|s|segundos?|seconds?|minutos?|minutes?)\b|\b(?:levava|levou|leva|demorava|demorou|durava|durou|caiu\s+para|passou\s+a\s+levar|took|takes|dropped\s+to)\s+(?:menos\s+de\s+|cerca\s+de\s+|about\s+|under\s+)?\d[\d.,]*\s*(?:ms|s\b|segundos?|seconds?|minutos?|minutes?|horas?|hours?)/i,
  },
  {
    id: 'absolute-headcount',
    why: 'Tamanho de time/área não é publicável.',
    pattern:
      /\b(?:equipes?|times?|squads?|teams?)\s+de\s+\d+\s*(?:pessoas?|desenvolvedores?|engenheiros?)?\b|\b\d+\s*(?:pessoas?|desenvolvedores?|engenheiros?|analistas?|estagi[áa]rios?|developers?|engineers?)\s+(?:na|no|sob|under|reporting|mentorados?|mentored|onboard)\b|\b(?:mentorei|mentorou|onboardei|treinei|liderei)\s+(?:cerca\s+de\s+|mais\s+de\s+)?\d+\s*(?:pessoas?|desenvolvedores?|engenheiros?|analistas?|developers?|engineers?)\b/i,
  },

  // ---- Confidencialidade do relato de performance -------------------------
  // O relato do −90% é anonimizado. O domínio do sistema, o setor e o nome do
  // processo interno ficam fora — mesmo que o empregador possa ser nomeado na
  // trajetória, que foi decisão explícita do Gabriel.
  {
    id: 'confidential-domain-pt',
    why: 'O domínio do sistema otimizado (bula, medicamento, SAC) não faz parte do que foi aprovado.',
    pattern: /\b(?:bulas?\s+m[ée]dicas?|bula|medicamentos?|farmac[êe]utic[ao]s?|SAC)\b/i,
  },
  {
    id: 'confidential-domain-en',
    why: 'Mesma regra em inglês.',
    pattern: /\b(?:package\s+inserts?|medications?|pharmaceutical|drug\s+leaflets?)\b/i,
  },
];

const TEXT_EXT = /\.(html|xml|txt|json|js|css|svg)$/i;

/**
 * O que fica de fora, e por quê.
 *
 * Antes o `_astro/` inteiro era pulado — e é lá que moram o CSS construído e
 * qualquer string que acabe num bundle. Pular o maior diretório da saída
 * deixava o gate cego por conveniência.
 *
 * O que continua fora é só o JS de biblioteca minificado: `deltaY:0,event:e`
 * do Lenis casa com a regra de volume ("0, event"), e um gate que grita sobre
 * o interior do GSAP é um gate que alguém desliga na segunda-feira. A copy
 * deste site é renderizada no servidor: ela está no HTML, não no bundle. Se um
 * dia passar a haver texto em JS de aplicação, esta é a linha a rever.
 */
function skip(relPath) {
  return /(^|[\\/])_astro[\\/].*\.js$/i.test(relPath);
}

/**
 * O texto que uma pessoa lê, mais o que ela ouve.
 *
 * Duas correções sobre a versão ingênua:
 *
 *  1. Os atributos são extraídos com um replace GLOBAL sobre a string inteira,
 *     antes de apagar as tags. A versão por-tag só capturava o primeiro
 *     atributo de cada elemento: uma <img> com `alt` e `title` perdia o `alt`,
 *     e alt é copy publicada.
 *  2. O JSON-LD sobrevive. Apagar todo <script> apagava junto o bloco
 *     `application/ld+json`, que é texto que o Google lê e exibe — o único
 *     lugar do site onde um cargo aparece fora do corpo da página.
 */
function visibleText(html) {
  const ldjson = [...html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)]
    .map((match) => match[1])
    .join(' ');

  // Os atributos são COLHIDOS para fora antes de as tags caírem. Substituí-los
  // no lugar não adianta: o valor continuaria entre `<` e `>`, e o próximo
  // replace apagaria a tag inteira junto com ele.
  const attrs = [...html.matchAll(/\b(?:alt|title|aria-label|content)="([^"]*)"/gi)]
    .map((match) => match[1])
    .join(' ');

  return `${ldjson} ${attrs} ${html}`
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, d) => String.fromCharCode(Number(d)))
    .replace(/\s+/g, ' ');
}

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      yield* walk(join(dir, entry.name));
    } else if (TEXT_EXT.test(entry.name)) {
      yield join(dir, entry.name);
    }
  }
}

/** Um slug vira URL, então o caminho do arquivo também é copy publicada. */
function pathAsText(rel) {
  return rel.split(sep).join(' ').replace(/[-_/.]/g, ' ');
}

async function check(root) {
  const findings = [];
  let files = 0;

  for await (const file of walk(root)) {
    const rel = relative(root, file);
    if (skip(rel)) continue;
    files += 1;
    const raw = await readFile(file, 'utf8');
    const haystacks = [
      ['texto', /\.html$/i.test(file) ? visibleText(raw) : raw],
      ['caminho', pathAsText(rel)],
    ];

    for (const rule of RULES) {
      for (const [where, hay] of haystacks) {
        const hit = rule.pattern.exec(hay);
        if (hit) {
          findings.push({ rule, file: rel, where, excerpt: excerptAround(hay, hit) });
          break;
        }
      }
    }
  }

  return { files, findings };
}

function excerptAround(hay, match) {
  const start = Math.max(0, match.index - 60);
  const end = Math.min(hay.length, match.index + match[0].length + 60);
  return `…${hay.slice(start, end).trim()}…`;
}

const SELF_TEST_CASES = [
  ['photogimp-authorship-pt', 'Gabriel é o criador do PhotoGIMP.'],
  ['photogimp-maintainer-pt', 'Atuo como principal mantenedor do projeto.'],
  // Sem qualificador: era a frase do LinkedIn a uma palavra de escapar.
  ['photogimp-maintainer-pt', 'Sou o mantenedor do PhotoGIMP.'],
  ['photogimp-maintainer-pt', 'Mantenedor do PhotoGIMP desde 2021.'],
  ['photogimp-maintainer-pt', 'Mantenho o PhotoGIMP sozinho.'],
  ['photogimp-authorship-en', 'Gabriel is the sole maintainer of the project.'],
  ['photogimp-authorship-en', 'Gabriel is the PhotoGIMP maintainer.'],
  ["photogimp-authorship-en", "PhotoGIMP's creator, Gabriel Almir, keeps it alive."],
  ['photogimp-authorship-en', 'Gabriel maintains PhotoGIMP.'],
  ['absolute-volume', 'A plataforma processa 1M+ eventos.'],
  // A forma natural em português, que a regra antiga não via.
  ['absolute-volume', 'A base tem 12 milhões de registros.'],
  ['absolute-volume', 'Passou de 1 milhão de usuários.'],
  ['absolute-throughput', 'Sustenta 4.000 requisições por segundo.'],
  ['absolute-throughput', 'Processa 3 milhões de requisições por dia.'],
  ['absolute-availability', 'Mantivemos 99,9% de disponibilidade.'],
  ['absolute-latency', 'O carregamento caiu de 8s para 800ms.'],
  ['absolute-latency', 'O carregamento levava 40 segundos antes da mudança.'],
  ['absolute-latency', 'Depois disso, caiu para menos de 1 s.'],
  ['absolute-headcount', 'Liderei uma equipe de 12 pessoas.'],
  ['absolute-headcount', 'Mentorei 8 desenvolvedores.'],
  ['confidential-domain-pt', 'O sistema de busca de bulas médicas.'],
  ['confidential-domain-en', 'The package insert search system.'],
];

/** Frases que precisam continuar passando — o custo de um falso positivo é o gate ser desligado. */
const SELF_TEST_ALLOWED = [
  'O carregamento caiu 90%. É o único dado público deste trabalho.',
  'Compatibilidade com PHP 7.4 e adoção gradual.',
  'Os 7 sistemas publicados, 3 dossiês e 4 laboratórios.',
  'Contribuí na evolução e hoje participo da organização e revisão do projeto.',
  'Diolinux — mai 2013 a ago 2016. CTC — ago 2023 a abr 2026.',
  'Integrações entre SAP e TOTVS via OData, e a migração para o TOTVS Cloud.',
  'Análise e evolução de sistemas corporativos em um ambiente regulado.',
  'Máximo 4 nós no mapa arquitetural.',
  'Reduzi o carregamento em 90% — resultado medido e autorizado.',
  // Fronteiras das regras novas: nenhuma delas pode disparar aqui.
  'Manutenção, compatibilidade entre versões e organização do projeto.',
  'Contribuição, organização de issues e revisão no projeto comunitário.',
  'A equipe de Qualidade, RH, Compras, Jurídico e TI.',
  'Um laboratório de 3 endpoints, com 2 fronteiras declaradas.',
  'Etapa de 5 horas de programação competitiva em equipe.',
  'Concluída em 2025, com 4 semestres de projeto integrador.',
];

function selfTest() {
  let failed = 0;

  for (const [id, text] of SELF_TEST_CASES) {
    const rule = RULES.find((r) => r.id === id);
    if (!rule) {
      console.error(`✗ regra inexistente: ${id}`);
      failed += 1;
      continue;
    }
    if (!rule.pattern.test(text)) {
      console.error(`✗ ${id} NÃO pegou a violação: ${JSON.stringify(text)}`);
      failed += 1;
    } else {
      console.log(`✓ ${id} pega a violação`);
    }
  }

  for (const text of SELF_TEST_ALLOWED) {
    const hit = RULES.find((r) => r.pattern.test(text));
    if (hit) {
      console.error(`✗ FALSO POSITIVO em ${hit.id}: ${JSON.stringify(text)}`);
      failed += 1;
    }
  }
  if (!failed) console.log(`✓ ${SELF_TEST_ALLOWED.length} frases legítimas passam limpas`);

  if (failed) {
    console.error(`\n${failed} problema(s) no próprio gate.`);
    exit(1);
  }
  console.log('\nGate testado: pega o que deve e não pega o que não deve.');
}

const arg = argv[2];

if (arg === '--self-test') {
  selfTest();
} else {
  const root = arg ?? 'dist';
  const { files, findings } = await check(root);

  if (findings.length === 0) {
    console.log(`✓ gate de claims: ${files} arquivos em ${root}/, nenhuma violação.`);
    exit(0);
  }

  console.error(`✗ gate de claims: ${findings.length} violação(ões) em ${root}/\n`);
  for (const f of findings) {
    console.error(`  [${f.rule.id}] ${f.file} (${f.where})`);
    console.error(`     ${f.rule.why}`);
    console.error(`     ${f.excerpt}\n`);
  }
  exit(1);
}
