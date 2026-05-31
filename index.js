// ── CURSOR (desktop pointer only) ──
const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');
const hasFinePointer = window.matchMedia('(pointer: fine)').matches;

if (hasFinePointer) {
  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px'; cursor.style.top = my + 'px';
  });
  (function animateRing() {
    rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
    cursorRing.style.left = rx + 'px'; cursorRing.style.top = ry + 'px';
    requestAnimationFrame(animateRing);
  })();
  document.querySelectorAll('a, button, .menu-item').forEach(el => {
    el.addEventListener('mouseenter', () => { cursorRing.style.width = '56px'; cursorRing.style.height = '56px'; cursor.style.transform = 'translate(-50%,-50%) scale(0)'; });
    el.addEventListener('mouseleave', () => { cursorRing.style.width = '36px'; cursorRing.style.height = '36px'; cursor.style.transform = 'translate(-50%,-50%) scale(1)'; });
  });
} else {
  // ── TAP RIPPLE for touch/tablet ──
  document.addEventListener('touchstart', e => {
    const touch = e.touches[0];
    const ripple = document.createElement('div');
    ripple.className = 'tap-ripple';
    ripple.style.left = touch.clientX + 'px';
    ripple.style.top = touch.clientY + 'px';
    document.body.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  }, { passive: true });
}

// ── HERO LOAD ──
setTimeout(() => document.getElementById('hero').classList.add('loaded'), 80);

// ── STICKY HEADER ──
const header = document.getElementById('siteHeader');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 60);
  // update active cat strip btn
  document.querySelectorAll('.menu-section').forEach(sec => {
    const rect = sec.getBoundingClientRect();
    if (rect.top <= 100 && rect.bottom > 100) {
      document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
      const btn = document.querySelector(`.cat-btn[data-target="${sec.id}"]`);
      if (btn) btn.classList.add('active');
    }
  });
}, { passive: true });

// ── HAMBURGER ──
const toggle = document.getElementById('menuToggle');
const fsMenu = document.getElementById('fullscreenMenu');
toggle.addEventListener('click', () => {
  toggle.classList.toggle('active');
  fsMenu.classList.toggle('active');
  document.body.style.overflow = fsMenu.classList.contains('active') ? 'hidden' : '';
});
fsMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  toggle.classList.remove('active'); fsMenu.classList.remove('active'); document.body.style.overflow = '';
}));

// ── HERO BTN ──
document.getElementById('learn-more-btn').addEventListener('click', () => {
  document.getElementById('starters').scrollIntoView({ behavior: 'smooth' });
});

// ── CAT STRIP ──
document.querySelectorAll('.cat-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.getElementById(btn.dataset.target).scrollIntoView({ behavior: 'smooth' });
  });
});

// ── DRAG SCROLL ──
document.querySelectorAll('[data-drag]').forEach(el => {
  let isDown = false, startX, scrollLeft;
  el.addEventListener('mousedown', e => { isDown = true; el.classList.add('active'); startX = e.pageX - el.offsetLeft; scrollLeft = el.scrollLeft; });
  el.addEventListener('mouseleave', () => { isDown = false; el.classList.remove('active'); });
  el.addEventListener('mouseup', () => { isDown = false; el.classList.remove('active'); });
  el.addEventListener('mousemove', e => { if (!isDown) return; e.preventDefault(); const x = e.pageX - el.offsetLeft; el.scrollLeft = scrollLeft - (x - startX) * 1.4; });
});

// ── MODAL ──
const modal = document.getElementById('modal');
const modalImgWrap = document.getElementById('modalImgWrap');

function openModal(item) {
  const img = item.dataset.img;
  const name = item.dataset.name;
  const desc = item.dataset.description;
  const price = item.dataset.price;
  const cat = item.dataset.cat || '';

  if (img) {
    modalImgWrap.innerHTML = `<img class="modal-img" src="${img}" alt="${name}">`;
  } else {
    const emoji = item.querySelector('.item-no-img')?.textContent || '🍽️';
    modalImgWrap.innerHTML = `<div class="modal-img-placeholder">${emoji}</div>`;
  }
  document.getElementById('modalCat').textContent = cat;
  document.getElementById('modalName').textContent = name;
  document.getElementById('modalDesc').textContent = desc;
  document.getElementById('modalPrice').textContent = price;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

document.querySelectorAll('.menu-item').forEach(item => {
  item.addEventListener('click', () => openModal(item));
});

const isTouchDevice =
  window.matchMedia("(pointer: coarse)").matches ||
  "ontouchstart" in window;

if (!isTouchDevice) {
  const cursor = document.getElementById("cursor");
  const cursorRing = document.getElementById("cursorRing");

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";

    cursorRing.style.left = e.clientX + "px";
    cursorRing.style.top = e.clientY + "px";
  });
}

function closeModal() {
  modal.classList.remove('open');
  document.body.style.overflow = '';
}
document.getElementById('modalClose').addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// ── SCROLL REVEAL ──
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// ── HINT SCROLL ANIMATION (on load) ──
window.addEventListener('load', () => {
  setTimeout(() => {
    document.querySelectorAll('[data-drag]').forEach(container => {
      container.scrollBy({ left: 80, behavior: 'smooth' });
      setTimeout(() => container.scrollBy({ left: -80, behavior: 'smooth' }), 700);
    });
  }, 2000);
});

// Block Ctrl+Scroll zoom
document.addEventListener('wheel', e => { if (e.ctrlKey) e.preventDefault(); }, { passive: false });
document.addEventListener('gesturestart', e => e.preventDefault());
