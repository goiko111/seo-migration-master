import { spawnSync } from 'node:child_process';
import { mkdirSync, writeFileSync, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';

const output = path.resolve('evidence/validation', new Date().toISOString().replaceAll(':','-'));
mkdirSync(output, { recursive: true });
const results = [];
function run(name, command, args, env = {}) {
  const started = Date.now();
  const result = spawnSync(command, args, { env: { ...process.env, ...env }, encoding: 'utf8', timeout: 180000 });
  writeFileSync(path.join(output, `${name}.log`), `${result.stdout || ''}\n${result.stderr || ''}\n${result.error || ''}`);
  results.push({ name, exitCode: result.status, elapsedMs: Date.now() - started });
  console.log(`${name}: ${result.status === 0 ? 'PASS' : 'FAIL'}`);
  if (result.status !== 0) finish(1);
}
function finish(code) {
  writeFileSync(path.join(output,'results.json'),JSON.stringify({output,results},null,2));
  console.log(output);
  process.exit(code);
}
run('tests','npm',['test','--','--reporter=dot']);
run('typescript','./node_modules/.bin/tsc',['--noEmit','-p','tsconfig.app.json']);
run('lint','./node_modules/.bin/eslint',['src/pages/CataloniaPresentation.tsx','src/data/cataloniaProposal.ts','src/data/presentationReview.ts','src/data/presentationStory.ts','src/pages/PresentationLegacy.tsx','src/test/catalonia-proposal.test.ts','src/test/presentation-parity.test.tsx','src/test/presentation-pdf.test.ts']);
run('diff','git',['diff','--check']);
run('default-build','npm',['run','build'],{VITE_CATALONIA_PRESENTATION:'false'});
const chunks = readdirSync('dist/assets').filter(file => file.endsWith('.js'));
const leaked = chunks.filter(file => /Beloved Gran Via|Catalonia Group/.test(readFileSync(path.join('dist/assets',file),'utf8')));
results.push({name:'negotiated-copy-excluded-from-default-build',pass:leaked.length === 0,leaked});
if (leaked.length) finish(1);
run('candidate-build','npm',['run','build'],{VITE_CATALONIA_PRESENTATION:'true'});
finish(0);
