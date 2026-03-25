const bg = document.querySelector('.bg');
const page = document.querySelector('.page');
const letterF = document.querySelector('.letter-f');
const links = document.querySelectorAll('.clients a[data-image]');
const nav = document.querySelector('.clients');

// Preload all project images
links.forEach(link => new Image().src = link.dataset.image);

let isHovering = false;

links.forEach(link => {
  link.addEventListener('mouseenter', () => {
    if (isHovering) {
      // Already hovering: swap image instantly (no fade blink)
      bg.style.transition = 'none';
      bg.style.backgroundImage = `url('${link.dataset.image}')`;
      bg.offsetHeight; // force repaint
      bg.style.transition = '';
    } else {
      // First hover: fade in
      bg.style.backgroundImage = `url('${link.dataset.image}')`;
      bg.classList.add('visible');
      isHovering = true;
    }

    page.classList.add('is-hovering');
    letterF.textContent = link.textContent.trim()[0];
  });
});

nav.addEventListener('mouseleave', () => {
  bg.classList.remove('visible');
  page.classList.remove('is-hovering');
  letterF.textContent = 'F';
  isHovering = false;
});
