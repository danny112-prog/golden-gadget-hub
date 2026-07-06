document.addEventListener('DOMContentLoaded', () => {
  const loader = document.getElementById('pageLoader');
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  const typingHeadline = document.getElementById('typingHeadline');

  if (loader) {
    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.classList.add('loaded');
    }, 900);
  } else {
    document.body.classList.add('loaded');
  }

  const links = document.querySelectorAll('nav a');
  links.forEach((link) => {
    if (link.href === window.location.href) {
      link.style.color = '#f4d06f';
    }
  });

  if (typingHeadline) {
    const text = 'Premium gadgets for modern living.';
    let index = 0;
    const type = () => {
      typingHeadline.textContent = text.slice(0, index);
      index += 1;
      if (index <= text.length) {
        setTimeout(type, 70);
      }
    };
    type();
  }

  const counters = document.querySelectorAll('.counter-number');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = Number(el.dataset.target || 0);
        const suffix = el.dataset.suffix || '';
        const duration = 1400;
        const startTime = performance.now();

        const update = (now) => {
          const progress = Math.min((now - startTime) / duration, 1);
          const value = Math.floor(progress * target);
          el.textContent = value.toLocaleString() + suffix;
          if (progress < 1) {
            requestAnimationFrame(update);
          } else {
            el.textContent = target.toLocaleString() + suffix;
          }
        };

        requestAnimationFrame(update);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.6 });

  counters.forEach((counter) => counterObserver.observe(counter));

  const toggleScrollTop = () => {
    if (!scrollTopBtn) return;
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add('show');
    } else {
      scrollTopBtn.classList.remove('show');
    }
  };

  window.addEventListener('scroll', toggleScrollTop);
  toggleScrollTop();

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const input = newsletterForm.querySelector('input');
      if (input) {
        input.value = '';
      }
    });
  }
});