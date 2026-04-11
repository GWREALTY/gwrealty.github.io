// ---- DARK MODE TOGGLE ----
(function () {
  const toggles = document.querySelectorAll('[data-theme-toggle]');
  const root = document.documentElement;
  // Always default to dark — black theme is the brand default
  let theme = 'dark';
  root.setAttribute('data-theme', theme);

  function setIcon(btn, t) {
    btn.innerHTML = t === 'dark'
      ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
      : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    btn.setAttribute('aria-label', 'Switch to ' + (t === 'dark' ? 'light' : 'dark') + ' mode');
  }

  toggles.forEach(btn => {
    setIcon(btn, theme);
    btn.addEventListener('click', () => {
      theme = theme === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', theme);
      toggles.forEach(b => setIcon(b, theme));
    });
  });
})();

// ---- SMOOTH SCROLL for anchor links ----
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Focus the first input in the form if scrolling to a form
      const firstInput = target.querySelector('input, select');
      if (firstInput) setTimeout(() => firstInput.focus(), 500);
    }
  });
});

// ---- FORM VALIDATION FEEDBACK ----
document.querySelectorAll('.lead-form').forEach(form => {
  form.addEventListener('submit', function (e) {
    let valid = true;
    const required = form.querySelectorAll('[required]');
    required.forEach(field => {
      if (!field.value.trim()) {
        valid = false;
        field.style.borderColor = '#e05252';
        field.addEventListener('input', () => { field.style.borderColor = ''; }, { once: true });
      }
    });
    if (!valid) {
      e.preventDefault();
      const firstInvalid = form.querySelector('[required]:placeholder-shown, [required][value=""]');
      if (firstInvalid) firstInvalid.focus();
    }
  });
});

// ---- SUBTLE SCROLL ANIMATION ----
// Only animate elements that are NOT already in the viewport on load
if ('IntersectionObserver' in window) {
  const toAnimate = document.querySelectorAll('.step, .area-card, .feature-card');

  // Mark elements as needing animation only after a brief delay
  // so above-the-fold content is never hidden
  setTimeout(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('anim-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    toAnimate.forEach(el => {
      const rect = el.getBoundingClientRect();
      // Only add animation class if element is below viewport
      if (rect.top > window.innerHeight) {
        el.classList.add('anim-hidden');
      }
      observer.observe(el);
    });
  }, 100);
}
