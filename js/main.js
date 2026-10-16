(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const EMAIL = 'haseeb.79e@gmail.com';

  // Theme (remembered, falls back safely if storage is blocked)
  const root = document.documentElement;
  try { const t = localStorage.getItem('theme'); if (t) root.dataset.theme = t; } catch (e) {}
  const themeBtn = $('#themeBtn');
  const syncIcon = () => themeBtn.textContent = root.dataset.theme === 'dark' ? '☀' : '☾';
  syncIcon();
  themeBtn.onclick = () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('theme', root.dataset.theme); } catch (e) {}
    syncIcon();
  };

  // Mobile menu
  const menu = $('#menu');
  $('#burger').onclick = () => menu.classList.toggle('open');
  $$('#menu a').forEach(a => a.onclick = () => menu.classList.remove('open'));

  // Typing role rotator
  const roles = ['Flutter Developer', 'AI Enthusiast', 'Full Stack Developer'];
  const el = $('#role');
  let r = 0, c = 0, del = false;
  (function type() {
    const word = roles[r];
    el.textContent = word.slice(0, c);
    if (!del && c === word.length) { del = true; return setTimeout(type, 1400); }
    if (del && c === 0) { del = false; r = (r + 1) % roles.length; }
    c += del ? -1 : 1;
    setTimeout(type, del ? 45 : 90);
  })();

  // Scroll animations: play on every entry, reset on exit, so they replay
  // in both scroll directions. Elements that leave through the top come back
  // in from above, elements that leave through the bottom come back from below.
  const targets = $$('.title, .card, .chip, .hero-text, .stage');
  targets.forEach(t => {
    t.classList.add('reveal');
    const i = [...t.parentElement.children].indexOf(t);
    t.style.setProperty('--delay', (i % 4) * 0.08 + 's');
  });
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      const t = e.target;
      if (e.isIntersecting) {
        t.classList.add('show');
      } else {
        t.classList.toggle('from-top', e.boundingClientRect.top < 0);
        t.classList.remove('show');
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  targets.forEach(t => io.observe(t));

  // 3D tilt on cards (skipped on touch devices)
  if (matchMedia('(hover:hover)').matches) {
    $$('[data-tilt]').forEach(card => {
      card.addEventListener('mousemove', e => {
        const b = card.getBoundingClientRect();
        const x = (e.clientX - b.left) / b.width - 0.5;
        const y = (e.clientY - b.top) / b.height - 0.5;
        card.style.transform = `perspective(800px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) translateZ(8px)`;
      });
      card.addEventListener('mouseleave', () => card.style.transform = '');
    });

    // Avatar follows the mouse in 3D
    const stage = $('#stage'), avatar = $('#avatar');
    stage.addEventListener('mousemove', e => {
      const b = stage.getBoundingClientRect();
      const x = (e.clientX - b.left) / b.width - 0.5;
      const y = (e.clientY - b.top) / b.height - 0.5;
      avatar.style.transform = `rotateY(${x * 24}deg) rotateX(${-y * 24}deg)`;
    });
    stage.addEventListener('mouseleave', () => avatar.style.transform = '');
  }

  // Contact form opens a Gmail compose window in the browser
  $('#contactForm').addEventListener('submit', e => {
    e.preventDefault();
    const f = new FormData(e.target);
    const body = `${f.get('msg')}\n\nFrom: ${f.get('name')} (${f.get('email')})`;
    const url = 'https://mail.google.com/mail/?view=cm&to=' + EMAIL +
      '&su=' + encodeURIComponent('Portfolio message from ' + f.get('name')) +
      '&body=' + encodeURIComponent(body);
    window.open(url, '_blank', 'noopener');
  });

  $('#year').textContent = new Date().getFullYear();
})();
