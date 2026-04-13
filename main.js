/* ================================================================
   G&W Realty — main.js
   ================================================================ */

(function () {
  'use strict';

  /* ── Theme Toggle ──────────────────────────────────────────── */
  const html = document.documentElement;
  const toggle = document.querySelector('[data-theme-toggle]');
  // Default to dark
  let theme = 'dark';
  html.setAttribute('data-theme', theme);

  function updateToggleIcon() {
    if (!toggle) return;
    toggle.setAttribute('aria-label', 'Switch to ' + (theme === 'dark' ? 'light' : 'dark') + ' mode');
    toggle.innerHTML = theme === 'dark'
      ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
      : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  }

  updateToggleIcon();

  if (toggle) {
    toggle.addEventListener('click', function () {
      theme = theme === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', theme);
      updateToggleIcon();
    });
  }

  /* ── Sticky Nav Scroll ─────────────────────────────────────── */
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      nav.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });
  }

  /* ── Active Nav Link ───────────────────────────────────────── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__links a, .mobile-nav a').forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ── Hamburger Menu ────────────────────────────────────────── */
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('active');
      mobileNav.classList.toggle('open');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });

    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── Scroll Reveal ─────────────────────────────────────────── */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length > 0) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(function (el) { observer.observe(el); });
  }

  /* ── Smooth Scroll for Anchor Links ────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* ── Counter Animation ─────────────────────────────────────── */
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length > 0) {
    const counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-count'), 10);
          const suffix = el.getAttribute('data-suffix') || '';
          const prefix = el.getAttribute('data-prefix') || '';
          const duration = 2000;
          const start = performance.now();

          function animate(now) {
            const progress = Math.min((now - start) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(target * ease);
            el.textContent = prefix + current.toLocaleString() + suffix;
            if (progress < 1) requestAnimationFrame(animate);
          }

          requestAnimationFrame(animate);
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(function (el) { counterObserver.observe(el); });
  }

  /* ── Hide Call Buttons Near Footer ───────────────────────── */
  const floatCalls = document.querySelector('.float-calls');
  const footer = document.querySelector('footer') || document.querySelector('.footer');

  if (floatCalls && footer) {
    function checkFooterProximity() {
      const footerTop = footer.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      // Hide buttons when footer is within 120px of bottom of viewport
      if (footerTop < windowHeight + 120) {
        floatCalls.style.opacity = '0';
        floatCalls.style.pointerEvents = 'none';
        floatCalls.style.transform = 'translateY(20px)';
      } else {
        floatCalls.style.opacity = '1';
        floatCalls.style.pointerEvents = 'all';
        floatCalls.style.transform = 'translateY(0)';
      }
    }
    window.addEventListener('scroll', checkFooterProximity, { passive: true });
    checkFooterProximity();
  }

  /* ── Form Submit Feedback ──────────────────────────────────── */
  document.querySelectorAll('form[action*="formspree"]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      const btn = form.querySelector('button[type="submit"]');
      if (btn) {
        btn.textContent = 'Sending...';
        btn.disabled = true;
      }
    });
  });

})();
