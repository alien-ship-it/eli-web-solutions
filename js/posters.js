document.addEventListener('DOMContentLoaded', () => {
  AOS.init({
  duration: 800,      // animation duration in ms
  once: true,         // whether animation should happen only once
 });
  const track = document.querySelector('.poster-track');
  const cards = Array.from(track.children);
  const gap   = 20;
  let idx = 0;

  // Auto-slide
  function showNext() {
    idx = (idx + 1) % cards.length;
    const w = cards[0].getBoundingClientRect().width + gap;
    track.style.transform = `translateX(-${idx * w}px)`;
  }
  let interval = setInterval(showNext, 4000);

  // Pause on hover
  track.parentElement.addEventListener('mouseenter', () => clearInterval(interval));
  track.parentElement.addEventListener('mouseleave', () => interval = setInterval(showNext, 4000));

  // Lightbox
  const lightbox = document.getElementById('lightbox');
  const lbImg    = document.querySelector('.lb-img');
  const lbClose  = document.querySelector('.lb-close');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      lbImg.src = card.dataset.full;
      lightbox.style.display = 'flex';
    });
  });
  lbClose.addEventListener('click', () => lightbox.style.display = 'none');
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) lightbox.style.display = 'none';
  });

  // Reset on resize
  window.addEventListener('resize', () => {
    idx = 0;
    track.style.transform = 'translateX(0)';
  });
});
