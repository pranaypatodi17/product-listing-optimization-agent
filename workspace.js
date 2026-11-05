(function(){
'use strict';
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const store={get(k,d){try{return JSON.parse(localStorage.getItem(k))??d}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}},del(k){try{localStorage.removeItem(k)}catch(e){}}};

/* session guard */
const session=store.get('lw_session',null);
if(!session){location.replace('index.html');return}
$('#em').textContent=session.email;$('#av').textContent=(session.email[0]||'U').toUpperCase();
$('#user').onclick=e=>{e.stopPropagation();$('#dd').hidden=!$('#dd').hidden};
document.addEventListener('click',()=>$('#dd').hidden=true);
$('#out').onclick=()=>{store.del('lw_session');location.href='index.html'};
$('#sb').onclick=()=>$('#side').classList.toggle('open');
let tt;function toast(m){const t=$('#toast');t.textContent=m;t.hidden=false;clearTimeout(tt);tt=setTimeout(()=>t.hidden=true,2400)}
const daysLeft=Math.max(0,14-Math.floor((Date.now()-session.at)/864e5));
$('#trialDays').textContent=daysLeft+' days left';$('.trial u').style.width=((14-daysLeft)/14*100)+'%';
$('#upg').onclick=()=>{location.href='index.html#pricing'};

/* data */
const CATALOG=[
 ['Steel Water Bottle 32oz','🍶','#e0e7ff','Amazon',48,'Add leakproof + cup-holder keywords'],
 ['Vitamin C Face Serum','🧴','#fce7f3','Amazon',57,'Highlight ingredients, add skin-type note'],
 ['Trail Running Shoes','👟','#dcfce7','Shopify',41,'Add sizing guidance (runs small)'],
 ['Bamboo Cutting Board Set','🪵','#fef3c7','Amazon',66,'Add dishwasher-safe & size specs'],
 ['Wireless Earbuds Pro','🎧','#dbeafe','Shopify',52,'Address battery-life complaints'],
 ['Yoga Mat 6mm','🧘','#ede9fe','Amazon',74,'Add non-slip benefit to title'],
 ['Cold Brew Coffee Maker','☕','#ffedd5','Shopify',59,'Mention capacity & cleaning ease'],
 ['Kids Insulated Lunch Bag','🎒','#cffafe','Amazon',63,'Add age range and material']];
let state=store.get('lw_state',null)||CATALOG.map((c,i)=>({id:i,score:c[4],status:'todo'}));
const save=()=>store.set('lw_state',state);
const col=v=>v>=75?'#10b981':v>=55?'#f59e0b':'#ef4444';

/* nav */
const titles={overview:'Overview',listings:'Listings',insights:'Insights',queue:'Approval queue',settings:'Settings'};
function go(v){$$('#menu button').forEach(b=>b.classList.toggle('on',b.dataset.v===v));$$('.view').forEach(s=>s.classList.toggle('on',s.id==='v-'+v));$('#vt').textContent=titles[v];$('#side').classList.remove('open');history.replaceState(null,'','#'+v);if(v==='overview')chart()}
$('#menu').onclick=e=>{const b=e.target.closest('button');if(b)go(b.dataset.v)};

/* overview */
function avg(){return Math.round(state.reduce((a,s)=>a+s.score,0)/state.length)}
function kpis(){
  const opt=state.filter(s=>s.status==='ok').length,pend=state.filter(s=>s.status==='pend').length;
  $('#kpis').innerHTML=[['Avg. listing score',avg(),'▲ '+(avg()-54)+' pts'],['Listings',state.length,'synced just now'],['Optimized',opt,pend+' awaiting approval'],['Est. monthly uplift','$'+(opt*640+pend*210).toLocaleString(),'projected']].map(([a,b,c])=>`<div class="kpi"><small>${a}</small><b>${b}</b><span class="up">${c}</span></div>`).join('');
  const q=state.filter(s=>s.status==='pend').length;const bd=$('#qbadge');bd.textContent=q;bd.style.display=q?'inline':'none';
  $('#next').innerHTML=state.filter(s=>s.status==='todo').sort((a,b)=>a.score-b.score).slice(0,3).map(s=>`<div class="rec"><span class="tag">${s.score}</span><p><b>${CATALOG[s.id][0]}</b><span>${CATALOG[s.id][5]}</span></p><button class="btn out sm" data-o="${s.id}">Optimize</button></div>`).join('')||'<p class="muted">🎉 All listings optimized. New insights arrive weekly.</p>';
}
let rng=30;
function chart(){
  const n=rng,W=800,H=240,p=20,boost=state.filter(s=>s.status!=='todo').length*.04;
  const d=Array.from({length:n},(_,i)=>{const t=i/(n-1);return 1000*(1+(.2+boost)*t)*(1+(Math.sin(i*7.3)*.5)*.06)});
  const mx=Math.max(...d)*1.1,mn=Math.min(...d)*.85,X=i=>p+i/(n-1)*(W-2*p),Y=v=>H-p-(v-mn)/(mx-mn)*(H-2*p);
  const l=d.map((v,i)=>(i?'L':'M')+X(i).toFixed(1)+' '+Y(v).toFixed(1)).join('');
  $('#chart').innerHTML=`<defs><linearGradient id="g2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6366f1" stop-opacity=".3"/><stop offset="1" stop-color="#6366f1" stop-opacity="0"/></linearGradient></defs><path d="${l}L${W-p} ${H-p}L${p} ${H-p}Z" fill="url(#g2)"/><path d="${l}" fill="none" stroke="#4f46e5" stroke-width="3" vector-effect="non-scaling-stroke"/>`;
}
$('#rng').onclick=e=>{const b=e.target.closest('button');if(!b)return;rng=+b.dataset.r;$$('#rng button').forEach(x=>x.classList.toggle('on',x===b));chart()};
if(store.get('lw_welcome_closed',false))$('#welcome').hidden=true;
$('#wx').onclick=()=>{$('#welcome').hidden=true;store.set('lw_welcome_closed',true)};
$('#tour').onclick=()=>{go('listings');openDrawer(state.slice().sort((a,b)=>a.score-b.score).find(s=>s.status==='todo')?.id??0)};

/* listings */
const label={todo:['Needs work','todo'],pend:['Awaiting approval','pend'],ok:['Optimized','ok']};
function rows(){
  const q=$('#q').value.toLowerCase(),f=$('#flt').value;
  const list=state.filter(s=>CATALOG[s.id][0].toLowerCase().includes(q)&&(f==='all'||(f==='low'&&s.score<60&&s.status==='todo')||(f==='done'&&s.status==='ok')));
  $('#rows').innerHTML=list.map(s=>{const c=CATALOG[s.id],[t,k]=label[s.status];return `<tr><td><div class="pn"><i style="background:${c[2]}">${c[1]}</i>${c[0]}</div></td><td>${c[3]}</td><td><span class="sc" style="background:${col(s.score)}">${s.score}</span></td><td><span class="st-b ${k}">${t}</span></td><td style="text-align:right"><button class="btn ${s.status==='todo'?'primary':'out'} sm" data-o="${s.id}">${s.status==='todo'?'Optimize':'View'}</button></td></tr>`}).join('')||'<tr><td colspan="5" class="empty2">No listings match.</td></tr>';
}
$('#q').oninput=rows;$('#flt').onchange=rows;
document.addEventListener('click',e=>{const b=e.target.closest('[data-o]');if(b)openDrawer(+b.dataset.o)});
$('#optAll').onclick=()=>{const t=state.filter(s=>s.status==='todo'&&s.score<60);if(!t.length)return toast('Nothing left to optimize');t.forEach(s=>{s.status='pend';s.score=Math.min(96,s.score+30+(s.id*3)%9)});save();refresh();toast(t.length+' rewrites sent to the approval queue');go('queue')};

/* drawer */
const drawer=$('#drawer');
function closeD(){drawer.hidden=true}
$('#dx').onclick=closeD;$('#dback').onclick=closeD;addEventListener('keydown',e=>{if(e.key==='Escape')closeD()});
function openDrawer(id){
  const s=state[id],c=CATALOG[id];drawer.hidden=false;
  const body=$('#dbody');
  if(s.status==='todo'){
    body.innerHTML=`<h3>${c[0]}</h3><p class="muted tiny">${c[3]} · Score ${s.score}</p><div class="progress" style="margin:30px 0"><ol id="ds"></ol><div class="bar"><i id="db"></i></div></div>`;
    const st=['Auditing content','Reading reviews','Checking competitors','Writing new copy'];$('#ds').innerHTML=st.map(x=>`<li>${x}</li>`).join('');
    const lis=$$('#ds li');let i=0;(function nx(){if(i)lis[i-1].className='done';if(i===lis.length){$('#db').style.width='100%';return setTimeout(()=>{s.status='pend';s.score=Math.min(96,s.score+30+(id*3)%9);save();refresh();show(id)},350)}lis[i].className='run';$('#db').style.width=((i+.5)/lis.length*100)+'%';i++;setTimeout(nx,550)})();
  }else show(id);
}
function copyFor(id){const c=CATALOG[id];return{title:`${c[0]} – Premium Quality, Built to Last | ${c[5].replace(/^Add |^Address |^Highlight |^Mention /,'')}`,bul:['Solves the #1 complaint found across recent customer reviews','Includes all key specs shoppers search for','Benefit-led copy that mirrors top-ranking competitors','Optimized with rising search terms in your category']}}
function show(id){
  const s=state[id],c=CATALOG[id],n=copyFor(id);
  $('#dbody').innerHTML=`<h3>${c[0]}</h3><p class="muted tiny" style="margin-bottom:16px">${c[3]} · New score <b style="color:${col(s.score)}">${s.score}</b></p>
  <div class="rw"><div class="rw-box"><h5>Current title</h5><p><s>${c[0]}</s></p></div><div class="rw-box new"><h5>✨ Optimized title</h5><p>${n.title}</p></div><div class="rw-box new"><h5>Highlights</h5><ul>${n.bul.map(b=>`<li>${b}</li>`).join('')}</ul></div></div>
  <div class="actions" style="margin-top:18px">${s.status==='pend'?'<button class="btn primary" id="ap">Approve &amp; publish</button><button class="btn out" id="rj">Discard</button>':'<span class="st-b ok">✓ Published to '+c[3]+'</span>'}</div>`;
  const ap=$('#ap');if(ap){ap.onclick=()=>{ap.textContent='Publishing…';ap.disabled=true;setTimeout(()=>{s.status='ok';save();refresh();show(id);toast('Published to '+c[3])},800)};$('#rj').onclick=()=>{s.status='todo';s.score=CATALOG[id][4];save();refresh();closeD()}}
}

/* queue */
function queue(){
  const q=state.filter(s=>s.status==='pend');
  $('#queueList').innerHTML=q.length?q.map(s=>{const c=CATALOG[s.id];return `<div class="qi"><div class="pn"><i style="background:${c[2]}">${c[1]}</i>${c[0]}<span class="sc" style="background:${col(s.score)};margin-left:auto">${s.score}</span></div><p class="muted tiny" style="margin:8px 0">${c[5]}</p><button class="btn primary sm" data-o="${s.id}">Review &amp; approve</button></div>`}).join(''):'<div class="empty2"><div style="font-size:2.4rem">✅</div><h3>Queue is empty</h3><p>Optimize a listing and it will wait here for your approval.</p></div>';
}

/* insights */
$('#complaints').innerHTML=[['Runs small / sizing',34],['Leaks or spills',31],['Hard to clean',19],['Battery life short',14],['Packaging damaged',9]].map(([n,v])=>`<div class="theme neg"><span>${n}</span><i><u style="width:${v*2}%"></u></i><em>${v}%</em></div>`).join('');
$('#trends').innerHTML=[['waterproof trail shoes',47],['leakproof water bottle',58],['serum for sensitive skin',63],['dishwasher safe cutting board',24],['yoga mat non slip',31]].map(([k,g])=>`<span class="kw">${k}<b>▲ ${g}%</b></span>`).join('');
$('#moves').innerHTML=['HydroPeak cut price 8% on 32oz bottle','TerraRun X added “Gore-Tex” to title','Lumi Skin launched a sensitive-skin variant'].map(m=>`<div class="mv">🏁 ${m}</div>`).join('');

/* settings */
$$('[data-c]').forEach(b=>b.onclick=()=>{b.textContent='Connecting…';setTimeout(()=>{b.textContent='Connected ✓';b.disabled=true;toast(b.dataset.c+' connected')},900)});
$('#auto').checked=store.get('lw_auto',false);$('#auto').onchange=e=>{store.set('lw_auto',e.target.checked);toast('Preference saved')};
$('#syncBtn').onclick=function(){this.textContent='Syncing…';setTimeout(()=>{this.textContent='⟳ Sync store';toast('Catalog is up to date')},900)};

function refresh(){kpis();rows();queue();chart()}
refresh();
const h=location.hash.slice(1);go(titles[h]?h:'overview');
})();
