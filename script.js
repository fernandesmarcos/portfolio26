const bg = document.querySelector('.bg');
const page = document.querySelector('.page');
const letterF = document.querySelector('.letter-f');
const links = document.querySelectorAll('.clients a[data-image]');
const clientsNav = document.querySelector('.clients');
const contactLinks = document.querySelectorAll('.contact a');
const contactNav = document.querySelector('.contact');
const monogram = document.querySelector('.monogram');
const bioLink = document.querySelector('.bio a');

// Preload all project images
links.forEach(link => new Image().src = link.dataset.image);

let isHovering = false;

links.forEach(link => {
  link.addEventListener('mouseenter', () => {
    if (isHovering) {
      bg.style.transition = 'none';
      bg.style.backgroundImage = `url('${link.dataset.image}')`;
      bg.offsetHeight;
      bg.style.transition = '';
    } else {
      bg.style.backgroundImage = `url('${link.dataset.image}')`;
      bg.classList.add('visible');
      isHovering = true;
    }

    page.classList.add('is-hovering');
    letterF.textContent = link.textContent.trim()[0];
  });
});

clientsNav.addEventListener('mouseleave', () => {
  bg.classList.remove('visible');
  page.classList.remove('is-hovering');
  letterF.textContent = 'F';
  isHovering = false;
});

contactLinks.forEach(link => {
  link.addEventListener('mouseenter', () => {
    bg.classList.remove('visible');
    page.classList.remove('is-hovering');
    isHovering = false;
    letterF.textContent = link.textContent.trim()[0];
  });
});

contactNav.addEventListener('mouseleave', () => {
  page.classList.remove('is-hovering');
  letterF.textContent = 'F';
});

bioLink.addEventListener('mouseenter', () => {
  monogram.classList.add('show-initials');
  page.classList.add('is-hovering', 'bio-hovering');
});
bioLink.addEventListener('mouseleave', () => {
  monogram.classList.remove('show-initials');
  page.classList.remove('is-hovering', 'bio-hovering');
});

