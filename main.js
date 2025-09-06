(function () {
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const isOpen = navMenu.classList.toggle('show');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Prevent any default button behavior that might cause wobbling
    navToggle.addEventListener('mousedown', (e) => {
      e.preventDefault();
    });

    navToggle.addEventListener('touchstart', (e) => {
      e.preventDefault();
    });
  }

  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    if (!backToTop) return;
    if (window.scrollY > 300) backToTop.classList.add('show');
    else backToTop.classList.remove('show');
  });
  if (backToTop) backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const counters = document.querySelectorAll('[data-count]');
  const animateCount = (el) => {
    const target = Number(el.getAttribute('data-count')) || 0;
    const duration = 1200;
    const startTime = performance.now();
    const step = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const value = Math.floor(progress * target);
      el.textContent = value.toLocaleString();
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  };
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateCount(e.target);
        io.unobserve(e.target);
      }
    })
  }, { threshold: 0.5 });
  counters.forEach(c => io.observe(c));

  // Smooth scroll for same-page anchors
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const id = this.getAttribute('href');
      if (id.length > 1) {
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    })
  });
})();



