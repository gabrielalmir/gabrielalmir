/** Check only public destinations actually emitted by the build. */
import { readdir, readFile, mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
async function* walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = join(directory, entry.name);
    if (entry.isDirectory()) yield* walk(file);
    else if (file.endsWith('.html')) yield file;
  }
}
const links = new Set();
for await (const file of walk('dist')) {
  const html = await readFile(file, 'utf8');
  for (const match of html.matchAll(/<a\b[^>]*href="(https:\/\/[^\"]+)"/g)) {
    if (!match[1].startsWith('https://gabrielalmir.com.br'))
      links.add(match[1].replaceAll('&amp;', '&'));
  }
}
const results = [];
for (const url of [...links].sort()) {
  try {
    const response = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      signal: AbortSignal.timeout(20000),
    });
    const status = response.status;
    const result = {
      url,
      status,
      destination: response.url,
      verified: status >= 200 && status < 400,
    };
    results.push(result);
    console.log(`${status} ${url}`);
    await response.body?.cancel();
  } catch (error) {
    results.push({ url, error: String(error), verified: false });
    console.log(`Unavailable ${url}: ${error.message}`);
  }
}
await mkdir('reports', { recursive: true });
await writeFile(
  'reports/external-links.json',
  JSON.stringify({ timestamp: new Date().toISOString(), results }, null, 2) + '\n',
);
// A non-success status can be a bot block; preserve the result for manual review.
if (results.some((result) => !result.verified)) process.exitCode = 1;
