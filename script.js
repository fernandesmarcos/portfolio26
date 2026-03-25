const bg = document.querySelector('.bg');
const page = document.querySelector('.page');
const links = document.querySelectorAll('.clients a[data-image]');
const nav = document.querySelector('.clients');

links.forEach(link => {
  link.addEventListener('mouseenter', () => {
    bg.style.backgroundImage = `url('${link.dataset.image}')`;
    bg.classList.add('visible');
    page.classList.add('is-hovering');
  });
});

nav.addEventListener('mouseleave', () => {
  bg.classList.remove('visible');
  page.classList.remove('is-hovering');
});
