import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const files = [
  'src/App.tsx','src/pages/PresentationLegacy.tsx','src/data/presentationStory.ts',
  'src/data/presentationReview.ts','src/data/cataloniaProposal.ts',
  'src/pages/CataloniaPresentation.tsx','src/pages/CataloniaPresentation.css',
  'src/pages/CataloniaPresentationAlternativeArchive.tsx','src/pages/CataloniaPricing.css',
  'src/assets/presentation/editor-glass-settings.png','src/test/catalonia-proposal.test.ts',
  'src/test/presentation-parity.test.tsx','src/test/presentation-pdf.test.ts',
  'scripts/preview-presentations.mjs','scripts/validate-presentations.mjs','scripts/checkpoint-presentations.mjs',
];
const sha = data => createHash('sha256').update(data).digest('hex');
const directory = path.resolve('evidence/checkpoint',new Date().toISOString().replaceAll(':','-'));
mkdirSync(directory,{recursive:true});
const entries = files.map(file => {
  const destination = path.join(directory,'files',file);
  mkdirSync(path.dirname(destination),{recursive:true});
  copyFileSync(file,destination);
  let baseSha256 = null;
  try { baseSha256=sha(execFileSync('git',['show',`HEAD:${file}`],{stdio:['ignore','pipe','ignore']})); } catch { /* New file. */ }
  return {file,sha256:sha(readFileSync(file)),baseSha256};
});
const diff=execFileSync('git',['diff','--binary','--',...files]);
writeFileSync(path.join(directory,'tracked.patch'),diff);
writeFileSync(path.join(directory,'manifest.json'),JSON.stringify({
  createdAt:new Date().toISOString(),root:process.cwd(),
  base:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),
  remote:execFileSync('git',['remote','get-url','origin'],{encoding:'utf8'}).trim(),
  published:false,scope:'Presentation candidate only. No Worker/Edge/editorial/CRM changes.',
  trackedPatchSha256:sha(diff),files:entries,
},null,2));
console.log(directory);
