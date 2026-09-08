// Mobile navigation toggle only — no animation logic, per design brief.
const menuBtn = document.getElementById('menuBtn');
const navlinks = document.getElementById('navlinks');

if (menuBtn && navlinks) {
  menuBtn.addEventListener('click', () => {
    navlinks.classList.toggle('open');
  });

  navlinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navlinks.classList.remove('open'));
  });
}
