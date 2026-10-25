/** Astro templates are analyzed by Knip; this graph covers JS/TS modules. */
module.exports = {
  forbidden: [
    { name: 'no-circular', severity: 'error', from: {}, to: { circular: true } },
    {
      name: 'no-unresolved',
      severity: 'error',
      from: {},
      to: { couldNotResolve: true, pathNot: '^astro:' },
    },
    {
      name: 'no-browser-to-tooling',
      severity: 'error',
      from: { path: '^src/' },
      to: { path: '^(scripts|tests)/' },
    },
    {
      name: 'no-lib-to-ui',
      severity: 'error',
      from: { path: '^src/lib/' },
      to: { path: '^src/(components|pages|layouts|scripts)/' },
    },
    {
      name: 'no-browser-node-builtins',
      severity: 'error',
      from: { path: '^src/scripts/' },
      to: { dependencyTypes: ['core'] },
    },
  ],
  options: {
    doNotFollow: { path: 'node_modules' },
    tsPreCompilationDeps: true,
    tsConfig: { fileName: 'tsconfig.json' },
    enhancedResolveOptions: {
      extensions: ['.js', '.mjs', '.cjs', '.ts', '.json'],
      conditionNames: ['import', 'types', 'node', 'default'],
      exportsFields: ['exports'],
    },
  },
};
