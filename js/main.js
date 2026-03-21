/* =====================================================
   BUNDL — Main JavaScript
   For Your Bundl of Joy
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileNav();
  initFadeIn();
  initFAQ();
  initProductTabs();
  initVariantButtons();
  initNewsletterForms();
  initActiveNav();
});

/* =====================================================
   STICKY HEADER
   ===================================================== */
function initHeader() {
  const header = document.querySelector('.header');
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
}

/* =====================================================
   MOBILE NAVIGATION
   ===================================================== */
function initMobileNav() {
  const hamburger = document.querySelector('.header__hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (!hamburger || !mobileNav) return;

  const close = () => {
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
    hamburger.setAttribute('aria-expanded', 'false');
    const [s1, s2, s3] = hamburger.querySelectorAll('span');
    s1.style.transform = s3.style.transform = '';
    s2.style.opacity = '';
  };

  hamburger.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    document.body.style.overflow = isOpen ? 'hidden' : '';
    hamburger.setAttribute('aria-expanded', String(isOpen));

    const [s1, s2, s3] = hamburger.querySelectorAll('span');
    if (isOpen) {
      s1.style.transform = 'rotate(45deg) translate(5px, 5px)';
      s2.style.opacity = '0';
      s3.style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      close();
    }
  });

  mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', close));
}

/* =====================================================
   FADE IN ON SCROLL
   ===================================================== */
function initFadeIn() {
  const els = document.querySelectorAll('.fade-in');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });

  els.forEach(el => observer.observe(el));
}

/* =====================================================
   FAQ ACCORDION
   ===================================================== */
function initFAQ() {
  const items = document.querySelectorAll('.faq-item');

  items.forEach(item => {
    const btn = item.querySelector('.faq-question');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      items.forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
}

/* =====================================================
   PRODUCT TABS
   ===================================================== */
function initProductTabs() {
  const tabs = document.querySelectorAll('.product-tab');
  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      tabs.forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.product-tab-pane').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const pane = document.querySelector(`[data-pane="${target}"]`);
      if (pane) pane.classList.add('active');
    });
  });
}

/* =====================================================
   VARIANT / COLOR SELECTORS
   ===================================================== */
function initVariantButtons() {
  document.querySelectorAll('.variant-options').forEach(group => {
    group.querySelectorAll('.variant-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        group.querySelectorAll('.variant-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });
  });

  document.querySelectorAll('.color-options').forEach(group => {
    group.querySelectorAll('.color-swatch').forEach(swatch => {
      swatch.addEventListener('click', () => {
        group.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
        swatch.classList.add('active');
      });
    });
  });

  document.querySelectorAll('.product-thumbs').forEach(group => {
    group.querySelectorAll('.product-thumb').forEach(thumb => {
      thumb.addEventListener('click', () => {
        group.querySelectorAll('.product-thumb').forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
      });
    });
  });
}

/* =====================================================
   NEWSLETTER FORMS
   ===================================================== */
function initNewsletterForms() {
  document.querySelectorAll('.newsletter-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const btn = form.querySelector('button[type="submit"]');
      if (!input || !btn || !input.value.trim()) return;

      const origText = btn.textContent;
      btn.textContent = '✓ Subscribed!';
      btn.style.background = '#4CAF50';
      input.value = '';

      setTimeout(() => {
        btn.textContent = origText;
        btn.style.background = '';
      }, 3500);
    });
  });

  // Contact / sample forms
  document.querySelectorAll('.contact-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      if (!btn) return;
      const orig = btn.textContent;
      btn.textContent = '✓ Message Sent!';
      btn.style.background = '#4CAF50';
      setTimeout(() => { btn.textContent = orig; btn.style.background = ''; }, 3500);
    });
  });
}

/* =====================================================
   ACTIVE NAV LINK
   ===================================================== */
function initActiveNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.header__nav a, .mobile-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* =====================================================
   SMOOTH SCROLL FOR ANCHORS
   ===================================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
