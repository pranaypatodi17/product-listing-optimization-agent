(function(){
'use strict';
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const store={get(k,d){try{return JSON.parse(localStorage.getItem(k))??d}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}},del(k){try{localStorage.removeItem(k)}catch(e){}}};

/* ---------- icons ---------- */
const IC={
 grid:'<rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/>',
 box:'<path d="M21 8l-9-5-9 5v8l9 5 9-5z"/><path d="M3 8l9 5 9-5M12 13v8"/>',
 bulb:'<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.5 1 2.5h6c0-1 .3-1.8 1-2.5A6 6 0 0 0 12 3z"/>',
 check:'<circle cx="12" cy="12" r="9"/><path d="M8 12.5l3 3 5-6"/>',
 sliders:'<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>',
 refresh:'<path d="M20 11a8 8 0 0 0-14.5-4M4 4v4h4"/><path d="M4 13a8 8 0 0 0 14.5 4M20 20v-4h-4"/>',
 trend:'<path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/>',
 up:'<path d="M12 19V5M5 12l7-7 7 7"/>',
 star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
 msg:'<path d="M21 12a8 8 0 0 1-11.6 7.1L3 21l1.9-5.4A8 8 0 1 1 21 12z"/>',
 flag:'<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',
 search:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
 sparkles:'<path d="M12 3l1.8 4.7L18.5 9.5 13.8 11.3 12 16l-1.8-4.7L5.5 9.5l4.7-1.8z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/>',
 dollar:'<path d="M12 3v18"/><path d="M16 7.5c-.8-1-2.2-1.5-4-1.5-2.2 0-3.8 1-3.8 2.7 0 4 8 2 8 6 0 1.8-1.7 2.8-4.2 2.8-1.8 0-3.3-.6-4.2-1.7"/>',
 bolt:'<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
 pulse:'<path d="M3 12h4l3-8 4 16 3-8h4"/>',
 shield:'<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
 eye:'<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
 upload:'<path d="M12 16V4M7 9l5-5 5 5"/><path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3"/>',
 back:'<path d="M19 12H5M11 6l-6 6 6 6"/>',
 logout:'<path d="M9 4H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4M16 8l4 4-4 4M20 12H9"/>',
 tag:'<path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="8.5" r="1.3"/>',
 bottle:'<path d="M10 2h4v3h-4zM9 5h6l1 3v12a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V8z"/><path d="M8 12h8"/>',
 drop:'<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',
 shoe:'<path d="M3 16v-4l5-1 3 3h4l6 2v3H3z"/><path d="M3 19h18"/>',
 board:'<rect x="5" y="3" width="14" height="18" rx="2"/><circle cx="12" cy="7" r="1"/><path d="M9 12h6M9 16h6"/>',
 phones:'<path d="M4 15v-3a8 8 0 0 1 16 0v3"/><rect x="3" y="14" width="4" height="6" rx="1.5"/><rect x="17" y="14" width="4" height="6" rx="1.5"/>',
 mat:'<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>',
 coffee:'<path d="M4 9h13v6a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z"/><path d="M17 11h2a2 2 0 0 1 0 4h-2M8 3v3M12 3v3"/>',
 bag:'<path d="M5 8h14l-1 12H6z"/><path d="M9 8a3 3 0 0 1 6 0"/>'
};
const ic=n=>`<svg class="ic" viewBox="0 0 24 24" aria-hidden="true">${IC[n]||''}</svg>`;
const paintIcons=(r=document)=>$$('[data-ic]',r).forEach(e=>{e.innerHTML=ic(e.dataset.ic)});
paintIcons();

/* ---------- session ---------- */
const session=store.get('lw_session',null);
if(!session){location.replace('index.html');return}
$('#em').textContent=session.email;$('#av').textContent=(session.email[0]||'D').toUpperCase();
$('#user').onclick=e=>{e.stopPropagation();$('#dd').hidden=!$('#dd').hidden};
document.addEventListener('click',()=>$('#dd').hidden=true);
$('#out').onclick=()=>{store.del('lw_session');location.href='index.html'};
$('#sb').onclick=()=>$('#side').classList.toggle('open');
let tt;function toast(m){const t=$('#toast');t.textContent=m;t.hidden=false;clearTimeout(tt);tt=setTimeout(()=>t.hidden=true,2600)}
const daysLeft=Math.max(0,14-Math.floor((Date.now()-session.at)/864e5));
$('#trialDays').textContent=daysLeft+' days left';$('.tbar u').style.width=((14-daysLeft)/14*100)+'%';
$('#upg').onclick=()=>{location.href='index.html#pricing'};

/* ---------- data ---------- */
const CAT=[
 {n:'Insulated Steel Water Bottle 32oz',sku:'BT-3201',i:'bottle',bg:'#e0e7ff',fg:'#4f46e5',ch:'amz',s:48,rev:11800,issue:'Title missing leakproof & cup-holder keywords',t:'Insulated Stainless Steel Water Bottle 32oz – Leakproof Lid, Wide Mouth, Keeps Cold 24h, BPA-Free, Fits Cup Holders',b:['Double-sealed lid that stays dry in gym bags','24h cold / 12h hot vacuum insulation','Wide mouth for ice and easy cleaning','Tapered base fits car cup holders']},
 {n:'Vitamin C Face Serum 1oz',sku:'SK-1020',i:'drop',bg:'#fce7f3',fg:'#be185d',ch:'amz',s:57,rev:14200,issue:'Ingredients buried; no skin-type guidance',t:'20% Vitamin C Serum for Face with Hyaluronic Acid – Brightening, Fragrance-Free, Airless Pump, 1 fl oz',b:['20% stabilized vitamin C for visibly even tone','Hyaluronic acid hydrates while it brightens','Airless pump prevents oxidation','Patch-test guidance for sensitive skin']},
 {n:'Men\'s Trail Running Shoes',sku:'FW-7710',i:'shoe',bg:'#dcfce7',fg:'#15803d',ch:'shp',s:41,rev:18600,issue:'Sizing complaint (runs small) not addressed',t:'Men\'s Waterproof Trail Running Shoes – Grippy Lug Outsole, Cushioned, Black (Runs Half Size Small – Size Up)',b:['5mm lugs for wet rock and mud','Water-resistant bonded upper','Sizing guide: order one size up','Lace garage stops loosening']},
 {n:'Bamboo Cutting Board Set',sku:'KT-5530',i:'board',bg:'#fef3c7',fg:'#b45309',ch:'amz',s:66,rev:7900,issue:'Missing dishwasher-safe and size specs',t:'Bamboo Cutting Board Set of 3 – Juice Groove, Non-Slip, Easy Clean, Kitchen Chopping Boards',b:['3 sizes for every prep task','Deep juice groove catches spills','Non-slip feet keep boards steady','Hand-wash care guide included']},
 {n:'Wireless Earbuds Pro',sku:'AU-9004',i:'phones',bg:'#dbeafe',fg:'#1d4ed8',ch:'shp',s:52,rev:21400,issue:'Battery-life complaints unanswered',t:'Wireless Earbuds Pro – 32H Battery, Active Noise Cancelling, IPX5 Waterproof, Bluetooth 5.3',b:['32-hour battery with charging case','Hybrid noise cancelling','IPX5 sweat and rain proof','Low-latency gaming mode']},
 {n:'Non-Slip Yoga Mat 6mm',sku:'FT-2210',i:'mat',bg:'#ede9fe',fg:'#6d28d9',ch:'amz',s:74,rev:9300,issue:'Non-slip benefit missing from title',t:'Non-Slip Yoga Mat 6mm – Extra Thick Cushioning, Eco-Friendly TPE, Carry Strap Included',b:['Textured surface grips when wet','6mm cushioning for joints','Odor-free eco TPE material','Includes carry strap']},
 {n:'Cold Brew Coffee Maker 1.5L',sku:'KT-6612',i:'coffee',bg:'#ffedd5',fg:'#c2410c',ch:'shp',s:59,rev:8600,issue:'Capacity and cleaning ease not mentioned',t:'Cold Brew Coffee Maker 1.5L – Fine Mesh Filter, Airtight Lid, Dishwasher Safe Glass Pitcher',b:['Brews 6 cups in 12 hours','Fine mesh filter, no sediment','Airtight lid keeps it fresh 2 weeks','Dishwasher-safe parts']},
 {n:'Kids Insulated Lunch Bag',sku:'KD-3380',i:'bag',bg:'#cffafe',fg:'#0e7490',ch:'amz',s:63,rev:6800,issue:'Age range and material missing',t:'Kids Insulated Lunch Bag – Leakproof, BPA-Free Lining, Fits Bento Boxes, Ages 3-10',b:['Keeps food cool for 6 hours','Wipe-clean BPA-free lining','Fits standard bento boxes','Padded straps for ages 3-10']}];
const impact=(c,s)=>Math.round(c.rev*(96-s)/100*.35/10)*10;
const gain=(id)=>14+Math.round((96-CAT[id].s)*.45);
let state=store.get('lw_state2',null)||CAT.map((c,i)=>({id:i,score:c.s,status:'todo'}));
const seedFeed=[['trend','t-amb','Competitor price drop detected','HydroPeak cut the 32oz bottle price by 8%','12 min ago'],['msg','t-blu','214 new reviews clustered','“Runs small” is rising on Trail Running Shoes','1 h ago'],['search','t-ind','Keyword spike found','“waterproof trail shoes” up 47% this month','3 h ago'],['refresh','t-grn','Catalog synced','8 listings pulled from Amazon and Shopify','5 h ago']];
let feed=store.get('lw_feed2',null)||seedFeed;
const save=()=>{store.set('lw_state2',state);store.set('lw_feed2',feed.slice(0,12))};
function log(icon,tone,t,s){feed.unshift([icon,tone,t,s,'just now']);save()}
const col=v=>v>=75?'#10b981':v>=55?'#f59e0b':'#ef4444';
const $$m=n=>'$'+n.toLocaleString();
const tile=c=>`<span class="pt" style="background:${c.bg};color:${c.fg}">${ic(c.i)}</span>`;
const stat={todo:['Needs work','todo'],pend:['In queue','pend'],ok:['Optimized','ok']};

/* ---------- navigation ---------- */
const titles={overview:'Overview',listings:'Listings',insights:'Insights',queue:'Approval queue',settings:'Settings'};
function go(v){$$('#menu button').forEach(b=>b.classList.toggle('on',b.dataset.v===v));$$('.view').forEach(s=>s.classList.toggle('on',s.id==='v-'+v));$('#vt').textContent=titles[v];$('#side').classList.remove('open');history.replaceState(null,'','#'+v);scrollTo(0,0);if(v==='overview')chart()}
$('#menu').onclick=e=>{const b=e.target.closest('button');if(b)go(b.dataset.v)};
document.addEventListener('click',e=>{const g=e.target.closest('[data-go]');if(g)go(g.dataset.go);const o=e.target.closest('[data-o]');if(o)openDrawer(+o.dataset.o)});

/* ---------- overview ---------- */
function seed(i){const x=Math.sin(i*9301+49297)*233280;return x-Math.floor(x)}
function spark(base,up,k){const d=Array.from({length:14},(_,i)=>base*(1+up*i/13)*(1+(seed(i+k)-.5)*.1));const mx=Math.max(...d),mn=Math.min(...d);return `<svg class="sp" viewBox="0 0 84 30" preserveAspectRatio="none"><path d="${d.map((v,i)=>(i?'L':'M')+(i*84/13).toFixed(1)+' '+(28-(v-mn)/(mx-mn||1)*26).toFixed(1)).join('')}" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" vector-effect="non-scaling-stroke"/></svg>`}
const done=()=>state.filter(s=>s.status==='ok'),pend=()=>state.filter(s=>s.status==='pend'),todo=()=>state.filter(s=>s.status==='todo');
const avg=()=>Math.round(state.reduce((a,s)=>a+s.score,0)/state.length);
const realized=()=>done().reduce((a,s)=>a+impact(CAT[s.id],CAT[s.id].s)*.7,0)+pend().reduce((a,s)=>a+impact(CAT[s.id],CAT[s.id].s)*.2,0);
const pot=()=>todo().reduce((a,s)=>a+impact(CAT[s.id],s.score),0);

function overview(){
  const h=new Date().getHours(),nm=session.demo?'there':session.email.split('@')[0].replace(/[._-]+/g,' ').replace(/\b\w/g,m=>m.toUpperCase()).split(' ')[0];
  $('#greet').textContent=(h<12?'Good morning':h<18?'Good afternoon':'Good evening')+', '+nm;
  const n=todo().length;
  $('#sub').innerHTML=n?`Your agent found <b>${n} listing${n>1?'s':''} to improve</b> worth about <b>${$$m(pot())}/mo</b> in extra revenue.`:'<b>All listings are optimized.</b> The agent keeps watching trends and competitors.';
  $('#tour').disabled=!n;
  const rev=8240+realized(),conv=(5.8+done().length*.35+pend().length*.1).toFixed(1),vis=38+done().length*4+pend().length*2;
  const K=[['dollar','Revenue impact (30d)',$$m(Math.round(rev)),'+'+Math.round(12+done().length*3)+'%','#d1fae5','#047857',spark(1,.5,1)],
   ['trend','Conversion rate',conv+'%','+'+(conv-5.8).toFixed(1)+' pts','#eef2ff','#4f46e5',spark(1,.35,2)],
   ['pulse','Avg. listing health',avg()+'/100','+'+(avg()-54)+' pts','#fef3c7','#b45309',spark(1,.4,3)],
   ['eye','Keywords in top 10',vis,'+'+(vis-38)+' this month','#dbeafe','#1d4ed8',spark(1,.45,4)]];
  $('#kpis').innerHTML=K.map(([i,a,b,c,bg,fg,sp])=>`<div class="kpi" style="--bg2:${bg};--fg2:${fg}"><div class="kh"><span class="kico">${ic(i)}</span><span class="dl">${ic('up')}${c}</span></div><b>${b}</b><div class="kf"><small>${a}</small>${sp}</div></div>`).join('');
  // donut
  const g=state.filter(s=>s.score>=75).length,f=state.filter(s=>s.score>=55&&s.score<75).length,p=state.length-g-f,T=state.length;
  const d=$('#donut');d.style.setProperty('--a',g/T*100);d.style.setProperty('--b',f/T*100);$('#davg').textContent=avg();$('#hcount').textContent=T+' listings';
  $('#legend').innerHTML=[['Healthy (75+)',g,'#10b981'],['Fair (55–74)',f,'#f59e0b'],['Poor (<55)',p,'#ef4444']].map(([a,b,c])=>`<li><i style="background:${c}"></i>${a}<b>${b}</b></li>`).join('');
  $('#feed').innerHTML=feed.slice(0,6).map(([i,t,a,b,w])=>`<div class="fi"><span class="fico ${t}">${ic(i)}</span><div><b>${a}</b><small>${b} · ${w}</small></div></div>`).join('');
  // opportunities
  const top=todo().sort((a,b)=>impact(CAT[b.id],b.score)-impact(CAT[a.id],a.score)).slice(0,4);
  $('#opps').innerHTML=top.length?top.map(s=>{const c=CAT[s.id];return `<div class="opp"><div class="pn">${tile(c)}<div>${c.n}<small>${c.issue}</small></div></div><div class="money">+${$$m(impact(c,s.score))}<small>per month</small></div><button class="btn primary sm" data-o="${s.id}">Optimize</button></div>`}).join(''):`<div class="opp"><div class="why">No open opportunities. Nice work — new ones appear as trends shift.</div></div>`;
  const W=[{n:'Insulated Tumbler 20oz',i:'bottle',a:'6.1%',b:'8.4%',r:'+$1,920'},{n:'Silicone Baking Mat Set',i:'board',a:'4.8%',b:'6.3%',r:'+$1,150'}];
  const mine=done().map(s=>({n:CAT[s.id].n,i:CAT[s.id].i,a:'—',b:'+'+gain(s.id)+' pts',r:'+'+$$m(impact(CAT[s.id],CAT[s.id].s)),mine:1}));
  $('#wins').innerHTML=mine.concat(W).slice(0,4).map(w=>`<div class="win"><div class="pn"><span class="pt t-grn">${ic(w.i)}</span><div>${w.n}<small>${w.mine?'Published just now':'Published 3 weeks ago'}</small></div></div><div class="wr"><div class="chip2">${w.mine?'Health score':'Conversion'}<b>${w.mine?'Up':w.a+' → '+w.b}</b></div><div class="chip2">Revenue / mo<b>${w.r}<em>${w.mine?'projected':'actual'}</em></b></div></div></div>`).join('');
}
$('#tour').onclick=()=>{const t=todo().sort((a,b)=>impact(CAT[b.id],b.score)-impact(CAT[a.id],a.score))[0];if(t)openDrawer(t.id)};

/* ---------- performance chart ---------- */
let rng=30,metric='revenue';
const MET={revenue:{b:260,fmt:v=>'$'+Math.round(v).toLocaleString()},sessions:{b:1200,fmt:v=>Math.round(v).toLocaleString()},conv:{b:5.8,fmt:v=>v.toFixed(1)+'%'}};
function chart(){
  const n=rng,W=800,H=260,p=22,m=MET[metric],boost=done().length*.05+pend().length*.015,d=Array.from({length:n},(_,i)=>{const t=i/(n-1);return m.b*(1+(.18+boost)*Math.pow(t,1.4))*(1+(seed(i+metric.length)-.5)*.1)});
  const mx=Math.max(...d)*1.1,mn=Math.min(...d)*.85,X=i=>p+i/(n-1)*(W-2*p),Y=v=>H-p-(v-mn)/(mx-mn)*(H-2*p),pts=d.map((v,i)=>[X(i),Y(v)]),l=pts.map((q,i)=>(i?'L':'M')+q[0].toFixed(1)+' '+q[1].toFixed(1)).join('');
  let g='';for(let k=0;k<5;k++){const y=p+k*(H-2*p)/4;g+=`<line x1="${p}" x2="${W-p}" y1="${y}" y2="${y}" stroke="#e8eaf3" stroke-dasharray="3 4"/>`}
  const evs=[[.3,'Title refresh published'],[.58,'Review fixes applied']].concat(done().map((s,k)=>[.7+k*.06,CAT[s.id].n+' published']));
  const ev=evs.filter(e=>e[0]<1).map(e=>{const i=Math.round(e[0]*(n-1));return `<line x1="${X(i)}" x2="${X(i)}" y1="${p}" y2="${H-p}" stroke="#a5b4fc" stroke-dasharray="4 4"/><circle cx="${X(i)}" cy="${pts[i][1]}" r="6" fill="#fff" stroke="#4f46e5" stroke-width="3"><title>${e[1]}</title></circle>`}).join('');
  $('#chart').innerHTML=`<defs><linearGradient id="g2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6366f1" stop-opacity=".3"/><stop offset="1" stop-color="#6366f1" stop-opacity="0"/></linearGradient></defs>${g}<path d="${l}L${W-p} ${H-p}L${p} ${H-p}Z" fill="url(#g2)"/><path d="${l}" fill="none" stroke="#4f46e5" stroke-width="3" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>${ev}`;
  const ch=$('#chart'),tip=$('#tip');
  ch.onmousemove=e=>{const r=ch.getBoundingClientRect(),i=Math.max(0,Math.min(n-1,Math.round(((e.clientX-r.left)/r.width*W-p)/(W-2*p)*(n-1)))),dt=new Date(Date.now()-(n-1-i)*864e5);tip.hidden=false;tip.style.left=(10+X(i)/W*r.width)+'px';tip.style.top=(10+pts[i][1]/H*r.height)+'px';tip.textContent=dt.toLocaleDateString('en',{month:'short',day:'numeric'})+' · '+m.fmt(d[i])};
  ch.onmouseleave=()=>tip.hidden=true;
}
$('#rng').onclick=e=>{const b=e.target.closest('button');if(!b)return;rng=+b.dataset.r;$$('#rng button').forEach(x=>x.classList.toggle('on',x===b));chart()};
$('#mt').onclick=e=>{const b=e.target.closest('button');if(!b)return;metric=b.dataset.m;$$('#mt button').forEach(x=>x.classList.toggle('on',x===b));chart()};

/* ---------- listings ---------- */
let fl='all';
function rows(){
  const q=$('#q').value.toLowerCase(),list=state.filter(s=>{const c=CAT[s.id];return (c.n+c.sku).toLowerCase().includes(q)&&(fl==='all'||s.status===fl)});
  $('#rows').innerHTML=list.map(s=>{const c=CAT[s.id],[t,k]=stat[s.status];return `<tr><td><div class="pn">${tile(c)}<div>${c.n}<small>SKU ${c.sku}</small></div></div></td><td><span class="chn ${c.ch}">${c.ch==='amz'?'Amazon':'Shopify'}</span></td><td><div class="hb"><b>${s.score}</b><i><u style="width:${s.score}%;background:${col(s.score)}"></u></i></div></td><td class="iss">${s.status==='todo'?c.issue:'Resolved by agent'}</td><td class="money" style="text-align:left">${s.status==='ok'?'<span class="upc">+'+$$m(impact(c,c.s))+'</span>':'+'+$$m(impact(c,s.score))}</td><td><span class="st-b ${k}">${t}</span></td><td style="text-align:right"><button class="btn ${s.status==='todo'?'primary':'out'} sm" data-o="${s.id}">${s.status==='todo'?'Optimize':'View'}</button></td></tr>`}).join('')||'<tr><td colspan="7" style="text-align:center;color:var(--mut);padding:40px">No listings match your filters.</td></tr>';
}
$('#q').oninput=rows;
$('#flt').onclick=e=>{const b=e.target.closest('button');if(!b)return;fl=b.dataset.f;$$('#flt button').forEach(x=>x.classList.toggle('on',x===b));rows()};
$('#optAll').onclick=()=>{const t=todo().filter(s=>s.score<60);if(!t.length)return toast('No low-score listings left');t.forEach(s=>{s.score=Math.min(96,s.score+gain(s.id));s.status='pend'});log('sparkles','t-ind',t.length+' rewrites drafted','Added to the approval queue','just now');save();refresh();toast(t.length+' rewrites sent to the approval queue');go('queue')};

/* ---------- drawer ---------- */
const drawer=$('#drawer');const closeD=()=>drawer.hidden=true;
$('#dx').onclick=closeD;$('#dback').onclick=closeD;addEventListener('keydown',e=>{if(e.key==='Escape')closeD()});
function head(id){const c=CAT[id];return `<div class="dhead">${tile(c)}<div><h3>${c.n}</h3><small class="muted">SKU ${c.sku} · ${c.ch==='amz'?'Amazon':'Shopify'}</small></div></div>`}
function openDrawer(id){
  const s=state[id],c=CAT[id];drawer.hidden=false;const body=$('#dbody');
  if(s.status!=='todo')return show(id);
  body.innerHTML=head(id)+`<div class="dscore"><div class="chip2">Current score<b>${s.score}</b></div><div class="chip2">Est. impact<b>+${$$m(impact(c,s.score))}/mo</b></div></div><div class="progress"><ol id="ds"></ol><div class="bar"><i id="db"></i></div></div>`;
  const st=['Auditing title, bullets and specs','Mining customer reviews','Comparing 12 competitors','Matching rising search terms','Writing optimized copy'];$('#ds').innerHTML=st.map(x=>`<li>${x}</li>`).join('');
  const lis=$$('#ds li');let i=0;(function nx(){if(i)lis[i-1].className='done';if(i===lis.length){$('#db').style.width='100%';return setTimeout(()=>{s.score=Math.min(96,s.score+gain(id));s.status='pend';log('sparkles','t-ind','Rewrite drafted: '+c.n,'Waiting for your approval','just now');save();refresh();show(id)},350)}lis[i].className='run';$('#db').style.width=((i+.5)/lis.length*100)+'%';i++;setTimeout(nx,520)})();
}
function show(id){
  const s=state[id],c=CAT[id];
  $('#dbody').innerHTML=head(id)+`<div class="dscore"><div class="chip2">Before<b>${c.s}</b></div><div class="chip2">After<b style="color:${col(s.score)}">${s.score}</b></div><div class="chip2">Est. impact<b>+${$$m(impact(c,c.s))}/mo</b></div></div>
  <div class="rw"><div class="rw-box"><h5>Current title</h5><p><s>${c.n}</s></p></div><div class="rw-box new"><h5><span>Optimized title</span><span>${c.t.length} chars</span></h5><p>${c.t}</p></div><div class="rw-box new"><h5>Highlights</h5><ul>${c.b.map(b=>`<li>${b}</li>`).join('')}</ul></div><div class="rw-box"><h5>Addressed</h5><p>${c.issue}</p></div></div>
  <div class="actions" style="margin-top:18px">${s.status==='pend'?'<button class="btn primary" id="ap">Approve &amp; publish</button><button class="btn out" id="rj">Discard</button>':`<span class="st-b ok">Published to ${c.ch==='amz'?'Amazon':'Shopify'}</span>`}</div>`;
  const ap=$('#ap');if(ap){ap.onclick=()=>{ap.textContent='Publishing…';ap.disabled=true;setTimeout(()=>{s.status='ok';log('check','t-grn','Published: '+c.n,'Live on '+(c.ch==='amz'?'Amazon':'Shopify')+' · tracking performance','just now');save();refresh();show(id);toast('Published to '+(c.ch==='amz'?'Amazon':'Shopify'))},800)};$('#rj').onclick=()=>{s.status='todo';s.score=c.s;save();refresh();closeD()}}
}

/* ---------- queue ---------- */
function queue(){
  const q=pend(),bd=$('#qbadge');bd.textContent=q.length;bd.style.display=q.length?'inline':'none';
  $('#queueList').innerHTML=q.length?q.map(s=>{const c=CAT[s.id];return `<div class="qi"><div class="pn">${tile(c)}<div>${c.n}<small>Score ${c.s} → ${s.score} · +${$$m(impact(c,c.s))}/mo projected</small></div></div><button class="btn primary sm" data-o="${s.id}">Review &amp; approve</button></div>`}).join(''):`<div class="empty2"><div class="eico">${ic('check')}</div><h3>Queue is empty</h3><p>Optimize a listing and the rewrite will wait here for your approval.</p></div>`;
}

/* ---------- insights ---------- */
const CPL=[['Runs small / sizing fit',34,3,'Add sizing guidance'],['Leaks or spills',31,2,'Add leakproof claim'],['Hard to clean',19,4,'Add cleaning details'],['Battery life shorter than expected',14,1,'Set battery expectations'],['Packaging arrives damaged',9,5,'Update packaging note']];
function insights(){
  $('#ikpis').innerHTML=[['star','Average rating','4.1 / 5','+0.3 projected','#fef3c7','#b45309'],['msg','Reviews analyzed','4,812','+214 this week','#dbeafe','#1d4ed8'],['search','Keyword gaps','12','7 high-intent','#eef2ff','#4f46e5']].map(([i,a,b,c,bg,fg])=>`<div class="kpi" style="--bg2:${bg};--fg2:${fg}"><div class="kh"><span class="kico">${ic(i)}</span><span class="dl">${ic('up')}${c}</span></div><b>${b}</b><small>${a}</small></div>`).join('');
  $('#complaints').innerHTML=CPL.map(([a,p,n,fx],i)=>`<div class="rv"><div class="rt">${a}<span>${p}% of negative reviews</span></div><i><u style="width:${p*2.4}%"></u></i><p><span>Affects ${n} listing${n>1?"s":""}</span><button class="btn out sm" data-fix="${i}">${fx}</button></p></div>`).join('');
  $('#comps').innerHTML=[['HydroPeak 32oz','$27.99','-8%','Cut price',1],['TerraRun X','$119','+0%','Added Gore-Tex claim',0],['Lumi Skin Serum','$34.00','+0%','Launched sensitive-skin variant',0],['PodMax Earbuds','$79.00','-5%','Running a coupon',1]].map(([a,b,c,d,dn])=>`<div class="cmp-i"><span class="pt t-amb">${ic('flag')}</span><div class="pn"><div>${a}<small>${d}</small></div></div><div style="text-align:right"><b>${b}</b><br><em class="${dn?'dn':'muted'}">${c}</em></div></div>`).join('');
  const K=[['waterproof trail running shoes','18.2k','+47%','Medium','Not in title'],['leakproof water bottle','33.5k','+58%','High','In bullets only'],['serum for sensitive skin','12.1k','+63%','Low','Missing'],['bpa free insulated bottle','9.4k','+22%','Low','Missing'],['non slip yoga mat','27.0k','+31%','High','Partial'],['dishwasher safe cutting board','6.8k','+24%','Low','Missing']];
  $('#kwrows').innerHTML=K.map(([a,v,t,c,cv],i)=>`<tr><td><b>${a}</b></td><td>${v}</td><td class="upc"><b>▲ ${t}</b></td><td><span class="pill2 ${c==='Low'?'t-grn':c==='High'?'t-red':'t-amb'}">${c}</span></td><td>${cv}</td><td style="text-align:right"><button class="btn out sm" data-kw="${a}">Add to listing</button></td></tr>`).join('');
}
document.addEventListener('click',e=>{
  const f=e.target.closest('[data-fix]');if(f){const c=CPL[+f.dataset.fix];f.textContent='Queued ✓';f.disabled=true;log('bulb','t-ind','Review fix queued: '+c[0],'Applying to '+c[2]+' listings','just now');save();overview();toast('Fix queued for '+c[2]+' listings')}
  const k=e.target.closest('[data-kw]');if(k){k.textContent='Added ✓';k.disabled=true;log('search','t-ind','Keyword added: '+k.dataset.kw,'Will appear in next rewrite','just now');save();overview();toast('Keyword added to upcoming rewrites')}
});

/* ---------- settings ---------- */
$$('[data-c]').forEach(b=>b.onclick=()=>{b.textContent='Connecting…';setTimeout(()=>{b.textContent='Connected';b.disabled=true;toast(b.dataset.c+' connected')},900)});
['auto','mail','voice'].forEach(k=>{const el=$('#'+k);el.checked=store.get('lw_'+k,el.checked);el.onchange=()=>{store.set('lw_'+k,el.checked);toast('Preference saved')}});
$('#syncBtn').onclick=function(){const b=this;b.disabled=true;b.lastChild.textContent='Syncing…';setTimeout(()=>{b.disabled=false;b.lastChild.textContent='Sync store';log('refresh','t-grn','Catalog synced','8 listings up to date','just now');save();overview();toast('Catalog is up to date')},900)};

function refresh(){overview();rows();queue();insights();chart()}
refresh();
const h=location.hash.slice(1);go(titles[h]?h:'overview');
})();
