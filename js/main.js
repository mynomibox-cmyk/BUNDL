/* =====================================================
   BUNDL — Main JavaScript
   For Your Bundl of Joy
   ===================================================== */

/* =====================================================
   ANALYTICS HOOK PLACEHOLDER
   Replace with your GA4 / Tally / MailerLite events
   Example:
   gtag('event', 'waitlist_signup', { role: selectedRole });
   ===================================================== */

/* =====================================================
   MAILERLITE HOOK PLACEHOLDER
   When MailerLite is connected, remove the fallback
   .waitlist-form and replace .mailerlite-embed contents
   with the MailerLite embed script block.
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileNav();
  initStickyMobileCta();
  initFadeIn();
  initFAQ();
  initSafeSleepAccordion();
  initHealthcareAccordions();
  initProductTabs();
  initVariantButtons();
  initWaitlistForm();
  initNewsletterForms();
  initActiveNav();
  initLazyImages();
  initCart();
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
   SAFE SLEEP ACCORDION
   ===================================================== */
function initSafeSleepAccordion() {
  const items = document.querySelectorAll('.safe-sleep-rule');

  items.forEach(item => {
    const header = item.querySelector('.safe-sleep-rule__header');
    if (!header) return;

    header.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      // Toggle the clicked item
      if (isOpen) {
        item.classList.remove('open');
      } else {
        item.classList.add('open');
      }
    });
  });
}

/* =====================================================
   HEALTHCARE ACCORDIONS
   ===================================================== */
function initHealthcareAccordions() {
  // Use case cards
  const useCaseCards = document.querySelectorAll('.use-case-card');
  useCaseCards.forEach(card => {
    const header = card.querySelector('.use-case-card__header');
    if (!header) return;

    header.addEventListener('click', () => {
      const isOpen = card.classList.contains('open');
      if (isOpen) {
        card.classList.remove('open');
      } else {
        card.classList.add('open');
      }
    });
  });

  // HCP value cards
  const valueCards = document.querySelectorAll('.hcp-value-card');
  valueCards.forEach(card => {
    const header = card.querySelector('.hcp-value-card__header');
    if (!header) return;

    header.addEventListener('click', () => {
      const isOpen = card.classList.contains('open');
      if (isOpen) {
        card.classList.remove('open');
      } else {
        card.classList.add('open');
      }
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
        const mainImg = document.getElementById('product-img-main');
        if (mainImg && thumb.dataset.img) mainImg.src = thumb.dataset.img;
        const label = document.getElementById('product-img-label');
        if (label && thumb.dataset.label) label.textContent = thumb.dataset.label;
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
   STICKY MOBILE CTA
   ===================================================== */
function initStickyMobileCta() {
  const cta = document.getElementById('sticky-cta');
  if (!cta) return;

  // Show after scrolling past the hero
  const showThreshold = window.innerHeight * 0.8;

  const onScroll = () => {
    if (window.scrollY > showThreshold) {
      cta.classList.add('show');
      cta.setAttribute('aria-hidden', 'false');
    } else {
      cta.classList.remove('show');
      cta.setAttribute('aria-hidden', 'true');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
}

/* =====================================================
   WAITLIST FORM — Role Selection + Submission
   ===================================================== */
function initWaitlistForm() {
  // Role button selection
  const roleBtns = document.querySelectorAll('.waitlist-role-btn');
  const roleInput = document.getElementById('selected-role');

  roleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      roleBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      if (roleInput) roleInput.value = btn.dataset.role || '';
    });
  });

  // Waitlist form submit
  const form = document.getElementById('waitlist-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = form.querySelector('input[type="email"]');
    const submitBtn = form.querySelector('button[type="submit"]');
    if (!emailInput || !submitBtn) return;

    const email = emailInput.value.trim();
    if (!email || !email.includes('@')) {
      emailInput.focus();
      emailInput.style.borderColor = '#D98FA8';
      setTimeout(() => { emailInput.style.borderColor = ''; }, 2000);
      return;
    }

    const role = roleInput ? roleInput.value : 'supporter';
    const firstName = form.querySelector('input[name="first_name"]');
    const name = firstName ? firstName.value.trim() : '';

    // ── ANALYTICS HOOK ───────────────────────────
    // if (typeof gtag === 'function') {
    //   gtag('event', 'waitlist_signup', { role, has_name: !!name });
    // }
    // ─────────────────────────────────────────────

    const origText = submitBtn.textContent;
    submitBtn.textContent = name ? `✓ Welcome, ${name}! You're on the list.` : '✓ You\'re on the waitlist!';
    submitBtn.style.background = '#4CAF50';
    submitBtn.disabled = true;

    // Clear fields
    emailInput.value = '';
    if (firstName) firstName.value = '';

    setTimeout(() => {
      submitBtn.textContent = origText;
      submitBtn.style.background = '';
      submitBtn.disabled = false;
    }, 4000);
  });
}

/* =====================================================
   LAZY IMAGE LOAD
   ===================================================== */
function initLazyImages() {
  const imgs = document.querySelectorAll('img[loading="lazy"]');
  if (!imgs.length) return;

  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('loaded');
          obs.unobserve(entry.target);
        }
      });
    }, { rootMargin: '200px' });

    imgs.forEach(img => {
      if (img.complete) {
        img.classList.add('loaded');
      } else {
        img.addEventListener('load', () => img.classList.add('loaded'));
        obs.observe(img);
      }
    });
  } else {
    imgs.forEach(img => img.classList.add('loaded'));
  }
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

/* =====================================================
   SHOPPING CART
   ===================================================== */
function initCart() {
  // Get cart count from localStorage
  const updateCartDisplay = () => {
    const cartCount = parseInt(localStorage.getItem('cartCount') || '0');
    const cartCountEl = document.getElementById('cart-count');
    if (cartCountEl) {
      cartCountEl.textContent = cartCount;
      if (cartCount > 0) {
        cartCountEl.classList.add('show');
      } else {
        cartCountEl.classList.remove('show');
      }
    }
  };

  // Initialize cart display
  updateCartDisplay();

  // Handle add to cart buttons
  document.querySelectorAll('.btn--primary').forEach(btn => {
    if (btn.textContent.includes('Add to Cart')) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();

        // Get current cart count
        let cartCount = parseInt(localStorage.getItem('cartCount') || '0');
        cartCount++;
        localStorage.setItem('cartCount', cartCount);

        // Update display
        updateCartDisplay();

        // Show feedback
        const originalText = btn.textContent;
        btn.textContent = '✓ Added to Cart';
        btn.style.background = '#4CAF50';

        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.background = '';
        }, 2500);
      });
    }
  });
}
