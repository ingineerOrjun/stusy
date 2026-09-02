const fs=require('fs'),path=require('path');
const ROOT='C:/Users/Acer/Desktop/rgsc-study';
function walk(d,acc=[]){for(const e of fs.readdirSync(d,{withFileTypes:true})){
  const p=path.join(d,e.name); e.isDirectory()?walk(p,acc):acc.push(p);} return acc;}
const files=walk(ROOT).filter(f=>!f.includes('_source'));
const htmls=files.filter(f=>f.endsWith('.html'));
let bad=0,checked=0;
for(const f of htmls){
  const s=fs.readFileSync(f,'utf8');
  const dir=path.dirname(f);
  const refs=[...s.matchAll(/(?:href|src)="([^"]+)"/g)].map(m=>m[1]);
  for(const r of refs){
    if(/^(https?:|data:|#|mailto:)/.test(r)) continue;
    checked++;
    const target=path.resolve(dir,r.split('#')[0]);
    if(!fs.existsSync(target)){ console.log('BROKEN',path.relative(ROOT,f),'->',r); bad++; }
  }
}
console.log('html files:',htmls.length,'| local refs checked:',checked,'| broken:',bad);
// every page must load nav.js and the stylesheet
for(const f of htmls){ const s=fs.readFileSync(f,'utf8');
  if(!/assets\/css\/style\.css/.test(s)) console.log('NO CSS',path.relative(ROOT,f));
  if(!/assets\/js\/nav\.js/.test(s))     console.log('NO NAV',path.relative(ROOT,f));
  if(!/id="hamBtn"/.test(s))             console.log('NO HAMBURGER',path.relative(ROOT,f));
  if(!/id="mobilePanel"/.test(s))        console.log('NO PANEL',path.relative(ROOT,f));
}
console.log('chrome check done');
