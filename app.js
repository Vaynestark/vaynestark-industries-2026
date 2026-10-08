'use strict';
const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
let motionPaused = reducedMotion.matches;
try { motionPaused = reducedMotion.matches || localStorage.getItem('vayne-motion') === 'off'; } catch {}
function setMotion(paused) {
  motionPaused = paused;
  document.documentElement.classList.toggle('motion-off', paused);
  document.documentElement.classList.toggle('js-motion', !paused);
  $('#motion').setAttribute('aria-pressed', String(paused));
  $('#motion').title = paused ? 'Enable animations' : 'Pause animations';
  $('.motion-label').textContent = paused ? 'Motion off' : 'Motion on';
  $('.motion-icon').textContent = paused ? '▶' : 'II';
}
setMotion(motionPaused);
$('#motion').addEventListener('click', () => { setMotion(!motionPaused); try { localStorage.setItem('vayne-motion', motionPaused ? 'off' : 'on'); } catch {} });
reducedMotion.addEventListener('change', e => setMotion(e.matches));
document.addEventListener('visibilitychange', () => document.body.classList.toggle('page-hidden', document.hidden));
const reveals = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); reveals.unobserve(entry.target); } }), { threshold: .08 });
$$('.reveal').forEach(el => reveals.observe(el));
const navObserver = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) $$('nav a').forEach(a => a.classList.toggle('active', a.hash === '#' + entry.target.id)); }), { rootMargin: '-15% 0px -55% 0px' });
$$('main>section').forEach(el => navObserver.observe(el));
function closeMenu() { $('nav').classList.remove('open'); $('.menu').setAttribute('aria-expanded', 'false'); $('.menu').setAttribute('aria-label', 'Open navigation'); }
$('.menu').addEventListener('click', () => { const open = $('nav').classList.toggle('open'); $('.menu').setAttribute('aria-expanded', String(open)); $('.menu').setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation'); });
$$('nav a').forEach(a => a.addEventListener('click', closeMenu));
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
$$('[data-filter]').forEach(button => button.addEventListener('click', () => {
  $$('[data-filter]').forEach(b => { b.classList.toggle('selected', b === button); b.setAttribute('aria-pressed', String(b === button)); });
  let count = 0;
  $$('.project-card').forEach(card => { card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter; if (!card.hidden) { count++; card.classList.add('visible'); } });
  $('#project-count').textContent = `${count} exploration${count === 1 ? '' : 's'}`;
}));
const projects = {
  electra: { name:'ELECTRA', kind:'Software', subtitle:'Commerce & repair systems', image:'workbench.webp', color:'#e6b377', description:'A connected approach to the everyday complexity of electronics businesses. Bring the counter, the workbench, and the stockroom into one understandable system.', features:[['Inventory that stays connected','A single view of parts, products, and stock movements, designed around the realities of repair work.'],['Repair workflows with context','Track a device from intake and diagnosis through parts, service, and handover. Keep the history with the job.'],['Operations made visible','Connect customer context, repair status, and commercial activity so the next action is clear.']] },
  kubera: { name:'KUBERA', kind:'Quantitative research', subtitle:'Autonomous trading & capital allocation', image:null, color:'#8bceee', description:'A research direction exploring the full path from a market hypothesis to a measurable strategy, with risk constraints at the centre of every decision.', features:[['Research before execution','Define the hypothesis, data assumptions, and evaluation criteria before considering a live strategy.'],['Risk as a system constraint','Explore allocation limits, exposure controls, and explicit conditions for stopping a strategy.'],['Repeatable evaluation','Compare backtests, account for trading costs, and investigate how strategies respond when conditions change.']] },
  kaylan: { name:'KAYLAN', kind:'Intelligent systems', subtitle:'Personal AI director', image:'compute.webp', color:'#d7a3f3', description:'An exploration of AI that can turn intent into a coherent plan. Specialized roles, shared context, and human oversight form the foundation.', features:[['A clear chain of responsibility','Separate planning, coordination, and execution into understandable roles with explicit handoffs.'],['Memory with purpose','Keep relevant context accessible while making decisions and their supporting information traceable.'],['Oversight at the right moment','Define action boundaries, verify results, and bring consequential decisions back to the person in control.']] },
  labs: { name:'VAYNE LABS', kind:'Experimental R&D', subtitle:'A space for the unproven', image:'atrium.webp', color:'#a1d7c7', description:'Some ideas need room before they need a roadmap. Vayne Labs is the space for early experiments, unfamiliar domains, and questions worth testing.', features:[['Small, focused prototypes','Build enough to test a technical assumption and reveal the next useful question.'],['New intersections','Explore what becomes possible when software, physical systems, and research meet.'],['Long-term curiosity','Document findings, keep useful components, and let evidence determine which ideas deserve to grow.']] }
};
const notes = {
 constraints: { category:'Engineering / Field note 01', title:'Start with constraints. Build with intention.', paragraphs:[['A useful first version answers a question.','Before choosing a framework or drawing the interface, identify what needs to be learned. A narrow prototype can reveal whether the idea is useful, whether the data is available, or whether the workflow makes sense.'],['Constraints are design material.','Time, hardware, attention, and reliability all shape a system. Making these limits explicit early helps the architecture serve its purpose. A fast, understandable tool often creates more room for progress than a broad system that is difficult to change.'],['Keep the learning loop short.','Choose one complete path through the problem. Build it, observe the outcome, and write down what changed your understanding. Expand when the evidence supports it.']] },
 intelligence: { category:'Intelligence / Field note 02', title:'Useful intelligence needs boundaries.', paragraphs:[['Capability needs direction.','An agent can propose a plan, gather context, and use tools. Those capabilities become useful when the goal, available actions, and conditions for success are clear.'],['Separate planning from permission.','A good plan does not automatically authorize every action inside it. Systems should distinguish reversible exploration from consequential changes, and make the boundary visible to the person responsible.'],['Make the result inspectable.','Preserve enough context to explain what happened. Verification, clear handoffs, and accessible history help people evaluate an outcome and recover when something goes wrong.']] },
 horizon: { category:'Studio thinking / Field note 03', title:'The case for a longer horizon.', paragraphs:[['The first release is a beginning.','A working prototype proves that something is possible. A durable system remains useful as requirements change, dependencies age, and new people take responsibility for it.'],['Understandability compounds.','Clear names, explicit boundaries, and concise documentation make future work easier. The time spent simplifying a system can return value every time someone needs to change it.'],['Keep what you learn.','Not every experiment needs to become a product. A discarded prototype can still leave behind a better question, a reusable component, or an assumption that no longer needs to be made. That knowledge is part of the work.']] }
};
const detail = $('#detail');
let opener = null;
let returnHash = '#projects';
let previousHash = location.hash || '#studio';
function renderRoute() {
  const hash = location.hash;
  const match = hash.match(/^#(project|note)\/([a-z]+)$/);
  if (!match) { if (detail.open) detail.close(); document.title = 'Vayne Stark Industries — Independent Invention Studio'; previousHash = hash; return; }
  const item = match[1] === 'project' ? projects[match[2]] : notes[match[2]];
  if (!item) { history.replaceState(null, '', '#projects'); if (detail.open) detail.close(); return; }
  if (!detail.open) { opener = document.activeElement; returnHash = previousHash && !previousHash.includes('/') ? previousHash : (match[1] === 'project' ? '#projects' : '#journal'); }
  if (match[1] === 'project') {
    $('#detail-content').innerHTML = `<div class="detail-hero" style="--accent:${item.color};${item.image ? '' : 'background:radial-gradient(ellipse at 90% 30%,#123954,#080b0c 75%)'}">${item.image ? `<img src="assets/${item.image}" alt="" width="1800" height="1024">` : ''}<div><p class="eyebrow">Projects / ${item.kind}</p><h2 id="detail-title">${item.name}</h2><h3>${item.subtitle}</h3><p>${item.description}</p></div></div><div class="detail-body"><h3>The system in focus.</h3><div class="detail-features">${item.features.map(([title,text]) => `<section><h4>${title}</h4><p>${text}</p></section>`).join('')}</div><div class="detail-foot"><span>Explore the thinking. Follow the work.</span><a href="https://github.com/Vaynestark" target="_blank" rel="noopener">Vayne Stark on GitHub</a></div></div>`;
    document.title = `${item.name} — Vayne Stark Industries`;
  } else {
    $('#detail-content').innerHTML = `<article class="article"><p class="eyebrow">${item.category}</p><h2 id="detail-title">${item.title}</h2>${item.paragraphs.map(([title,text]) => `<h3>${title}</h3><p>${text}</p>`).join('')}<p class="article-end">Vayne Stark Industries / Studio journal</p></article>`;
    document.title = `${item.title} — Vayne Stark Industries`;
  }
  if (!detail.open) detail.showModal();
  detail.scrollTop = 0;
  $('#close-detail').focus({preventScroll:true});
  previousHash = hash;
}
function closeDetail() {
  history.replaceState(null, '', returnHash);
  detail.close();
  document.title = 'Vayne Stark Industries — Independent Invention Studio';
  previousHash = returnHash;
  if (opener instanceof HTMLElement && opener !== document.body) opener.focus({preventScroll:true});
}
$('#close-detail').addEventListener('click', closeDetail);
detail.addEventListener('cancel', e => { e.preventDefault(); closeDetail(); });
detail.addEventListener('click', e => { if (e.target === detail) { const r = detail.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) closeDetail(); } });
window.addEventListener('hashchange', renderRoute);
renderRoute();
