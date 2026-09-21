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

  // Download Modal & Play Protect Instructions Handler
  function initDownloadModal() {
    if (!document.getElementById('downloadModal')) {
      const modalHTML = `
        <div class="modal-backdrop" id="downloadModal" aria-hidden="true">
          <div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
            <div class="modal-header">
              <h3 class="modal-title" id="modalTitle">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Download Started!
              </h3>
              <button class="modal-close" id="closeModalBtn" aria-label="Close modal">&times;</button>
            </div>
            
            <p style="color: var(--text-dim); font-size: 0.9rem; margin-bottom: 12px; text-align: left;">
              Your <code>nuntia.apk</code> file is downloading. Because Nuntia requests SMS permissions, follow these steps if Android or Play Protect displays a warning:
            </p>

            <div class="protect-step-list">
              <div class="protect-step-item">
                <div class="protect-step-num">1</div>
                <div class="protect-step-content">
                  <h4>Temporarily Turn Off Play Protect</h4>
                  <p>Open <strong>Google Play Store</strong> &rarr; Tap <strong>Profile Picture</strong> (top right) &rarr; Select <strong>Play Protect</strong> &rarr; Tap <strong>Settings Gear</strong> &rarr; Turn OFF <strong>"Scan apps with Play Protect"</strong>.</p>
                </div>
              </div>

              <div class="protect-step-item">
                <div class="protect-step-num">2</div>
                <div class="protect-step-content">
                  <h4>Install Nuntia APK</h4>
                  <p>Open your phone's <strong>Downloads / File Manager</strong>, tap <code>nuntia.apk</code>, and tap <strong>Install</strong> (or tap <em>More Details &rarr; Install anyway</em>).</p>
                </div>
              </div>

              <div class="protect-step-item">
                <div class="protect-step-num">3</div>
                <div class="protect-step-content">
                  <h4>Turn Play Protect Back ON (Recommended)</h4>
                  <p>After installation finishes, re-open Play Store &rarr; Play Protect &rarr; Settings &rarr; Turn <strong>"Scan apps with Play Protect"</strong> back <strong>ON</strong> for ongoing security.</p>
                </div>
              </div>
            </div>

            <div class="recommend-box">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 11 12 14 22 4"/></svg>
              <p><strong>Security Tip:</strong> Turning Play Protect back ON after installing Nuntia keeps your phone fully safe while allowing Nuntia to run smoothly!</p>
            </div>

            <button class="btn btn--primary btn--sm ripple" id="dismissModalBtn" style="width: 100%; margin-top: 16px; justify-content: center;">Got It! Continue to Install</button>
          </div>
        </div>
      `;
      document.body.insertAdjacentHTML('beforeend', modalHTML);

      const modal = document.getElementById('downloadModal');
      const closeBtn = document.getElementById('closeModalBtn');
      const dismissBtn = document.getElementById('dismissModalBtn');

      const closeModal = () => modal.classList.remove('active');

      if (closeBtn) closeBtn.addEventListener('click', closeModal);
      if (dismissBtn) dismissBtn.addEventListener('click', closeModal);
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
      });
    }

    const downloadBtns = document.querySelectorAll('a[download]');
    downloadBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        showToast('Download starting...');
        const modal = document.getElementById('downloadModal');
        if (modal) {
          setTimeout(() => {
            modal.classList.add('active');
          }, 350);
        }
      });
    });
  }

  initDownloadModal();
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
