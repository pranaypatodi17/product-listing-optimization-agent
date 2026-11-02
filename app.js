(function(){
'use strict';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const store={get(k,d){try{return JSON.parse(localStorage.getItem(k))??d}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};

/* ---------- nav ---------- */
const nav=$('#nav');
addEventListener('scroll',()=>nav.classList.toggle('sc',scrollY>8),{passive:true});
$('#burger').onclick=()=>$('#links').classList.toggle('open');
$$('#links a').forEach(a=>a.onclick=()=>$('#links').classList.remove('open'));

/* ---------- toast & modal ---------- */
let tt;function toast(m){const t=$('#toast');t.textContent=m;t.hidden=false;clearTimeout(tt);tt=setTimeout(()=>t.hidden=true,2600)}
const modal=$('#modal'),mbody=$('#mbody');
function openModal(html){mbody.innerHTML=html;modal.hidden=false;document.body.style.overflow='hidden';const f=$('input,select,textarea',mbody);f&&setTimeout(()=>f.focus(),50)}
function closeModal(){modal.hidden=true;document.body.style.overflow=''}
$('#mx').onclick=closeModal;modal.onclick=e=>{if(e.target===modal)closeModal()};
addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});
function success(title,msg){mbody.innerHTML=`<div class="ok-ico">✓</div><h3>${title}</h3><p>${msg}</p><button class="btn primary block" id="okb">Done</button>`;$('#okb').onclick=closeModal}
const forms={
 trial:()=>`<h3>Start your 14-day free trial</h3><p>No credit card required. Set up in minutes.</p><form id="f"><label>Work email<input type="email" name="e" required placeholder="you@brand.com"></label><label>Store platform<select><option>Amazon</option><option>Shopify</option><option>WooCommerce</option><option>Agency (multiple)</option></select></label><label>Number of listings<select><option>1–50</option><option>51–250</option><option>251–1,000</option><option>1,000+</option></select></label><button class="btn primary block">Create my workspace</button></form>`,
 signin:()=>`<h3>Welcome back</h3><p>Sign in to your Listwise workspace.</p><form id="f"><label>Email<input type="email" required></label><label>Password<input type="password" required minlength="6"></label><button class="btn primary block">Sign in</button></form>`,
 sales:()=>`<h3>Talk to our team</h3><p>Tell us about your catalog and we'll be in touch within one business day.</p><form id="f"><label>Name<input required></label><label>Email<input type="email" required></label><label>How can we help?<textarea rows="3"></textarea></label><button class="btn primary block">Send message</button></form>`,
 legal:()=>`<h3>Legal &amp; security</h3><p>Listwise is SOC 2 Type II compliant, encrypts all data in transit and at rest, and never trains models on your private store data. Full documents are available on request.</p><button class="btn primary block" id="okb">Got it</button>`
};
const done={trial:['You\'re in! 🎉','Check your inbox — your workspace is being prepared.'],signin:['Signed in','Loading your dashboard…'],sales:['Message sent','Thanks! We\'ll reply within one business day.']};
document.addEventListener('click',e=>{
  const b=e.target.closest('[data-open]');if(!b)return;e.preventDefault();
  const k=b.dataset.open;openModal(forms[k]());
  const f=$('#f');if(f)f.onsubmit=ev=>{ev.preventDefault();const btn=$('button',f);btn.textContent='Please wait…';btn.disabled=true;setTimeout(()=>success(...done[k]),700)};
  const ok=$('#okb');if(ok)ok.onclick=closeModal;
});

/* ---------- hero ---------- */
const heroTitles=['Insulated Stainless Steel Water Bottle 32oz – Leakproof Lid, Keeps Drinks Cold 24h / Hot 12h, BPA-Free, Fits Cup Holders','Vacuum Insulated 32 oz Sports Bottle with Straw Lid – Dishwasher Safe, Wide Mouth, Gym & Hiking'];
(function typer(){let i=0,j=0,del=false;const el=$('#heroTitle'),st=$('#heroStatus');const msgs=['Reading 1,284 reviews','Scanning 12 competitors','Mining search trends','Drafting new title'];
 setInterval(()=>{st.textContent=msgs[Math.floor(Date.now()/2500)%msgs.length]},500);
 (function tick(){const t=heroTitles[i];el.textContent=t.slice(0,j);
  if(!del&&j<t.length){j++;return setTimeout(tick,28)}
  if(!del){del=true;return setTimeout(tick,2200)}
  if(j>0){j-=2;if(j<0)j=0;return setTimeout(tick,10)}
  del=false;i=(i+1)%heroTitles.length;setTimeout(tick,300)})()})();
$('#heroForm').onsubmit=e=>{e.preventDefault();const u=$('#heroUrl').value;toast('Fetching listing…');setTimeout(()=>{$('#demo').scrollIntoView({behavior:'smooth'});setTimeout(()=>{select(0);run(u)},700)},600)};

/* ---------- counters & reveal ---------- */
const io=new IntersectionObserver(es=>es.forEach(en=>{if(!en.isIntersecting)return;const t=en.target;io.unobserve(t);
  if(t.dataset.count){const n=+t.dataset.count,d=+(t.dataset.dec||0),s=t.dataset.suffix||'',st=performance.now();(function f(now){const p=Math.min(1,(now-st)/1400),e=1-Math.pow(1-p,3);t.textContent=(n*e).toFixed(d)+s;if(p<1)requestAnimationFrame(f)})(st)}
  else t.classList.add('in')}),{threshold:.2});
$$('[data-count]').forEach(el=>io.observe(el));
$$('.feat,.st,figure,.plan,.kpi').forEach(el=>{el.classList.add('reveal');io.observe(el)});

/* ---------- demo data ---------- */
const P=[
{id:'bottle',emoji:'🍶',bg:'#e0e7ff',name:'Steel Water Bottle 32oz',cat:'Sports & Outdoors',
 title:'Water Bottle Stainless Steel 32oz',score:48,
 subs:[['Title',42],['Description',55],['Specs',38],['Keywords',51],['Imagery',66],['Reviews',44]],
 issues:[['high','Title is under-optimized','Only 33 characters used of 200. Missing material, use case and key benefit keywords.'],
  ['high','Missing 6 key attributes','No capacity in ml, lid type, BPA-free claim, dishwasher safety, dimensions or weight.'],
  ['med','Bullets lack benefits','3 of 5 bullets list features without explaining customer value.'],
  ['med','No answer to top buyer question','"Does it fit in a car cup holder?" appears in 41 Q&As but not in the listing.'],
  ['low','Only 5 images','Top competitors average 9, including a size comparison and lifestyle shots.']],
 reviews:{neg:[['Lid leaks when tipped',31],['Hard to clean inside',19],['Dents easily',12],['Too heavy to carry',8]],pos:[['Keeps drinks cold',64],['Good size',37],['Nice colours',22]],
  q:[['“Leaks in my gym bag every single time. Had to stop using it.”','★★ · Verified purchase'],['“Cold for 24h as promised, but the mouth is too narrow to clean.”','★★★ · Verified purchase']]},
 comps:[['HydroPeak 32oz','$27.99','4.6','24h cold'],['TrailMate 32oz','$24.99','4.5','Leakproof'],['FlaskCo Pro','$31.99','4.7','Wide mouth']],me:['Your listing','$22.99','3.9','—'],
 kws:[['insulated water bottle',34],['leakproof water bottle',58],['bottle with straw lid',41],['gym water bottle 32 oz',27]],
 newTitle:'Insulated Stainless Steel Water Bottle 32oz – 100% Leakproof Lid, Wide Mouth for Easy Cleaning, Keeps Cold 24h / Hot 12h, BPA-Free, Fits Cup Holders',
 bullets:['LEAKPROOF GUARANTEE – Double-sealed silicone lid stays dry in gym bags, even upside down.','24H COLD / 12H HOT – Double-wall vacuum insulation for all-day temperature control.','WIDE MOUTH, EASY CLEAN – 2.7" opening fits ice cubes and a scrubber; dishwasher safe.','CUP-HOLDER FRIENDLY – Tapered 2.9" base fits most cars, bikes and backpack pockets.','DENT-RESISTANT 18/8 STEEL – Powder-coat finish with lifetime support.'],
 desc:'Built for people who refuse to settle for soggy bags and lukewarm water. The 32oz Listwise-optimized bottle pairs a truly leakproof lid with a wide, scrub-friendly mouth…',lift:'+24%'},
{id:'serum',emoji:'🧴',bg:'#fce7f3',name:'Vitamin C Face Serum',cat:'Beauty & Personal Care',
 title:'Vitamin C Serum for Face 1oz',score:57,
 subs:[['Title',60],['Description',48],['Specs',52],['Keywords',64],['Imagery',70],['Reviews',49]],
 issues:[['high','Ingredients not highlighted','Hyaluronic acid and 20% L-ascorbic acid are buried in paragraph 4.'],
  ['high','Skin-type compatibility missing','Reviewers ask 63 times if it suits sensitive skin.'],
  ['med','No usage instructions','Add AM/PM routine and patch-test guidance.'],
  ['med','Claims need softening','"Removes wrinkles" may violate marketplace policy.'],
  ['low','No before/after-style imagery','Compliant lifestyle shots lift CTR by ~9% in this category.']],
 reviews:{neg:[['Stings on sensitive skin',28],['Oxidizes (turns orange)',22],['Dropper breaks',11],['Strong smell',9]],pos:[['Glowing skin in 2 weeks',58],['Lightweight texture',33],['Good value',26]],
  q:[['“Works great but turned dark orange after a month.”','★★★ · Verified purchase'],['“Burned my cheeks. Maybe fine for oily skin only?”','★★ · Verified purchase']]},
 comps:[['GlowLab C-20','$29.00','4.5','Fragrance free'],['DermaPure 20%','$25.00','4.4','Airless pump'],['Lumi Skin','$34.00','4.6','Sensitive safe']],me:['Your listing','$21.00','4.0','—'],
 kws:[['vitamin c serum for face',22],['brightening serum',36],['serum for sensitive skin',63],['hyaluronic acid serum',29]],
 newTitle:'20% Vitamin C Serum for Face with Hyaluronic Acid & Vitamin E – Brightening, Even Tone, Fragrance-Free, Airless Pump, 1 fl oz',
 bullets:['BRIGHTER-LOOKING SKIN – 20% stabilized vitamin C helps visibly even tone and radiance.','HYDRATES AS IT BRIGHTENS – Hyaluronic acid and vitamin E for a smooth, dewy finish.','FRAGRANCE-FREE & GENTLE – Dermatologist-tested; patch test recommended for sensitive skin.','AIRLESS PUMP – Prevents oxidation so your serum stays clear and potent.','SIMPLE ROUTINE – 2–3 drops each morning before moisturizer and SPF.'],
 desc:'Skin care shouldn\'t be a gamble. Our stabilized vitamin C formula lives in an airless pump so it stays fresh from the first drop to the last…',lift:'+31%'},
{id:'shoe',emoji:'👟',bg:'#dcfce7',name:'Trail Running Shoes',cat:'Footwear · Shopify',
 title:'Men Trail Shoes Black',score:41,
 subs:[['Title',30],['Description',44],['Specs',36],['Keywords',40],['Imagery',58],['Reviews',52]],
 issues:[['high','Title lacks search terms','No “trail running”, “waterproof” or gender/size keywords.'],
  ['high','Sizing confusion','52 reviews say shoes run half a size small — not mentioned anywhere.'],
  ['med','Missing technical specs','Drop, weight, outsole lug depth and cushioning not listed.'],
  ['med','Description is generic','Copy matches 3 competitors almost word-for-word.'],
  ['low','Alt text missing','0 of 7 product images have descriptive alt text.']],
 reviews:{neg:[['Runs half size small',34],['Laces come undone',17],['Not truly waterproof',13],['Sole wears fast',7]],pos:[['Great grip on wet rock',49],['Comfortable out of box',41],['Looks good',24]],
  q:[['“Order a size up! Toes hit the front on downhills.”','★★★ · Verified purchase'],['“Grip is incredible but the laces keep untying.”','★★★★ · Verified purchase']]},
 comps:[['TerraRun X','$119','4.6','Gore-Tex'],['Ridgeline 3','$99','4.4','Vibram sole'],['Summit Pro','$129','4.7','Rock plate']],me:['Your listing','$109','4.1','—'],
 kws:[['trail running shoes men',31],['waterproof trail shoes',47],['hiking running shoes',18],['best trail shoes wide',39]],
 newTitle:'Men\'s Waterproof Trail Running Shoes – Grippy Lug Outsole, Cushioned 6mm Drop, Breathable Mesh, Black (Runs Half Size Small – Size Up)',
 bullets:['AGGRESSIVE 5MM LUGS – Dig into wet rock, mud and loose gravel with confidence.','WATER-RESISTANT UPPER – Bonded membrane keeps light rain and puddles out.','SIZING GUIDE – Runs ~½ size small; order one size up for a thumb-width toe box.','LOCK-DOWN LACES – Added lace garage stops loosening on technical descents.','LIGHT & CUSHIONED – 285g (size 9) with 6mm drop for long-mile comfort.'],
 desc:'Whether you\'re chasing a sunrise summit or grinding through mud at mile 18, these shoes are built to keep you stable and dry…',lift:'+28%'}];

/* ---------- demo ---------- */
let cur=0,running=false;
$('#samples').innerHTML=P.map((p,i)=>`<button class="sample${i?'':' on'}" data-i="${i}"><span class="th" style="background:${p.bg}">${p.emoji}</span><div><b>${p.name}</b><span>${p.cat}</span></div></button>`).join('');
function select(i){if(running)return;cur=i;$$('.sample').forEach((s,k)=>s.classList.toggle('on',k===i))}
$('#samples').onclick=e=>{const s=e.target.closest('.sample');if(s)select(+s.dataset.i)};
$('#runBtn').onclick=()=>run();
const STEPS=['Fetching listing content & specs','Auditing title, bullets and description','Analyzing customer reviews','Comparing competitor positioning','Scanning search & demand trends','Generating optimized content'];
function run(){
  if(running)return;running=true;const p=P[cur];
  $('#demoEmpty').hidden=true;$('#results').hidden=true;$('#progress').hidden=false;
  $('#progTitle').textContent='Analyzing “'+p.name+'”';
  const ol=$('#steps');ol.innerHTML=STEPS.map(s=>`<li>${s}</li>`).join('');const lis=$$('li',ol),bar=$('#bar');bar.style.width='0';
  $('#runBtn').disabled=true;let i=0;
  (function next(){ if(i>0)lis[i-1].className='done'; if(i===lis.length){bar.style.width='100%';return setTimeout(finish,400)}
    lis[i].className='run';bar.style.width=((i+.5)/lis.length*100)+'%';i++;setTimeout(next,650+Math.random()*350)})();
}
const col=v=>v>=70?'var(--ok)':v>=50?'var(--warn)':'var(--bad)';
function finish(){
  const p=P[cur];running=false;$('#runBtn').disabled=false;$('#progress').hidden=true;$('#results').hidden=false;
  $('#p-audit').innerHTML=`<div class="audit-top"><div class="ring" style="--v:${p.score};--c:${col(p.score)}"><b>${p.score}</b></div><div><h4 style="margin-bottom:10px">Listing health: ${p.score<50?'Needs work':'Fair'}</h4><div class="subs">${p.subs.map(([n,v])=>`<div class="sub"><div><span>${n}</span><span>${v}</span></div><i><u style="--c:${col(v)}" data-w="${v}"></u></i></div>`).join('')}</div></div></div><h4>${p.issues.length} issues found</h4><div class="issues">${p.issues.map(([s,t,d])=>`<div class="issue"><span class="sev ${s}">${s==='med'?'Medium':s}</span><div><b>${t}</b><span>${d}</span></div></div>`).join('')}</div>`;
  const th=(arr,c)=>arr.map(([n,v])=>`<div class="theme ${c}"><span>${n}</span><i><u data-w="${v}"></u></i><em>${v}%</em></div>`).join('');
  $('#p-reviews').innerHTML=`<h4>Top complaints</h4><div class="themes">${th(p.reviews.neg,'neg')}</div><h4>What customers love</h4><div class="themes">${th(p.reviews.pos,'pos')}</div><h4>Sample voices</h4>${p.reviews.q.map(([a,b])=>`<div class="quote">${a}<small>${b}</small></div>`).join('')}`;
  $('#p-market').innerHTML=`<h4>Competitor positioning</h4><table class="cmp"><tr><th>Product</th><th>Price</th><th>Rating</th><th>Hook claim</th></tr>${p.comps.map(c=>`<tr>${c.map(x=>`<td>${x}</td>`).join('')}</tr>`).join('')}<tr class="me">${p.me.map(x=>`<td>${x}</td>`).join('')}</tr></table><h4>Rising search terms (90-day growth)</h4><div class="kws">${p.kws.map(([k,g])=>`<span class="kw">${k}<b>▲ ${g}%</b></span>`).join('')}</div>`;
  $('#p-rewrite').innerHTML=`<div class="rw"><div class="rw-box"><h5>Current title</h5><p><s>${p.title}</s></p></div><div class="rw-box new"><h5><span>✨ Optimized title</span><span>${p.newTitle.length} chars</span></h5><p>${p.newTitle}</p></div><div class="rw-box new"><h5>Optimized highlights</h5><ul>${p.bullets.map(b=>`<li>${b}</li>`).join('')}</ul></div><div class="rw-box new"><h5>Description opener</h5><p>${p.desc}</p></div><p class="tiny muted">Projected conversion lift: <b style="color:var(--ok)">${p.lift}</b> based on similar listings.</p><div class="actions"><button class="btn primary" id="pub">Approve &amp; publish</button><button class="btn out" id="cp">Copy all</button></div></div>`;
  $('#pub').onclick=function(){this.textContent='Publishing…';setTimeout(()=>{this.textContent='✓ Published';this.disabled=true;toast('Changes sent to your store')},900)};
  $('#cp').onclick=()=>{const t=p.newTitle+'\n\n'+p.bullets.join('\n')+'\n\n'+p.desc;(navigator.clipboard?navigator.clipboard.writeText(t):Promise.reject()).then(()=>toast('Copied to clipboard'),()=>toast('Press Ctrl+C to copy'))};
  setTab('audit');
}
function setTab(t){$$('#tabs button').forEach(b=>b.classList.toggle('on',b.dataset.tab===t));$$('.pane').forEach(p=>p.classList.toggle('on',p.id==='p-'+t));
  requestAnimationFrame(()=>requestAnimationFrame(()=>$$('#p-'+t+' [data-w]').forEach(u=>u.style.width=u.dataset.w+'%')))}
$('#tabs').onclick=e=>{const b=e.target.closest('button');if(b)setTab(b.dataset.tab)};

/* ---------- dashboard ---------- */
let range=30,metric='sessions';
const M={sessions:{n:'Sessions',base:1200,gr:42,fmt:v=>Math.round(v).toLocaleString()},conv:{n:'Conversion rate',base:6.1,gr:55,fmt:v=>v.toFixed(1)+'%'},revenue:{n:'Revenue',base:3100,gr:60,fmt:v=>'$'+Math.round(v).toLocaleString()}};
function seed(i){const x=Math.sin(i*9301+49297)*233280;return x-Math.floor(x)}
function series(n,m){const c=M[m];return Array.from({length:n},(_,i)=>{const t=i/(n-1);return c.base*(1+c.gr/100*Math.pow(t,1.3))*(1+(seed(i+m.length)-.5)*.12)})}
const EVENTS=[{f:.28,t:'Title rewrite published'},{f:.62,t:'Bullets updated from review insights'},{f:.85,t:'New keywords added'}];
function drawDash(){
  const c=M[metric],n=range,d=series(n,metric),mx=Math.max(...d)*1.1,mn=Math.min(...d)*.85,W=800,H=260,px=20,py=20;
  const X=i=>px+i/(n-1)*(W-2*px),Y=v=>H-py-(v-mn)/(mx-mn)*(H-2*py);
  const pts=d.map((v,i)=>[X(i),Y(v)]),line=pts.map((p,i)=>(i?'L':'M')+p[0].toFixed(1)+' '+p[1].toFixed(1)).join('');
  let g='';for(let k=0;k<5;k++){const y=py+k*(H-2*py)/4;g+=`<line x1="${px}" x2="${W-px}" y1="${y}" y2="${y}" stroke="#e2e8f0" stroke-dasharray="3 4"/>`}
  const ev=EVENTS.map(e=>{const i=Math.round(e.f*(n-1)),x=X(i);return `<line x1="${x}" x2="${x}" y1="${py}" y2="${H-py}" stroke="#a5b4fc" stroke-dasharray="4 4"/><circle cx="${x}" cy="${pts[i][1]}" r="6" fill="#fff" stroke="#4f46e5" stroke-width="3"><title>${e.t}</title></circle>`}).join('');
  $('#chart').innerHTML=`<defs><linearGradient id="gr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6366f1" stop-opacity=".35"/><stop offset="1" stop-color="#6366f1" stop-opacity="0"/></linearGradient></defs>${g}<path d="${line}L${W-px} ${H-py}L${px} ${H-py}Z" fill="url(#gr)"/><path id="ln" d="${line}" fill="none" stroke="#4f46e5" stroke-width="3" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>${ev}<line id="cl" y1="${py}" y2="${H-py}" stroke="#94a3b8" opacity="0"/>`;
  const ln=$('#ln'),L=ln.getTotalLength?ln.getTotalLength():0;if(L){ln.style.strokeDasharray=L;ln.style.strokeDashoffset=L;ln.getBoundingClientRect();ln.style.transition='stroke-dashoffset 1s ease';ln.style.strokeDashoffset=0}
  const first=d[0],last=d[n-1],delta=(last/first-1)*100;
  const tot=d.reduce((a,b)=>a+b,0);
  $('#kpis').innerHTML=[[c.n+' (latest)',c.fmt(last),delta],['Avg. listing score','86',+38],['Listings optimized','128',+17],['Est. added revenue','$'+Math.round(tot*.18*(metric==='revenue'?1:2.4)).toLocaleString(),+22]].map(([a,b,dd])=>`<div class="kpi in"><small>${a}</small><b>${b}</b><span class="up">▲ ${Math.round(dd)}%</span></div>`).join('');
  const ch=$('#chart'),tip=$('#tip'),wrap=ch.parentElement;
  ch.onmousemove=ch.ontouchmove=e=>{const r=ch.getBoundingClientRect(),cx=(e.touches?e.touches[0].clientX:e.clientX)-r.left,i=Math.max(0,Math.min(n-1,Math.round((cx/r.width*W-px)/(W-2*px)*(n-1))));
    const dt=new Date(2026,10,2-(n-1-i)),lab=dt.toLocaleDateString('en',{month:'short',day:'numeric'});tip.hidden=false;tip.style.left=(10+X(i)/W*(r.width))+'px';tip.style.top=(10+pts[i][1]/H*r.height)+'px';tip.textContent=lab+' · '+c.fmt(d[i])};
  ch.onmouseleave=()=>tip.hidden=true;
}
$('#range').onclick=e=>{const b=e.target.closest('button');if(!b)return;range=+b.dataset.r;$$('#range button').forEach(x=>x.classList.toggle('on',x===b));drawDash()};
$('#metric').onclick=e=>{const b=e.target.closest('button');if(!b)return;metric=b.dataset.m;$$('#metric button').forEach(x=>x.classList.toggle('on',x===b));drawDash()};
const RECS=[['Title','Refresh “Trail Running Shoes” title','Rising query “waterproof trail shoes” (+47%) is not in your title.'],['Content','Add sizing note to 14 footwear listings','Sizing is the #1 complaint across the category.'],['Pricing','Reposition vs. HydroPeak','Competitor dropped price 8%; your value claims can offset it.']];
$('#recList').innerHTML=RECS.map(([t,a,b],i)=>`<div class="rec" id="r${i}"><span class="tag">${t}</span><p><b>${a}</b><span>${b}</span></p><button class="btn out" data-r="${i}">Apply</button></div>`).join('');
$('#recList').onclick=e=>{const b=e.target.closest('button');if(!b)return;b.textContent='Applying…';b.disabled=true;setTimeout(()=>{b.textContent='Applied ✓';$('#r'+b.dataset.r).classList.add('done');toast('Suggestion queued for approval')},700)};
const dio=new IntersectionObserver(es=>{if(es[0].isIntersecting){drawDash();dio.disconnect()}},{threshold:.2});dio.observe($('#dashboard'));

/* ---------- pricing ---------- */
let yearly=false,count=store.get('lcount',100);
const lr=$('#lrange');lr.value=count;
const PLANS=[
 {n:'Starter',d:'For single-brand sellers getting started.',min:1,max:100,per:.49,base:19,f:['Up to 100 listings','Listing audit & gap detection','Review insights','1 marketplace connection','Email support']},
 {n:'Growth',d:'For growing brands that want continuous improvement.',min:1,max:500,per:.39,base:49,pop:1,f:['Up to 500 listings','Everything in Starter','Competitor radar & trends','Weekly auto-optimization','Performance tracking','Priority support']},
 {n:'Scale',d:'For agencies and large catalogs.',min:1,max:2000,per:.29,base:149,f:['Up to 2,000 listings','Everything in Growth','Unlimited workspaces','White-label reports','Approval workflows & roles','Dedicated success manager']}];
function drawPlans(){
  $('#lcount').textContent=count.toLocaleString();
  $('#plans').innerHTML=PLANS.map(p=>{const ok=count<=p.max;let price=Math.round(p.base+p.per*count);if(yearly)price=Math.round(price*.8);
   return `<div class="plan${p.pop?' pop':''}${ok?'':' off'}">${p.pop?'<span class="badge">Most popular</span>':''}<h3>${p.n}</h3><div class="d">${p.d}</div><div class="pr">$${price.toLocaleString()}<small>/mo</small></div><div class="per">${ok?`for ${count.toLocaleString()} listings${yearly?' · billed yearly':''}`:`Max ${p.max.toLocaleString()} listings`}</div><ul>${p.f.map(x=>`<li>${x}</li>`).join('')}</ul><button class="btn ${p.pop?'primary':'out'} block" ${ok?'data-open="trial"':'disabled'}>${ok?'Start free trial':'Over plan limit'}</button></div>`}).join('');
  $$('#plans .plan').forEach(x=>x.classList.add('in'));
}
lr.oninput=()=>{count=+lr.value;store.set('lcount',count);drawPlans()};
$('#bill').onclick=e=>{const b=e.target.closest('button');if(!b)return;yearly=b.dataset.b==='y';$$('#bill button').forEach(x=>x.classList.toggle('on',x===b));drawPlans()};
drawPlans();
})();
