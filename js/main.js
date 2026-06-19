(() => {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');

  const setHeader = () => header.classList.toggle('scrolled', window.scrollY > 24);
  window.addEventListener('scroll', setHeader, { passive: true });
  setHeader();

  toggle?.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  links?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    links.classList.remove('open');
    toggle?.setAttribute('aria-expanded', 'false');
  }));

  const reveal = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        reveal.unobserve(entry.target);
      }
    });
  }, { threshold: 0.13 });
  document.querySelectorAll('.reveal').forEach(el => reveal.observe(el));

  const parallax = () => {
    document.querySelectorAll('.banner').forEach((banner) => {
      const rect = banner.getBoundingClientRect();
      const offset = Math.round(rect.top * -0.14);
      banner.style.backgroundPosition = `50% ${offset}px`;
    });
  };
  window.addEventListener('scroll', parallax, { passive: true });
  parallax();

  const openModal = (id) => document.getElementById(id)?.classList.remove('hidden');
  const closeModal = (modal) => modal?.classList.add('hidden');
  document.querySelectorAll('[data-modal]').forEach(el => {
    el.addEventListener('click', (event) => {
      event.preventDefault();
      openModal(el.getAttribute('data-modal'));
    });
  });
  document.querySelectorAll('[data-close]').forEach(btn => {
    btn.addEventListener('click', () => closeModal(btn.closest('.modal')));
  });
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (event) => {
      if (event.target === modal) closeModal(modal);
    });
  });
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') document.querySelectorAll('.modal').forEach(closeModal);
  });

  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  const particles = [];
  let width = 0;
  let height = 0;
  let dpr = 1;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = canvas.clientWidth = window.innerWidth;
    height = canvas.clientHeight = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const target = Math.min(95, Math.max(46, Math.floor(width / 18)));
    while (particles.length < target) particles.push(makeParticle());
    particles.length = target;
  }
  function makeParticle() {
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 4.8 + 1.1,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
      alpha: Math.random() * 0.18 + 0.025
    };
  }
  function tick() {
    ctx.clearRect(0, 0, width, height);
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < -20) p.x = width + 20;
      if (p.x > width + 20) p.x = -20;
      if (p.y < -20) p.y = height + 20;
      if (p.y > height + 20) p.y = -20;
      const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4.5);
      grd.addColorStop(0, `rgba(255,255,255,${p.alpha})`);
      grd.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * 4.5, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(tick);
  }
  window.addEventListener('resize', resize);
  resize();
  tick();
})();
