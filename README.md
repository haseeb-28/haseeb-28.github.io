# Portfolio — Setup Instructions

## File structure
```
portfolio/
├── index.html
├── css/style.css
├── js/script.js
├── assets/
│   ├── profile.jpg   ← add your photo here
│   ├── resume.pdf    ← add your resume here
│   └── favicon.png   ← add a small icon here
└── README.md
```

## 1. Add your assets
Drop these three files into `assets/`:
- **profile.jpg** — square, at least 500×500px, well-lit headshot
- **resume.pdf** — your resume
- **favicon.png** — 32×32 or 64×64px icon (your initials on the amber accent works fine)

If `profile.jpg` is missing, the hero shows a fallback "HR" avatar automatically, the site won't break, it just won't look as good.

## 2. Set up EmailJS (required for the contact form to actually send email)
The contact form uses EmailJS because this is a static site (GitHub Pages) with no backend server. Nodemailer/SendGrid require a running server and can't work here.

1. Go to https://www.emailjs.com and create a free account.
2. Add an **Email Service** (connect your Gmail — haseeb.79e@gmail.com).
3. Create an **Email Template** with variables: `{{from_name}}`, `{{from_email}}`, `{{message}}`. Set the template's "To" field to your own email.
4. Copy your **Public Key** (Account settings), **Service ID**, and **Template ID**.
5. Open `js/script.js` and replace the three placeholder values at the top:
   ```js
   const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";
   const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
   const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
   ```
6. Save, redeploy, test the form on the live site (not just locally — some browsers block the request from `file://` URLs).

Free tier is 200 emails/month, which is far more than a portfolio contact form needs.

## 3. Deploy
Push the whole `portfolio/` folder contents to your GitHub Pages repo root (or `haseeb-28.github.io`). No build step needed, it's plain HTML/CSS/JS.

## Notes
- Animations (floating hero art, glowing flagship card, scrolling skill marquee, button shine) loop continuously and don't depend on scroll position.
- `prefers-reduced-motion` is respected — anyone with that OS setting sees a static, non-animated version.
