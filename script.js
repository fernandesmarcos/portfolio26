const bg = document.querySelector('.bg');
const page = document.querySelector('.page');
const letterF = document.querySelector('.letter-f');
const links = document.querySelectorAll('.clients a[data-image]');
const nav = document.querySelector('.clients');

// Preload all project images
links.forEach(link => new Image().src = link.dataset.image);

links.forEach(link => {
  link.addEventListener('mouseenter', () => {
    bg.style.backgroundImage = `url('${link.dataset.image}')`;
    bg.classList.add('visible');
    page.classList.add('is-hovering');
    letterF.textContent = link.textContent.trim()[0];
  });
});

nav.addEventListener('mouseleave', () => {
  bg.classList.remove('visible');
  page.classList.remove('is-hovering');
  letterF.textContent = 'F';
});
