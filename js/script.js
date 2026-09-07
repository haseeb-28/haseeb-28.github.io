/* =========================================================
   EMAILJS CONFIG — replace these three values with your own.
   Get them from https://www.emailjs.com after creating a
   free account, an email service, and a template.
   ========================================================= */
const EMAILJS_PUBLIC_KEY = "l4RKBJbZ2rXRqgiqn";
const EMAILJS_SERVICE_ID = "service_8afa1ys";
const EMAILJS_TEMPLATE_ID = "template_w53142u";

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Init EmailJS
if (window.emailjs && EMAILJS_PUBLIC_KEY !== "YOUR_PUBLIC_KEY") {
  emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
}

// Magnetic hover effect
if (!reduceMotion) {
  document.querySelectorAll('[data-magnet]').forEach(el => {
    const strength = parseFloat(el.dataset.magnet) || 0.3;
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = 'translate(0,0)';
    });
  });

  // Cursor glow
  const glow = document.getElementById('cursorGlow');
  if (glow) {
    window.addEventListener('mousemove', (e) => {
      glow.style.opacity = '1';
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    });
    window.addEventListener('mouseleave', () => { glow.style.opacity = '0'; });
  }
}

// Contact form submission
const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const statusEl = document.getElementById('formStatus');

if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (EMAILJS_PUBLIC_KEY === "YOUR_PUBLIC_KEY") {
      statusEl.textContent = "Email isn't configured yet — add your EmailJS keys in js/script.js.";
      statusEl.className = "form-status error";
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";
    statusEl.textContent = "";
    statusEl.className = "form-status";

    const formData = {
      from_name: document.getElementById('name').value,
      from_email: document.getElementById('email').value,
      message: document.getElementById('message').value,
      to_email: "haseeb.79e@gmail.com"
    };

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formData)
      .then(() => {
        statusEl.textContent = "Message sent. I'll get back to you soon.";
        statusEl.className = "form-status success";
        form.reset();
      })
      .catch((err) => {
        statusEl.textContent = "Something went wrong. Try emailing me directly instead.";
        statusEl.className = "form-status error";
        console.error("EmailJS error:", err);
      })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = "Send Message";
      });
  });
}
