(() => {
  'use strict';

  const skills = [
    "Aerospace Engineering", "Mechanical Engineering", "CAD", "PCB Design",
    "Control Systems Design", "3D Printing", "CFD Simulation", "Embedded Systems",
    "Rocketry (TARC/HPR)",
  ];

  const timeline = [
    { period: "2026 — 2026", role: "Production & Shipping Associate", org: "Fruity Chutes" },
    { period: "JUN 2025 — JUN 2026", role: "Club President", org: "Aviation & Rocketry Club — Cupertino HS" },
    { period: "SEP 2023 — SEP 2024", role: "Mechanical & Design Lead", org: "South Bay Robotics (FRC)" },
    { period: "2022 — 2026", role: "TARC Team Captain", org: "Cupertino High School" },
  ];

  const projects = [
    { number: "001", tag: "SIMULATION", title: "Local Run 2D Wind Tunnel Simulator",
      desc: "Built after finding available fluid-sim tools either paywalled or overkill — a from-scratch 2D flow solver visualizing wake separation and airflow over arbitrary profiles at low Reynolds number flow.",
      placeholder: "[ test rig photo ]", video: "assets/wind-tunnel-clip.webm", poster: "assets/wind-tunnel-frame.png" },
    { number: "002", tag: "ROCKETRY", title: "The Valkyrie Project",
      desc: "High-power rocket based project series intended to help me learn the ins and outs of rocket design, manufacturing, and PCB design from the ground up.",
      placeholder: "[ deployment mechanism ]", video: "assets/valkyrie-deploy.mp4" },
    { number: "003", tag: "SOFTWARE", title: "OpenRocket Airbrake Simulation Plugin",
      desc: "OpenRocket plugin modeling deployable airbrakes for closed-loop apogee control on TARC competition rockets.",
      placeholder: "[ plugin screenshot ]", image: "assets/proj-plugin.png" },
    { number: "004", tag: "SOFTWARE", title: "SSSB Watch KTH",
      desc: "Website for tracking the chaotic student housing market in Stockholm, allows the user to find, sort, and compare available units.",
      placeholder: "[ project photo ]", image: "assets/proj-sssb.png" },
    { number: "005", tag: "TARC", title: "TARC Guidance Transition",
      desc: "Led mechanical and PCB design for Cupertino High School's TARC team's shift from unguided to actively-controlled rockets.",
      placeholder: "[ TARC rocket build ]", image: "assets/proj-tarc.jpg" },
    { number: "006", tag: "FRC", title: "South Bay Robotics — \"Crescendo\"",
      desc: "Mechanical and design subdivision lead for FRC team South Bay Robotics during the 2024 \"Crescendo\" season.",
      placeholder: "[ FRC robot build ]", image: "assets/proj-frc.jpg" },
  ];

  // ---- render skills ----
  const skillsGrid = document.getElementById('skills-grid');
  skillsGrid.innerHTML = skills.map((name, i) =>
    `<div class="skill-tile" style="transition-delay:${i * 60}ms">${name}</div>`
  ).join('');

  // ---- render timeline ----
  const timelineList = document.getElementById('timeline-list');
  timelineList.innerHTML = timeline.map((item, i) => `
    <div class="timeline-item" style="transition-delay:${i * 120}ms">
      <div class="timeline-dot"></div>
      <div class="timeline-period">${item.period}</div>
      <div class="timeline-role">${item.role}</div>
      <div class="timeline-org">${item.org}</div>
    </div>
  `).join('');

  // ---- render work grid ----
  const workGrid = document.getElementById('work-grid');
  workGrid.innerHTML = projects.map((p, i) => {
    let media;
    if (p.video) {
      const poster = p.poster ? ` poster="${p.poster}"` : '';
      media = `<video class="work-card-media" src="${p.video}"${poster} muted loop playsinline autoplay onerror="this.replaceWith(Object.assign(document.createElement('div'),{className:'work-card-placeholder',textContent:'${p.placeholder}'}))"></video>`;
    } else if (p.image) {
      media = `<img class="work-card-media" src="${p.image}" alt="${p.title}" onerror="this.replaceWith(Object.assign(document.createElement('div'),{className:'work-card-placeholder',textContent:'${p.placeholder}'}))">`;
    } else {
      media = `<div class="work-card-placeholder">${p.placeholder}</div>`;
    }
    return `
      <div class="work-card" style="transition-delay:${(i % 2) * 100}ms">
        <div class="work-card-corner work-card-corner-tl"></div>
        <div class="work-card-corner work-card-corner-br"></div>
        <div class="work-card-head"><span>${p.number}</span><span>${p.tag}</span></div>
        ${media}
        <div class="work-card-title">${p.title}</div>
        <div class="work-card-rule"><div class="work-card-rule-tick"></div><div class="work-card-rule-line"></div></div>
        <div class="work-card-desc">${p.desc}</div>
        <div class="work-card-foot"><span>DRWN. IH</span><span>SCALE 1:1</span><span>${p.number}-A</span></div>
      </div>
    `;
  }).join('');

  // ---- boot sequence ----
  const boot = document.getElementById('boot');
  const bootFill = document.getElementById('boot-fill');
  const bootPct = document.getElementById('boot-pct');
  let pct = 0;
  const bootInterval = setInterval(() => {
    pct = Math.min(100, pct + 4 + Math.random() * 9);
    bootFill.style.width = pct + '%';
    bootPct.textContent = Math.round(pct) + '%';
    if (pct >= 100) {
      clearInterval(bootInterval);
      setTimeout(() => boot.classList.add('booted'), 350);
    }
  }, 60);

  // ---- cursor ----
  const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (isFinePointer) {
    const cursor = document.getElementById('cursor');
    const heroBox = document.getElementById('hero-box');
    window.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      const tilt = Math.max(-6, Math.min(6, (e.clientX - window.innerWidth * 0.85) / 60));
      if (heroBox) heroBox.style.transform = `rotate(${tilt.toFixed(1)}deg)`;
    });
    window.addEventListener('mouseover', (e) => {
      const t = e.target.closest && e.target.closest('a,button,input,textarea');
      cursor.classList.toggle('active', !!t);
    });
  }

  // ---- nav bg + scroll ruler ----
  const nav = document.getElementById('nav');
  const rulerLabel = document.getElementById('ruler-label');
  const rulerDot = document.getElementById('ruler-dot');
  const onScroll = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPct = max > 0 ? Math.max(0, Math.min(1, window.scrollY / max)) : 0;
    nav.classList.toggle('scrolled', window.scrollY > 40);
    const pctLabel = Math.round(scrollPct * 100);
    rulerLabel.textContent = `SCROLL ${pctLabel}%`;
    rulerDot.style.top = pctLabel + '%';
  };
  window.addEventListener('scroll', onScroll);
  onScroll();

  // ---- scroll-reveal ----
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('in-view');
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

  // ---- contact form ----
  document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('cf-name').value || '';
    const email = document.getElementById('cf-email').value || '';
    const message = document.getElementById('cf-message').value || '';
    const subject = encodeURIComponent(`Portfolio contact from ${name || 'website'}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}${email ? ' (' + email + ')' : ''}`);
    window.location.href = `mailto:ivarhak08@gmail.com?subject=${subject}&body=${body}`;
  });
})();
