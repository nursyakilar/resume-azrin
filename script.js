  // Theme toggle
  const themeToggle = document.getElementById('themeToggle');
  const root = document.documentElement;
  const savedTheme = null;
  function applyTheme(t){
    if(t === 'dark'){ root.setAttribute('data-theme','dark'); }
    else { root.removeAttribute('data-theme'); }
  }
  let currentTheme = 'light';
  applyTheme(currentTheme);
  themeToggle.addEventListener('click', ()=>{
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(currentTheme);
  });

  // Mobile nav
  const hamburger = document.getElementById('hamburger');
  const drawer = document.getElementById('mobileDrawer');
  hamburger.addEventListener('click', ()=> drawer.classList.toggle('open'));
  drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', ()=> drawer.classList.remove('open')));

  // Active nav link on scroll
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.navlinks a');
  function setActive(){
    let current = '';
    sections.forEach(s=>{
      const rect = s.getBoundingClientRect();
      if(rect.top <= 120 && rect.bottom >= 120) current = s.id;
    });
    navAnchors.forEach(a=>{
      a.classList.toggle('active', a.getAttribute('href') === '#'+current);
    });
  }
  window.addEventListener('scroll', setActive);

  // Back to top + scroll reveal
  const backBtn = document.getElementById('backtotop');
  window.addEventListener('scroll', ()=>{
    backBtn.classList.toggle('show', window.scrollY > 500);
  });
  backBtn.addEventListener('click', ()=> window.scrollTo({top:0,behavior:'smooth'}));

  const revealEls = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){ e.target.classList.add('in'); obs.unobserve(e.target); }
    });
  },{threshold:0.12});
  revealEls.forEach(el=> obs.observe(el));

  // Animated counters
  const counters = document.querySelectorAll('[data-count]');
  const counterObs = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'),10);
        let cur = 0;
        const step = Math.max(1, Math.round(target/40));
        const tick = ()=>{
          cur += step;
          if(cur >= target){ el.textContent = target + '+'; }
          else { el.textContent = cur; requestAnimationFrame(tick); }
        };
        tick();
        counterObs.unobserve(el);
      }
    });
  },{threshold:0.4});
  counters.forEach(c=> counterObs.observe(c));
