/* Nuntia Web Page Interactive Scripts — Make-It Style */
document.addEventListener('DOMContentLoaded', () => {
  // Loader Fadeout
  const loader = document.getElementById('loader');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('fade-out');
    }, 400);
  }

  // Theme Toggle
  const themeToggle = document.getElementById('themeToggle');
  const htmlEl = document.documentElement;
  const savedTheme = localStorage.getItem('theme') || 'dark';
  htmlEl.setAttribute('data-theme', savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = htmlEl.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      htmlEl.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }

  // Navigation Mobile Toggle
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !expanded);
      navMenu.classList.toggle('active');
    });
  }

  // Scroll Progress Bar & Back to Top
  const scrollProgress = document.getElementById('scrollProgress');
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    if (scrollProgress) {
      scrollProgress.style.width = `${progress}%`;
    }

    if (backToTop) {
      if (scrollTop > 400) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }
  });

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Canvas Particles Background
  const canvas = document.getElementById('particles');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = Math.min(Math.floor(window.innerWidth / 22), 55);

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.8 + 1,
        alpha: Math.random() * 0.4 + 0.1
      });
    }

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = '#10b981';

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }

  // FAQ Accordion Toggle
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(other => other.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // FAQ Category Filter
  const filterBtns = document.querySelectorAll('.faq-filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const category = btn.getAttribute('data-category');

      faqItems.forEach(item => {
        const itemCat = item.getAttribute('data-category');
        if (category === 'all' || itemCat === category) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // FAQ Live Search
  const faqSearchInput = document.getElementById('faqSearch');
  if (faqSearchInput) {
    faqSearchInput.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase().trim();
      faqItems.forEach(item => {
        const qText = item.querySelector('.faq-question')?.textContent.toLowerCase() || '';
        const aText = item.querySelector('.faq-answer')?.textContent.toLowerCase() || '';
        if (qText.includes(term) || aText.includes(term)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  }

  // Animated Counter Statistics
  const statNumbers = document.querySelectorAll('.stat-card__number');
  if (statNumbers.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-target') || '0', 10);
          const suffix = el.getAttribute('data-suffix') || '';
          let count = 0;
          const duration = 1500;
          const step = Math.max(1, Math.floor(target / (duration / 30)));

          const timer = setInterval(() => {
            count += step;
            if (count >= target) {
              count = target;
              clearInterval(timer);
            }
            el.textContent = count + suffix;
          }, 30);

          observer.unobserve(el);
        }
      });
    }, { threshold: 0.2 });

    statNumbers.forEach(num => observer.observe(num));
  }

  // Simulated Terminal Typing for Nuntia
  const terminalOutput = document.getElementById('terminalOutput');
  if (terminalOutput) {
    const lines = [
      '$ nuntia init --mode cellular',
      '[NUNTIA] Initializing SQLite local database...',
      '[OK] Database initialized at /data/user/0/com.nuntia.app/databases/nuntia.db',
      '[NUNTIA] Binding Kotlin native SMS bridge (SmsManager)...',
      '[OK] Cellular carrier channel ready (SIM 1 detected).',
      '[NUNTIA] Listening for SMS_RECEIVED broadcasts...',
      '$ nuntia send --to "+919876543210" --text "Nuntia offline SMS active!"',
      '[SUCCESS] SMS sent cleanly via carrier cellular network.'
    ];

    let lineIdx = 0;
    function typeLine() {
      if (lineIdx < lines.length) {
        const p = document.createElement('div');
        p.style.marginBottom = '6px';
        if (lines[lineIdx].startsWith('$')) {
          p.style.color = '#6ee7b7';
          p.style.fontWeight = 'bold';
        } else if (lines[lineIdx].includes('[SUCCESS]') || lines[lineIdx].includes('[OK]')) {
          p.style.color = '#25D366';
        } else {
          p.style.color = '#9ca3af';
        }
        p.textContent = lines[lineIdx];
        terminalOutput.appendChild(p);
        lineIdx++;
        setTimeout(typeLine, 450);
      }
    }
    setTimeout(typeLine, 800);
  }
});

// Toast Utility
function showToast(message) {
  const toast = document.getElementById('toast');
  if (toast) {
    toast.textContent = message;
    toast.classList.add('visible');
    setTimeout(() => {
      toast.classList.remove('visible');
    }, 3000);
  }
}
