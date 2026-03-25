const bgA = document.querySelector('.bg-a');
const bgB = document.querySelector('.bg-b');
const page = document.querySelector('.page');
const letterF = document.querySelector('.letter-f');
const links = document.querySelectorAll('.clients a[data-image]');
const nav = document.querySelector('.clients');

// Preload all project images
links.forEach(link => new Image().src = link.dataset.image);

let activeBg = bgA;

links.forEach(link => {
  link.addEventListener('mouseenter', () => {
    const next = activeBg === bgA ? bgB : bgA;
    next.style.backgroundImage = `url('${link.dataset.image}')`;
    next.classList.add('visible');
    activeBg.classList.remove('visible');
    activeBg = next;

    page.classList.add('is-hovering');
    letterF.textContent = link.textContent.trim()[0];
  });
});

nav.addEventListener('mouseleave', () => {
  bgA.classList.remove('visible');
  bgB.classList.remove('visible');
  page.classList.remove('is-hovering');
  letterF.textContent = 'F';
});
