/* ═══════════════════════════════════════════
   PIXOVA STUDIO — main.js
═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Nav scroll effect ───────────────── */
  const nav = document.getElementById('mainNav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  /* ── Mobile nav toggle ───────────────── */
  const toggle = document.getElementById('navToggle');
  const links  = document.getElementById('navLinks');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => links.classList.remove('open'));
    });
  }

  /* ── Scroll-reveal animations ────────── */
  const animEls = document.querySelectorAll('[data-anim]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  animEls.forEach(el => observer.observe(el));

  /* ── Video controls (play/pause, timeline, volume) ─── */
  document.querySelectorAll('.reel__item').forEach(item => {
    const video      = item.querySelector('.reel__video');
    const overlayBtn = item.querySelector('.reel__play');       // big centre button
    const ctrlBtn    = item.querySelector('.reel__ctrl-play');  // small bar button
    const timeline   = item.querySelector('.reel__timeline');
    const progress   = item.querySelector('.reel__progress');
    const thumb      = item.querySelector('.reel__thumb');
    const volInput   = item.querySelector('.reel__vol');
    const muteBtn    = item.querySelector('.reel__mute');

    if (!video) return;

    // auto-play on hover (muted)
    item.addEventListener('mouseenter', () => { video.muted = true; video.play(); });
    item.addEventListener('mouseleave', () => { if (video.muted) video.pause(); });

    // helper: sync play icons
    const syncPlayIcons = () => {
      const icon = video.paused ? '▶' : '⏸';
      if (overlayBtn) overlayBtn.textContent = icon;
      if (ctrlBtn)    ctrlBtn.textContent    = icon;
    };

    // toggle play/pause
    const togglePlay = (e) => {
      e.stopPropagation();
      if (video.paused) {
        video.muted = false;
        if (volInput) video.volume = parseFloat(volInput.value) || 0.7;
        video.play();
      } else {
        video.pause();
      }
      syncPlayIcons();
    };

    if (overlayBtn) overlayBtn.addEventListener('click', togglePlay);
    if (ctrlBtn)    ctrlBtn.addEventListener('click', togglePlay);
    video.addEventListener('play',  syncPlayIcons);
    video.addEventListener('pause', syncPlayIcons);

    // timeline: update progress & thumb as video plays
    video.addEventListener('timeupdate', () => {
      if (!video.duration) return;
      const pct = (video.currentTime / video.duration) * 100;
      if (progress) progress.style.width = pct + '%';
      if (thumb)    thumb.style.left     = pct + '%';
    });

    // timeline: seek on click/drag
    if (timeline) {
      const seek = (e) => {
        const rect = timeline.getBoundingClientRect();
        const pct  = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
        if (video.duration) video.currentTime = pct * video.duration;
      };
      let dragging = false;
      timeline.addEventListener('mousedown', (e) => { dragging = true; seek(e); });
      window.addEventListener('mousemove',   (e) => { if (dragging) seek(e); });
      window.addEventListener('mouseup',     ()  => { dragging = false; });
    }

    // volume
    if (volInput) {
      volInput.value = 0; // starts muted
      volInput.addEventListener('input', () => {
        video.volume = parseFloat(volInput.value);
        video.muted  = (video.volume === 0);
        if (muteBtn) muteBtn.textContent = video.muted ? '🔇' : (video.volume < 0.5 ? '🔉' : '🔊');
      });
    }
    if (muteBtn) {
      muteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        video.muted = !video.muted;
        if (!video.muted && volInput && parseFloat(volInput.value) === 0) {
          volInput.value = 0.7;
          video.volume   = 0.7;
        }
        muteBtn.textContent = video.muted ? '🔇' : (video.volume < 0.5 ? '🔉' : '🔊');
      });
    }
  });

  /* ── Contact form ────────────────────── */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      btn.textContent = 'Sending…';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = 'Message Sent ✓';
        btn.style.background = '#1a7a3a';
        form.reset();
        setTimeout(() => {
          btn.textContent = 'Send Message';
          btn.style.background = '';
          btn.disabled = false;
        }, 3500);
      }, 1200);
    });
  }

  /* ── Smooth anchor scroll ────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
