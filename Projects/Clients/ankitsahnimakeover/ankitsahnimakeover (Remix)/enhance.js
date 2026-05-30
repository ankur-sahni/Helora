// Scroll reveal + counters + cursor + progress + loader controls
(function(){
  // Scroll progress
  const bar = document.createElement('div');
  bar.className = 'scroll-progress';
  document.body.appendChild(bar);
  const onScroll = () => {
    const h = document.documentElement;
    const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
    bar.style.width = pct + '%';
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  // Cursor
  if (matchMedia('(hover: hover) and (pointer: fine)').matches){
    const dot = document.createElement('div'); dot.className = 'cursor-dot';
    const ring = document.createElement('div'); ring.className = 'cursor-ring';
    document.body.append(dot, ring);
    let mx = 0, my = 0, rx = 0, ry = 0;
    window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; dot.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`; });
    (function raf(){
      rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;
      ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
      requestAnimationFrame(raf);
    })();
    document.addEventListener('mouseover', e => {
      if (e.target.closest('a,button,.chip,.craft-card,.gallery-item,input,textarea,select,.ba .handle')){
        document.body.classList.add('cursor-hover');
      } else {
        document.body.classList.remove('cursor-hover');
      }
    });
    window.addEventListener('mouseleave', () => { dot.style.opacity = 0; ring.style.opacity = 0; });
    window.addEventListener('mouseenter', () => { dot.style.opacity = 1; ring.style.opacity = 1; });
  }

  // Reveal observer — run repeatedly to catch React-rendered nodes
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting){
        e.target.classList.add('in');
        // Trigger counters inside
        e.target.querySelectorAll('[data-count]').forEach(el => {
          if (el.dataset.done) return;
          el.dataset.done = '1';
          const target = parseFloat(el.dataset.count);
          const suffix = el.dataset.suffix || '';
          const decimals = (el.dataset.count.includes('.') ? 1 : 0);
          const dur = 1400;
          const t0 = performance.now();
          const step = (t) => {
            const p = Math.min(1, (t - t0) / dur);
            const eased = 1 - Math.pow(1 - p, 3);
            const val = target * eased;
            let display;
            if (target >= 1000) display = Math.round(val / 100) / 10 + 'K';
            else display = val.toFixed(decimals);
            el.textContent = display + suffix;
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        });
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  const scan = () => {
    document.querySelectorAll('.reveal:not(.in), .reveal-oval:not(.in), .reveal-stagger:not(.in), .reveal-words:not(.in)').forEach(el => revealObs.observe(el));
  };
  // Scan repeatedly for the first few seconds as React mounts
  let ticks = 0;
  const iv = setInterval(() => { scan(); ticks++; if (ticks > 10) clearInterval(iv); }, 300);
  window.__rescanReveal = scan;

  // Mark hero as loaded after a tick so entrance anim fires
  setTimeout(() => { document.querySelector('.hero')?.classList.add('loaded'); }, 1800);

  // Mobile hamburger menu
  // Toggle body.menu-open so React reconciliation can never fight us
  document.addEventListener('click', (e) => {
    if (e.target.closest('.nav-menu-btn')) {
      e.preventDefault();
      document.body.classList.toggle('menu-open');
    }
    if (e.target.closest('.nav-center a')) {
      document.body.classList.remove('menu-open');
    }
  });

  // Inject hamburger button, re-inject if React removes it
  const injectHamburger = (navRight) => {
    if (navRight.querySelector('.nav-menu-btn')) return;
    const btn = document.createElement('button');
    btn.className = 'nav-menu-btn';
    btn.setAttribute('aria-label', 'Toggle menu');
    btn.setAttribute('type', 'button');
    btn.innerHTML = '<span></span><span></span><span></span>';
    navRight.appendChild(btn);
  };

  const watchNav = (navRight) => {
    injectHamburger(navRight);
    new MutationObserver(() => injectHamburger(navRight)).observe(navRight, { childList: true });
  };

  const nr = document.querySelector('.nav-right');
  if (nr) {
    watchNav(nr);
  } else {
    const bodyObs = new MutationObserver(() => {
      const found = document.querySelector('.nav-right');
      if (found) { bodyObs.disconnect(); watchNav(found); }
    });
    bodyObs.observe(document.body, { childList: true, subtree: true });
  }
})();
